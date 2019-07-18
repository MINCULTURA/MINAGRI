
$(window).load(function () {
    ListarProceso();
    //document.getElementById("btn_guardar").innerHTML = 'Agregar    <i class="fa fa-plus"></i>';//para cambiar texto de un boton    
});

function ListarProceso() {
    var NANIO = $("#NANIO_G").val();
    var NIDPERSONAL = $("#txtcodusu").val();
    var NIDPERFIL = $("#txtperfil").val();
    var NTODOS = $("#CHK_TODOS").is(':checked') ? 2 : 3;
    var dataObject = JSON.stringify({
        'NOPT': NANIO, 'NIDPERSONAL': NIDPERSONAL, 'NIDPERFIL': NIDPERFIL, 'SP': 'SP_LISTA_PROCESOCOMITE'
    });

    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Proceso').DataTable({
                    data: inf,
                    "order": [
                              [3, "desc"],
                              [4, "asc"]
                    ],
                    "columnDefs": [
                    { "width": "10%", "targets": 5, "orderable": false },
                    { "width": "0%", "targets": 6, "orderable": false },
                    { "width": "0%", "targets": 7, "orderable": false },
                    { "width": "0%", "targets": 8, "orderable": false },
                    { "width": "0%", "targets": 9, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ procesos",
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
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "65%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("display", "none");
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
                        { data: 'NIDCOMITE' },
                        { data: 'NIDPERSONAL' },
                        { data: 'NIDPROCESO' },
                        { data: 'SPROCESO' },
                        { data: 'SSERVICIO' },
                        { data: 'NIDPROCESO' },
                        { data: 'NTIPO_EVALUADOR' },
                        { data: 'NELENCO' },
                        { data: 'ESTADO_EVAL' },
                        { data: 'NMODIFICA' },
                        { data: 'NIDACTIVIDAD' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        var SPROCESO = '';
                        var SSERVICIO = '';
                        var NTIPO_EVALUADOR = 0;
                        var NELENCO = 0;
                        var NMODIFICA = 0;
                        t.column(5, {}).nodes().each(function (cell, i) {
                            t.column(3, {}).nodes().each(function (cell, j) { if (i == j) { SPROCESO = "'" + cell.innerHTML + "'"; } });
                            t.column(4, {}).nodes().each(function (cell, j) { if (i == j) { SSERVICIO = "'" + cell.innerHTML + "'"; } });
                            t.column(6, {}).nodes().each(function (cell, j) { if (i == j) { NTIPO_EVALUADOR = cell.innerHTML; } });
                            t.column(7, {}).nodes().each(function (cell, j) { if (i == j) { NELENCO = cell.innerHTML; } });
                            t.column(8, {}).nodes().each(function (cell, j) { if (i == j) { ESTADO_EVAL = cell.innerHTML; } });
                            t.column(9, {}).nodes().each(function (cell, j) { if (i == j) { NMODIFICA = cell.innerHTML; } });
                            t.column(10, {}).nodes().each(function (cell, j) { if (i == j) { NIDACTIVIDAD = cell.innerHTML; } });
                            if (NIDACTIVIDAD == 0) {
                                $("#divVOL").hide();
                                $("#divCAS").show();
                                cell.innerHTML = '<div><i class="fa fa-eye" onclick="ListarPostulaciones(' + cell.innerHTML + ',' + SPROCESO + ',' + SSERVICIO.replace(/"/g, "&quot;") + ',' + NTIPO_EVALUADOR + ',' + NELENCO + ',' + ESTADO_EVAL + ',' + NMODIFICA + ');" style="font-size: 20px;" title="Ver postulaciones"></i></div>'
                            } else {
                                cell.innerHTML = '<div><i class="fa fa-eye" onclick="ListarPostulacionesVol(' + NIDACTIVIDAD + ',' + SPROCESO + ',' + SSERVICIO.replace(/"/g, "&quot;") + ',' + NTIPO_EVALUADOR + ',' + NELENCO + ',' + ESTADO_EVAL + ',' + NMODIFICA + ');" style="font-size: 20px;" title="Ver postulaciones"></i></div>'
                                $("#divVOL").show();
                                $("#divCAS").hide();
                            }
                        });
                    }

                }).draw();
        }
    });

    ListarPostulaciones(0);
}
$('#tbl_Proceso').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Proceso').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var NIDPROCESO = $(this).closest('tr').find('td:eq(2)').text()
        var SPROCESO = $(this).closest('tr').find('td:eq(3)').text()
        var SSERVICIO = $(this).closest('tr').find('td:eq(4)').text()
        var NTIPO_EVALUADOR = $(this).closest('tr').find('td:eq(6)').text()
        var NELENCO = $(this).closest('tr').find('td:eq(7)').text()
        var ESTADO_EVAL = $(this).closest('tr').find('td:eq(8)').text()
        var NMODIFICA = $(this).closest('tr').find('td:eq(9)').text()
        var NIDACTIVIDAD = $(this).closest('tr').find('td:eq(10)').text()
        if (NIDACTIVIDAD == 0) {
            $("#divVOL").hide();
            $("#divCAS").show();
            ListarPostulaciones(NIDPROCESO, SPROCESO, SSERVICIO, NTIPO_EVALUADOR, NELENCO, ESTADO_EVAL, NMODIFICA)
        }
        else {
            $("#divVOL").show();
            $("#divCAS").hide();
            ListarPostulacionesVol(NIDACTIVIDAD, SPROCESO, SSERVICIO, NTIPO_EVALUADOR, NELENCO, ESTADO_EVAL, NMODIFICA)
        }
    }
});
function ListarPostulaciones(NIDPROCESO, SPROCESO, SSERVICIO, NTIPO_EVALUADOR, NELENCO,ESTADO_EVAL, NMODIFICA) {
    var swidth_ET = "0%";
    var swidth_EP = "0%";
    var swidth_EC = "0%";
    var sdisplay_ET = "none";
    var sdisplay_EP = "none";
    var sdisplay_EC = "none";
    var disabled_EC = "";
    var id = 0;

    $("#divEC").html("");

    $("#NTIPOEVALUADOR").val(NTIPO_EVALUADOR);
    if (ESTADO_EVAL == "20" || NMODIFICA == 1)
        disabled_EC = "";
    else
        disabled_EC = "disabled";
    $("#th_neval_tecnica").css("display", "none");
    $("#th_entrevista").css("display", "none");
    $("#th_eval_curr").css("display", "none");
    if (NTIPO_EVALUADOR != 4) {
        swidth_EC = "5%";
        sdisplay_EC = "display";
        $("#th_eval_curr").show();
    }
    if (NTIPO_EVALUADOR == 1 && (ESTADO_EVAL >= 40 || NMODIFICA == 1)) {
        swidth_EP = "5%";
         sdisplay_EP = "display";
         $("#th_entrevista").show();
    }
    if ((NTIPO_EVALUADOR == 3 && NELENCO == 1) && (ESTADO_EVAL >= 30 || NMODIFICA == 1)) {
        swidth_ET = "5%";
         sdisplay_ET = "display";
         $("#th_neval_tecnica").show();
    }
    $("#txtidControl").val("");
    $("#txtPuntaje").val("");
    if (NIDPROCESO != 0) {
        document.getElementById('lblnomProceso').innerHTML = '<b>' + SPROCESO + " - " + SSERVICIO + '</b>';
    }
    else {
        document.getElementById('lblnomProceso').innerHTML = '';
    }

    var dataObject = JSON.stringify({
        'NOPT': 1, 'NIDPROCESO': NIDPROCESO, 'NTIPO_EVALUADOR': NTIPO_EVALUADOR
    });

    $.ajax({
        url: baseUrl + 'Gestion/SP_LISTA_POSTULACION',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Postulacion').DataTable({
                    data: inf,
                    "order": [
                              [3, "asc"]/*,[4, "asc"]*/
                    ],
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false /*",orderData": [3, 4]*/ },
                    { "width": "55%", "targets": 3, "orderable": true },
                    { "width": swidth_EC, "targets": 4, "orderable": false },
                    { "width": "15%", "targets": 5, "orderable": false },
                    { "width": swidth_ET, "targets": 6, "orderable": false },
                    { "width": swidth_EP, "targets": 7, "orderable": false },
                    { "width": "15%", "targets": 8, "orderable": false },
                    { "width": "0%", "targets": 9, "orderable": false },
                    { "width": "0%", "targets": 10, "orderable": false },
                    { "width": "0%", "targets": 11, "orderable": false },
                    { "width": "10%", "targets": 12, "orderable": true }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ postulantes",
                        "sZeroRecords": "No se encontraron registros coincidentes",
                        "sEmptyTable": "No hay registros disponibles",
                        "sInfo": "<div id='id_max' style='display:none'>_TOTAL_</div>Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "<div id='id_max' style='display:none'>0</div>Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "<div id='id_max' style='display:none'>_MAX_</div>(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "<a href='#' onclick='descargarEC()' style='padding-right:10px'>Descargar Todo EC</a> Buscar:",
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
                        $('td:eq(0)', nRow).css("display", "none");
                        $('td:eq(1)', nRow).css("display", "none");
                        $('td:eq(2)', nRow).css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "25%");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", swidth_EC).css("display", sdisplay_EC);
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "5%").css("font-weight", "bold");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", swidth_ET).css("display", sdisplay_ET);
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", swidth_EP).css("display", sdisplay_EP);
                        $('td:eq(8)', nRow).css("text-align", "center").css("width", "20%");
                        $('td:eq(9)', nRow).css("display", "none");
                        $('td:eq(10)', nRow).css("display", "none");
                        $('td:eq(11)', nRow).css("display", "none");
                        $('td:eq(12)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(13)', nRow).css("text-align", "center").css("width", "20%");
                        $('td:eq(14)', nRow).css("display", "none");
                        $('td:eq(15)', nRow).css("display", "none");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'NIDPROCESO' },
                        { data: 'SNOMBREPOSTULANTE'},
                        { data: 'NIDPROCESOUSU'},
                        { data: 'NEVAL_CUR'},
                        { data: 'NIDPROCESOUSU'},
                        { data: 'NIDPROCESOUSU'},
                        { data: 'NIDPROCESOUSU'},
                        { data: 'NEVAL_CUR_EV'},
                        { data: 'NEVAL_TECNICA'},
                        { data: 'NENTREVISTA'},
                        { data: 'HORA_ENVIO'},
                        { data: 'NEDAD'},
                        { data: 'PAIS'},
                        { data: 'DOC'}
                    ]
                });
                
                var cont = 0;
                
                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        var selected0 = "";
                        var selected1 = "";
                        var selected2 = "";

                        t.column(8, {}).nodes().each(function (cell, i) {
                            var codigo = cell.innerHTML
                            id = id + 1;
                            t.column(3, {}).nodes().each(function (cell, j) { if (i == j) { NOMBRE = cell.innerHTML; } });
                            $("#divEC").html($("#divEC").html() + '<a style="padding-left:20px" id="EC_' + id + '" href="' + baseUrl + 'Gestion/ExportarFormato?NIDPROCESO=' + codigo + '&NOPT=4" target="_blank" download="' + NOMBRE + '">Formato_EC</a>')
                            cell.innerHTML = ' <a href="javascript:void(0)" onclick="verFicha(' + codigo + ')"> Ver Ficha </a> <a style="padding-left:20px" href="' + baseUrl + 'Gestion/ExportarFormato?NIDPROCESO=' + codigo + '&NOPT=4" target="_blank">Formato_EC</a>'
                            if (NELENCO == 1)
                                cell.innerHTML = cell.innerHTML + '<a style="padding-left:20px" href="' + baseUrl + 'Gestion/ExportarFormato?NIDPROCESO=' + codigo + '&NOPT=8" target="_blank">Formato_ET</a>';
                        });
                        t.column(3, {}).nodes().each(function (cell, i) {
                            t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDPROCESOUSU = cell.innerHTML; } });
                            cell.innerHTML = '<div><a href="#" onclick="Ver_RPT_FICHA(' + NIDPROCESOUSU + ');">' + cell.innerHTML + '</a></div>'
                        });
                        t.column(4, {}).nodes().each(function (cell, i) {
                            t.column(9, {}).nodes().each(function (cell, j) { if (i == j) { NEVAL_CUR = cell.innerHTML; } });
                            if (NEVAL_CUR == 0) 
                                selected0 = "selected";
                            else
                                selected0 = "";
                            if (NEVAL_CUR == 1)
                                selected1 = "selected";
                            else
                                selected1 = "";
                            if (NEVAL_CUR == 2)
                                selected2 = "selected";
                            else
                                selected2 = "";
                            cell.innerHTML = '<select  ' + disabled_EC + ' class="form-control" onchange="grabarPuntaje(2,' + cell.innerHTML + ',this.value)"><option value="0" ' + selected0 + '>Sin Evaluar</option><option value="1" ' + selected1 + '>APTO</option><option value="2" ' + selected2 + '>NO APTO</option></select>';
                            });
                        t.column(6, {}).nodes().each(function (cell, i) {
                            t.column(10, {}).nodes().each(function (cell, j) { if (i == j) { NPUNTAJE = cell.innerHTML; } });
                            t.column(5, {}).nodes().each(function (cell, j) { if (i == j) { NEVAL_CUR = cell.innerHTML; } });
                            if (NEVAL_CUR == "APTO" && (NTIPO_EVALUADOR == 3 && NELENCO == 1)) {
                                if ((ESTADO_EVAL == "30" || NMODIFICA == 1) ) {
                                    if (NPUNTAJE == 0)
                                        cell.innerHTML = '<div id="divPuntaje' + cell.innerHTML + '"> <a href="javascript:void(0)" onclick="calificar(' + cell.innerHTML + ',0,3)" style="color:black;" > <i class="fa fa-pencil" style="font-size: 20px;" title="Calificar"></i> </a> </div>'
                                    else
                                        cell.innerHTML = '<div id="divPuntaje' + cell.innerHTML + '"><a href="javascript:void(0)" onclick="calificar(' + cell.innerHTML + ',' + NPUNTAJE + ',3)" style="font-size: 15px;color:black;text-align: center" > <b>' + NPUNTAJE + '</b></a> </div>'
                                } else {
                                    cell.innerHTML = '<div id="divPuntaje' + cell.innerHTML + '" style="font-size: 15px;color:black;text-align: center" > <b>' + NPUNTAJE + '</b> </div>'
                                }
                            } else {
                                cell.innerHTML = "--";
                            }
                        });
                        t.column(7, {}).nodes().each(function (cell, i) {
                            t.column(11, {}).nodes().each(function (cell, j) { if (i == j) { NPUNTAJE = cell.innerHTML; } });
                            t.column(5, {}).nodes().each(function (cell, j) { if (i == j) { NEVAL_CUR = cell.innerHTML; } });
                            if (NTIPO_EVALUADOR == 1 && NEVAL_CUR == "APTO") {
                                if (ESTADO_EVAL == "40" || NMODIFICA == 1) {
                                    if (NPUNTAJE == 0)
                                        cell.innerHTML = '<div id="divPuntaje' + cell.innerHTML + '"> <a href="javascript:void(0)" onclick="calificar(' + cell.innerHTML + ',0,4)" style="color:black;" > <i class="fa fa-pencil" style="font-size: 20px;" title="Calificar"></i> </a> </div>'
                                    else
                                        cell.innerHTML = '<div id="divPuntaje' + cell.innerHTML + '"><a href="javascript:void(0)" onclick="calificar(' + cell.innerHTML + ',' + NPUNTAJE + ',4)" style="font-size: 15px;color:black;text-align: center" > <b>' + NPUNTAJE + '</b></a> </div>'
                                } else {
                                    cell.innerHTML = '<div id="divPuntaje' + cell.innerHTML + '" style="font-size: 15px;color:black;text-align: center" > <b>' + NPUNTAJE + '</b> </div>'
                                }
                            } else {
                                cell.innerHTML = "--";
                            }
                        });
                        t.column(13, {}).nodes().each(function (cell, i) {
                            var edad = cell.innerHTML
                            t.column(14, {}).nodes().each(function (cell, j) { if (i == j) { PAIS = cell.innerHTML; } });
                            t.column(15, {}).nodes().each(function (cell, j) { if (i == j) { RUTA = cell.innerHTML; } });
                            if (RUTA == "")
                                cell.innerHTML = 'Edad (' + edad + ')'
                            else
                                cell.innerHTML = 'Edad (' + edad + ') <a href="../DocumentoSustento/' + RUTA + '" style="padding-left:10px;" target="_blank"> ' + PAIS + ' </a> '
                            if (edad < 18)
                                cell.innerHTML = '<div style= "color:red; font-weight:bold">' + cell.innerHTML + '</div>';
                        });
                     
                    }

                }).draw();
        }
    });
}

