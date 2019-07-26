$(window).load(function () {
    ListarProceso();
    validacionTipoDato();
    //document.getElementById("btn_guardar").innerHTML = 'Agregar    <i class="fa fa-plus"></i>';//para cambiar texto de un boton    
});

$(document).ready(function () {
    setCalendar('d_cro');
    setCalendar('h_cro');

});

function setDate(ext_id){
    $('#div_fecha'+ext_id).datetimepicker('update');
}

function NuevoModalMI() {
    if ($("#NIDPROCESO").val() != 0) {
        $('#ModalComite').modal({
            "backdrop": "static",
            "keyboard": true,
            "show": true
        });
        CargarPersonal();
        CARGARDDL(5, 'NTIPO_EVALUADOR', 0);
    }
    else {
        bootbox.alert("Debe seleccionar un proceso.");
    }
    $("#NIDPERSONAL").val(0);
}

$('#txtUploadFile_PRO').on('change', function (e) {
    return validaExtension("#txtUploadFile_PRO")
});

function ListarProceso() {
    var NANIO = $("#NANIO_G").val();
    var dataObject = JSON.stringify({
        'NOPT': NANIO,
        'SP': 'SP_LISTA_PROCESO'
    });

    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            if (data.length > 0) {
                var inf = data;
                var t = $('#tbl_Proceso').DataTable({
                    data: inf,
                    "order": [
                              [1, "desc"],
                              [2, "desc"]
                    ],
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "20%", "targets": 2, "orderable": false },
                    { "width": "14%", "targets": 3, "orderable": true },
                    { "width": "50%", "targets": 4, "orderable": true /*",orderData": [3, 4]*/ },
                    { "width": "8%", "targets": 5, "orderable": false },
                    { "width": "8%", "targets": 6, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
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
                    //"lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "lengthMenu": [[ 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "left").css("width", "15%");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "15%");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "60%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "5%");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCONVOCATORIA' },
                        { data: 'SCONVOCATORIA' },
                        { data: 'SPROCESO' },
                        { data: 'SSERVICIO' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDPROCESO' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        var NIDPROCESO = 0;
                        var SPROCESO = '';
                        var SSERVICIO = '';
                        t.column(5, {}).nodes().each(function (cell, i) {

                            cell.innerHTML = '<div> <a href="javascript:void(0)" onclick="AbrirModalPR(' + cell.innerHTML + ')" style="color:black;" > <i class="fa fa-pencil" style="font-size: 20px;" title="EDITAR"></i> </a> </div>'
                        });
                        t.column(6, {}).nodes().each(function (cell, i) {

                            t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDPROCESO = "'" + cell.innerHTML + "'"; } });
                            t.column(3, {}).nodes().each(function (cell, j) { if (i == j) { SPROCESO = "'" + cell.innerHTML + "'"; } });
                            t.column(4, {}).nodes().each(function (cell, j) { if (i == j) { SSERVICIO = "'" + cell.innerHTML + "'"; } });
                            cell.innerHTML = '<div><i class="fa fa-eye" onclick="ListarComite(' + cell.innerHTML + ',' + SPROCESO + ',' + SSERVICIO.replace(/"/g, "&quot;") + ');ListarProxMiembro(0, \'\');" style="font-size: 20px;" title="Ver miembros de comité"></i></div>'
                        });
                        t.column(3, {}).nodes().each(function (cell, i) {
                            t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDPROCESO = cell.innerHTML; } });
                            cell.innerHTML = '<div><a href="' + baseUrl + 'Gestion/ExportarFormato?NIDPROCESO=' + NIDPROCESO + '&NOPT=30" target="_blank"  >' + cell.innerHTML + '</a></div>'
                        });
                    }

                }).draw();

            } else {
                var t = $('#tbl_Proceso').DataTable({
                    data: data,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "30%", "targets": 1, "orderable": true },
                    { "width": "60%", "targets": 2, "orderable": true /*",orderData": [3, 4]*/ },
                    { "width": "10%", "targets": 3, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
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
                    //"lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "left").css("width", "20%");
                        $('td:eq(2)', nRow).css("text-align", "left").css("width", "70%");
                        $('td:eq(3)', nRow).css("text-align", "center").css("width", "10%");
                        return nRow;
                    },
                    "bFilter": false,
                    //"scrollX": true,
                    "bLengthChange": false,
                    destroy: true
                });

                t.clear().draw();
            }
        }
    });

    ListarComite(0, '', '');
    ListarProxMiembro(0, '');
}

