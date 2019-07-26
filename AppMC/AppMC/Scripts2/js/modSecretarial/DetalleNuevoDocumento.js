var grillaDetNuevoDoc = "tableDetalleNuevoDocumento";
var barraDetalleDoc = "divbarraDetalleMantDocumento";
var grillaDocumentosSel = "tablaDocumentoSeleccionado";
var barraDocumentosSel = "divbarraDocumentoSeleccionado";

var grillaDetalleAsignarDoc = "tablaDetalleAsignarDocumento";
var barraDetalleAsignarDoc = "divbarraDetalleAsignarDocumento";
var ListaMovimientoDoc = new Array();

var ListaDocAsignadosBorrados = new Array();
var vDataIdCliente="";
var vDataNomCliente="";
var vDataIdUbigeo = "";
var vDataDesUbigeo = "";


var grid = $("#" + grillaDetNuevoDoc);


//jQuery("#" + barraDetalleDoc).jqGrid('bindKeys', { "onEnter": function (rowid) { alert("You enter a row with id:" + rowid) } });
/*
$("#frmMantenimientoDocumento").ready(function () {
    ConfigurarGrilla(700, 'auto');
    //CargarGrilla();
    //jQuery("#" + grilla).jqGrid('setSelection', posDoc);
    //jQuery("#" + grilla).jqGrid('hideCol', 'cb');
});
*/

jQuery('#aNuevoDetalleDoc').click(function (e) {

    var vIdGestorOfi = $("#hddnIDGestorOficina").val()
    var vIdSimemCliente = $("#hddnIDSimemCliente").val()
    var vMensajeErr;

    if ((vIdGestorOfi == "" || vIdGestorOfi == undefined) && (vIdSimemCliente == "" || vIdSimemCliente == undefined)) {
        SITRADOC.Alert("Atención","Debe registrar a quien va ha derivar el Documento");
    } else {
        if (vIdGestorOfi == "" ? buscarClienteEnGrilla($("#hddnIDSimemCliente").val()) : buscarOficina($("#hddnIDGestorOficina").val()))
        {
            vMensajeErr = vIdGestorOfi == "" ? "El cliente " + $('#inputDesCliente').val() + " ya se encuentra registrado en la lista de derivados." : "La " + $('#inputDesOficina').val() + " ya se encuentra registrado en la lista de derivados.";
            SITRADOC.Alert("Atención", vMensajeErr);
        }
        else {



            var rowid = jQuery("#" + grillaDetNuevoDoc).jqGrid('getGridParam', 'records');
            alert(rowid);
            if (rowid == 1) {
                SITRADOC.Alert("Atención", "No puede derivar más de una Unidad Organica.");
            }
            else {
                var newRowData = {
                    CODIGO: rowid + 1,
                    ID_PRIORIDAD_DOC: "1",
                    DES_PRIORIDAD_DOC: "ALTA",
                    DES_GESTOR_OFICINA: vIdGestorOfi == "" ? $("#inputDesCliente").val() : $("#inputDesOficina").val(),
                    ID_GESTOR_OFICINA: $("#hddnIDGestorOficina").val(),
                    ID_CLIENTE: $("#hddnIDSimemCliente").val(),
                    DES_ACCION_DOC: "ATENDER LO SOLICITADO",
                    ID_ACCION_DOC: "1"
                }

            };

            $("#inputDesOficina").val("");
            $("#hddnIDGestorOficina").val("");
            jQuery("#" + grillaDetNuevoDoc).jqGrid('addRowData', rowid + 1, newRowData);
        }
    }
   
});


$("#aBorrarDetalleDoc").click(function (e) {
    //BorrarUnRegistroDetalleGrilla()
    var gr = jQuery("#" + grillaDetNuevoDoc).jqGrid('getGridParam', 'selrow');
    if (gr != null) {
        jQuery("#" + grillaDetNuevoDoc).jqGrid('delRowData', gr);
    }
    else SITRADOC.Alert('Atención', "Por favor seleccione un registro!");
});


$("#aBorrarDetalleAsigDoc").click(function (e) {
    //SITRADOC.confirm("Desea borrar el registro seleccionado?", function () {
    //    BorrarUnRegistroDetalleGrilla()
    //}, null, "Usuario", "es");

    BorrarUnRegistroDetalleGrilla()
});

