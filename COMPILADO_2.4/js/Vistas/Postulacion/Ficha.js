$(window).load(function () {
    CargarProcesos();
    LISTAR_CONVOCATORIAS();
    var menasje_ult = $("#txtmensaje_ult").val()
    if (menasje_ult != "")
        bootbox.alert(menasje_ult);
});

$('#btn_guardarConv').click(function () { GUARDARPROCESOUSU(); });


function LISTAR_CONVOCATORIAS() {
    var NIDCODIGOUSUARIO = $('#txtcodusu').val();

    var dataObject = JSON.stringify({
        'NIDCODIGOUSUARIO': NIDCODIGOUSUARIO
    });

    $.ajax({
        url: baseUrl + 'Postulacion/SP_LISTA_PROCXUSU',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            if (data.length > 0) {
                var inf = data;
                var t = $('#tbl_ProcesoUsuario').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "50%", "targets": 3, "orderable": true },
                    { "width": "10%", "targets": 4, "orderable": false },
                    { "width": "0%", "targets": 5, "orderable": false },
                    { "width": "10%", "targets": 6, "orderable": false },
                    { "width": "10%", "targets": 7, "orderable": false },
                    { "width": "0%", "targets": 8, "orderable": false },
                    { "width": "20%", "targets": 9, "orderable": false },
                    { "width": "20%", "targets": 10, "orderable": false }
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
                        $('td:eq(2)', nRow).css("text-align", "left").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "50%");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(8)', nRow).css("text-align", "left").css("display", "none");
                        $('td:eq(9)', nRow).css("text-align", "left").css("width", "30%");
                        $('td:eq(10)', nRow).css("display", "none");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'SNOMBRE' },
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESOUSU' },
                    { data: 'NIDPROCESOUSU' },
                    { data: 'NIDPROCESOUSU' },
                    { data: 'BESTADO' },
                    { data: 'MENSAJE' },
                    { data: 'NTIPO' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        t.column(7, {}).nodes().each(function (cell, i) {
                            t.column(8, {}).nodes().each(function (cell, j) { if (i == j) { BESTADO = cell.innerHTML; } });
                            if (BESTADO == "1")
                                cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="ELIMINARPROCESOUSU(' + cell.innerHTML + ');" style="cursor: pointer;font-size: 20px;" title="ELIMINAR"></i></div>'
                            else
                                cell.innerHTML = "";
                        });

                        t.column(6, {}).nodes().each(function (cell, i) {
                            t.column(8, {}).nodes().each(function (cell, j) { if (i == j) { BESTADO = cell.innerHTML; } });
                            t.column(9, {}).nodes().each(function (cell, j) { if (i == j) { MENSAJE = cell.innerHTML; } });
                            t.column(10, {}).nodes().each(function (cell, j) { if (i == j) { NTIPO = cell.innerHTML; } });
                            var action = "FichaDetalle2";
                            if (NTIPO == "2")
                                action = "FichaDetallePos";
                            if (BESTADO == "1")
                                cell.innerHTML = '<div> <a href="javascript:void(0)" onclick="window.open(baseUrl + \'Postulacion/' + action + '?modo=Editar&NIDPROCESOUSU=' + cell.innerHTML + '\',\'_self\')" style="color:black;" > <i class="fa fa-pencil" style="font-size: 20px;" title="EDITAR"></i> </a> </div>'
                            else
                                cell.innerHTML = '<div> <a href="javascript:void(0)" onclick="window.open(baseUrl + \'Postulacion/' + action + '?modo=VerP&NIDPROCESOUSU=' + cell.innerHTML + '\',\'_self\')" style="color:black;" > <i class="fa fa-pencil" style="font-size: 20px;" title="EDITAR"></i> </a> </div>'
                        });

                        t.column(5, {}).nodes().each(function (cell, i) {
                            t.column(8, {}).nodes().each(function (cell, j) { if (i == j) { BESTADO = cell.innerHTML; } });
                            t.column(10, {}).nodes().each(function (cell, j) { if (i == j) { NTIPO = cell.innerHTML; } });
                            if (BESTADO == "2" && NTIPO == "1")
                                cell.innerHTML = '<div><i class="fa fa-print" onclick="Ver_RPT_FICHA(' + cell.innerHTML + ');" style="cursor: pointer;font-size: 20px;" title="VER REPORTE"></i></div>'
                            else
                                cell.innerHTML = "";
                        });

                        t.column(4, {}).nodes().each(function (cell, i) {
                            t.column(8, {}).nodes().each(function (cell, j) { if (i == j) { BESTADO = cell.innerHTML; } });
                            t.column(10, {}).nodes().each(function (cell, j) { if (i == j) { NTIPO = cell.innerHTML; } });
                            if (BESTADO == "1") {
                                if (NTIPO == "1")
                                    cell.innerHTML = '<div><i class="fa fa-save" onclick="EnviarFicha(' + cell.innerHTML + ');" style="cursor: pointer;font-size: 20px;" title="ENVIAR FICHA"></i></div>';
                                else
                                    cell.innerHTML = "";
                            }
                            else
                                cell.innerHTML = "ENVIADO";
                        });
                        t.column(9, {}).nodes().each(function (cell, i) {
                            if (cell.innerHTML == "OK")
                                cell.innerHTML = '';
                            else
                                cell.innerHTML = 'Solo podrá visualizar esta ficha: ' + cell.innerHTML;
                        });
                    }

                }).draw();
            } else {
                var t = $('#tbl_ProcesoUsuario').DataTable({
                    data: data,
                    "columnDefs": [
                     { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "70%", "targets": 3, "orderable": true },
                    { "width": "10%", "targets": 4, "orderable": false },
                    { "width": "0%", "targets": 5, "orderable": false },
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
                        $('td:eq(2)', nRow).css("text-align", "left").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "70%");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%");
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

function GUARDARPROCESOUSU() {
    var NIDCODIGOUSUARIO = $('#txtcodusu').val();
    var NIDPROCESO = $('#NIDPROCESO').val();
    if (NIDPROCESO == "0") {
        bootbox.alert("Debe seleccionar un proceso.");
    }
    else {
        var NIDACTIVIDAD = $("#NIDACTIVIDAD").val();
        if ($("#ddl_Tipo").val() == "2" && NIDACTIVIDAD == "0") {
            bootbox.alert("Debe seleccionar una actividad.");
        } else {
            bootbox.confirm("¿Está seguro que desea agregar esta postulación?", function (resultado) {
                if (resultado != true) {
                    return;
                } else {
                    var dataObject = JSON.stringify({
                        'NIDPROCESOUSU': 0,
                        'NIDPROCESO': NIDPROCESO,
                        'NIDCODIGOUSUARIO': NIDCODIGOUSUARIO,
                        'BACTIVO': 1,
                        'NACTIVIDAD': NIDACTIVIDAD
                    });

                    $.ajax({
                        url: baseUrl + 'Postulacion/SP_GUARDAR_PROCESOUSU',
                        type: 'POST',
                        datatype: 'json',
                        contentType: 'application/json',
                        data: dataObject,
                        success: function (result) {
                            if (result.mensaje != 'OK')
                                bootbox.alert(result.mensaje);
                            else {
                                if ($("#ddl_Tipo").val() != "2")
                                    window.open(baseUrl + 'Postulacion/FichaDetalle2?modo=Editar&NIDPROCESOUSU=' + result.NIDPROCESOUSU, '_self')
                                else {
                                    bootbox.alert("Se realizó el proceso con éxito");
                                    CargarProcesos();
                                    LISTAR_CONVOCATORIAS();
                                }
                            }
                        }
                    });
                }
            });
        }
    }
}

function ELIMINARPROCESOUSU(NIDPROCESOUSU) {
    bootbox.confirm("¿Está seguro que desea eliminar esta postulación?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDPROCESOUSU': NIDPROCESOUSU,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_PROCESOUSU',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó la postulación con éxito.!");
                    LISTAR_CONVOCATORIAS();
                    CargarProcesos();
                }
            });
        }
    });

}