function ListarComite(NIDPROCESO, SPROCESO, SSERVICIO) {
    if (NIDPROCESO != 0) {
        document.getElementById('lblnomProceso').innerHTML = '<b>' + SPROCESO + " - " + SSERVICIO + '</b><br/><br/>';
        document.getElementById('lblnomProceso2').innerHTML = '<b>' + SPROCESO + " - " + SSERVICIO + '</b>';
        $("#NIDPROCESO").val(NIDPROCESO);
        $("#SPROCESO").val(SPROCESO);
        $("#SSERVICIO").val(SSERVICIO);
    }

    var dataObject = JSON.stringify({
        'NOPT': 1, 'NIDPROCESO': NIDPROCESO, 'SP': 'SP_LISTA_PROCESOCOMITE'
    });

    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Comite').DataTable({
                    data: inf,
                    "order": [
                              [3, "asc"],
                              [4, "asc"]
                    ],
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false /*",orderData": [3, 4]*/ },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "35%", "targets": 4, "orderable": true },
                    { "width": "45%", "targets": 5, "orderable": true },
                    { "width": "10%", "targets": 6, "orderable": false },
                    { "width": "5%", "targets": 7, "orderable": false },
                    { "width": "5%", "targets": 8, "orderable": false },
                    { "width": "5%", "targets": 9, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
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
                    "lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "40%");
                        $('td:eq(5)', nRow).css("text-align", "left").css("width", "35%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(8)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(9)', nRow).css("text-align", "center").css("width", "5%");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDCOMITE' },
                        { data: 'NIDPERSONAL' },
                        { data: 'NIDPROCESO' },
                        { data: 'SPROCESO' },
                        { data: 'SNOMBREPERSONA' },
                        { data: 'SOFICINA' },
                        { data: 'STIPO_EVALUADOR' },
                        { data: 'NIDCOMITE' },
                        { data: 'NIDPERSONAL' },
                        { data: 'NIDCOMITE' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        var SNOMBREPERSONA = '';

                        t.column(7, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarMiembroComite(' + cell.innerHTML + ');" style="font-size: 20px;" title="Eliminar registro"></i></div>'
                        });
                        t.column(8, {}).nodes().each(function (cell, i) {
                            t.column(4, {}).nodes().each(function (cell, j) { if (i == j) { SNOMBREPERSONA = "'" + cell.innerHTML + "'"; } });
                            cell.innerHTML = '<div><i class="fa fa-eye" onclick="ListarProxMiembro(' + cell.innerHTML + ',' + SNOMBREPERSONA + ');" style="font-size: 20px;" title="Ver procesos en los que participa"></i></div>'
                        });
                        t.column(9, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-pencil" onclick="HabilitarCalificar(' + cell.innerHTML + ');" style="font-size: 20px;" title="Habilitar Calificar"></i></div>'
                        });
                    }
                }).draw();
        }
    });
}

function EliminarMiembroComite(NIDCOMITE) {
    var NIDPROCESO = $('#NIDPROCESO').val();
    var SPROCESO = $('#SPROCESO').val();
    var SSERVICIO = $('#SSERVICIO').val();
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCOMITE': NIDCOMITE,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Gestion/SP_GUARDAR_PROCESOCOMITE',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert(result.SMENSAJE);
                    ListarProceso();
                    ListarComite(NIDPROCESO, SPROCESO, SSERVICIO);

                }
            });
        }
    });
}
function HabilitarCalificar(NIDCOMITE) {
    bootbox.confirm("¿Está seguro que desea realizar esta habilitación?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCOMITE': NIDCOMITE
            });
            $.ajax({
                url: baseUrl + 'Gestion/SP_HABILITAR_CALIFICAR',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    if (result.SMENSAJE == "OK") 
                        bootbox.alert("Se habilitó al evaluador para que pueda modificar las calificaciones de este proceso.");
                    else
                        bootbox.alert(result.SMENSAJE);
                }
            });
        }
    });
}
function SetPersonal() {
    $("#NIDPERSONAL").val($(".modal-body #ddl_Personal").val());
}

function CargarPersonal() {
    $.ajax({
        url: baseUrl + 'Gestion/SP_LISTA_PERSONAL',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ 'NOPT': 1 }),
        success: function (data) {
            $(".modal-body #ddl_Personal").empty();
            $(".modal-body #ddl_Personal").append('<option value="0" >Seleccione</option>');

            for (var i = 0; i < data.length; i++) {
                $(".modal-body #ddl_Personal").append('<option value="' + data[i]["NCODIGOPERSONA"] + '">' +
                     data[i]["SNOMBREPERSONA"] + ' (' + data[i]["STIPODOCUMENTO"] + ' ' + data[i]["SNUMERODOCUMENTO"] + ')' + '</option>');
            }

            $(".modal-body #ddl_Personal").select2({
                placeholder: "Seleccione personal",
                allowClear: true
            });
        },

        error: function (ex) {
            alert('Error, no se cargó la lista de personal.' + ex);
        }
    });
}