$("#aCorrelativoDocumento").click(function (e) {
    MostrarCorrelativoDocumentos();
});

$("#aAsignarDetalleDocumento").click(function (e) {
    InsertarUnDetalleAsignacion();
});

jQuery('#aAnularUnDocumento').click(function (e) {

    if (vIdProcedencia == "E") SITRADOC.Alert("Atención", "No esta autorizado para Anular un Expediente Externo, \nConsultar con Trámite Documentario.");
    else SITRADOC.Alert("Atención", "No puede Anular un Documento con estado Pendiente, \nla Unidad Orgánica que le Derivó el Documento es la única autorizada para Anular.");
});

function BorrarUnRegistroDetalleGrilla() {


    var gr = jQuery("#" + grillaDetalleAsignarDoc).jqGrid('getGridParam', 'selrow');
    if (gr != null) {
        var data = jQuery("#"+ grillaDetalleAsignarDoc).jqGrid('getRowData', gr);
        var itemDoc = {
            ID_DOCUMENTO: data.ID_DOCUMENTO,
            ID_MOVIMIENTO_DOC: data.ID_MOVIMIENTO_DOC,
            ID_ASIGNACION: data.ID_ASIGNACION,
            ID_ESTADO_DOCUMENTO: data.ID_ESTADO_DOCUMENTO
        };

        var url = baseUrl + 'Secretarial/Documento/BorrarRegSelAsignacionDocumento';
        var respuesta = SITRADOC.Ajax(url, itemDoc, false);

        if (respuesta != null && respuesta != "") {
            jQuery("#" + grillaDetalleAsignarDoc).jqGrid('delRowData', gr);
        }
        SITRADOC.Alert("Atención", "Registro borrado de la base de datos");
    }
    else SITRADOC.Alert('Atención', "Por favor seleccione un registro!");
    
}

function InsertarUnDetalleAsignacion() {

    if ($("#frmAsignarDocumento").valid()) {
        ///
        if (buscarEvaluador($("#hddnIDGestorPesonal").val()))
            SITRADOC.Alert("Atención", "El evaluador " + $('#inputDesPersonal').val() + " no puede asignarle nuevamente el documento.");
        else grabarAsigDerivArchiDocumento('asignar');
        
    }

}

function buscarOficina(pOficina) {
    var buscado = false;
    var ids = $("#" + grillaDetNuevoDoc).getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var rowData = $("#" + grillaDetNuevoDoc).jqGrid('getRowData', rowId);
        if (rowData.ID_GESTOR_OFICINA == pOficina) return true;
    }
    return buscado;
}

function buscarClienteEnGrilla(pCliente) {
    var buscado = false;
    var ids = $("#" + grillaDetNuevoDoc).getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var rowData = $("#" + grillaDetNuevoDoc).jqGrid('getRowData', rowId);
        if (rowData.ID_CLIENTE == pCliente) return true;
    }
    return buscado;
}



function buscarEvaluador(pEvaluador) {
    var buscado = false;
    var ids = $("#" + grillaDetalleAsignarDoc).getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var rowData = $("#" + grillaDetalleAsignarDoc).jqGrid('getRowData', rowId);
        //alert(rowData.ID_GESTOR_PERSONAL);
        //alert(pEvaluador);
        if (rowData.ID_GESTOR_PERSONAL == pEvaluador) return true;
    }
    return buscado;
}



