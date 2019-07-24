var grillaCorrelativo = "grillaCorrelativo";
var barraCorrelativo = "barraCorrelativo";


ConfigurarGrillaCorrelativo(380, 280);
CargarGrillaCorrelativo();


function ConfigurarGrillaCorrelativo(ancho, alto) {
    $("#" + grillaCorrelativo).GridUnload();
    var colNames = ['Codigo', 'Id Tipo Doc.', 'Documento', 'Correlativo'];
    var colModels = [
    { name: 'CODIGO', index: 'CODIGO', align: 'center', hidden: true, width: 50, key: true },
    { name: 'ID_TIPO_DOCUMENTO', index: 'ID_TIPO_DOCUMENTO', align: 'left', width: 50, hidden: true },
    { name: 'DES_TIPO_DOC', index: 'DES_TIPO_DOC', align: 'left', width: 180, hidden: false },
    { name: 'NUM_CORRELATIVO', index: 'NUM_CORRELATIVO', align: 'left', width: 100, hidden: false ,editable:true}
    ];
    var opciones = {
        GridLocal: true, multiselect: false, CellEdit: true, Editar: false, nuevo: false, eliminar: false, sort: 'asc'
    };

    SITRADOC.GrillaEditable(grillaCorrelativo, barraCorrelativo, '', alto, ancho, "", "", "CODIGO", colNames, colModels, "DES_TIPO_DOC", opciones);
}




function CargarGrillaCorrelativo() {

    var url = baseUrl + 'Secretarial/Documento/ListarCorrelativoDocumento';
    var respuesta = SITRADOC.Ajax(url, null, false);
    jQuery("#" + grillaCorrelativo).jqGrid('clearGridData', true).trigger("reloadGrid");
    if (respuesta != null && respuesta != "") {
        $.each(respuesta, function (i, v) {
            var id = i + 1;
            var myData =
             {
                 CODIGO: id,
                 ID_TIPO_DOCUMENTO: v.ID_TIPO_DOCUMENTO,
                 DES_TIPO_DOC: v.DES_TIPO_DOC,
                 NUM_CORRELATIVO: v.NUM_CORRELATIVO
             };

            jQuery("#" + grillaCorrelativo).jqGrid('addRowData', id, myData);

        });
        jQuery("#" + grillaCorrelativo).trigger("reloadGrid");
    }
}