function LimpiarComite() {
    $("#NIDPERSONAL").val(0);
}

function GuardarComite() {
    var NIDESTADO = $("#ID_ALL_C").is(':checked') ? 1 : 0;
    var NPRINCIPAL = $("#NPRINCIPAL").is(':checked') ? 1 : 0;
    var NIDPROCESO = $('#NIDPROCESO').val();
    var SPROCESO = $('#SPROCESO').val();
    var SSERVICIO = $('#SSERVICIO').val();
    var NIDPERSONAL = $('#NIDPERSONAL').val();
    var NTIPO_EVALUADOR = $('#NTIPO_EVALUADOR').val();
    var BACTIVO = 1;
    var NREEMPLAZO = $("#NREEMPLAZO").is(':checked') ? 1 : 0;

    var NREVALCUR = $("#NREVALCUR").is(':checked') ? 1 : 0;
    var NREVALTEC = $("#NREVALTEC").is(':checked') ? 1 : 0;
    var NRENTREVISTA = $("#NRENTREVISTA").is(':checked') ? 1 : 0;
    var DSUSTENTOR = $('#DSUSTENTOR').val();
    var error = "";

    if (NIDPROCESO == "0") {
        error += "proceso, ";
    }

    if (NTIPO_EVALUADOR == "0") {
        error += "tipo de evaluador, ";
    }

    if (NIDPERSONAL == "0") {
        error += "personal, ";
    }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'El campo ' + error + ' debe ser válido. ';
    }

    if (error != '') {
        bootbox.alert(error);
    } else {
        var dataObject = JSON.stringify({
            'NIDPROCESO': NIDPROCESO,
            'NIDPERSONAL': NIDPERSONAL,
            'NTIPO_EVALUADOR': NTIPO_EVALUADOR,
            'BACTIVO': BACTIVO,
            'NIDESTADO': NIDESTADO,
            'NRESULTADO': NPRINCIPAL,
            'NREEMPLAZO': NREEMPLAZO,
            'NREVALCUR': NREVALCUR,
            'NREVALTEC': NREVALTEC,
            'NRENTREVISTA': NRENTREVISTA,
            'DSUSTENTOR': DSUSTENTOR
        });

        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                bootbox.alert("Operación Cancelada.");
                return;
            } else {
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_PROCESOCOMITE',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        LimpiarComite();
                        ListarComite(NIDPROCESO, SPROCESO, SSERVICIO);
                        ListarProxMiembro(0, '');
                        $('#ModalComite').modal('hide');
                        bootbox.alert(result.SMENSAJE);
                    }
                });
            }
        });
    }
}

function ListarProxMiembro(NIDPERSONAL, SNOMBREPERSONA) {
    if (NIDPERSONAL != 0) {
        document.getElementById('lblnomProcesoxMiembro').innerHTML = '<b>' + SNOMBREPERSONA + '</b>';
    }
    else {
        document.getElementById('lblnomProcesoxMiembro').innerHTML = '';
    }

    var dataObject = JSON.stringify({
        'NOPT': 2, 'NIDPERSONAL': NIDPERSONAL, 'SP': 'SP_LISTA_PROCESOCOMITE'
    });

    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_ProcesosxMiembro').DataTable({
                    data: inf,
                    "order": [
                              [3, "desc"],
                              [4, "asc"]
                    ],
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false /*",orderData": [3, 4]*/ },
                    { "width": "30%", "targets": 3, "orderable": true },
                    { "width": "70%", "targets": 4, "orderable": true }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
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
                    "lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "30%");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "70%");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDCOMITE' },
                        { data: 'NIDPERSONAL' },
                        { data: 'NIDPROCESO' },
                        { data: 'SPROCESO' },
                        { data: 'SSERVICIO' }
                    ]
                });
        }
    });
}

