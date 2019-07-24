var grilla = 'listPrincipal';
var barra = 'barraConsulta';
var posDoc = '1';
var multiselectVal = true;
var boolMostrarDetalle = true;
var vIdDocumento;
var vIdMovimientoDoc;
var vIdOficina;
var vIdOficinaDocumento;
var IdEstDoc;
var IdDesDocumento;
var IdTipoSeleccion;
var vFiltroRangoFechas;
var vIdSaip;
var nomColDocRemitido;
var vNroExpediente;
var vIdProcedencia;

$(document).ready(function () {
    var menuResponsivo = $('#menuResponsivo').is(':visible');

    IdEstDoc = $('#IdEstadoDocumento').val();
    IdTipoSeleccion = $('#IdTipoSeleccion').val();
    IdDesDocumento = $('#IdDesEstadoDocumento').val();
    vFiltroRangoFechas = $('#hddnFiltroRangoFecha').val();

    $("#lbNombreMenuSecundario").text(IdDesDocumento + " " + vFiltroRangoFechas);

    RemoveClases()
    
    switch (IdTipoSeleccion) {
        case '1':
            $("#ulSubMenuTaip").css("display", "none");
            $("#liTramite").addClass("active open");
            $("#lbNombreMenuPrincipal").text("Bandeja Documentos");
            $("#iOpcionesMenu").addClass("clip-archive");
            MostrarDocumentos(IdEstDoc);
            $("#divVerHojaTramite").css("display", "block");
            break;
        case '2':
            $("#ulSubMenuBandeja").css("display", "none");
            $("#liTaip").addClass("active open");
            $("#lbNombreMenuPrincipal").text("SAIP");
            $("#iOpcionesMenu").addClass("clip-screen");
            $('#aNuevoDocumento').css("display", "none");
            $("#divTipoFiltroDoc").css("display", "none");

            
            if (IdEstDoc == "97" || IdEstDoc == "98") {
                $("#divVerHojaTramite").css("display", "none");
                MostrarDocumentosSaip(IdEstDoc);
            }

            else {
                $("#divVerHojaTramite").css("display", "block");
                //$("#liDocPendienteTaiP").addClass("active");
                fn_addClaseEstiloTAIP(IdEstDoc);
                nomColDocRemitido = "Remitente";
                MostrarDocumentos(IdEstDoc)
            }



            break;
    }
    jQuery("#" + grilla).jqGrid('setSelection', 1);
    jQuery("#" + grilla).jqGrid('hideCol', 'cb');
    jqGridResponsive($(".jqGridConsul"));

    if (menuResponsivo) $("#menuResponsivo").click();
    
    if ($('#style_selector_container').css('display') == 'none') $("#divSelectorDetalleDoc").click();

    jQuery('#aNuevoDocumento').click(function (e) {
        MantenimientoDocumento("Ingresar nuevo documento interno", 0)
    });


    jQuery('#aVerHojaTramite').click(function (e) {
        var ht = $('#URL_HOJATRAMITE').val();
        MostrarHojaTramite(ht);
    });
    

    jQuery('#aDerivarVariosDocumentos').click(function (e) {
        OpcionDocumento("derivar", "Derivar Documento", "DerivarDocumento", '980', '550', 180, 210);
    });

    jQuery('#aAsignarVariosDocumentos').click(function (e) {

        OpcionDocumento("asignar", "Asignar Documento", "AsignarDocumento", '830', '550', 180, 200);
    });

    jQuery('#aArchivarVariosDocumento').click(function (e) {

        OpcionDocumento("archivar", "Archivar Documento", "ArchivarDocumento", '750', '350', 180, 170);
    });
    
    $('#listTipoFiltroDoc').change(function () {
        fn_BuscarDocumento();

    });


    
    jQuery("#aFiltrarDocumentoBandeja").click(function (e) {
        fn_MostrarFiltrarDocumentoPorFechas()

    });




    jQuery("#bttnBuscarDocumento").click(function (e) {
        fn_BuscarDocumento();
        
    });

    function fn_BuscarDocumento() {
        CargarGrilla();
        ColorCelda();
        var rowCount = jQuery("#" + grilla).jqGrid('getGridParam', 'records');

        if (rowCount > 0) {
            jQuery("#" + grilla).jqGrid('setSelection', 1);
        } else {
            alert("No existen registro para mostrar");
        }

    }

    jQuery("#aMultipleSeleccion").click(function (e) {
        if (multiselectVal) {
            jQuery("#" + grilla).jqGrid('showCol', 'cb');

            $('#aOpcionPrincipales').css("visibility", "visible");
            $("#iSeleccionMultiple").removeClass("clip-grid-4");
            $("#iSeleccionMultiple").addClass("clip-undo");

            $('#lbSeleccionMultiple').text('Cancelar');
            // $('#divDetalleDocumento').css("visibility", "hidden");
           // $('#listadoDiv').width($('#tablaPendientes').width() - 10);
            //$('#' + grilla).setGridWidth($('#listadoDiv').width() - 10);
            if ($('#style_selector_container').css('display') != 'none')
            {
                $("#divSelectorDetalleDoc").click();
                $("#divSelectorDetalleDoc").css('display',"none") 
            }
            boolMostrarDetalle = false;
           
        } else {
            jQuery("#" + grilla).jqGrid('hideCol', 'cb');
            $('#aOpcionPrincipales').css("visibility", "hidden");
            $("#iSeleccionMultiple").removeClass("clip-undo");
            $("#iSeleccionMultiple").addClass("clip-grid-4");

            $('#lbSeleccionMultiple').text('Selección múltiple');
           // $('#divDetalleDocumento').css("visibility", "visible");
           // $('#listadoDiv').width(450);
            //$('#' + grilla).setGridWidth($('#listadoDiv').width() - 10);
            if ($('#style_selector_container').css('display') == 'none')
            {
                $("#divSelectorDetalleDoc").css('display', "block")
                $("#divSelectorDetalleDoc").click();
            }
            boolMostrarDetalle = true;
        }

        jqGridResponsive($(".jqGridConsul"));
        multiselectVal = !multiselectVal;

    });


    jQuery("#aExportarExcel").click(function (e) {
        fn_ExportarDataToExcel(grilla)

    });

});
//--------------------------
// Exportar la data a Excel
//--------------------------
function fn_ExportarDataToExcel(tableCtrl) {
    //  Export the data from our jqGrid into a "real" Excel 2007 file
    ExportJQGridDataToExcel(tableCtrl, "CustomerOrders.xlsx");
}
//--------------------------
function MostrarDocumentos(pEstDoc) {
    switch (pEstDoc) {
        case '1':
            $("#liDocPen").addClass("active");
            nomColDocRemitido = "Remitente";
            break;
        case '99':
            $("#liDocRem").addClass("active");
            nomColDocRemitido = "Remitido a";
            break;
        case '2':
            $("#liDocDer").addClass("active");
            nomColDocRemitido = "Remitido a";
            break;
        case '3':
            $("#liDocNot").addClass("active");
            nomColDocRemitido = "Remitido a";
            break;
        case '4':
            $("#liDocArc").addClass("active");
            nomColDocRemitido = "Remitente";
            break;
    }

    ConfigurarGrilla('500', '570');
    
    CargarGrilla();
    ColorCelda();
}
//--------------------------
function fn_addClaseEstiloTAIP(pEstDoc) {
    
    switch (pEstDoc) {
        case '97':
            $("#liDocSolicitadoTaiP").addClass("active");
            break;
        case '1':
            $("#liDocPendienteTaiP").addClass("active");
            break;
        case '99':
            $("#liDocRemitidoTaiP").addClass("active");
            break;
        case '2':
            $("#liDocDerivadoTaiP").addClass("active");
            break;
        case '3':
            $("#liDocNotificadoTaiP").addClass("active");
            break;
        case '4':
            $("#liDocArchivadoTaiP").addClass("active");
            break;
        case '98':
            $("#liDocAnuladoTaiP").addClass("active");
            break;
    }
}

