
$(window).load(function () {
    validacionTipoDato();
    CARGARDDL(4, 'NIDCONVOCATORIA', 0, 0, "Todas", 'T');
    CARGARDDL(0, 'NIDPROCESO', 0, 0, "Todos", 'P');
    listarPostulantesEval('and rownum <=100','');
    $("#NIDCONVOCATORIA").change(function (e) {
        CARGARDDL(0, 'NIDPROCESO', 0, $("#NIDCONVOCATORIA").val(), "Todas", 'P');
    })
    var usuario = $("#iduser").val();
    if (usuario == 15249399 || usuario == 19082526)
        $("#reset").show();
    else
        $("#reset").hide();
});

function listarPostulantesEval(where,grupo) {
    var dataObject = JSON.stringify({
        'WHERE': where,
        'GRUPO': grupo
    });

    $.ajax({
        url: baseUrl + 'Gestion/CONSULTA_GENERAL',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_PostulantesE').DataTable({
                dom: 'Bfrtip',
                buttons: [
                     'excel'
                ],
                data: inf,
                "order": [
                          [1, "desc"],
                          [2, "desc"]
                ],
                "columnDefs": [
                { "width": "0%", "targets": 0, "orderable": false },
                { "width": "20%", "targets": 1, "orderable": true },
                { "width": "10%", "targets": 2, "orderable": true },
                { "width": "10%", "targets": 3, "orderable": true },
                { "width": "12%", "targets": 4, "orderable": true },
                { "width": "10%", "targets": 5, "orderable": true },
                { "width": "10%", "targets": 6, "orderable": true },
                { "width": "10%", "targets": 7, "orderable": true },
                { "width": "10%", "targets": 8, "orderable": true },
                { "width": "10%", "targets": 9, "orderable": true },
                { "width": "10%", "targets": 10, "orderable": true },
                { "width": "10%", "targets": 11, "orderable": true },
                { "width": "10%", "targets": 12, "orderable": true },
                { "width": "10%", "targets": 13, "orderable": true },
                { "width": "10%", "targets": 14, "orderable": true },
                { "width": "10%", "targets": 15, "orderable": true },
                { "width": "10%", "targets": 16, "orderable": true },
                { "width": "10%", "targets": 17, "orderable": true },
                { "width": "10%", "targets": 18, "orderable": true },
                { "width": "10%", "targets": 19, "orderable": true },
                { "width": "10%", "targets": 20, "orderable": true },
                { "width": "10%", "targets": 21, "orderable": true }
                ],
                "sSwfPath": "http://datatables.net/release-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "collection",
                    "oSelectorOpts": { filter: 'applied', order: 'current' },
                    "sButtonText": "Export",
                    "aButtons": [ "xls"]
                }],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<div style='padding-top:10px'><b>Postulantes</b></div> _MENU_",
                    "sZeroRecords": "No se encontraron registros coincidentes",
                    "sEmptyTable": "No hay registros disponibles",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Ãšltimo",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                },
                "lengthMenu": [[ 15, 20, 30, 40, 50, -1], [ 15, 20, 30, 40, 50, "Todo"]],
                //"lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                    $('td:eq(1)', nRow).css("text-align", "left").css("width", "6%");
                    $('td:eq(2)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(3)', nRow).css("text-align", "left").css("width", "15%");
                    $('td:eq(4)', nRow).css("text-align", "left").css("width", "5%");
                    $('td:eq(5)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(6)', nRow).css("text-align", "left").css("width", "8%");
                    $('td:eq(7)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(8)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(9)', nRow).css("text-align", "center").css("width", "1%");
                    $('td:eq(10)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(11)', nRow).css("text-align", "center").css("width", "14%");
                    $('td:eq(12)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(13)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(14)', nRow).css("text-align", "center").css("width", "2%");

                    $('td:eq(15)', nRow).css("text-align", "left").css("width", "7%");
                    $('td:eq(16)', nRow).css("text-align", "left").css("width", "7%");
                    $('td:eq(17)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(18)', nRow).css("text-align", "center").css("width", "2%");
                    $('td:eq(19)', nRow).css("text-align", "left").css("width", "5%");
                    $('td:eq(20)', nRow).css("text-align", "left").css("width", "3%");
                    $('td:eq(21)', nRow).css("text-align", "left").css("width", "9%");
                    return nRow;
                },
                "bFilter": true,
                "scrollX": true,
                "bLengthChange": true,
                "info": true,
                destroy: true,

                columns: [
                    { data: 'NIDPROCESOUSU' },
                    { data: 'CONVOCATORIA' },
                    { data: 'ESTADO_CONV' },
                    { data: 'SSERVICIO' },
                    { data: 'SPROCESO' },
                    { data: 'RESULTADO' },
                    { data: 'POSTULANTE' },
                    { data: 'ESTADO_FICHA' },
                    { data: 'F_NACIMIENTO' },
                    { data: 'EDAD' },
                    { data: 'DSEXO' },
                    { data: 'LUG_TRAB' },
                    { data: 'SDNI' },
                    { data: 'SRUC' },
                    { data: 'BREVETE' },
                    { data: 'LUGAR_DIR' }, 
                    { data: 'DIRECCION' }, 
                    { data: 'STELEFONOFIJO' }, 
                    { data: 'SCELULAR' },
                    { data: 'SCORREO' }, 
                    { data: 'SIGLAS' },
                    { data: 'OFICINA' }
                ]
            });
        }
    });

  
}