function AbrirModalPR(idProceso) {
    $('#ModalProceso').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
    if (idProceso != "") {
        SP_CONSULTA_PROCESO(idProceso)
    } else {
        CARGARDDL(4, 'NIDCONVOCATORIA', 0);
        CARGARDDL(7, 'NRESULTADO', 1);
        CARGARDDL(0, 'IDOFICODIGO', 0, 0, 'Seleccione', 'O','S');
        CARGARDDL(0, 'IDSERCASCODIGO', 0, 0, 'Seleccione', 'PUESTOS','S');
        cargarBases(0);
        cargarCronograma(0);
    }
} 
function cargaMeta(value) {
    var anio = $("#NANIO_G").val();
    CARGARDDL(1000, 'SIAF', 0, anio, 'Seleccione', value);

}
function SP_CONSULTA_PROCESO(idProceso) {
    var dataObject = JSON.stringify({
        'NOPT': 2,
        'NIDPROCESO': idProceso,
        'SP': 'SP_LISTA_PROCESO'
    });

    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            if (data.length > 0) {
                $("#NCOLEG_OBLIG").prop("checked", "");
                $("#BACTIVO").prop("checked", "");
                $("#NELENCO").prop("checked", "");
                $('#NIDPROCESO_M').val(data[0]["NIDPROCESO"]);
                $('#NEXP_GEN').val(data[0]["NEXP_GEN"]);
                $('#NSUELDO').val(data[0]["NSUELDO"]);
                $('#NEXP_ESP').val(data[0]["NEXP_ESP"]);
                $('#SSERVICIO_M').val(data[0]["SSERVICIO"]);
                $('#SPROCESO_M').val(data[0]["SPROCESO"]);
                $('#hdItemsFA').val(data[0]["SIDSFORMACIONACAD"]);
                $('#hdItemsGA').val(data[0]["SIDSGRADOSACAD"]);
                $('#itemsGA').html(data[0]["LISTA_GA"]);
                $('#itemsFA').html(data[0]["LISTA_FA"]);
                if (data[0]["BACTIVO"] == 1) $("#BACTIVO").prop("checked", "checked");
                if (data[0]["NCOLEG_OBLIG"] == 1) $("#NCOLEG_OBLIG").prop("checked", "checked");
                if (data[0]["NELENCO"] == 1) $("#NELENCO").prop("checked", "checked");
                if (data[0]["NOBLIG_BREVETE"] == 1) $("#NOBLIG_BREVETE").prop("checked", "checked");
                if (data[0]["NOBLIG_DJ"] == 1) $("#NOBLIG_DJ").prop("checked", "checked");
                $('#NPLAZAS').val(data[0]["NPLAZAS"]);
                $('#DOBJETO').val(data[0]["DOBJETO"]);
                $('#DLUGAR').val(data[0]["DLUGAR"]);
                $('#SDURACION').val(data[0]["SDURACION"]);
                $('#DPUESTO').val(data[0]["DPUESTO"]);
                $('#NTIPOBASE').val(data[0]["NTIPOBASE"]);
                $('#AIRHSP').val(data[0]["SPLAZA_AIRHSP"]);
                $('#IDFTECODIGO').val(data[0]["IDFTECODIGO"]);

                if (data[0]["NRNA_OBLIG"] == 1) $("#NRNA_OBLIG").prop("checked", "checked");
                if (data[0]["NCOLEGHAB_OBLIG"] == 1) $("#NCOLEGHAB_OBLIG").prop("checked", "checked");
                if (data[0]["NOCI"] == 1) $("#NOCI").prop("checked", "checked");
                if (data[0]["NMESES"] == 1) $("#NMESES").prop("checked", "checked");

                CARGARDDL(4, 'NIDCONVOCATORIA', data[0]["NIDCONVOCATORIA"],0,'Seleccione','T');
                CARGARDDL(7, 'NRESULTADO', data[0]["NRESULTADO"]);
                CARGARDDL(0, 'IDOFICODIGO', data[0]["IDOFICODIGO"], 0, 'Seleccione', 'O','S');
                CARGARDDL(0, 'IDSERCASCODIGO', data[0]["IDSERCASCODIGO"], 0, 'NO EXISTE EN EL QUIPU', 'PUESTOS','S');
                $('#SIAF').val(data[0]["SIAF"]);
                cargarBases(idProceso);
                cargarCronograma(idProceso);
                CARGARDDL($('#NTIPOBASE').val(), 'NTIPO', 0,0,'Seleccione','TB');
                setDate('d_cro');
                setDate('h_cro');
                CARGARDDL($('#NTIPOBASE').val(), 'NTIPO_CRO', 0, 0, 'Seleccione', 'TC');
            }
        }
    });
}
function setPuesto(value) {
    if (value > 0) {
        $("#DPUESTO").hide();
        var DPUESTO = $('select[name="IDSERCASCODIGO"] option:selected').text()
        $('#DPUESTO').val(DPUESTO);
    } else {
        $("#DPUESTO").show();
    }
}
function LimpiarProceso() {
    $("#NIDPROCESO_M").val("");
    $("#NEXP_GEN").val("");
    $("#NEXP_ESP").val("");
    $("#SSERVICIO_M").val("");
    $("#SPROCESO_M").val("");
    $("#NIDCONVOCATORIA").val(0);
    $('#hdItemsFA').val("");
    $('#hdItemsGA').val("");
    $("#BACTIVO").prop("checked", "checked");
    $("#NCOLEG_OBLIG").prop("checked", "");
    $("#NELENCO").prop("checked", "checked");
    $("#NPLAZAS").val("");
    $('#itemsGA').html("");
    $('#itemsFA').html("");
    $('#NSUELDO').val("");
    $('#IDOFICODIGO').val(-1);
    $('#DOBJETO').val("");
    $('#DLUGAR').val("");
    $('#SDURACION').val("");
    $('#DPUESTO').val("");
    $("#NOBLIG_BREVETE").prop("checked", "");
    $("#NOBLIG_DJ").prop("checked", "");
    $("#NCOLEGHAB_OBLIG").prop("checked", "");
    $("#NRNA_OBLIG").prop("checked", "");
    $("#NOCI").prop("checked", "");
    $("#NMESES").prop("checked", "");
    $('#AIRHSP').val("");
    $('#IDFTECODIGO').val(0);
    $('#SIAF').val(0);
    $('#IDSERCASCODIGO').val(0);
}