function ConfigurarGrillaAsignarDocumento(grillaDetalleAsignarDoc, barraDetalleAsignarDoc, titulo, ancho, alto) {
    $("#" + grillaDetalleAsignarDoc).GridUnload();
    var colNames = ['Codigo','Id Doc','Id Mov','Id Asig', 'Envios','ID Personal', 'Evaluador', 'Asignado','Plazo','Día','Entrega','Estado','Observaciones'];
    var colModels = [
    { name: 'CODIGO', index: 'CODIGO', align: 'center', hidden: true, width: 50, key: true },
    { name: 'ID_DOCUMENTO', index: 'ID_DOCUMENTO', align: 'left', width: 100, hidden: true },
    { name: 'ID_MOVIMIENTO_DOC', index: 'ID_MOVIMIENTO_DOC', align: 'left', width: 100, hidden: true },
    { name: 'ID_ASIGNACION', index: 'ID_ASIGNACION', align: 'left', width: 100, hidden: true },
    { name: 'NRO_MAIL_ENVIADOS', index: 'NRO_MAIL_ENVIADOS', align: 'center', width: 50, hidden: true },
    { name: 'ID_GESTOR_PERSONAL', index: 'ID_GESTOR_PERSONAL', align: 'left', width: 100, hidden: true },
    { name: 'DES_PERSONAL', index: 'DES_PERSONAL', align: 'left', width: 250, hidden: false },
    { name: 'FEC_ASIGNACION', index: 'FEC_ASIGNACION', align: 'center', formatter: 'date', formatoptions: { newformat: 'd-m-Y' }, width: 90, hidden: false },
    { name: 'NUM_DIAS_PLAZO', index: 'NUM_DIAS_PLAZO', align: 'center', width: 40, hidden: false },
    { name: 'FLG_TIPO_DIA', index: 'FLG_TIPO_DIA', align: 'center', width: 40, hidden: false },
    { name: 'FEC_ENTREGA', index: 'FEC_ENTREGA', align: 'center', formatter: 'date', formatoptions: { newformat: 'd-m-Y' }, width: 90, hidden: true },
    { name: 'ID_ESTADO_DOCUMENTO', index: 'ID_ESTADO_DOCUMENTO', align: 'center', width: 120, hidden: false, formatter:'select', editoptions: { value: "5:En Evaluación;6:Atendido" } },
    { name: 'OBSERVACIONES', index: 'OBSERVACIONES', align: 'left', width: 320, hidden: false }
    ];
    var opciones = {
        GridLocal: true, multiselect: false, CellEdit: true, Editar: false, nuevo: false, eliminar: false, sort: 'desc'
    };

    SITRADOC.Grilla(grillaDetalleAsignarDoc, barraDetalleAsignarDoc, '', alto, ancho, titulo, "", "CODIGO", colNames, colModels, "DES_PERSONAL", opciones);
    jqGridResponsive($(".jqGridDocumentoAsignados"));
}


function ConfigurarGrillaBuscarCliente(ancho, alto) {
    $("#grillaBuscarCliente").GridUnload();
    var colNames = ['Código', 'Descripción', 'Nro. Documento'];
    var colModels = [
    { name: 'ID_CLIENTE', index: 'ID_CLIENTE', align: 'center', hidden: false, width: 50, key: true },
    { name: 'DESCRIPCION', index: 'DESCRIPCION', align: 'left', width: 320, hidden: false },
    { name: 'NRO_DOCUMENTO', index: 'NRO_DOCUMENTO', align: 'center', width: 100, hidden: false }
    ];
    var opciones = {
        GridLocal: true, multiselect: false, CellEdit: true, Editar: false, nuevo: false, eliminar: false, sort: 'desc',
        GridondblClickRowHandler: function () {
            var rowKey = parseInt(jQuery("#grillaBuscarCliente").getGridParam('selrow'));
            var data = jQuery("#grillaBuscarCliente").jqGrid('getRowData', rowKey);
            fn_TomarDatosClienteBuscado(data.ID_CLIENTE, data.DESCRIPCION);
        },
        selectRowFunc: function () {

            var rowKey = parseInt(jQuery("#grillaBuscarCliente").getGridParam('selrow'));
            var data = jQuery("#grillaBuscarCliente").jqGrid('getRowData', rowKey);
            vDataIdCliente = data.ID_CLIENTE;
            vDataNomCliente = data.DESCRIPCION;
        }
    };

    SITRADOC.Grilla('grillaBuscarCliente', 'divbarraBuscarCliente', '', alto, ancho, "", "", "DESCRIPCION", colNames, colModels, "ID_CLIENTE", opciones);
    jqGridResponsive($(".jqGridBuscarCliente"));
}



function fn_TomarDatosClienteBuscado(pIdCliente, pDescripcionCliente) {
    $("#hddnIDSimemCliente").val(pIdCliente);
    $("#inputDesCliente").val(pIdCliente + " - " +pDescripcionCliente);
    $('#panel-busqueda-cliente').modal('hide');
}