function MostrarDocumentosSaip(pEstDoc) {

    fn_addClaseEstiloTAIP(pEstDoc);

    $('#aListaOpciones').css("display", "none");
    $('#aMultipleSeleccion').css("display", "none");

    
    ConfigurarGrillaSaip(500, 530)
    CargarGrillaSaip();
    ColorCeldaSaip();
}

function Cancelar() {
    ConfigurarGrilla();
    $('#divConsulta').show();
    $('#divProceso').html("");

}


function ConfigurarGrillaCorrelativo() {
    $("#" + grilla).GridUnload();
}


function ConfigurarGrilla(ancho, alto) {
    $("#" + grilla).GridUnload();
    var colNames = ['Rec.', 'Codigo', 'Expediente', 'Expediente Oculto', 'Asunto', 'ID Oficina Doc', 'Oficina', 'Grupo', 'Derivación', 'Recepción', 'Trámite', nomColDocRemitido, 'TUPA', 'TUPA', 'Congreso', 'Confidencial', 'IdAsunto', 'IdCliente', 'IdProcedencia', 'Documento', 'ID MOV DOC'];
    var colModels = [
    { name: 'FLG_RECEPCION', index: 'FLG_RECEPCION', align: 'center', width: 25, hidden: true, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
    { name: 'CODIGO', index: 'CODIGO', align: 'center', hidden: true, key: true },
    { name: 'NRO_EXPEDIENTE', index: 'NRO_EXPEDIENTE', align: 'center', width: 110, hidden: false },
    { name: 'NRO_EXPEDIENTE_DATA', index: 'NRO_EXPEDIENTE_DATA', align: 'center', width: 85, hidden: true },
    { name: 'DESCRIPCION_ASUNTO', index: 'DESCRIPCION_ASUNTO', align: 'left', width: 350, hidden: false },
    { name: 'ID_OFICINA_DOCUMENTO', index: 'ID_OFICINA_DOCUMENTO', align: 'center', width: 150, hidden: true },
    { name: 'ID_GESTOR_OFICINA', index: 'ID_GESTOR_OFICINA', align: 'center', width: 150, hidden: true },
    { name: 'GRUPO_DOC', index: 'GRUPO_DOC', align: 'center', width: 150, hidden: true },
    { name: 'FEC_DERIVACION', index: 'FEC_DERIVACION', align: 'center', formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 100, hidden: false },
    { name: 'FEC_RECEPCION', index: 'FEC_RECEPCION', align: 'center', formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 100, hidden: false },
    { name: 'FLG_ENVIADO_FISICO', index: 'FLG_ENVIADO_FISICO', align: 'center', width: 100, hidden: false, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
    { name: 'NOMBRE_CLIENTE', index: 'NOMBRE_CLIENTE', align: 'left', width: 350, hidden: false },
    { name: 'SIGLA_TUPA', index: 'SIGLA_TUPA', align: 'center', width: 100, hidden: false },
    { name: 'FLG_TUPA', index: 'FLG_TUPA', align: 'center', width: 100, hidden: false, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
    { name: 'FLG_CONGRESO', index: 'FLG_CONGRESO', align: 'center', width: 100, hidden: false, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
    { name: 'FLG_CONFIDENCIAL', index: 'FLG_CONFIDENCIAL', align: 'center', width: 100, hidden: false, edittype: 'checkbox', formatter: 'checkbox', editoptions: { value: "1:0" } },
    { name: 'DESCRIP_ID_ASUNTO', index: 'DESCRIP_ID_ASUNTO', align: 'left', width: 200, hidden: false },
    { name: 'ID_CLIENTE', index: 'ID_CLIENTE', align: 'left', width: 200, hidden: false },
    { name: 'ID_PROCEDENCIA', index: 'ID_PROCEDENCIA', align: 'left', width: 200, hidden: true },
    { name: 'ID_DOCUMENTO', index: 'ID_DOCUMENTO', align: 'center', width: 75, hidden: false},
    { name: 'ID_MOVIMIENTO_DOC', index: 'ID_MOVIMIENTO_DOC', align: 'center', width: 75, hidden: false}
    ];
    var opciones = {
        GridLocal: true, multiselect: true, CellEdit: false, Editar: false, nuevo: false,
        eliminar: false, search: false, sort: 'desc', grouping: true, groupingCampo: 'GRUPO_DOC', 
        rowNumber: 100, rowNumbers: [150, 200, 250, 300],

        selectRowFunc: function () {

            var rowKey = parseInt(jQuery("#" + grilla).getGridParam('selrow'));
            var data = jQuery("#" + grilla).jqGrid('getRowData', rowKey);
            
            posDoc = rowKey;
            if (boolMostrarDetalle) {
                vIdDocumento = data.ID_DOCUMENTO;
                vIdMovimientoDoc = data.ID_MOVIMIENTO_DOC;
                vIdOficina = data.ID_GESTOR_OFICINA;
                vIdOficinaDocumento = data.ID_OFICINA_DOCUMENTO;
                vNroExpediente = data.NRO_EXPEDIENTE_DATA;
                vIdProcedencia = data.ID_PROCEDENCIA;
                $('#lbDetalleNroExpediente').text(vNroExpediente);
                DetalleDocumento("Detalle Documento", vIdDocumento, vIdMovimientoDoc);
            }

        }
    };

    SITRADOC.Grilla(grilla, barra, '', alto, ancho, "Listado de Expedientes", '', 'FEC_DERIVACION', colNames, colModels, 'FEC_DERIVACION', opciones);
    jqGridResponsive($(".jqGridConsul"));
    
}

function ConfigurarGrillaSaip(ancho, alto) {
    $("#" + grilla).GridUnload();
    var colNames = ['Codigo', 'Expediente', ' Expediente oculto', 'ID Cliente', 'Información solicitada', 'Id Oficina', 'Grupo', 'Solicita', 'Entrega', 'Administrado', 'Oficina', 'Correo', 'Telefono', 'Direccion', 'Id SAIP'];
    var colModels = [
        { name: 'CODIGO', index: 'CODIGO', align: 'center', hidden: true, key: true },
        { name: 'NRO_EXPEDIENTE', index: 'NRO_EXPEDIENTE', align: 'center', width: 110, hidden: false },
        { name: 'NRO_EXPEDIENTE_DATA', index: 'NRO_EXPEDIENTE_DATA', align: 'center', width: 85, hidden: true },
        { name: 'ID_CLIENTE', index: 'ID_CLIENTE', align: 'center', width: 75, hidden: true },
        { name: 'INFORMACION_SOLICITADA', index: 'INFORMACION_SOLICITADA', align: 'left', width: 350, hidden: false },
        { name: 'ID_GESTOR_OFICINA', index: 'ID_GESTOR_OFICINA', align: 'center', width: 150, hidden: true },
        { name: 'GRUPO_DOC', index: 'GRUPO_DOC', align: 'center', width: 150, hidden: false },
        { name: 'FEC_SOLICITUD', index: 'FEC_SOLICITUD', align: 'center', formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 100, hidden: false },
        { name: 'FECHA_LIMIT_ATENCION_SOLICITUD', index: 'FECHA_LIMIT_ATENCION_SOLICITUD', align: 'center', formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 100, hidden: false },
        { name: 'DES_ADMINISTRADO', index: 'DES_ADMINISTRADO', align: 'left', width: 350, hidden: true },
        { name: 'DES_OFICINA', index: 'DES_OFICINA', align: 'left', width: 200, hidden: true },
        { name: 'DES_EMAIL_ADMINISTRADO', index: 'DES_EMAIL_ADMINISTRADO', align: 'left', width: 200, hidden: false },
        { name: 'TELEFONO_ADMINISTRADO', index: 'TELEFONO_ADMINISTRADO', align: 'left', width: 200, hidden: false },
        { name: 'DIRECCION_ADMINISTRADO', index: 'DIRECCION_ADMINISTRADO', align: 'left', width: 200, hidden: false },
        { name: 'ID_SAIP_WEB', index: 'ID_SAIP_WEB', align: 'center', width: 75, hidden: false }
    ];
    var opciones = {
        GridLocal: true, multiselect: multiselectVal, CellEdit: false, Editar: false, nuevo: false,
        eliminar: false, search: false, sort: 'desc',  grouping: true, groupingCampo: 'GRUPO_DOC',

        selectRowFunc: function () {

            var rowKey = parseInt(jQuery("#" + grilla).getGridParam('selrow'));
            var data = jQuery("#" + grilla).jqGrid('getRowData', rowKey);

            posDoc = rowKey;
            if (boolMostrarDetalle) {
                vIdSaip = data.ID_SAIP_WEB;
                //vNroExpediente = data.NRO_EXPEDIENTE;
                vNroExpediente = data.NRO_EXPEDIENTE_DATA
                DetalleDocumentoSaip(vIdSaip);
                $('#lbDetalleNroExpediente').text(vNroExpediente);
                //MostrarHojaTramite(vNroExpediente);
            }

        }
    };

    SITRADOC.Grilla(grilla, barra, '', alto, ancho, "", '', 'ID_SAIP_WEB', colNames, colModels, 'FEC_SOLICITUD', opciones);
}

function ColorCeldaSaip() {
    var items = jQuery('#' + grilla).jqGrid('getRowData');

    for (var i = 0; i < items.length; i++) {

        jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "GRUPO_DOC", "", { background: '#E1E1E1' });

       jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "NRO_EXPEDIENTE", "", { 'background-color': '#EDFFE0' });
    }
}


function actionFormatterColor(cellvalue, options, rowObject)
{
    var valorCelda = cellvalue;
    alert(valorCelda);
    //if (isNaN(valorCelda)) valorCelda = '0';
    var color = (valorCelda == '1') ? "#fff" : "#EDFFE0";
    return '<span class="cellWithoutBackground" style="background-color:' +
    color + ';">' + valorCelda + '</span>';
}

function ColorCelda() {
    var opcionCol, vflg_tupa, vflg_congreso, vflg_confidencial, vval_color;
    var items = jQuery('#' + grilla).jqGrid('getRowData');

    for (var i = 0; i < items.length; i++) {
        vval_color = '#fff';
        opcionCol = items[i].FLG_RECEPCION;

        vflg_tupa = items[i].FLG_TUPA;
        vflg_congreso = items[i].FLG_CONGRESO;
        vflg_confidencial = items[i].FLG_CONFIDENCIAL;


        if (vflg_tupa == '1') vval_color = '#EDFFE0';
        if (vflg_confidencial == '1') { vval_color = '#D6ECFD'; }
        if (vflg_congreso == '1') vval_color = '#FFEFCF';
        
        jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "GRUPO_DOC", "", { background: '#E1E1E1' });

        jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "NRO_EXPEDIENTE", "", { 'background-color': vval_color });
        
        if (opcionCol == '0' && IdEstDoc == 1 ) {
            jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "DESCRIPCION_ASUNTO", "", { color: '#fa0909', 'font-weight':'bold' });
            jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "NRO_EXPEDIENTE", "", { color: '#fa0909', 'font-weight': 'bold' });
            jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "FLG_ENVIADO_FISICO", "", { color: '#fa0909' });
            jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "ID_GESTOR_OFICINA", "", { color: '#fa0909' });
            jQuery('#' + grilla).jqGrid('setCell', items[i].CODIGO, "FEC_REGISTRO", "", { color: '#fa0909' });

        }

    }

}