function verFicha(id) {
    $.ajax({
        type: 'GET',
        url: baseUrl + 'Postulacion/FichaDetalle2',
        data: 'modo=Ver&NIDPROCESOUSU=' + id,
        success: function (data) {
            $("#divFicha").html(data);
            $('#ModalFicha').modal({
                "backdrop": "static",
                "keyboard": true,
                "show": true,
            });
          Cargar_InfAcademica();
          carga_bases();
        },
        error: function (a, b, e) {
            bootbox.alert("<p>No se pudo abrir la ventana.</p>");
        }
    });

    return false;
}
function Ver_RPT_FICHA(NIDPROCESOUSU_P) {

    var ventana = "../Reports/RPT_FICHA.aspx";
    window.open(ventana + '?NIDPROCESOUSU=' + NIDPROCESOUSU_P, "");
}
function calificar(id, puntaje, tipo) {
   
    var idControl = $("#txtidControl").val();
    if (idControl != "0") {
        cancelarPuntaje(idControl, $("#txtPuntaje").val())
    }
    var html = '<input type="text" id="txtPuntaje' + id + '" class="solo-numero" maxlength="2" style="text-align:right;width:50px" value="' + puntaje + '"/>';
    html += '<a href="javascript:void(0)" onclick="grabarPuntaje('+tipo+',' + id + ',0)" style="color:black;vertical-align: middle" > <i class="fa fa-save" style="font-size: 20px;" title="Calificar"></i></a> ';
    html += '<a href="javascript:void(0)" onclick="cancelarPuntaje('+tipo+',' + id + ',' + puntaje + ')" style="color:black;vertical-align: middle" > <i class="clip-close" style="font-size: 17px;" title="Cancelar"></i></a> '
    $("#divPuntaje" + id).html(html);
    validacionTipoDato();
    $("#txtidControl").val(id);
    $("#txtPuntaje").val(puntaje);
}

