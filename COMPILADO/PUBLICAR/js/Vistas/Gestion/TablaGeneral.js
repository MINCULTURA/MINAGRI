
$(window).load(function () {
    cargarTGC();
        setCalendar('_1');
        setCalendar('_2', true);
        
});
$(function () {
    $('.time').mask('00:00');
});
function cargarTGC() {
    $.ajax({
        url: baseUrl + 'Gestion/SP_CONS_TABLA_C',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.length > 0) {
                var inf = data;
                var t = $('#tbl_TablaGC').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "70%", "targets": 1, "orderable": false },
                    { "width": "30%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "<b>LISTAS:</b>",
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
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("width", "70%");
                        $('td:eq(2)', nRow).css("text-align", "center").css("width", "30%").attr("class", "edit");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDTABLA' },
                        { data: 'SDTABLA' },
                        { data: 'NIDTABLA' },
                        { data: 'BFECHAS' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        t.column(2, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-eye" onclick="ListarTGD(' + cell.innerHTML  + ');" style="font-size: 20px;" title="Ver lista"></i></div>'
                        });
                    }
                }).draw();
            } else {
                var t = $('#tbl_TablaGC').DataTable({
                    data: data,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "70%", "targets": 1, "orderable": true },
                    { "width": "30%", "targets": 2, "orderable": false }
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
                    "lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("width", "70%");
                        $('td:eq(2)', nRow).css("text-align", "center").css("width", "30%");
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
    ListarTGD(0);
}

function ListarTGD(id) {
    $("#NIDTABLA").val(id);
    var dataObject = JSON.stringify({
        'NIDTABLA': id,
        'SDATO':'T'
    });
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_TABLA_D',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            if (data.length > 0) {
                var inf = data;
                var t = $('#tbl_TablaGD').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "40%", "targets": 2, "orderable": true },
                    { "width": "30%", "targets": 3, "orderable": true },
                    { "width": "10%", "targets": 4, "orderable": true },
                    { "width": "10%", "targets": 5, "orderable": false },
                    { "width": "10%", "targets": 6, "orderable": false },
                    { "width": "0%", "targets": 7, "orderable": false },
                    { "width": "0%", "targets": 8, "orderable": false },
                    { "width": "0%", "targets": 9, "orderable": false },
                    { "width": "0%", "targets": 10, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "<div style='padding-top:10px'><b>"+$("#SDITEM_T").val() + "</b></div>",
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
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("width", "40%");
                        $('td:eq(3)', nRow).css("text-align", "center").css("width", "30%");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "10%").attr("class", "edit").css("display", true);
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%").attr("class", "delete").css("display", true);
                        $('td:eq(7)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(8)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(9)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(10)', nRow).css("text-align", "center").css("display", "none");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDITEM' },
                        { data: 'BACTIVO' },
                        { data: 'SDITEM' },
                        { data: 'SSITEM' },
                        { data: 'SACTIVO' },
                        { data: 'NIDITEM' },
                        { data: 'NIDITEM' },
                        { data: 'SFECHA1' },
                        { data: 'SHORA1' },
                        { data: 'SFECHA2' },
                        { data: 'SHORA2' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        t.column(5, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                        });

                        t.column(6, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarTGD(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                        });
                    }
                }).draw();
            } else {
                var t = $('#tbl_TablaGD').DataTable({
                    data: data,
                    "columnDefs": [
                        { "width": "0%", "targets": 0, "orderable": false },
                        { "width": "0%", "targets": 1, "orderable": false },
                        { "width": "40%", "targets": 2, "orderable": true },
                        { "width": "30%", "targets": 3, "orderable": true },
                        { "width": "10%", "targets": 4, "orderable": true },
                        { "width": "10%", "targets": 5, "orderable": false },
                        { "width": "10%", "targets": 6, "orderable": false }
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
                    "lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("width", "40%");
                        $('td:eq(3)', nRow).css("text-align", "center").css("width", "30%");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "10%").attr("class", "edit").css("display", true);
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%").attr("class", "delete").css("display", true);
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
}

function EliminarTGD(id) {
    var NIDTABLA = $("#NIDTABLA").val();
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDTABLA':NIDTABLA,
                'NIDITEM': id,
                'BACTIVO': 2,
            });

            $.ajax({
                url: baseUrl + 'Gestion/SP_GUARDAR_TGD',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se eliminó el registro de la lista.!");
                    ListarTGD(NIDTABLA);
                }
            });
        }
    });
}

