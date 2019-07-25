var grilla = 'grillaConsulta';
var barra = 'barraConsulta';
var nomDiasFaltanAtendidos = "";
var posDoc = '1';

var multiselectVal = true;
var boolMostrarDetalle = true;

$(document).ready(function () {
    //CountCharactersControlTxt('RESPUESTA', 'lblCantComentario', 500);
    //IniciarFechas();
    var vIdDesDocumento = $('#IdDesEstadoDocumento').val();
    var vIdEstadoDocumento = $('#IdEstadoDocumento').val();
    var vFiltroRangoFechas = $('#hddnFiltroRangoFecha').val();

    

    $("#lbNombreMenuPrincipal").text("Documentos Asignados");

    $("#lbNombreMenuSecundario").text(vIdDesDocumento + " " + vFiltroRangoFechas);

    RemoveClases();

    $("#liAsignados").addClass("active open");
    $("#iOpcionesMenu").addClass("clip-note");

    switch (vIdEstadoDocumento) {
        case '5':
            $("#liEvaluacion").addClass("active");
            nomDiasFaltanAtendidos = "Restan (días)";
            break;
        case '6':
            $("#liAtendidos").addClass("active");
            nomDiasFaltanAtendidos = "Atendido en (días)";
            break;
    }

    


    ConfigurarGrilla(600, 530);
    CargarGrilla();
    ColorCelda();

    jQuery("#" + grilla).jqGrid('setSelection', 1);

    if ($('#menuResponsivo').is(':visible')) $("#menuResponsivo").click();
    if ($('#style_selector_container').css('display') == 'none') $("#divSelectorDetalleDoc").click();

    $("#bttnBuscarDocumento").click(function () {
        CargarGrilla();
    });

    jqGridResponsive($(".jqGridConsul"));
    jQuery('#aRespuestaEvaluador').click(function (e) {
        PrepararRepuesta();
    });

    jQuery("#aFiltrarDocumentoAsignacion").click(function (e) {
        fn_MostrarFiltrarDocumentoPorFechas()

    });

    //$("#dialog_btnGuardarResEva").live("click", function (e) {


    //});

    //$("#txtFechaInicio,#txtFechaFin").datepicker({
    //    changeMonth: true,
    //    changeYear: true,
    //    // beforeShow: FechaSolicitud,
    //    dateFormat: "dd/mm/yy",
    //    firstDay: 1,
    //    changeFirstDay: false
    //});
    //$('#txtFechaInicio,#txtFechaFin').attr("placeholder", "dd/mm/yyyy");
    //$.validator.addMethod('date',
    //    function (value, element, params) {
    //        if (this.optional(element)) {
    //            return true;
    //        }
    //        var ok = true;
    //        try {
    //            $.datepicker.parseDate('dd/mm/yy', value);
    //        }
    //        catch (err) {
    //            ok = false;
    //        }
    //        return ok;
    //    });
});

function fn_MostrarFiltrarDocumentoPorFechas() {
    jQuery("#divMantenimiento").html('');
    jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/FiltrarDocumentosPorFecha", function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divMantenimiento');
        if (request.status != 200) return;
        $("#divMantenimiento").width('400');

    });

}


function IniciarFechas() {

    //txtFechaInicio
    //txtFechaFin
    var Fecha = new Date();
    var month = Fecha.getMonth() + 1;
    var day = Fecha.getDate();
    var FechaIni = "01/01/" + Fecha.getFullYear();
    var FechaFin = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + Fecha.getFullYear();
    $("#txtFechaInicio").val(FechaIni);
    $("#txtFechaFin").val(FechaFin);


}