function CargarGrilla() {
    var vval_color, vtxtDes = "";
    var flg_saip="0";
    

    if (IdTipoSeleccion == 2 ) flg_saip = "1"
    
    var item =
   {
       NRO_EXPEDIENTE: $('#inputBuscaDocumento').val(),
       ID_ESTADO_DOCUMENTO: $('#IdEstadoDocumento').val(),
       ID_GESTOR_OFICINA: $('#inpuntHddIdOficina').val(),
       TIPO_FILTRO: $("#listTipoFiltroDoc option:selected").val(),
       FLG_SAIP: flg_saip
   };

    var url = baseUrl + 'Secretarial/Documento/ListarDocumento';
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
                 NRO_EXPEDIENTE_DATA: v.NRO_EXPEDIENTE,
                 NRO_EXPEDIENTE: "<b style='color:#428BCA;font-weight:bold;font-size:14px; font-family:Arial'>" + v.NRO_EXPEDIENTE + "</b>" + "\n" +
                                 "<b style='color:" + vval_color + ";font-weight:bold;font-size:10px; font-family:Arial'>" + vtxtDes + "</b>",
                 ID_MOVIMIENTO_DOC: v.ID_MOVIMIENTO_DOC,
                 DESCRIPCION_ASUNTO: lv_CodigoDocumento + v.DESCRIP_ID_ASUNTO + "\n" + v.DESCRIPCION_ASUNTO + "\n" + nomColDocRemitido + ': ' + v.NOMBRE_CLIENTE,
                 FLG_ENVIADO_FISICO: v.FLG_ENVIADO_FISICO,
                 ID_GESTOR_OFICINA: v.ID_GESTOR_OFICINA,
                 FEC_REGISTRO: v.FEC_REGISTRO,
                 SIGLA_TUPA: v.SIGLA_TUPA,
                 GRUPO_DOC: v.GRUPO_DOC,
                 ID_PROCEDENCIA: v.ID_PROCEDENCIA,
                 FEC_RECEPCION: v.FEC_RECEPCION,
                 FLG_RECEPCION: v.FLG_RECEPCION,
                 FEC_DERIVACION: v.FEC_DERIVACION,
                 ID_OFICINA_DOCUMENTO: v.ID_OFICINA_DOCUMENTO,
                 NOMBRE_CLIENTE: v.NOMBRE_CLIENTE,
                 ID_CLIENTE: v.ID_CLIENTE,
                 DESCRIP_ID_ASUNTO: v.DESCRIP_ID_ASUNTO,
                 FLG_TUPA: v.FLG_TUPA,
                 FLG_CONGRESO: v.FLG_CONGRESO,
                 FLG_CONFIDENCIAL: v.FLG_CONFIDENCIAL
             };

            jQuery("#" + grilla).jqGrid('addRowData', id, myData);

        });
        jQuery("#" + grilla).trigger("reloadGrid");
    }
    else {
        DetalleDocumento("No existen datos para mostrar", "0", "0");
        //alert("No existen registros que mostrar");
    }
}