$('#tbl_TablaGD').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_TablaGD').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#NIDITEM").val($(this).closest('tr').find('td:eq(0)').text());
    $("#SDITEM").val($(this).closest('tr').find('td:eq(2)').text());
    $("#SSITEM").val($(this).closest('tr').find('td:eq(3)').text());
    $("#SFECHA1").val($(this).closest('tr').find('td:eq(7)').text());
    $("#SHORA1").val($(this).closest('tr').find('td:eq(8)').text());
    $("#SFECHA2").val($(this).closest('tr').find('td:eq(9)').text());
    $("#SHORA2").val($(this).closest('tr').find('td:eq(10)').text());
    if ($(this).closest('tr').find('td:eq(1)').text() == 1)
        $("#BACTIVO").prop("checked", "checked");
    else
        $("#BACTIVO").prop("checked", "");
    $('#ModalTGD').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
    $("#titulo_TGD").html( $("#SDITEM_T").val())

});

$('#tbl_TablaGC').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {
        
    }
    else {
        $('#tbl_TablaGC').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $("#SDITEM_T").val($(this).closest('tr').find('td:eq(1)').text());
    }
    ListarTGD($(this).closest('tr').find('td:eq(0)').text());
    var bfechas = $(this).closest('tr').find('td:eq(3)').text();
    $("#divfechas").hide();
    switch(bfechas){
        case "1": $("#divfechas").show();
                break;
        case "2": $("#divfechas").show();
         //   $("#div_fecha_2").show();
                break;
        }
});

function LimpiarTGD() {
    $("#NIDITEM").val(0);
}

function NuevoModalTGD() {
    if ($("#NIDTABLA").val() != 0) {
        $('#ModalTGD').modal({
            "backdrop": "static",
            "keyboard": true,
            "show": true
        });
    }
    else {
        bootbox.alert("Debe seleccionar una lista.");
    }
    $("#NIDITEM").val(0);
    $("#SDITEM").val("");
    $("#SSITEM").val("");
    $("#titulo_TGD").html($("#SDITEM_T").val())
    $("#BACTIVO").prop("checked", "checked");
    $("#SFECHA1").val("");
    $("#SHORA1").val("");
    $("#SFECHA2").val("");
    $("#SHORA2").val("");
}


function GuardarTGD() {
    var NIDITEM = $('#NIDITEM').val();
    var NIDTABLA = $('#NIDTABLA').val();
    var SDITEM = $('#SDITEM').val();
    var SSITEM = $('#SSITEM').val();
    var BACTIVO = $("#BACTIVO").is(':checked') ? 1 : 0;
    var SFECHA1 = $('#SFECHA1').val() + " " + $('#SHORA1').val();
    var SFECHA2 = $('#SFECHA2').val() + " " + $('#SHORA2').val();
    var error = "";
    var error2 = "";

    if (SDITEM == "") {
        error += "descripción, ";
    }

    if (SSITEM == "") {
        error += "sigla, ";
    }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }

    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {

        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                bootbox.alert("Operación Cancelada.");
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDITEM': NIDITEM,
                    'NIDTABLA': NIDTABLA,
                    'SDITEM': SDITEM,
                    'SSITEM': SSITEM,
                    'BACTIVO': BACTIVO,
                    'SFECHA1': SFECHA1,
                    'SFECHA2': SFECHA2
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_TGD',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        ListarTGD(NIDTABLA);
                        $('#ModalTGD').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}