function ConfigurarGrilla(ancho, alto) {
    $("#" + grilla).GridUnload();

    var colNames = ['Rec.', 'N°', 'TUPA', 'Expediente', 'Asunto', 'Asignado', 'Entregar el','Plazo (Días)', nomDiasFaltanAtendidos, 'Expediente Data', 'Origen', 'Destino', 'Documento', 'Grupo', 'ID_DOCUMENTO', 'ID_MOVIMIENTO_DOC', 'ID_ASIGNACION', 'ID_GESTOR_PERSONAL', 'ID_ESTADO_DOCUMENTO'];
    var colModels = [
    { name: 'FLG_RECEPCION', index: 'FLG_RECEPCION', align: 'center', width: 25, hidden: true, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
 //   { name: 'Responder', index: 'Responder', align: 'center', width: 100, sortable: false, formatter: actionButtonFormatter },
    { name: 'CODIGO', index: 'CODIGO', align: 'center', width: 25, hidden: true, key: true },
    { name: 'FLG_TUPA', index: 'FLG_TUPA', align: 'center', width: 75, hidden: true, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
    { name: 'NRO_EXPEDIENTE', index: 'NRO_EXPEDIENTE', align: 'center', width: 110, hidden: false },
    { name: 'DESCRIPCION_ASUNTO', index: 'DESCRIPCION_ASUNTO', align: 'left', width: 300, hidden: false },
    { name: 'FEC_ASIGNACION', index: 'FEC_ASIGNACION', align: 'center', formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 90, hidden: false },
    { name: 'FEC_ENTREGA', index: 'FEC_ENTREGA', align: 'center', formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 90, hidden: false },
    { name: 'NUM_DIAS_PLAZO', index: 'NUM_DIAS_PLAZO', align: 'center', width: 110, hidden: false },
    { name: 'QUEDAN_DIAS', index: 'QUEDAN_DIAS', align: 'center', width: 110, hidden: false, formatter: actionFormatterColor },
    { name: 'NRO_EXPEDIENTE_DATA', index: 'NRO_EXPEDIENTE_DATA', align: 'center', width: 75, hidden: true },
    { name: 'DESC_OFICINA_ORIGEN', index: 'DESC_OFICINA_ORIGEN', width: 250, hidden: true },
    { name: 'DESC_OFICINA_DESTINO', index: 'DESC_OFICINA_DESTINO', width: 250, hidden: true },
    { name: 'ID_DOCUMENTO', index: 'ID_DOCUMENTO', align: 'center', width: 75, hidden: true },
    { name: 'GRUPO_DOC', index: 'GRUPO_DOC', align: 'center', width: 150, hidden: true },
    { name: 'ID_DOCUMENTO', index: 'ID_DOCUMENTO', align: 'center', width: 75, hidden: true },
    { name: 'ID_MOVIMIENTO_DOC', index: 'ID_MOVIMIENTO_DOC', align: 'center', width: 75, hidden: true },
    { name: 'ID_ASIGNACION', index: 'ID_ASIGNACION', align: 'center', width: 75, hidden: true },
    { name: 'ID_GESTOR_PERSONAL', index: 'ID_GESTOR_PERSONAL', align: 'center', width: 75, hidden: true },
    { name: 'ID_ESTADO_DOCUMENTO', index: 'ID_ESTADO_DOCUMENTO', align: 'center', width: 75, hidden: true }

    ];

    var opciones = {
        GridLocal: true, multiselect: false, CellEdit: false, Editar: false, nuevo: false, eliminar: false, search: false, sort: 'DESC'

        , grouping: true, groupingCampo: 'GRUPO_DOC'

        , selectRowFunc: function () {
            ////ondblClickRow: function () {

            var rowKey = parseInt(jQuery("#" + grilla).getGridParam('selrow'));
            var data = jQuery("#" + grilla).jqGrid('getRowData', rowKey);
            posDoc = rowKey;

            var item = {
                ID_DOCUMENTO: data.ID_DOCUMENTO,
                ID_MOVIMIENTO_DOC: data.ID_MOVIMIENTO_DOC,
                ID_ASIGNACION: data.ID_ASIGNACION,
                ID_GESTOR_PERSONAL: data.ID_GESTOR_PERSONAL,
                ID_ESTADO_DOCUMENTO: data.ID_ESTADO_DOCUMENTO,
                NRO_EXPEDIENTE_DATA: data.NRO_EXPEDIENTE_DATA
            }
            //if ($("#IdEstadoDocumento").val()!="6") {
            $("#hdfID_DOCUMENTO").val(item.ID_DOCUMENTO);
            $("#hdfID_MOVIMIENTO_DOC").val(item.ID_MOVIMIENTO_DOC);
            $("#hdfID_ASIGNACION").val(item.ID_ASIGNACION);
            $("#hdfID_GESTOR_PERSONAL").val(item.ID_GESTOR_PERSONAL);
            $("#hdfID_ESTADO_DOCUMENTO").val(item.ID_ESTADO_DOCUMENTO);
            //$("#aRespuestaEvaluador").click();
            $('#lbDetalleNroExpediente').text(item.NRO_EXPEDIENTE_DATA);
            PrepararRepuesta();
            //}
        }
    };

    SITRADOC.Grilla(grilla, barra, '', alto, ancho, "", '', 'ID_DOCUMENTO', colNames, colModels, 'FEC_ASIGNACION', opciones);
    jqGridResponsive($(".jqGrid"));
}


function actionFormatterColor(cellvalue, options, rowObject) {
    var valorCelda = cellvalue;
    if (isNaN(valorCelda)) valorCelda = 0;
    var color = (valorCelda < 0) ? "red" : "blue";
    return '<span style="color:' +
       color + ';font-weight:bold;font-size:12px;">' + valorCelda + '</span>';

}
function actionButtonFormatter(cellvalue, options, rowObject) {

    var item = {
        ID_DOCUMENTO: rowObject.ID_DOCUMENTO,
        ID_MOVIMIENTO_DOC: rowObject.ID_MOVIMIENTO_DOC,
        ID_ASIGNACION: rowObject.ID_ASIGNACION,
        ID_GESTOR_PERSONAL: rowObject.ID_GESTOR_PERSONAL
    }
    var html = "<a id='aResponder'  data-toggle='modal' class='dropdown-toggle' href='#divMantenimiento' onclick='PrepararRepuesta(" + item.ID_DOCUMENTO + "," + item.ID_MOVIMIENTO_DOC + "," + item.ID_ASIGNACION + "," + item.ID_GESTOR_PERSONAL + ")' >";
    html += "<i class='clip-file' style='font-size:18px'></i><span class='dropdown-menu-title'>Editar</span>";
    html += "</a>";

    //var url = baseUrl + "Secretarial/Asignacion/Visor" + '?id=' + rowObject.ID_DOC_ADJUNTO + "&id_doc=" + id_documento + "&id_mov=" + id_mov + "&id_asig=" + id_asig;
    //var htmlInputModificar = "<a href=" + url + " target='_blank' id='btn-" + options.rowId + "' value='' onclick='verDocumento(" + options.rowId + ");'  title='Ver'><img alt='Ver' src='../../assets/css/images/notificaciones/ico_buscar.png' /></a>";

    return html;

}

//function PrepararRepuesta(ID_DOCUMENTO,ID_MOVIMIENTO_DOC,ID_ASIGNACION,ID_GESTOR_PERSONAL) {
function PrepararRepuesta() {

    var Item = {
        ID_DOCUMENTO: $("#hdfID_DOCUMENTO").val(),
        ID_MOVIMIENTO_DOC: $("#hdfID_MOVIMIENTO_DOC").val(),
        ID_ASIGNACION: $("#hdfID_ASIGNACION").val(),
        ID_GESTOR_PERSONAL: $("#hdfID_GESTOR_PERSONAL").val(),
        ID_ESTADO_DOCUMENTO: $("#hdfID_ESTADO_DOCUMENTO").val()
    };
    jQuery("#divDetalleDocumento").html('');

    var id_estado = $("#IdEstadoDocumento").val();
    jQuery("#divDetalleDocumento").load(baseUrl + "Secretarial/Asignacion/PrepararRespuesta", Item, function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divDetalleDocumento');
        if (request.status != 200) return;
        ConfigurarGrilla2();
        CargarGrilla2($("#hdfID_DOCUMENTO").val(), $("#hdfID_MOVIMIENTO_DOC").val(), $("#hdfID_ASIGNACION").val());
       
    });





    //SITRADOC.AgregarClass();

}

function GuardarRespuestaEvaluador() {
    //var id_estado = 0;
    if ($("#hdfID_ESTADO_DOCUMENTO").val() == 5) {
        id_estado = 6;
    } 
    var Item = {
        ID_DOCUMENTO: $("#hdfid_documento").val(),
        ID_MOVIMIENTO_DOC: $("#hdfid_movimiento_doc").val(),
        ID_ASIGNACION: $("#hdfid_asignacion").val(),
        ID_ESTADO_DOCUMENTO: id_estado, //$("#hdfID_ESTADO_DOCUMENTO").val(),
        OBS_RESPUESTA: $("#RESPUESTA").val(),
        FEC_RESPUESTA: $("#FECHA_RESPUESTA").val(),
        REFERENCIA: $("#REFERENCIA").val(),
        // FLG_ENVIAR_SECRETARIA: $("#chkEnviarSecretaria:checked").val() != undefined,
        FLG_TUPA: $("#hdfflg_tupa").val(),
        //NRO_EXPEDIENTE: $("#lbDetalleNroExpediente").html(),
        ID_SAIP_WEB: $("#hdfID_SAIP_WEB").val(),
        PER_EXTERNO: $("#hdfPER_EXTERNO").val(),
        DES_EMAIL_ADMINISTRADO: $("#hdfDES_EMAIL_ADMINISTRADO").val(),
        TELEFONO_ADMINISTRADO: $("#hdfTELEFONO_ADMINISTRADO").val(),
        NRO_DOCUMENTO_IDENTIDAD: $("#hdfNRO_DOCUMENTO_IDENTIDAD").val(),
        TIPO_ENTREGA: $("#hdfTIPO_ENTREGA").val(),
        ID_DOCUMENTO_IDENTIDAD: $("#hdfID_DOCUMENTO_IDENTIDAD").val(),
        DESC_OFICINA_DESTINO: $("#hdfDESC_OFICINA_DESTINO").val(),
        DIRECCION_ADMINISTRADO: $("#hdfDIRECCION_ADMINISTRADO").val(),
        FEC_ASIGNACION: $("#lblFechaAsig").html(),
        FEC_RESPUESTA: $("#FECHA_RESPUESTA").val(),
        DESCRIPCION_ASUNTO: $("#lblAsunto").html(),
        PER_INTERNO: $("#hdfPER_INTERNO").val(),
        ID_PERSONA_DESTINO: $("#hdfID_PERSONA_DESTINO").val(),
        REF_RESPUESTA: $("#REFERENCIA").val(),
        NRO_EXPEDIENTE: $("#lbDetalleNroExpediente").html(),
        NUM_DIAS_PLAZO: $("#NUM_DIAS_PLAZO").val(),
        FLG_TIPO_DIA: $("#FLG_TIPO_DIA").val(),
        MOTIVO_AMPLIACION: $("#MOTIVO_AMPLIACION").val()

    };
    // alert(Item);
    var url = baseUrl + 'Secretarial/Asignacion/Respuesta';
    var respuesta = SITRADOC.Ajax(url, Item, false);
    return respuesta.success;
}

function ColorCelda() {
    var vflg_tupa, vflg_congreso, vflg_confidencial, vval_color;
    var items = jQuery('#' + grilla).jqGrid('getRowData');

    for (var i = 0; i < items.length; i++) {
        vval_color = '#fff';

        vflg_tupa = items[i].FLG_TUPA;
        vflg_congreso = items[i].FLG_CONGRESO;
        vflg_confidencial = items[i].FLG_CONFIDENCIAL;


        if (vflg_tupa == '1') vval_color = '#EDFFE0';
        if (vflg_confidencial == '1') { vval_color = '#D6ECFD'; }
        if (vflg_congreso == '1') vval_color = '#FFEFCF';

        jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "GRUPO_DOC", "", { 'background-color': '#E1E1E1' });
        jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "NRO_EXPEDIENTE", "", { 'background-color': vval_color });



    }

}