function CargarGrillaSaip() {
    var voficina = "";
    var respuestaOficina = "";
    var respuestaCliente = "";

    var item =
   {
       NRO_EXPEDIENTE: $('#inputBuscaDocumento').val(),
       ID_SITUACION: $('#IdEstadoDocumento').val()
   };

    var url = baseUrl + 'Secretarial/Documento/ListarDocumentoSaip';
    var respuesta = SITRADOC.Ajax(url, item, false);
    jQuery("#" + grilla).jqGrid('clearGridData', true).trigger("reloadGrid");
    if (respuesta != null && respuesta != "") {

        $.each(respuesta, function (i, v) {
            var id = i + 1;

            if (v.SIGLA_OFICINA.toString().trim() != "") { voficina = "Remitido a: "; respuestaOficina = ""; }
            else { voficina = ""; respuestaOficina = "<b style='color:red;font-weight:bold;'>No conoce la Oficina.</b>"; }

            if (v.ID_CLIENTE.toString().trim() == "0") respuestaCliente = "\n<b style='color:red;font-weight:bold;'> - Administrado no registrado en el SIMEM.</b>";
            else respuestaCliente = "";

            var myData =
             {
                 CODIGO: id,
                 ID_SAIP_WEB: v.ID_SAIP_WEB,
                 NRO_EXPEDIENTE: "<b style='color:#428BCA;font-weight:bold;font-size:14px; font-family:Arial'>" + v.NRO_EXPEDIENTE + "</b>",
                 ID_CLIENTE: v.ID_CLIENTE,
                 INFORMACION_SOLICITADA: 'Administrado: ' + "<b style='font-weight:bold;'>"
                                          + v.DES_ADMINISTRADO.toString().trim() + "</b>" + respuestaCliente + "\n" + v.INFORMACION_SOLICITADA.toString().trim() + "\n",
                 NRO_EXPEDIENTE_DATA: v.NRO_EXPEDIENTE,
                 ID_GESTOR_OFICINA: v.ID_GESTOR_OFICINA,
                 DES_OFICINA: v.DES_OFICINA,
                 GRUPO_DOC: v.GRUPO_DOC,
                 SIGLA_OFICINA: v.SIGLA_OFICINA,
                 ID_DOCUMENTO_IDENTIDAD: v.ID_DOCUMENTO_IDENTIDAD,
                 NRO_DOCUMENTO_IDENTIDAD: v.NRO_DOCUMENTO_IDENTIDAD,
                 DES_EMAIL_ADMINISTRADO: v.DES_EMAIL_ADMINISTRADO,
                 TELEFONO_ADMINISTRADO: v.TELEFONO_ADMINISTRADO,
                 DIRECCION_ADMINISTRADO: v.DIRECCION_ADMINISTRADO,
                 FECHA_LIMIT_ATENCION_SOLICITUD: v.FECHA_LIMIT_ATENCION_SOLICITUD,
                 FEC_SOLICITUD: v.FEC_SOLICITUD,
                 DES_ADMINISTRADO: v.DES_ADMINISTRADO
             };

            jQuery("#" + grilla).jqGrid('addRowData', id, myData);

        });
        jQuery("#" + grilla).trigger("reloadGrid");
    } else {
        DetalleDocumentoSaip("0");
    }
}