function ConfigurarGrillaBuscarUbigeo(ancho, alto) {
    $("#grillaBuscarUbigeo").GridUnload();
    var colNames = ['Código', 'Distrito', 'Provincia','Departamento'];
    var colModels = [
    { name: 'ID_UBIGEO_INEI', index: 'ID_UBIGEO_INEI', align: 'center', hidden: false, width: 50, key: true },
    { name: 'DISTRITO', index: 'DISTRITO', align: 'left', width: 200, hidden: false },
    { name: 'PROVINCIA', index: 'PROVINCIA', align: 'left', width: 160, hidden: false },
    { name: 'DEPARTAMENTO', index: 'DEPARTAMENTO', align: 'center', width: 160, hidden: false }
    ];
    var opciones = {
        GridLocal: true, multiselect: false, CellEdit: true, Editar: false, nuevo: false, eliminar: false, sort: 'desc',
        GridondblClickRowHandler: function () {
            var rowKey = parseInt(jQuery("#grillaBuscarUbigeo").getGridParam('selrow'));
            var data = jQuery("#grillaBuscarUbigeo").jqGrid('getRowData', rowKey);
            fn_TomarDatosUbigeoBuscado(data.ID_UBIGEO_INEI, data.DISTRITO + " - " + data.PROVINCIA + " - " + data.DEPARTAMENTO);
        },
        selectRowFunc: function () {

            var rowKey = parseInt(jQuery("#grillaBuscarUbigeo").getGridParam('selrow'));
            var data = jQuery("#grillaBuscarUbigeo").jqGrid('getRowData', rowKey);
            vDataIdUbigeo = data.ID_UBIGEO_INEI;
            vDataDesUbigeo = data.DISTRITO + " - " + data.PROVINCIA + " - " + data.DEPARTAMENTO;
        }


    };

    SITRADOC.Grilla('grillaBuscarUbigeo', 'divbarraBuscarUbigeo', '', alto, ancho, "", "", "DISTRITO", colNames, colModels, "ID_UBIGEO_INEI", opciones);
    jqGridResponsive($(".jqGridBuscarUbigeo"));
}

function fn_TomarDatosUbigeoBuscado(vDataIdUbigeo, vDataDesUbigeo) {
    $("#hddnIDUbigeoCliente").val(vDataIdUbigeo);
    $("#inputDesUbigeo").val(vDataIdUbigeo + " - " + vDataDesUbigeo);
    $('#panel-busqueda-ubigeo').modal('hide');
}

function ConfigurarGrillaDocumentoSeleccionado(ancho, alto) {
    $("#tablaDocumentoSeleccionado").GridUnload();
    var colNames = ['Codigo', 'ID Documento', 'Documento(s)','Expediente oculto','ID Mov.'];
    var colModels = [
    { name: 'CODIGO', index: 'CODIGO', align: 'center', hidden: true, width: 50, key: true },
    { name: 'ID_DOCUMENTO', index: 'ID_DOCUMENTO', align: 'left', width: 80, hidden: true },
    { name: 'NRO_EXPEDIENTE', index: 'NRO_EXPEDIENTE', align: 'center', width: 130, hidden: false },
    { name: 'NRO_EXPEDIENTE_DATA', index: 'NRO_EXPEDIENTE_DATA', align: 'center', width: 85, hidden: true },
    { name: 'ID_MOVIMIENTO_DOC', index: 'ID_MOVIMIENTO_DOC', align: 'center', width: 50, hidden: false }
    ];
    var opciones = {
        GridLocal: true, multiselect: true, CellEdit: true, Editar: false, nuevo: false, eliminar: false, sort: 'desc'
    };

    SITRADOC.Grilla(grillaDocumentosSel, barraDocumentosSel, '', alto, ancho, "", "", "CODIGO", colNames, colModels, "NRO_EXPEDIENTE", opciones);
    jqGridResponsive($(".jqGridDocumentoSeleccionados"));
}