function cancelarPuntaje(tipo,id, puntaje) {
    var html = "";
    if (puntaje == "0" || puntaje == "")
        html = '<a href="javascript:void(0)" onclick="calificar(' + id + ',0,'+tipo+')" style="color:black;vertical-align: middle" > <i class="fa fa-pencil" style="font-size: 20px;" title="Calificar"></i> </a>';
    else
        html = '<a href="javascript:void(0)" onclick="calificar(' + id + ',' + puntaje + ','+tipo+')" style="font-size: 15px;color:black;text-align: center" > <b>' + puntaje + '</b></a>';
    $("#divPuntaje" + id).html(html);
    $("#txtidControl").val("0");
}

function descargarEC() {
    var max = $("#id_max").html();
    var i= 1;
    for (i = 1; i <= parseInt(max) ; i++) {
        var id = "#EC_" + i;
        $(id)[0].click();
        var j = 0;
        for (j = 0; j < 1400000000; j++) {
            j = j;
        }
    }
}

function grabarPuntaje(tipo, id, value) {
    var NPUNTAJE =0;
    var NIDPERSONAL = $("#txtcodusu").val()
    var NIDPROCESOUSU = id;
    var NTIPO_EVAL = tipo;
    var  NTIPOEVALUADOR = $("#NTIPOEVALUADOR").val();
    var NASISTENCIA = 0;//nasistencia
    if (NTIPO_EVAL == 3 || NTIPO_EVAL == 4)
        NCALIFICACION = $("#txtPuntaje" + id).val();
    else
        NCALIFICACION = value;
    if (NCALIFICACION == "" && (NTIPO_EVAL == 3 || NTIPO_EVAL == 4)) {
        bootbox.alert("Debe ingresar el puntaje antes de grabar." );
    } else {
        var dataObject = JSON.stringify({
            'NCALIFICACION': NCALIFICACION,
            'NIDPERSONAL': NIDPERSONAL,
            'NIDPROCESOUSU': NIDPROCESOUSU,
            'NTIPO_EVAL': NTIPO_EVAL,
            'NTIPO_EVALUADOR': NTIPOEVALUADOR,
            'NASISTENCIA': NASISTENCIA
        });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_PUNTAJE',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK") {
                            cancelarPuntaje(tipo, id, NCALIFICACION)
                            bootbox.alert("Se grabó con éxito.")
                        }
                        else {
                            bootbox.alert(result.SMENSAJE);
                        }
                    }
                });
    }
}