function GuardarProceso() {
    var BESTADO = 1;
    var NEXP_GEN = $('#NEXP_GEN').val();
    var NEXP_ESP = $('#NEXP_ESP').val();
    var NCOLEG_OBLIG = $("#NCOLEG_OBLIG").is(':checked') ? 1 : 0;
    var SSERVICIO = $('#SSERVICIO_M').val();
    var SPROCESO = $('#SPROCESO_M').val();
    var NPROCESO = $('#NPROCESO').val();
    var NIDCONVOCATORIA = $('#NIDCONVOCATORIA').val();
    var NIDPROCESO = $('#NIDPROCESO_M').val();
    var BACTIVO = $("#BACTIVO").is(':checked') ? 1 : 0;
    var SIDSFORMACIONACAD = $('#hdItemsFA').val();
    var SIDSGRADOSACAD = $('#hdItemsGA').val();
    var NELENCO = $("#NELENCO").is(':checked') ? 1 : 0;
    var NOBLIG_BREVETE = $("#NOBLIG_BREVETE").is(':checked') ? 1 : 0;
    var NOBLIG_DJ = $("#NOBLIG_DJ").is(':checked') ? 1 : 0;
    var NPLAZAS = $('#NPLAZAS').val();
    var NSUELDO = $('#NSUELDO').val();
    var IDOFICODIGO = $('#IDOFICODIGO').val();
    var NRNA_OBLIG = $("#NRNA_OBLIG").is(':checked') ? 1 : 0;
    var NCOLEGHAB_OBLIG = $("#NCOLEGHAB_OBLIG").is(':checked') ? 1 : 0;
    var NRESULTADO = $('#NRESULTADO').val();
    var NOCI = $("#NOCI").is(':checked') ? 1 : 0;
    var NMESES = $("#NMESES").is(':checked') ? 1 : 0;

    var DOBJETO = $('#DOBJETO').val();
    var DLUGAR = $('#DLUGAR').val();
    var SDURACION = $('#SDURACION').val();
    var DPUESTO = $('#DPUESTO').val();
    var NTIPOBASE = $('#NTIPOBASE').val();

    var IDFTECODIGO = $('#IDFTECODIGO').val();
    var AIRHSP = $('#AIRHSP').val();
    var SIAF = $('#SIAF').val();
    var IDSERCASCODIGO = $('#IDSERCASCODIGO').val();


    var error = "";
    if (AIRHSP.length > 0 && AIRHSP.length < 6) error += "AIRHSP debe ser de 6 dígitos, ";
    if (NIDCONVOCATORIA == 0) error += "convocatoria, ";
    if (SSERVICIO == "") error += "servicio, ";
    if (SPROCESO == "") error += "proceso, ";
    if (NEXP_GEN == "") error += "experiencia genérica, ";
    if (NEXP_ESP == "") error += "experiencia específica, ";
    if (NPLAZAS == "") error += "Nro.de plazas, ";

    if (error != '') {
        error = error.substring(0, error.length - 2);
        error = 'El campo ' + error + ' debe ser válido. ';
        bootbox.alert(error);
    } else {
        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
               // bootbox.alert("Operación Cancelada.");
                return;
            } else {

                var dataObject = JSON.stringify({
                    'BESTADO': BESTADO,
                    'NEXP_GEN': NEXP_GEN,
                    'NEXP_ESP': NEXP_ESP,
                    'NCOLEG_OBLIG': NCOLEG_OBLIG,
                    'SSERVICIO': SSERVICIO,
                    'SPROCESO': SPROCESO,
                    'NPROCESO': NPROCESO,
                    'NIDPROCESO': NIDPROCESO,
                    'NIDCONVOCATORIA': NIDCONVOCATORIA,
                    'BACTIVO': BACTIVO,
                    'SIDSFORMACIONACAD': SIDSFORMACIONACAD,
                    'SIDSGRADOSACAD': SIDSGRADOSACAD,
                    'NPLAZAS': NPLAZAS,
                    'NELENCO': NELENCO,
                    'NSUELDO': NSUELDO,
                    'IDOFICODIGO': IDOFICODIGO,
                    'DPUESTO': DPUESTO,
                    'DLUGAR': DLUGAR,
                    'SDURACION': SDURACION,
                    'DOBJETO': DOBJETO,
                    'NOBLIG_BREVETE': NOBLIG_BREVETE,
                    'NOBLIG_DJ': NOBLIG_DJ,
                    'NCOLEGHAB_OBLIG': NCOLEGHAB_OBLIG,
                    'NRNA_OBLIG': NRNA_OBLIG,
                    'NRESULTADO': NRESULTADO,
                    'NOCI': NOCI,
                    'NMESES': NMESES,
                    'IDFTECODIGO': IDFTECODIGO,
                    'AIRHSP': AIRHSP,
                    'SIAF': SIAF,
                    'IDSERCASCODIGO': IDSERCASCODIGO,
                    'NTIPOBASE': NTIPOBASE
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_PROCESO',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK") {
                            ListarProceso();
                            LimpiarProceso();
                            $('#ModalProceso').modal('hide');
                            bootbox.alert("Se grabó con éxito.")
                        }
                        else {
                            bootbox.alert(result.SMENSAJE);
                        }
                    }
                });
            }
        });
    }
}