function Buscar() {
    var where = " ";
    var grupo = " ";
    var e_desde = $("#EDAD_DESDE").val();
    var e_hasta = $("#EDAD_HASTA").val();
    var bEdad = $("#chkEdad").is(':checked') ? 1 : 0;
    if (e_hasta == "") e_hasta = 100;
    if (e_desde == "") e_desde = 0;
    if (e_desde > e_hasta && bEdad == 1) {
        bootbox.alert("La edad desde debe ser menor a la edad hasta.");
        return;
    }
    
    if (bEdad == 1) {
        where = where + " AND EDAD BETWEEN " + e_desde + " AND " + e_hasta;
    }
    if ($("#NIDCONVOCATORIA").val() != 0) {
        where = where + " AND NIDCONVOCATORIA = " + $("#NIDCONVOCATORIA").val();
    }
    if ($("#NIDPROCESO").val() != 0) {
        where = where + " AND NIDPROCESO = " + $("#NIDPROCESO").val();
    }
    if ($("#BACTIVO_CONV").val() != -1) {
        where = where + " AND BACTIVO = " + $("#BACTIVO_CONV").val();
    }
    listarPostulantesEval(where, grupo);
}
function ResetearClave() {
    var where = " ";
    var grupo = " ";
    var sdni = $("#sdni").val();

    if (sdni == "" || sdni.length < 8) {
        mensaje = "Ingrese un número de DNI correcto"
        bootbox.alert('Ingrese un número de DNI correcto.');
    }
    else {
        var dataObject = JSON.stringify({
            'sdni': sdni
        });
        $.ajax({
            async: false,
            url: baseUrl + 'User/ResetearClave',
            type: 'POST',
            datatype: 'json',
            contentType: 'application/json',
            data: dataObject,
            success: function (data) {
                if(data.mensaje=="OK"){
                    bootbox.alert('Su clave es igual a su número de DNI.');
                }else{
                    bootbox.alert(data.mensaje);
                }
            },
            error: function (ex) {
                bootbox.alert('Error, no se pudo validar el DNI ingresado.' + ex);
            }
        });
    }
}
function habilitaEdad(boolean) {
    $("#EDAD_DESDE").prop("disabled", !boolean);
    $("#EDAD_HASTA").prop("disabled", !boolean);

}