function CargarGrilla() {
    


    var vval_color, vtxtDes = "";
    var item =
   {
       ID_ESTADO_DOCUMENTO: $("#IdEstadoDocumento").val(),
       CRITERIO: $('#inputBuscaDocumento').val() == '' ? "%" : $('#inputBuscaDocumento').val(),//,
       ID_GESTOR_OFICINA: $("#SelectOficina option:selected").val()
       //FECHA_INI: $("#txtFechaInicio").val(),
       //FECHA_FIN: $("#txtFechaFin").val()
   };
    var url = baseUrl + 'Secretarial/Asignacion/ListarAsignacion';
    var respuesta = SITRADOC.Ajax(url, item, false);
    var lv_CodigoDocumento = "";

    jQuery("#" + grilla).jqGrid('clearGridData', true).trigger("reloadGrid");
    if (respuesta != null && respuesta != "") {
        $.each(respuesta, function (i, v) {
            var id = i + 1;

            if (v.FLG_TUPA.toString() == '1') {
                vtxtDes = 'TUPA';
                vval_color = '#aec99b';
            } else {
                if (v.FLG_CONFIDENCIAL.toString() == '1') {
                    vtxtDes = 'CONFIDENCIAL'; vval_color = '#9fc1db';
                } else {
                    if (v.FLG_CONGRESO.toString() == '1') {
                        vtxtDes = 'CONGRESO'; vval_color = '#d6c093'
                    } else vtxtDes = "";
                }
            }

            if (v.CODIGO_DOCUMENTO != "") lv_CodigoDocumento = "<b style='color:green;font-weight:bold;'>" + v.CODIGO_DOCUMENTO + "</b>" + "\n"
            else lv_CodigoDocumento = v.CODIGO_DOCUMENTO + "\n"


            var myData =
             {
                 CODIGO: id,
                 ID_DOCUMENTO: v.ID_DOCUMENTO,
                 DESC_OFICINA_ORIGEN: v.DESC_OFICINA_ORIGEN,
                 DESC_OFICINA_DESTINO: v.DESC_OFICINA_DESTINO,
                 NRO_EXPEDIENTE: "<b style='color:#428BCA;font-weight:bold;font-size:14px; font-family:Arial'>" + v.NRO_EXPEDIENTE + "</b>" + "\n" +
                           "<b style='color:" + vval_color + ";font-weight:bold;font-size:10px; font-family:Arial'>" + vtxtDes + "</b>",
                 DESCRIPCION_ASUNTO: v.DESCRIPCION_ASUNTO,
                 DESCRIPCION_ASUNTO: lv_CodigoDocumento + v.DESCRIP_ID_ASUNTO + "\n" + v.DESCRIPCION_ASUNTO + "\n" + 'Remitente' + ': ' + v.DESC_OFICINA_ORIGEN,
                 GRUPO_DOC: v.GRUPO_DOC,
                 FEC_ASIGNACION: v.FEC_ASIGNACION,
                 FEC_ENTREGA: v.FEC_ENTREGA,
                 QUEDAN_DIAS: v.QUEDAN_DIAS,
                 NUM_DIAS_PLAZO: v.NUM_DIAS_PLAZO,
                 ID_DOCUMENTO: v.ID_DOCUMENTO,
                 ID_MOVIMIENTO_DOC: v.ID_MOVIMIENTO_DOC,
                 ID_ASIGNACION: v.ID_ASIGNACION,
                 ID_GESTOR_PERSONAL: v.ID_GESTOR_PERSONAL,
                 FLG_TUPA: v.FLG_TUPA,
                 ID_ESTADO_DOCUMENTO: v.ID_ESTADO_DOCUMENTO,
                 NRO_EXPEDIENTE_DATA: v.NRO_EXPEDIENTE
             };
            jQuery("#" + grilla).jqGrid('addRowData', id, myData);
            //jQuery('#' + grilla).jqGrid('setCell', i, "DESCRIPCION_ASUNTO", "", { background: '#598FF2', color: '#FFFFFF' });
        });
        jQuery("#" + grilla).trigger("reloadGrid");
    }
}