function MostrarSelectorDetalle(valor)
{
    $('#style_selector_container').css('display', valor);
    $('#divDetalleDocumento').css('display', valor);
    $('#divVerHojaTramite').css('display', valor);
 

}

function CargarGrillaAsignarDocumento(grillaDetalleAsignarDoc) {
    var item =
{
    ID_DOCUMENTO: vIdDocumento,
    ID_MOVIMIENTO_DOC: vIdMovimientoDoc
};
    
    var url = baseUrl + 'Secretarial/Documento/ListarDocumentoAsignados';
    var respuesta = SITRADOC.Ajax(url, item, false);
    jQuery("#" + grillaDetalleAsignarDoc).jqGrid('clearGridData', true).trigger("reloadGrid");
    if (respuesta != null && respuesta != "") {
        
        $.each(respuesta, function (i, v) {
            var id = i + 1;

            var myData =
             {
                 CODIGO: id,
                 ID_DOCUMENTO: v.ID_DOCUMENTO,
                 ID_MOVIMIENTO_DOC: v.ID_MOVIMIENTO_DOC,
                 ID_ASIGNACION : v.ID_ASIGNACION,
                 FLG_CONFIDENCIAL: v.FLG_CONFIDENCIAL,
                 ID_GESTOR_PERSONAL: v.ID_GESTOR_PERSONAL,
                 ID_ESTADO_DOCUMENTO: v.ID_ESTADO_DOCUMENTO,
                 DES_PERSONAL: v.DES_PERSONAL,
                 NRO_MAIL_ENVIADOS: v.NRO_MAIL_ENVIADOS,
                 FEC_ASIGNACION: v.FEC_ASIGNACION,
                 NUM_DIAS_PLAZO: v.NUM_DIAS_PLAZO,
                 FLG_TIPO_DIA: v.FLG_TIPO_DIA,
                 FEC_ENTREGA: v.FEC_ENTREGA,
                 OBSERVACIONES: v.OBSERVACIONES
             };

            jQuery("#" + grillaDetalleAsignarDoc).jqGrid('addRowData', id, myData);

        });
        jQuery("#" + grillaDetalleAsignarDoc).trigger("reloadGrid");
    } 
}

function cargarGrillaDocumentosSeleccionados() {

    var rowKey = jQuery("#" + grilla).jqGrid('getGridParam', 'selarrrow')
    
    var itemsSeleccionados = rowKey.length;
    if (itemsSeleccionados != "0" && itemsSeleccionados != undefined) {

        for (var i = 0; i < rowKey.length; i++) {
            var dataDocumento = $("#" + grilla).jqGrid('getRowData', rowKey[i]);
            var id = i + 1;
            var myData = {
                CODIGO: id,
                ID_DOCUMENTO: dataDocumento.ID_DOCUMENTO,
                ID_MOVIMIENTO_DOC: dataDocumento.ID_MOVIMIENTO_DOC,
                NRO_EXPEDIENTE: dataDocumento.NRO_EXPEDIENTE,
                NRO_EXPEDIENTE_DATA: dataDocumento.NRO_EXPEDIENTE_DATA
            };
            jQuery("#tablaDocumentoSeleccionado").jqGrid('addRowData', id, myData);
        }
        jQuery("#tablaDocumentoSeleccionado").trigger("reloadGrid");
        
    } 
    ///Poner el check a todos los documentos
    jQuery("#tablaDocumentoSeleccionado").jqGrid('resetSelection');
    var ids = jQuery("#tablaDocumentoSeleccionado").getDataIDs();
    for (var i = 0, il = ids.length; i < il; i++) {
        jQuery("#tablaDocumentoSeleccionado").jqGrid('setSelection', ids[i], true);
    }

}