function ConfigurarGrillaDetalleDerivacion(ancho, alto) {
    $("#" + grillaDetNuevoDoc).GridUnload();
    var colNames = ['Codigo', 'IdCliente', 'IdOficina', 'Derivar a', 'IdAccion', 'Acción', 'IdPrioridad', 'Prioridad'];
    var colModels = [
    { name: 'CODIGO', index: 'CODIGO', align: 'center', hidden: true, width: 50, key: true },
    { name: 'ID_CLIENTE', index: 'ID_CLIENTE', align: 'left', width: 50, hidden: true, editable: false },
    { name: 'ID_GESTOR_OFICINA', index: 'ID_GESTOR_OFICINA', align: 'left', width: 50, hidden: true, editable: false },
    {
        name: 'DES_GESTOR_OFICINA', index: 'DES_GESTOR_OFICINA', align: 'left', width: 370, hidden: false, resizable: true,
        editable: false,

    },
    { name: 'ID_ACCION_DOC', index: 'ID_ACCION_DOC', align: 'left', width: 50, hidden: true },
    {
        name: 'DES_ACCION_DOC', index: 'DESC_ACCION_DOC', align: 'left', width: 180, hidden: false, resizable: true, 
        editable: true,
        edittype: 'select',
        editoptions: {
            value: listarAccionDocumento(),
            dataEvents: [{
                type: 'keydown',
                fn: function (e) {
                    var key = e.charCode || e.keyCode;
                    if (key == 13) {
                        var rowKey = grid.getGridParam('selrow');
                        grid.jqGrid('setRowData', rowKey, { ID_ACCION_DOC: seleccionarCombo(rowKey, '_DES_ACCION_DOC') });
                    }
                }
            },
            {
                type: 'change',
                fn: function (formid) {
                    var rowKey = grid.getGridParam('selrow');
                    grid.jqGrid('setRowData', rowKey, { ID_ACCION_DOC: seleccionarCombo(rowKey, '_DES_ACCION_DOC') });

                }
            }]
        }
    },
    { name: 'ID_PRIORIDAD_DOC', index: 'ID_PRIORIDAD_DOC', align: 'left', width: 50, hidden: true },
    {
        name: 'DES_PRIORIDAD_DOC', index: 'DES_PRIORIDAD_DOC', align: 'left', width: 140, hidden: false, resizable: true,
        editable: true,
        edittype: 'select',
        editoptions: {
            value: listarPrioridadDocumento(),
            dataEvents: [{
                type: 'keydown',
                fn: function (e) {
                    var key = e.charCode || e.keyCode;
                    var rowKey = grid.getGridParam('selrow');
                    if (key == 13) {
                        grid.jqGrid('setRowData', rowKey, { ID_PRIORIDAD_DOC: seleccionarCombo(rowKey, '_DES_PRIORIDAD_DOC') });
                    }
                }
            },
            {
                type: 'change',
                fn: function (formid) {
                    var rowKey = grid.getGridParam('selrow');
                    grid.jqGrid('setRowData', rowKey, { ID_PRIORIDAD_DOC: seleccionarCombo(rowKey, '_DES_PRIORIDAD_DOC') });
                }
            }]
        }
    }
    ];
    var opciones = {
        GridLocal: true, multiselect: false, CellEdit: true, Editar: false, nuevo: false, eliminar: false, sort: 'asc'

    };

    SITRADOC.GrillaEditable(grillaDetNuevoDoc, barraDetalleDoc, '', alto, ancho, "", "", "CODIGO", colNames, colModels, "CODIGO", opciones);

    jqGridResponsive($(".jqGridDetalleDerivacion"));
}