function Ver_RPT_FICHA(NIDPROCESOUSU_P) {
    
    var ventana = "../Reports/RPT_FICHA.aspx";

    NIDPROCESOUSU = NIDPROCESOUSU_P;

    //alert(ventana + '?NIDPROCESOUSU=' + NIDPROCESOUSU);
    window.open(ventana + '?NIDPROCESOUSU=' + NIDPROCESOUSU, "");
}

function EnviarFicha(id) {
    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': id
    });
    bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
        if (resultado != true) {
         //   bootbox.alert("Operación Cancelada.");
            return;
        } else {
            $.ajax({
                url: baseUrl + 'Postulacion/SP_ENVIAR_FICHA',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    if (result.SMENSAJE == "OK") {
                        LISTAR_CONVOCATORIAS();
                        bootbox.alert("Se envió la ficha con éxito.")
                    }
                    else {
                        bootbox.alert(result.SMENSAJE);
                    }
                },
                error: function (xhr, status, p3, p4) {
                    bootbox.alert("Error al intentar enviar ficha.");
                }
            });
        }
    });
}
function SetCodigo() {
    $("#NIDPROCESO").val($("#ddl_Proceso").val());
    CargarActividades();
}
function CargarProcesos() {
    CargarActividades();
    $.ajax({
        url: baseUrl + 'Postulacion/SP_OBT_PROCESODISPO',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ 'NIDCODIGOUSUARIO': $('#txtcodusu').val(), 'BESTADO': $("#ddl_Tipo").val() }),
        success: function (data) {
            $("#ddl_Proceso").empty();
            $("#ddl_Proceso").append('<option value="0" >Seleccione</option>');

            for (var i = 0; i < data.length; i++) {
                $("#ddl_Proceso").append('<option value="' + data[i]["NIDPROCESO"] + '">' +
                     data[i]["SNOMBRE"] + '</option>');
            }

            $("#ddl_Proceso").select2({
                placeholder: "Seleccione proceso",
                allowClear: true
            });
        },

        error: function (ex) {
            alert('Error, no se cargó la lista de procesos.' + ex);
        }
    });
}
function CargarActividades() {
    if ($("#ddl_Tipo").val() == "1") {
        $("#DivActividades").hide();
        $("#DivActividades2").hide();
    }
    else {
        var html = "";
        var html1 = "";
        var html2 = "";
        var html3 = "";
        $("#DivActividades").show();
        $("#DivActividades2").show();
        $.ajax({
            url: baseUrl + 'Gestion/SP_LISTADO',
            type: 'POST',
            datatype: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ 'NOPT': 2, 'NIDPROCESO': $("#NIDPROCESO").val() }),
            success: function (data) {
                $("#ddl_Actividad").empty();
                $("#ddl_Actividad").append('<option value="0" >Seleccione</option>');

                for (var i = 0; i < data.length; i++) {
                    $("#ddl_Actividad").append('<option value="' + data[i]["NIDACTIVIDAD"] + '">' +
                         data[i]["NOMBRE"] + '</option>');
                    html = html + "<textarea id='descripcion" + data[i]["NIDACTIVIDAD"] + "' style='text-align:justify;display:none;height:100px' class='form-control' readonly>" + data[i]["SDESCRIPCION"] + "</textarea>"
                    html1 = html1 + "<textarea id='perfil" + data[i]["NIDACTIVIDAD"] + "' style='text-align:justify;display:none;height:100px' class='form-control' readonly>" + data[i]["SPERFIL"] + "</textarea>"
                    html2 = html2 + "<textarea id='acciones" + data[i]["NIDACTIVIDAD"] + "' style='text-align:justify;display:none;height:100px' class='form-control' readonly>" + data[i]["SACCIONES"] + "</textarea>"
                    html3 = html3 + "<textarea id='vacantes" + data[i]["NIDACTIVIDAD"] + "' style='text-align:center;display:none;height:100px' class='form-control' readonly>" + data[i]["NVACANTES"] + "</textarea>"
                }
                $("#descripcionA").html(html);
                $("#perfilA").html(html1);
                $("#accionesA").html(html2);
                $("#vacantesA").html(html3);
                $("#ddl_Actividad").select2({
                    placeholder: "Seleccione actividad",
                    allowClear: true
                });
            },
            error: function (ex) {
                alert('Error, no se cargó la lista de actividades.' + ex);
            }
        });
    }
}
function SetCodigoA() {
    var actividad = $("#ddl_Actividad").val()
    $("#NIDACTIVIDAD").val(actividad);
    $("#descripcion" + $("#codAnterior").val()).hide();
    $("#descripcion" + actividad).show();
    $("#perfil" + $("#codAnterior").val()).hide();
    $("#perfil" + actividad).show();
    $("#acciones" + $("#codAnterior").val()).hide();
    $("#acciones" + actividad).show();
    $("#vacantes" + $("#codAnterior").val()).hide();
    $("#vacantes" + actividad).show();
    $("#codAnterior").val(actividad)
}