function fn_MostrarObservacionesAdjuntarDocInterno() {
    
    var vObsExpediente="";
    var rowKey = jQuery("#tablaDocumentoSeleccionado" ).jqGrid('getGridParam', 'selarrrow')
    
    var itemsSeleccionados = rowKey.length;
    if (itemsSeleccionados != "0" && itemsSeleccionados != undefined) {

        vObsExpediente = rowKey.length > 1 ? "Este documento es adjuntado a los Expedientes: " : "Este documento es adjuntado al Expediente: ";

        for (var i = 0; i < rowKey.length; i++) {
            var dataDocumento = $("#tablaDocumentoSeleccionado").jqGrid('getRowData', rowKey[i]);

            vObsExpediente = vObsExpediente + dataDocumento.NRO_EXPEDIENTE_DATA + ", ";
        }
        vObsExpediente = vObsExpediente.substring(0, vObsExpediente.length - 2);

        $("#lbObsAdjuntoDocInterno").text(vObsExpediente);
    }
}

function CargarGrillaBuscarCliente() {
    var item =
{
    DESCRIPCION: $('#inputDesClienteBusca').val()

};

    var url = baseUrl + 'Secretarial/Documento/ListarCliente';
    var respuesta = SITRADOC.Ajax(url, item, false);
    jQuery("#grillaBuscarCliente").jqGrid('clearGridData', true).trigger("reloadGrid");
    if (respuesta != null && respuesta != "") {

        $.each(respuesta, function (i, v) {
            var id = i + 1;

            var myData =
             {
                 ID_CLIENTE: v.ID_CLIENTE,
                 DESCRIPCION: v.DESCRIPCION,
                 NRO_DOCUMENTO: v.NRO_DOCUMENTO
             };

            jQuery("#grillaBuscarCliente").jqGrid('addRowData', id, myData);

        });
        jQuery("#grillaBuscarCliente").trigger("reloadGrid");
    }
}

function CargarGrillaBuscarUbigeo() {
    var item =
{
    DESCRIPCION: $('#inputDesUbigeoBusca').val()

};

    var url = baseUrl + 'Secretarial/Documento/ListarUbigeo';
    var respuesta = SITRADOC.Ajax(url, item, false);
    jQuery("#grillaBuscarUbigeo").jqGrid('clearGridData', true).trigger("reloadGrid");
    if (respuesta != null && respuesta != "") {

        $.each(respuesta, function (i, v) {
            var id = i + 1;

            var myData =
             {
                 ID_UBIGEO_INEI: v.ID_UBIGEO_INEI,
                 DEPARTAMENTO: v.DEPARTAMENTO,
                 PROVINCIA: v.PROVINCIA,
                 DISTRITO: v.DISTRITO
             };
            jQuery("#grillaBuscarUbigeo").jqGrid('addRowData', id, myData);
        });
        jQuery("#grillaBuscarUbigeo").trigger("reloadGrid");
    }
}

/*
jQuery("#CheckBoxRecepcionFisico").live("click",function (e) {
    var check = this.checked ? '1' : '0';
    
    var Mensaje = check == "0" ? "Desea quitar el Check de recibido conforme!" : "Recibir documento físico conforme!";

    SITRADOC.confirm(Mensaje, function () {
        RecibirDocumentoDerivado(check);
    }, function () {
        this.prop('checked', false).change();
        alert('Yauyo');
        $("#CheckBoxRecepcionFisico").attr('checked', true);

        return false;
    }, "Atención", "es");

});
*/
function RecibirDocumentoDerivado(check) {
    var entidad = new Object();
    var url;
    var respuesta;

    entidad.ID_DOCUMENTO = vIdDocumento;
    entidad.ID_MOVIMIENTO_DOC = vIdMovimientoDoc;
    entidad.ID_GESTOR_OFICINA = vIdOficina;
    entidad.ID_OFICINA_DOCUMENTO = vIdOficinaDocumento;
    entidad.FLG_CHECK = check;


    url = baseUrl + 'Secretarial/Documento/RecibirDocumentoDerivado';
    respuesta = SITRADOC.Ajax(url, entidad, false);

    //jQuery('#Numero').val(respuesta.extra);
    //SITRADOC.msgConfirm(respuesta.success, respuesta.message, function () { alert('Cancelado'); });
    //$(".msgModel").addClass("mostraPanalMensaje");
    if (respuesta.message != "") {
        jQuery('#' + grilla).jqGrid('setCell', posDoc, "DESCRIPCION_ASUNTO", "", { color: '#000000', 'font-weight': 'normal' });
        jQuery('#' + grilla).jqGrid('setCell', posDoc, "NRO_EXPEDIENTE", "", { color: '#000000', 'font-weight': 'normal' });
        
        //SITRADOC.Alert('Atención', respuesta.message);
    } else {
        jQuery('#' + grilla).jqGrid('setCell', posDoc, "DESCRIPCION_ASUNTO", "", { color: '#fa0909', 'font-weight': 'bold' });
        jQuery('#' + grilla).jqGrid('setCell', posDoc, "NRO_EXPEDIENTE", "", { color: '#fa0909', 'font-weight': 'bold' });
    }
    
    if (respuesta.cantidad > 0) {
        $('#spanDocPenRecibir').css("visibility", "visible");
        $('#lbDocPendientes').text(respuesta.cantidad);
    } else {
        $('#spanDocPenRecibir').css("visibility", "hidden");
    }
    

    DetalleDocumento("Detalle Documento", vIdDocumento, vIdMovimientoDoc)
}