function CargarListaR(id_tabla, titulo, sigla) {
    var dataObject = JSON.stringify({
        'NIDTABLA': id_tabla,
        'SDATO': 'A'
    });
    var html = "";
    $("#chkMarcarTodos").prop('checked', false);
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_TABLA_D',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var items = $("#hdItems" + sigla).val();
            var arregloItems = '';
            var checked = '';
            if (items != '') {
                if (items.indexOf(',') == -1) {
                    arregloItems = new Array();
                    arregloItems[0] = items;
                } else {
                    arregloItems = items.split(',');
                }
            }
            for (var i = 0; i < data.length; i++) {

                checked = '';
                if (arregloItems.length > 0) {
                    for (var j = 0; j < arregloItems.length; j++) {
                        if (data[i]["NIDITEM"] == arregloItems[j]) {
                            checked = 'checked';
                            break;
                        }
                    }
                }

                html = html + "<div id=\"divFilaDatos\" style=\"cursor:pointer;height:20px;clear: both;	display:block;	font-family:Arial, Helvetica, sans-serif;\">";
                html = html + "<div id=\"div1-" + (i + 1) + "-" + data[i]["NIDITEM"] + "\"  style=\"width:20px;height:20px;   background: none repeat scroll 0% 0% rgb(234, 234, 235);    font-family: Arial,Helvetica,sans-serif;    color: rgb(0, 0, 0);    font-size: 11px;    text-align: left;    border: 1px solid rgb(255, 255, 255);    float: left;    display: block;\">";
                html = html + "<input type=\"checkbox\" id=\"chk-" + (i + 1) + "-" + data[i]["NIDITEM"] + "\" style=\"width:100%;height:auto;cursor:pointer;\" onclick=\"revisarMarcados();\" " + checked + "/>";
                html = html + "</div>";
                html = html + "<div id=\"div2-" + (i + 1) + "-" + data[i]["NIDITEM"] + "\" style=\"width:150px;height:20px; padding:2px; background: none repeat scroll 0% 0% rgb(234, 234, 235);    font-family: Arial,Helvetica,sans-serif;    color: rgb(0, 0, 0);    font-size: 11px;    text-align: left;    border: 1px solid rgb(255, 255, 255);    float: left;    display: block;\" onclick=\"seleccionarFila(this.id)\">" + data[i]["SDITEM"] + "</div>";
                html = html + "</div>";
            }
            $('#ModalRestriccion').modal({
                "backdrop": "static",
                "keyboard": true,
                "show": true
            });
            $("#divListadoSC").html(html);
            $("#h4Titulo").html(titulo);
            $("#hdsigla").val(sigla);
        }
    });

}

function marcarTodos(checked) {
    $("input[id ^= 'chk-']").each(function (variableSinUsar) {
        this.checked = checked;
    });
}
function reemplazoChk(checked) {
    if (checked) { $("#divR").show() }
    else { $("#divR").hide() }
}
function revisarMarcados() {
    var bSeguir = true;

    $("input[id ^= 'chk-']").each(function (variableSinUsar) {
        if (!this.checked) {
            $("#chkMarcarTodos").prop('checked', false);
            bSeguir = false;
            return false;
        }
    });

    if (bSeguir) {
        $("#chkMarcarTodos").prop('checked', true);
    }
}

function seleccionarFila(id) {
    var values = id.split('-');
    if (values.length > 0) {
        $("div[id ^= 'div1-" + values[1] + "'] input").each(function (i) {
            this.checked = !this.checked
        });
    }
}

