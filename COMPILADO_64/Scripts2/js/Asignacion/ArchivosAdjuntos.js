var grillaArchivo = 'grillArchivo';
var barraArchivo = 'barraArchivo';
var eliminadoRegistro = "0";
var listarDetalleDocumento = new Array();
var listaDocumentoAdjuntoEstado = new Array();
$(document).ready(function () {
    ConfigurarGrilla();
    

    $('#btnQuitar').click(function (e) {
        var rowKey = $('#' + grillaArchivo).getGridParam('selrow');
        if (rowKey != null || rowKey != undefined) {

            jConfirm("¿Desea quitar todo los items seleccionados?", "Documentos Adjuntos", function (r) {
                if (r) {
                    quitar();
                    eliminar();
                }
            });
            // SITRADOC.confirm("", function () { quitar(); }, null, "", "es");
        } else {
            SITRADOC.Alert('Alerta', "Debe seleccionar un item", '', 'es');
        }
    });
});

function ConfigurarGrilla() {
    $("#" + grillaArchivo).GridUnload();

    var colNames = ['Item', 'Código', "<i class='clip-clip'></i>", 'Archivo', 'Observación', 'id_asig', 'id_doc', 'id_mov'];
    var colModels = [
    { name: 'Item', index: 'Item', align: 'center', width: 50, hidden: true, key: false },
    { name: 'ID_DOC_ADJUNTO', index: 'ID_DOC_ADJUNTO', width: 200, hidden: true },
    { name: 'Doc', index: 'Doc', align: 'center', width: 50, sortable: false, formatter: actionButtonFormatter },
    { name: 'NOMBRE_ARCHIVO', index: 'NOMBRE_ARCHIVO', width: 200, hidden: false },
    { name: 'OBSERVACION', index: 'OBSERVACION', width: 250, hidden: false },
    { name: 'ID_ASIGNACION', index: 'ID_ASIGNACION', width: 200, hidden: true },
    { name: 'ID_DOCUMENTO', index: 'ID_DOCUMENTO', width: 200, hidden: true },
    { name: 'ID_MOVIMIENTO_DOC', index: 'ID_MOVIMIENTO_DOC', width: 200, hidden: true }
    ];
    var opciones = {
        GridLocal: true, multiselect: true, CellEdit: false, Editar: false, nuevo: false, eliminar: false, search: false, sort: 'desc'
    };

    SITRADOC.Grilla(grillaArchivo, barraArchivo, '', '150', '600', "", '', 'Item', colNames, colModels, 'Item', opciones);

    jqGridResponsive($(".jqGridAdjuntarArchivo"));
}
function actionButtonFormatter(cellvalue, options, rowObject) {
    //<img alt='Ver' src='../../assets/css/images/notificaciones/ico_buscar.png' />
    var url = baseUrl + "Secretarial/Asignacion/Visor" + '?id=' + rowObject.ID_DOC_ADJUNTO + "&id_doc=" + rowObject.ID_DOCUMENTO + "&id_mov=" + rowObject.ID_MOVIMIENTO_DOC + "&id_asig=" + rowObject.ID_ASIGNACION;
    var htmlInputModificar = "<a href=" + url + " target='_blank' id='btn-" + options.rowId + "' value='' onclick='verDocumento(" + options.rowId + ");'  title='Ver'><i class='clip-download-2' style='color:green'></i></a>";
    return htmlInputModificar;
}
function verDocumento(rowId) {
    var data = jQuery("#" + grillaArchivo).jqGrid('getRowData', rowId);
    var id = data.ID_DOC_ADJUNTO;

}
function CargarGrilla() {
    
    var Item = {
        ID_DOCUMENTO: $("#hdfid_documentoPR").val(),
        ID_MOVIMIENTO_DOC: $("#hdfid_movimiento_docPR").val(),
        ID_ASIGNACION: $("#hdfid_asignacionPR").val()
    };
    // var item = "";
   

    var url = baseUrl + 'Secretarial/Asignacion/ListarArchivos';
    var respuesta = SITRADOC.Ajax(url, Item, false);
    jQuery("#" + grillaArchivo).jqGrid('clearGridData', true).trigger("reloadGrid");
    listarDetalleDocumento = new Array();
    if (respuesta != null && respuesta != "") {
        $.each(respuesta, function (i, v) {
            var id = i + 1;
            var myData =
             {
                 Item: id,
                 ID_DOC_ADJUNTO: v.ID_DOC_ADJUNTO,
                 NOMBRE_ARCHIVO: v.NOMBRE_ARCHIVO,
                 OBSERVACION: v.OBSERVACION,
                 ID_ASIGNACION: v.ID_ASIGNACION,
                 ID_DOCUMENTO: v.ID_DOCUMENTO,
                 ID_MOVIMIENTO_DOC: v.ID_MOVIMIENTO_DOC
             };
            listarDetalleDocumento.push(myData);
            jQuery("#" + grillaArchivo).jqGrid('addRowData', id, myData);
            //jQuery('#' + grilla).jqGrid('setCell', i, "DESCRIPCION_ASUNTO", "", { background: '#598FF2', color: '#FFFFFF' });
        });
        jQuery("#" + grillaArchivo).trigger("reloadGrid");
    }
}

function quitar() {
    var ids = jQuery("#" + grillaArchivo).jqGrid('getGridParam', 'selarrrow');
    if (ids != null || ids != undefined) {
        while (ids.length != 0) {
            var dataDetalle = jQuery("#" + grillaArchivo).jqGrid('getRowData', ids[ids.length - 1]);
            listaDocumentoAdjuntoEstado.push(dataDetalle);
            EliminarDetalle(ids[ids.length - 1]);
            $('#' + grillaArchivo).jqGrid('delRowData', ids[ids.length - 1]);
        }
    }
}

function EliminarDetalle(rowKey) {
    listarDetalleDocumento = $('#' + grillaArchivo).jqGrid('getRowData');
    var removeMe = -1;
    $.each(listarDetalleDocumento, function (i, v) {
        eliminadoRegistro = "1";
        if (v.IDCODIGO == rowKey) {
            removeMe = i;
        }
    });
    if (removeMe != -1) {
        listarDetalleDocumento.splice(removeMe, 1);
        // listarDetalleRequerimiento[removeMe].Estado = '0';
    }

}

function eliminar() {
    var entidad = new Object();
    entidad.DocumentoAdjuntosEstado = listaDocumentoAdjuntoEstado
    var url = baseUrl + "SECRETARIAL/Asignacion/Eliminar";
    var parameters = { entidad: entidad };
    var response = SITRADOC.Ajax(url, parameters, false);
    if (response.Success == true) {
        //$('#btnBuscarLocal').click();
    }
}