function DetalleDocumento(Titulo, idDoc, idMov) {
    jQuery("#divDetalleDocumento").html('');
    //SITRADOC.Alert('Atención', Titulo +' - ' +id);
    //var cadena = JSON.stringify(item);
    if(idDoc=='0' && idMov=='0'){
        jQuery("#divDetalleDocumento").html('');
    }
    else {
        var Mensaje = idDoc == 0 ? "Desea guardar los datos" : "Desea modificar los datos ingresados";
        jQuery("#divDetalleDocumento").load(baseUrl + "Secretarial/Documento/DetalleDocumento?idDoc=" + idDoc + "&idMov=" + idMov, function (responseText, textStatus, request) {
            $.validator.unobtrusive.parse('#divDetalleDocumento');
            if (request.status != 200) return;
            if ($('#FLG_ASIGNADO').val() == '1') {
                $('#divDetalleAsignacionDocumento').css("visibility", "visible");
                ConfigurarGrillaAsignarDocumento('tablaDetalleAsignarDocumentoDet', 'divbarraDetalleAsignarDocumentoDet','', 750, 65);
                CargarGrillaAsignarDocumento('tablaDetalleAsignarDocumentoDet');
            } else {
                $('#divDetalleAsignacionDocumento').css("visibility", "hidden");
            }
        });
    }
}




function ValidarDocumentoIdentidad(pUrlValidar) {
    page = pUrlValidar;
    $("#divValidarDocumento")
               .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
                    autoOpen: true,
                    modal: true,
                    height: 550,
                    width: 700,
                    beforeClose: function (e, ui) { $(this).dialog('destroy').empty(); },
                    title: "Validar Documento",
                    buttons: [{
                        id: 'dialog_btnAceptar',
                        text: "Aceptar",
                        class: 'btn btn-primary',
                        click: function () {
                            $(this).dialog("close");
                        }
                    }]
         });
    $("#divValidarDocumento").dialog('open');
}


function DetalleDocumentoSaip(idSaip) {
    jQuery("#divDetalleDocumento").html('');
    if (idSaip == '0') {
        jQuery("#divDetalleDocumento").html('');
    } else {
        jQuery("#divDetalleDocumento").load(baseUrl + "Secretarial/Documento/DetalleDocumentoSaip?idSaip=" + idSaip, function (responseText, textStatus, request) {
            $.validator.unobtrusive.parse('#divDetalleDocumento');
            if (request.status != 200) return;

        });
    }
}



function RechazarDocumentoSaip(pAncho, pAlto, pIdSaip) {
    jQuery("#divMantenimiento").html('');
    //SITRADOC.Alert('Atención', Titulo +' - ' +id);
    //var cadena = JSON.stringify(item);
    //var Mensaje = id == 0 ? "Desea guardar los datos" : "Desea modificar los datos ingresados";
    jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/RechazarSaip?idSaip=" + pIdSaip, function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divMantenimiento');
        if (request.status != 200) return;

        $("#divMantenimiento").width(pAncho);
        //$("#divMantenimiento").height(pAlto)
        
    });
}

function ValidarDocumentoSaip(pAncho, pAlto, pIdSaip) {
    jQuery("#divMantenimiento").html('');
    //SITRADOC.Alert('Atención', Titulo +' - ' +id);
    //var cadena = JSON.stringify(item);
    //var Mensaje = id == 0 ? "Desea guardar los datos" : "Desea modificar los datos ingresados";
    jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/ValidarAdministradoSaip?idSaip=" + pIdSaip, function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divMantenimiento');
        if (request.status != 200) return;

        $("#divMantenimiento").width(pAncho);
        //$("#divMantenimiento").height(pAlto)
        
    });
}


function MantenimientoDocumentoSaip( pAncho, pLargo, pIdSaip) {
    jQuery("#divMantenimiento").html('');
    //SITRADOC.Alert('Atención', Titulo +' - ' +id);
    //var cadena = JSON.stringify(item);
    //var Mensaje = id == 0 ? "Desea guardar los datos" : "Desea modificar los datos ingresados";
    jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/AprobarSolicitudDocumentoSaip?idSaip=" + pIdSaip, function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divMantenimiento');
        if (request.status != 200) return;

        $("#divMantenimiento").width(pAncho);
        ConfigurarGrillaDetalleDerivacion(750, 80);
        //$('#divMantenimiento').modal('show');
        
    });
}

function fn_MostrarFiltrarDocumentoPorFechas() {
    jQuery("#divMantenimiento").html('');
    jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/FiltrarDocumentosPorFecha", function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divMantenimiento');
        if (request.status != 200) return;
        $("#divMantenimiento").width('400');

    });

}

function MantenimientoAdjuntarDocInterno() {
    jQuery("#divAdjuntarDocInterno").html('');
    jQuery("#divAdjuntarDocInterno").load(baseUrl + "Secretarial/Documento/AdjuntaDocInternoDerivacion", function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divAdjuntarDocInterno');
        if (request.status != 200) return;
        $("#divAdjuntarDocInterno").width('740');
        fn_MostrarObservacionesAdjuntarDocInterno();
        $('#divAdjuntarDocInterno').modal('show');
        
    });

}

function MantenimientoDocumento(Titulo, id) {
    jQuery("#divMantenimiento").html('');
    //SITRADOC.Alert('Atención', Titulo +' - ' +id);
    //var cadena = JSON.stringify(item);
    var Mensaje = id == 0 ? "Desea guardar los datos" : "Desea modificar los datos ingresados";
    jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/NuevoDocumentoInterno", function (responseText, textStatus, request) {
        $.validator.unobtrusive.parse('#divMantenimiento');
        if (request.status != 200) return;

        $("#divMantenimiento").width('780');
        ConfigurarGrillaDetalleDerivacion(740, 100);

    });
    
}