function GuardarSeleccion() {
    var items = '';
    var id = '';
    var values = '';
    var html = "";

    $("input[id ^= 'chk-']").each(function (variableSinUsar) {
        if (this.checked) {
            id = this.id;
            values = id.split('-');
            if (values.length > 0) {
                items += values[2] + ',';
            }
            html = html + $("#" + id.replace("chk", "div2")).html() + "<br/>";
        }
    });

    if (items != '') {
        items = items.substring(0, items.length - 1);
    }

    $("#hdItems" + $("#hdsigla").val()).val(items);
    $("#items" + $("#hdsigla").val()).html(html);
    cerrarSeleccion()
}

function cerrarSeleccion() {
    $('#ModalRestriccion').modal('hide');
}

function cargarBases(idProceso) {
    var dataObject = JSON.stringify({
        'NIDPROCESO': idProceso,
        'NTIPO_TABLA': 1
    });
    $.ajax({
        async: false,
        url: baseUrl + 'Gestion/SP_LISTA_BASES',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_bases').DataTable({
                data: inf,
                "columnDefs": [
                    { "width": "5%", "targets": 0, "orderable": false },
                    { "width": "5%", "targets": 1, "orderable": false },
                    { "width": "5%", "targets": 2, "orderable": false },
                    { "width": "5%", "targets": 3, "orderable": false },
                    { "width": "5%", "targets": 4, "orderable": false },
                    { "width": "5%", "targets": 5, "orderable": false },
                    { "width": "5%", "targets": 6, "orderable": false },
                    { "width": "5%", "targets": 7, "orderable": false },
                    { "width": "5%", "targets": 8, "orderable": false },
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<div style='padding-top:10px'><b>Bases</b></div>",
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
                "lengthMenu": [[5, 10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $('td:eq(0)', nRow).css("text-align", "center").css("width", "4%").attr("class", "edit");
                    $('td:eq(1)', nRow).css("text-align", "center").css("width", "4%").attr("class", "delete");
                    $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                    $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                    $('td:eq(4)', nRow).css("text-align", "left").css("width", "17%");
                    $('td:eq(5)', nRow).css("text-align", "left").css("width", "71%");
                    $('td:eq(6)', nRow).css("text-align", "center").css("width", "4%");
                    $('td:eq(7)', nRow).css("text-align", "center").css("display", "none");
                    $('td:eq(8)', nRow).css("text-align", "center").css("display", "none");
                    return nRow;
                },
                "bFilter": false,
                //"scrollX": true,
                "bLengthChange": true,
                "info": false,
                destroy: true,
                columns: [
                    { data: 'NIDREGISTRO' },
                    { data: 'NIDREGISTRO' },
                    { data: 'NIDPROCESO' },
                    { data: 'NIDREGISTRO' },
                    { data: 'SECCION' },
                    { data: 'SDESCRIPCION' },
                    { data: 'NPRIORIDAD' },
                    { data: 'ORDEN' },
                    { data: 'NIDITEM' }
                ],
                "order": [[7, "asc",6,"asc"]]
            });
            var cont = 0;
            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                    t.column(0, {}).nodes().each(function (cell, i) {
                        cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 18px;" title="EDITAR"></i></div>'
                    });
                    t.column(1, {}).nodes().each(function (cell, i) {
                        cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarBases(' + cell.innerHTML + ',1);" style="font-size: 18px;" title="ELIMINAR"></i></div>'
                    });
                }
            }).draw();
        }
    });
}
$('#tbl_bases').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_bases').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#NTIPO").val($(this).closest('tr').find('td:eq(8)').text());
    $("#SDESCRIPCION").val($(this).closest('tr').find('td:eq(5)').text());
    $("#NORDEN").val($(this).closest('tr').find('td:eq(6)').text());
    $("#hdNREGISTRO").val($(this).closest('tr').find('td:eq(3)').text());
    $("#divNorden").show();
    
});