function MostrarCorrelativoDocumentos() {
    jQuery("#divCorrelativoDocumento").html('');
    var Titulo = "Correlativo de documentos internos";
    
        //var cadena = JSON.stringify(item);
       // var Mensaje = id == 0 ? "Desea guardar los datos" : "Desea modificar los datos ingresados";
    jQuery("#divCorrelativoDocumento").load(baseUrl + "Secretarial/Documento/MostrarCorrelativoDocumento", function (responseText, textStatus, request) {
           $.validator.unobtrusive.parse('#divCorrelativoDocumento');
           if (request.status != 200) return;
           
            $("#divCorrelativoDocumento").dialog({
                autoOpen: true,
                resizable: true,
                height: '430',
                width: '450',
                title: Titulo,
                modal: true,
                beforeClose: function (e, ui) { $(this).dialog('destroy').empty(); },
                buttons: [{
                    id: 'dialog_btnGuardar',
                    text: "Guardar",
                    class: 'btn btn-primary',
                    click: function () {
                        //if ($("#frmMantenimientoDocumento").valid()) {
                                $(this).dialog("close");
                        //}
                    }
                }, {
                    id: 'dialog_btnCancelar',
                    text: "Cancelar",
                    "class": "btn btn-primary",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]

            });

        });
 }


function seleccionarCombo(rowKey, DesColumna) {
    var grid = $("#" + grillaDetNuevoDoc);
    var ids = grid.getDataIDs();

    var indice = 0;
    for (var i = 0; i < ids.length; i++) {
        if (rowKey == ids[i]) {
            indice = i + 1;
            break;
        }
    }
    var valor = $('#' + indice + DesColumna).val();

    return valor;
}

function DocSeleccionado() {

}


function grabarAsigDerivArchiDocumento(vOpcion, vIdOficinaDocumento) {
    var ListaDocSeleccionados = new Array();
    var ListaDocAsignados = new Array();
    var ListaDocDerivados = new Array();

    var hoy = new Date();
    var rowid;
    var newRowData;

    var cuerpoUrl=""

    //ListaDocSeleccionados = JSLINQ($("#tablaDocumentoSeleccionado").jqGrid('getGridParam', 'data')).Where(function (item) { return item }); //Todos los registro de la grilla
    var rowKey = $("#tablaDocumentoSeleccionado").jqGrid('getGridParam', 'selarrrow'); // solo los q estan seleccionados

    if (rowKey.length > 0) {

        for (var i = 0; i < rowKey.length; i++) {
            var data = jQuery("#tablaDocumentoSeleccionado").jqGrid('getRowData', rowKey[i]);
            var itemDoc = {
                ID_DOCUMENTO: data.ID_DOCUMENTO,
                ID_MOVIMIENTO_DOC: data.ID_MOVIMIENTO_DOC,
                NRO_EXPEDIENTE: data.NRO_EXPEDIENTE_DATA
            };
            ListaDocSeleccionados.push(itemDoc);
        }

        switch (vOpcion) {
            case "derivar":
                ListaDocDerivados = JSLINQ($("#tableDetalleNuevoDocumento").jqGrid('getGridParam', 'data')).Where(function (item) { return item });
                var item =
                {
                    OBSERVACIONES: $("#OBSERVACIONES").val(),
                    ID_GESTOR_OFICINA: vIdOficinaDocumento,
                    MOVIMIENTO_DOCUMENTO_DERIVADOS: ListaDocDerivados.items,
                    MOVIMIENTO_DOCUMENTO: ListaDocSeleccionados
                };
                cuerpoUrl = 'Secretarial/Documento/GrabarDerivarDocumento'

                break;
            case "asignar":
                //ListaDocAsignados = JSLINQ($("#tablaDetalleAsignarDocumento").jqGrid('getGridParam', 'data')).Where(function (item) { return item });

                rowid = jQuery("#tablaDetalleAsignarDocumento").jqGrid('getGridParam', 'records');
                newRowData = {
                    CODIGO: rowid + 1,
                    NRO_MAIL_ENVIADOS: 1,
                    ID_GESTOR_PERSONAL: $("#hddnIDGestorPesonal").val(),
                    DES_PERSONAL: $('#inputDesPersonal').val(),
                    FEC_ASIGNACION: hoy,
                    ID_ESTADO_DOCUMENTO: 5,
                    FLG_TIPO_DIA: $("#FLG_TIPO_DIA").val(),
                    NUM_DIAS_PLAZO: $("#NUM_DIAS_PLAZO").val(),
                    OBSERVACIONES: $("#OBSERVACIONES").val(),
                    ID_OFICINA_DOCUMENTO: vIdOficinaDocumento
                };

                ListaDocAsignados.push(newRowData);

                var item =
                    {
                        ASIGNACION_DOCUMENTO: ListaDocAsignados,
                        MOVIMIENTO_DOCUMENTO: ListaDocSeleccionados
                    };
                cuerpoUrl = 'Secretarial/Documento/GrabarAsignarDocumento'
                break;
            case "archivar":
                var item =
                    {
                        UBICACION: $("#UBICACION").val(),
                        OBSERVACION: $("#OBSERVACIONES").val(),
                        MOVIMIENTO_DOCUMENTO: ListaDocSeleccionados
                    };
                cuerpoUrl = 'Secretarial/Documento/GrabarArchivarDocumento'
                break;
        }

        var url = baseUrl + cuerpoUrl;
        var respuesta = SITRADOC.Ajax(url, item, false);
        if (respuesta != null && respuesta != "") {
            jQuery("#tablaDetalleAsignarDocumento").jqGrid('addRowData', rowid + 1, newRowData);
        }

        //if (vOpcion != "asignar") SITRADOC.Alert("Atención", respuesta.message);
        SITRADOC.Alert("Atención", respuesta.message);
        return true;

    } else {
        SITRADOC.Alert("Atención", "Debe de seleccionar al menos un documento.");
        return false;
    }

}

function grabarAprobarDocumentoSAIP()
{
    if (VerificarDerivacionExpediente() == 1) {
        var ListaMovimientoDocAprobar = new Array();
        ListaMovimientoDocAprobar = JSLINQ($("#" + grillaDetNuevoDoc).jqGrid('getGridParam', 'data')).Where(function (item) { return item });
        var item =
        {
            ID_SAIP_WEB: $("#ID_SAIP_WEB").val(),
            MOVIMIENTO_DOCUMENTO: ListaMovimientoDocAprobar.items
        };

        var url = baseUrl + 'Secretarial/Documento/GrabarAprobacionDocumentoSAIP';
        var respuesta = SITRADOC.Ajax(url, item, false);
        SITRADOC.Alert("Atención", respuesta.message);
        CargarGrillaSaip();
        ColorCeldaSaip();
        jQuery("#listPrincipal").jqGrid('setSelection', 1);
        $('#panel-config').modal('hide');
    }

}

function fn_EjecutarFiltroDocumentoPorFechas() {

    var item =
    {
        FEC_INI: $("#FEC_INI").val(),
        FEC_FIN: $("#FEC_FIN").val()
    };

    var url = baseUrl + 'Secretarial/Documento/ActualizarFechasDeFiltroDocumento';
    var respuesta = SITRADOC.Ajax(url, item, false);
    if (respuesta != null && respuesta != "") {
        SITRADOC.Alert("Atención", "Se cambio con éxito el filtro de las fechas");
        $("#lbNombreMenuSecundario").text(IdDesDocumento + " " + respuesta.message);

        switch (IdTipoSeleccion) {
            case '2':
                if (IdEstDoc == "97" || IdEstDoc == "98") {
                    CargarGrillaSaip();
                    ColorCeldaSaip();
                }
                else {
                    CargarGrilla();
                    ColorCelda();
                }



                break;
        }
        jQuery("#listPrincipal").jqGrid('setSelection', 1);
        $('#panel-config').modal('hide');
    }

}

function ValidarAdministradoSAIP(IdSaipWeb) {

    var item =
    {
        ID_SAIP_WEB: IdSaipWeb
    };

    var url = baseUrl + 'Secretarial/Documento/RegistrarClienteSaipEnElSimem';
    var respuesta = SITRADOC.Ajax(url, item, false);

    SITRADOC.Alert("Atención", respuesta.message);
    CargarGrillaSaip();
    ColorCeldaSaip();
    jQuery("#listPrincipal").jqGrid('setSelection', 1);
    $('#panel-config').modal('hide');

}

function GrabarRechazoDocumentoSAIP(IdSaipWeb, IdMotivoRechazo, Observacion) {

        var item =
        {
            ID_SAIP_WEB:  IdSaipWeb,   
            ID_MOTIVO_RECHAZO: IdMotivoRechazo,
            OBSERVACION: Observacion
        };

        var url = baseUrl + 'Secretarial/Documento/GrabarRechazoDocumentoSaip';
        var respuesta = SITRADOC.Ajax(url, item, false);

        SITRADOC.Alert("Atención", respuesta.message);
        CargarGrillaSaip();
        ColorCeldaSaip();
        jQuery("#listPrincipal").jqGrid('setSelection', 1);
        $('#panel-config').modal('hide');

}
function grabarNuevoDocumento() {

    ListaMovimientoDoc = JSLINQ($("#" + grillaDetNuevoDoc).jqGrid('getGridParam', 'data')).Where(function (item) { return item });
    var item =
        {
            ID_TIPO_DOCUMENTO: $("#ID_TIPO_DOCUMENTO option:selected").val(),
            ID_ASUNTO_DOC: $("#ID_ASUNTO_DOC option:selected").val(),
            DESCRIPCION_ASUNTO: $("#DESCRIPCION_ASUNTO").val(),
            OBSERVACION: $("#OBSERVACION").val(),
            MOVIMIENTO_DOCUMENTO: ListaMovimientoDoc.items
        };

        var url = baseUrl + 'Secretarial/Documento/InsertarDocumentoInterno';
        var respuesta = SITRADOC.Ajax(url, item, false);
        SITRADOC.Alert("Atención", respuesta.message);

}



function MostrarCodigoDocumento(val) {

    var codigodocInterno;
    var item =
    {
        ID_TIPO_DOCUMENTO: val
    };

    var url = baseUrl + 'Secretarial/Documento/MostrarCodigoDocumentoInterno';
    var respuesta = SITRADOC.Ajax(url, item, false);
    $('#lbCodigoDocumentoInterno').text(respuesta.codigo);

}


function MostrarCodigoDocumentoNotificado(val) {

    var codigodocInterno;
    var item =
    {
        ID_TIPO_DOCUMENTO: val
    };

    var url = baseUrl + 'Secretarial/Documento/MostrarCodigoDocumentoInterno';
    var respuesta = SITRADOC.Ajax(url, item, false);
    $('#inputCodigoDocumentoInterno').val(respuesta.codigo);

}



function listarPrioridadDocumento() {
    var micadena = "";

    var url = baseUrl + 'Secretarial/Documento/ListarPrioridadDocumento';

    var respuesta = SITRADOC.Ajax(url, false, false);

    if (respuesta != null && respuesta != "") {
        $.each(respuesta, function (i, v) {
            var id = i + 1;
            micadena = micadena + v.ID_PRIORIDAD_DOC + ":" + v.DESCRIPCION + ";";

        });
        micadena = micadena.substring(0, micadena.length - 1);
    }
    return micadena;
}


function listarAccionDocumento() {
    var micadena = "";

    var url = baseUrl + 'Secretarial/Documento/ListarAccionDocumento';

    var respuesta = SITRADOC.Ajax(url, false, false);

    if (respuesta != null && respuesta != "") {
        $.each(respuesta, function (i, v) {
            var id = i + 1;
            micadena = micadena + v.ID_ACCION_DOC + ":" + v.DESCRIPCION + ";";

        });
        micadena = micadena.substring(0, micadena.length - 1);

        
    }
    return micadena;
}

function listarParentesco() {
    var url = baseUrl + 'Personal/Legajo/listarParentesco';
    var data = LLSIGA.Ajax(url, false, false);
    data = data.items;
    return retornarData(data);
}
function retornarData(data) {
    var micadena = "";
    if (data != undefined || data != null && item.length > 0) {
        for (var j = 0; j < data.length; j++) {
            micadena = micadena + data[j].Codigo + ":" + data[j].Nombre + ";";
        }
        micadena = micadena.substring(0, micadena.length - 1);
    }
    return micadena;
}



function listarOficina() {
    var micadena = "";
    var item =
    {
        DESCRIPCION: '%'
    };


    var url = baseUrl + 'Secretarial/Documento/ListarOficina';

    var respuesta = SITRADOC.Ajax(url, false, false);

    if (respuesta != null && respuesta != "") {
        $.each(respuesta, function (i, v) {
            var id = i + 1;
            micadena = micadena + v.ID_GESTOR_OFICINA + ":" + v.ID_GESTOR_OFICINA+'-' + v.DESCRIPCION + ";";

        });
        micadena = micadena.substring(0, micadena.length - 1);
    }
    return micadena;
}


jQuery('#btnBuscarCliente').click(function (e) {
    ConfigurarGrillaBuscarCliente(300, 200);
    $("#inputDesClienteBusca").focus();
});

jQuery('#btnBuscarUbigeo').click(function (e) {
    ConfigurarGrillaBuscarUbigeo(300, 200);
    $("#jqGridBuscarUbigeo").focus();
});