function GrabarNuevoDcumento()
{
    
    if ($("#frmMantenimientoDocumento").valid()) {
        if (VerificarDerivacionExpediente() == 1) {
            grabarNuevoDocumento();
            CargarGrilla();
            jQuery("#" + grilla).jqGrid('setSelection', posDoc);
            //$("#divMantenimiento").modal("close");
            
            $('#panel-config').modal('hide');
            
        }
    }
}

function GrabarDocumentoArchivado(vIdOficinaDocumento) {
    if ($("#frmArchivarDocumento").valid()) {
        if (grabarAsigDerivArchiDocumento("archivar", vIdOficinaDocumento)) {
            ActualizarDatosADA();
            
        }
    }
}

function GrabarDocumentoDerivado(vIdOficinaDocumento) {
    if ($("#frmDerivarDocumento").valid()) {
        if (grabarAsigDerivArchiDocumento("derivar", vIdOficinaDocumento)) {
            ActualizarDatosADA();

        }
    }
}

function GrabarDocumentoAsignado() {
    ActualizarDatosADA();
}

function ActualizarDatosADA() {
    CargarGrilla();
    ColorCelda()
    jQuery("#" + grilla).jqGrid('setSelection', posDoc);
    $('#panel-config').modal('hide');
}


function VerificarDerivacionExpediente()
{
    var grid = $("#tableDetalleNuevoDocumento");
    var ids = grid.getDataIDs();

    if (ids.length <= 0) {
        //$('#myModal2Alert').modal('toggle');
        //$('#lbMensajeAlertaGeneral').text('Necesita ingresar a quien deriva el Expediente!');
        SITRADOC.Alert('Atención', "Necesita ingresar a quien deriva el Expediente!");
        return 0;
    }

    return 1
}



function OpcionDocumento(vOpcion, vTitulo, vFormulario, vAncho, vAlto, vAnchoGrilla, vAltoGrilla, vIdOficina) {
    var vObsExpediente;
    var vIdCliente;
    var vFlgTupa;
    var rowKey = jQuery("#" + grilla).jqGrid('getGridParam', 'selarrrow')
    
    var itemsSeleccionados = rowKey.length;

    if (itemsSeleccionados != "0" && itemsSeleccionados != undefined) {

        if (vOpcion == "notificar") {
            
            for (var i = 0; i < rowKey.length; i++) {
                var dataDocumento = $("#" + grilla).jqGrid('getRowData', rowKey[i]);
                
                vObsExpediente = dataDocumento.NRO_EXPEDIENTE_DATA;
                vIdCliente = dataDocumento.ID_CLIENTE;
                vFlgTupa = dataDocumento.FLG_TUPA;
                vFormulario += "?IdNroExpediente=" + vObsExpediente + "&IdCliente=" + vIdCliente + "&FlgTupa=" + vFlgTupa;
            }
        }

        jQuery("#divMantenimiento").html('');
        jQuery("#divMantenimiento").load(baseUrl + "Secretarial/Documento/" + vFormulario, function (responseText, textStatus, request) {
          
            $.validator.unobtrusive.parse('#divMantenimiento');
            if (request.status != 200) return;


            $("#divMantenimiento").width(vAncho);

            if (vOpcion != "notificar") {
                ConfigurarGrillaDocumentoSeleccionado(vAnchoGrilla, vAltoGrilla);
                cargarGrillaDocumentosSeleccionados()
                switch (vOpcion) {
                    case "derivar":
                        ConfigurarGrillaDetalleDerivacion(750, 130);
                        break;
                    case "asignar":
                        ConfigurarGrillaAsignarDocumento('tablaDetalleAsignarDocumento', 'divbarraDetalleAsignarDocumento', "", 790, 100);
                        CargarGrillaAsignarDocumento('tablaDetalleAsignarDocumento');
                        break;
                    case "archivar":
                        break;
                }
            }
            
        });

    } else {
        SITRADOC.Alert('Atención', "Debe seleccionar al menos un Expediente");
    }
}


function fn_VentanaBuscar(divIdBusqueda, title, idInput, placeholderInput, idButtonBusqueda, jqGrillaBuscar, idGrilla,idBarraGrilla, idButtonTomarDato) {
    var html = '';

    jQuery("#" + divIdBusqueda).html('');

    html += "<div class='modal-header'>";
    html += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"
    html += "<h4 class='modal-title'><i class='clip-search-2'></i> " + title + "</h4>";
    html += "</div>";
    html += "<div class='modal-body' style='height:300px'>";
    html += "   <div class='form-group'>";
    html += "       <div class='col-sm-12'>";
    html += "           <div class='input-group'>";
    html += "               <input type='text' id='" + idInput + "' class='form-control' placeholder='" + placeholderInput + "' />";
    html += "               <span class='input-group-btn'>";
    html += "                   <button id='" + idButtonBusqueda + "' class='btn btn-default' type='button' style='height: 28px'>";
    html += "                       <i class='clip-search-2' style='color: #428bca' />Buscar</button>";
    html += "               </span>";
    html += "           </div>";
    html += "       </div>";
    html += "   </div>";
    html += "   <div class='form-group'>";
    html += "       <div class='col-sm-12'>";
    html += "           <div class='" + jqGrillaBuscar + "'>";
    html += "               <table id='" + idGrilla + "'></table>";
    html += "                   <div id='" + idBarraGrilla + "' style='text-align:left'></div>";
    html += "           </div>";
    html += "       </div>";
    html += "   </div>";
    html += "</div>";
    html += "<div class='modal-footer'>";
    html += "    <button  data-dismiss='modal' class='btn btn-light-grey' type='button'><i class='clip-enter' />Cerrar </button>";
    html += "    <button id='" + idButtonTomarDato + "' class='btn btn-blue' type='button'>Tomar dato <i class='fa fa-arrow-circle-right' /></button>";
    html += "</div>";

    $('#' + divIdBusqueda).append(html);
}