function ListarPostulacionesVol(NIDACTIVIDAD, SPROCESO, SSERVICIO, NTIPO_EVALUADOR, NELENCO, ESTADO_EVAL, NMODIFICA) {
    var swidth_ET = "0%";
    var swidth_EP = "0%";
    var swidth_EC = "0%";
    var sdisplay_ET = "none";
    var sdisplay_EP = "none";
    var sdisplay_EC = "none";
    var disabled_EC = "";
    var id = 0;

    $("#divEC").html("");

    $("#NTIPOEVALUADOR").val(NTIPO_EVALUADOR);
    if (ESTADO_EVAL == "20" || NMODIFICA == 1)
        disabled_EC = "";
    else
        disabled_EC = "disabled";

    $("#txtidControl").val("");
    $("#txtPuntaje").val("");
    if (NIDACTIVIDAD != 0) {
        document.getElementById('lblnomProceso').innerHTML = '<b>' + SPROCESO + " - " + SSERVICIO + '</b>';
    }
    else {
        document.getElementById('lblnomProceso').innerHTML = '';
    }

    var dataObject = JSON.stringify({
        'NOPT': 2, 'NIDPROCESO': NIDACTIVIDAD, 'NTIPO_EVALUADOR': NTIPO_EVALUADOR
    });

    $.ajax({
        url: baseUrl + 'Gestion/SP_LISTA_POSTULACION',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_PostulacionVol').DataTable({
                data: inf,
                "order": [
                          [2, "asc"]/*,[4, "asc"]*/
                ],
                "columnDefs": [
                { "width": "15%", "targets": 4, "orderable": false },
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ postulantes",
                    "sZeroRecords": "No se encontraron registros coincidentes",
                    "sEmptyTable": "No hay registros disponibles",
                    "sInfo": "<div id='id_max' style='display:none'>_TOTAL_</div>Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "<div id='id_max' style='display:none'>0</div>Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "<div id='id_max' style='display:none'>_MAX_</div>(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "<a href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + NIDACTIVIDAD + "&NOPT=60' target='_blank' STYLE='PADDING-RIGHT:10PX'>Formato Entrevista</a> Buscar:",
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
                    $('td:eq(0)', nRow).css("display", "none");
                    $('td:eq(1)', nRow).css("display", "none");
                    $('td:eq(2)', nRow).css("text-align", "left").css("width", "30%");
                    $('td:eq(3)', nRow).css("text-align", "center").css("width", "15%");
                    $('td:eq(4)', nRow).css("text-align", "center").css("width", "20%");
                    $('td:eq(5)', nRow).css("text-align", "center").css("width", "15%");
                    $('td:eq(6)', nRow).css("text-align", "center").css("width", "20%");
                    $('td:eq(7)', nRow).css("display", "none");
                    $('td:eq(8)', nRow).css("display", "none");
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
                    { data: 'SNOMBREPOSTULANTE' },
                    { data: 'NEVAL_CUR_EV' },
                    { data: 'NIDPROCESOUSU' },
                    { data: 'HORA_ENVIO' },
                    { data: 'NEDAD' },
                    { data: 'PAIS' },
                    { data: 'DOC' }
                ]
            });

            var cont = 0;

            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                    t.column(4, {}).nodes().each(function (cell, i) {
                        id = id + 1;
                        t.column(2, {}).nodes().each(function (cell, j) { if (i == j) { NOMBRE = cell.innerHTML; } });
                        cell.innerHTML = "<a id='EC_" + id + "' href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + cell.innerHTML + "&NOPT=10' target='_blank'download='" + NOMBRE + "' STYLE='PADDING-RIGHT:10PX'>Ver Ficha</a>";
                    });
                    t.column(2, {}).nodes().each(function (cell, i) {
                        t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDPROCESOUSU = cell.innerHTML; } });
                        cell.innerHTML = '<div><a href="javascript:void(0)" onclick="verFichaVol(' + NIDPROCESOUSU + ')" >' + cell.innerHTML + '</a></div>'
                    });

                    t.column(6, {}).nodes().each(function (cell, i) {
                        var edad = cell.innerHTML
                        t.column(7, {}).nodes().each(function (cell, j) { if (i == j) { PAIS = cell.innerHTML; } });
                        t.column(8, {}).nodes().each(function (cell, j) { if (i == j) { RUTA = cell.innerHTML; } });
                        if (RUTA == "")
                            cell.innerHTML = 'Edad (' + edad + ')'
                        else
                            cell.innerHTML = 'Edad (' + edad + ') <a href="../DocumentoSustento/' + RUTA + '" style="padding-left:10px;" target="_blank"> ' + PAIS + ' </a> '
                        if (edad < 18)
                            cell.innerHTML = '<div style= "color:red; font-weight:bold">' + cell.innerHTML + '</div>';
                    });

                    t.column(3, {}).nodes().each(function (cell, i) {
                        t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDPROCESOUSU = cell.innerHTML; } });
                        var NEVAL_CUR = cell.innerHTML;
                        if (NEVAL_CUR == 0)
                            selected0 = "selected";
                        else
                            selected0 = "";
                        if (NEVAL_CUR == 1)
                            selected1 = "selected";
                        else
                            selected1 = "";
                        if (NEVAL_CUR == 2)
                            selected2 = "selected";
                        else
                            selected2 = "";
                        cell.innerHTML = '<select  class="form-control" onchange="grabarPuntaje(2,' + NIDPROCESOUSU + ',this.value)"><option value="0" ' + selected0 + '>Sin Evaluar</option><option value="1" ' + selected1 + '>APTO</option><option value="2" ' + selected2 + '>NO APTO</option></select>';
                    });
                }
            }).draw();
        }
    });
}
function verFichaVol(id) {
    $.ajax({
        type: 'GET',
        url: baseUrl + 'Postulacion/FichaDetallePos',
        data: 'modo=Ver&NIDPROCESOUSU=' + id,
        success: function (data) {
            $("#divFicha").html(data);
            $('#ModalFicha').modal({
                "backdrop": "static",
                "keyboard": true,
                "show": true,
            });
            init();
        },
        error: function (a, b, e) {
            bootbox.alert("<p>No se pudo abrir la ventana.</p>");
        }
    });

    return false;
}