function cargarCronograma(idProceso) {
    var dataObject = JSON.stringify({
        'NIDPROCESO': idProceso,
        'NTIPO_TABLA': 2
    });
    $.ajax({
        async: false,
        url: baseUrl + 'Gestion/SP_LISTA_BASES',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_cronograma').DataTable({
                data: inf,
                "order": [
                             [6, "asc"]
                ],
                "columnDefs": [
                    { "width": "5%", "targets": 0, "orderable": false },
                    { "width": "5%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "0%", "targets": 4, "orderable": false },
                    { "width": "0%", "targets": 5, "orderable": false },
                    { "width": "0%", "targets": 6, "orderable": false },
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<div style='padding-top:10px'><b>Cronograma</b></div>",
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
                "lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $('td:eq(0)', nRow).css("text-align", "center").css("width", "8%").attr("class", "delete");
                    $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                    $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                    $('td:eq(3)', nRow).css("text-align", "left").css("width", "68%");
                    $('td:eq(4)', nRow).css("text-align", "center").css("width", "12%");
                    $('td:eq(5)', nRow).css("text-align", "center").css("width", "12%");
                    $('td:eq(6)', nRow).css("display", "none");
                    return nRow;
                },
                "bFilter": false,
                //"scrollX": true,
                "bLengthChange": true,
                "info": false,
                destroy: true,

                columns: [
                    { data: 'NIDREGISTRO' },
                    { data: 'NIDPROCESO' },
                    { data: 'NIDREGISTRO' },
                    { data: 'SECCION' },
                    { data: 'DFECHAINI' },
                    { data: 'DFECHAFIN' },
                    { data: 'ORDENA' }
                    
                ]
            });
            var cont = 0;
            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                        t.column(0, {}).nodes().each(function (cell, i) {
                        cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarBases(' + cell.innerHTML + ',2);" style="font-size: 18px;" title="ELIMINAR"></i></div>'
                    });
                }

            }).draw();
        }
    });
}

function AgregarBase(tipotabla) {

    var BACTIVO = 1;
    var NIDPROCESO = $('#NIDPROCESO_M').val();
    var SDESCRIPCION = $('#SDESCRIPCION').val();
    var NIDREGISTRO = $('#hdNREGISTRO').val();
    var NPRIORIDAD = $("#NORDEN").val();
    var NTIPO = $("#NTIPO").val();
    var NTIPO_TABLA = tipotabla;
    var DFECHA_DESDE_CRO = $("#DFECHA_DESDE_CRO").val();
    var DFECHA_HASTA_CRO = $("#DFECHA_HASTA_CRO").val();

    if (NIDPROCESO == 0 || NIDPROCESO == "") {
        bootbox.alert("Antes de agregar las bases debe registrar los datos principales del proceso.");
        return;
    }

    var error = "";
    if (tipotabla == 1) {
        if (SDESCRIPCION == "") error += "descripción, ";
    } else {
        NTIPO = $("#NTIPO_CRO").val();
        if (DFECHA_DESDE_CRO == "" && DFECHA_HASTA_CRO == "") error += "Fecha, ";
    }
    if (NTIPO == 0) error += "sección, ";
    if (error != '') {
        error = error.substring(0, error.length - 2);
        error = 'El campo ' + error + ' debe ser válido. ';
        bootbox.alert(error);
    } else {
       bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                bootbox.alert("Operación Cancelada.");
                return;
            } else {

                var dataObject = JSON.stringify({
                    'BACTIVO': BACTIVO,
                    'NIDPROCESO': NIDPROCESO,
                    'SDESCRIPCION': SDESCRIPCION,
                    'NIDREGISTRO': NIDREGISTRO,
                    'NPRIORIDAD': NPRIORIDAD,
                    'NTIPO': NTIPO,
                    'NTIPO_TABLA': NTIPO_TABLA,
                    'SFECHA1': DFECHA_DESDE_CRO,
                    'SFECHA2': DFECHA_HASTA_CRO
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_BASES',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.mensaje == "OK") {
                            $("#SDESCRIPCION").val("");
                            $("#DFECHA_DESDE_CRO").val("");
                            $("#DFECHA_HASTA_CRO").val("");
                            $("#NORDEN").val("");
                            $("#hdNREGISTRO").val("");
                            $("#divNorden").hide();
                            cargarBases(NIDPROCESO);
                            cargarCronograma(NIDPROCESO);
                        }
                        else {
                            bootbox.alert(result.mensaje);
                        }
                    },
                    error: function (ex) {
                        alert('Error, no se grabó la lista de personal.' + ex.responseText);
                    }
                });
            }
        });
    }
}

function CargarBase(tipotabla) {
    var NIDPROCESO = $("#NIDPROCESO_M").val();
    var NIDCONVOCATORIA = $("#NIDCONVOCATORIA").val();
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCONVOCATORIA': NIDCONVOCATORIA,
                'NIDPROCESO': NIDPROCESO
            });
            $.ajax({
                url: baseUrl + 'Gestion/SP_CARGAR_CRONOGRAMA',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    cargarCronograma(NIDPROCESO);
                }
            });
        }
    });
}

function EliminarBases(nidregistro, tipo_tabla) {
    var NIDPROCESO = $('#NIDPROCESO_M').val();
    var NTIPO_TABLA = tipo_tabla
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDREGISTRO': nidregistro,
                'BACTIVO': 0,
                'NTIPO_TABLA': NTIPO_TABLA
            });
            $.ajax({
                url: baseUrl + 'Gestion/SP_GUARDAR_BASES',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    cargarBases(NIDPROCESO);
                    cargarCronograma(NIDPROCESO);
                }
            });
        }
    });
}