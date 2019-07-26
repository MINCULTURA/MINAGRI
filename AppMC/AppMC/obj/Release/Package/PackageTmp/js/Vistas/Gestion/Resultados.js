
$(window).load(function () {
    cargarConvocatorias(2019);
    ListarProceso(0, "");
    listarPostulantesEval(0);
    ListarComite(0);
    CARGARDDL(13, 'NREPORTE', 0);
});
function exportarApta() {
    var id = $("#NIDCONVOCATORIA_REP").val();
    var opt = $("#NREPORTE").val();
    var pro = $("#hddNIDPROCESOUSU").val();
 /*   if (NIDPROCESOUSU == 0) {
        bootbox.alert("Debe seleccionar un proceso.");
        return;
    }*/
    if (id == 0) {
        bootbox.alert("Debe seleccionar una convocatoria.");
        return;
    }
    if (opt == 0) {
        bootbox.alert("Debe seleccionar una acta o reporte.");
        return;
    }

    window.location.href = baseUrl + "Gestion/ExportarAptaExcel?NIDCONVOCATORIA=" + id + "&NOPT=" + opt + "&SP=USP_GENERA_ACTA&NIDPROCESO=0&tipo=0"
} 
function cargarConvocatorias(value) {
    var dataObject = JSON.stringify({
        'NIDTABLA': 4,
        'SDATO': value
    });
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_TABLA_D',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_Convocatoria').DataTable({
                data: inf,
                "columnDefs": [
                { "width": "30%", "targets": 3, "orderable": false }
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<select id='NANIO_G' class='form-control' onchange='cargarConvocatorias(this.value)' style='font-weight:bold'> <option value='2019'>2019</option> <option value='2018'>2018</option> <option value='2017'>2017</option> </select>",
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
                    $('td:eq(2)', nRow).css("text-align", "left").css("width", "70%");
                    $('td:eq(3)', nRow).css("text-align", "center").css("width", "30%");
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
                    { data: 'SSITEM' },
                    { data: 'SACTIVO' }
                ]
            });
            var cont = 0;

            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                    t.column(3, {}).nodes().each(function (cell, i) {
                        t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDCONVOCATORIA = cell.innerHTML; } });
                        t.column(2, {}).nodes().each(function (cell, j) { if (i == j) { SCONVOCATORIA = cell.innerHTML; } });
                        cell.innerHTML = '<div><a href="#" onclick="etatpaEval(' + NIDCONVOCATORIA + ',\'' + SCONVOCATORIA + '\');" >' + cell.innerHTML + '</a></div>'
                    });
                }

            }).draw();

            $("#NANIO_G").val(value);
        }
    });
}

$('#tbl_Convocatoria').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Convocatoria').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    ListarProceso($(this).closest('tr').find('td:eq(0)').text(), $(this).closest('tr').find('td:eq(2)').text());
    listarPostulantesEval(0);
    ListarComite(0);
    $('#NIDCONVOCATORIA_REP').val($(this).closest('tr').find('td:eq(0)').text());
    $("#divFirma").hide();
});

$('#tbl_Proceso').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Proceso').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    listarPostulantesEval($(this).closest('tr').find('td:eq(0)').text());
    ListarComite($(this).closest('tr').find('td:eq(0)').text())
    $("#divFirma").hide();
});

function ListarEstadosConvocatoria(id, sconv) {
    var dataObject = JSON.stringify({
        'NIDCONVOCATORIA' : id,
        'SP': 'SP_LISTA_ESTADOS_CONV'
    });
    $("#idconv").val(id);
    $("#sconv").val(sconv);
    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_ProcesoEval').DataTable({
                    data: inf,
                    "order": [
                              [1, "desc"],
                              [2, "desc"]
                    ],
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "20%", "targets": 1, "orderable": false },
                    { "width": "20%", "targets": 2, "orderable": false },
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "<div style='padding-top:10px'><b>" + sconv + "</b></div>",
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
                        $('td:eq(1)', nRow).css("text-align", "left").css("width", "10%");
                        $('td:eq(2)', nRow).css("text-align", "left").css("width", "15%");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "25%");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "15%");
                        $('td:eq(5)', nRow).css("text-align", "left").css("width", "25%");
                        $('td:eq(6)', nRow).css("text-align", "left").css("width", "10%");
                        return nRow;
                    },
                    "bFilter": false,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDESTADO' },
                        { data: 'SSITEM' },
                        { data: 'DFECHAINI' },
                        { data: 'NIDUSUINI' },
                        { data: 'DFECHAFIN' },
                        { data: 'NIDUSUFIN' },
                        { data: 'SOBSERVACION' }
                    ]
                });        
        }
    });

}

function etatpaEval(id, sconv) {
    CARGARDDL(6, 'NIDESTADO', 0);
    $('#ModalEval').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true,
    });
    ListarEstadosConvocatoria(id, sconv);
    ListarOficinasConv(id);
}

function ListarProceso(id, sconv) {
    var dataObject = JSON.stringify({
        'NOPT': 3,
        'NIDCONVOCATORIA': id,
        'SP': 'SP_LISTA_PROCESO'
    });

    $("#idconv").val(id);
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
                          [1, "desc"],
                          [2, "desc"]
                ],
                "columnDefs": [
                { "width": "10%", "targets": 4, "orderable": false }
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<div style='padding-top:10px'><b>" + sconv + "</b></div>",
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
                    $('td:eq(0)', nRow).css("display", "none");
                    $('td:eq(1)', nRow).css("display", "none");
                    $('td:eq(2)', nRow).css("text-align", "left").css("width", "15%");
                    $('td:eq(3)', nRow).css("text-align", "justify").css("width", "75%");
                    $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                    $('td:eq(5)', nRow).css("display", "none");
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
                    { data: 'SPROCESO' },
                    { data: 'SSERVICIO' },
                    { data: 'NIDPROCESO' },
                    { data: 'TEXTO_ADIC' }
                ]
            });
            var cont = 0;
            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                    t.column(4, {}).nodes().each(function (cell, i) {
                        cell.innerHTML = "<a href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + cell.innerHTML + "&NOPT=3' target='_blank' STYLE='PADDING-RIGHT:10PX'>F_EP</a><a href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + cell.innerHTML + "&NOPT=5' target='_blank' STYLE='PADDING-RIGHT:10PX'>A_EC</a><a href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + cell.innerHTML + "&NOPT=6' target='_blank' STYLE='PADDING-RIGHT:10PX'>A_EF</a><a href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + cell.innerHTML + "&NOPT=7' target='_blank'>A_ET</a>";
                    });
                    t.column(3, {}).nodes().each(function (cell, i) {
                        t.column(5, {}).nodes().each(function (cell, j) { if (i == j) { TEXTO_ADIC = cell.innerHTML; } });
                        cell.innerHTML = cell.innerHTML + "<span style='color:red;font-weight:bold'> " +TEXTO_ADIC + "</span>";
                    });
                } 
            }).draw();
        }
    });

}

function listarPostulantesEval(id) {
    var dataObject = JSON.stringify({
        'NOPT': 1,
        'NIDPROCESO': id,
        'SP': 'SP_LISTA_POST_RESULT'
    });
    $("#hddNIDPROCESO").val(id);
    $.ajax({
        url: baseUrl + 'Gestion/LISTA_PROCESOCOMITE',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_PostulantesE').DataTable({
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
                { "width": "12%", "targets": 9, "orderable": false },
                { "width": "13%", "targets": 10, "orderable": true },
                { "width": "12%", "targets": 11, "orderable": true }
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<div style='padding-top:10px'><b>Postulantes</b></div> _MENU_",
                    "sZeroRecords": "No se encontraron registros coincidentes",
                    "sEmptyTable": "No hay registros disponibles",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "<button type=\"button\" class=\"btn btn-default\" onclick=\"Descalificar(" + id + ");\">Descalificar&nbsp;&nbsp;</button><button type=\"button\" class=\"btn btn-default\" onclick=\"DeclararDecierto(" + id + ");\">Declarar Desierto&nbsp;&nbsp;</button> <button type=\"button\" class=\"btn btn-default\" onclick=\"ProcesarGanadores(" + id + ");\">Procesar Ganadores&nbsp;&nbsp;</button> Buscar:",
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
                //"lengthMenu": [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $('td:eq(0)', nRow).css("display", "none");
                    $('td:eq(1)', nRow).css("text-align", "left").css("width", "15%");
                    $('td:eq(2)', nRow).css("text-align", "left").css("width", "5%");
                    $('td:eq(3)', nRow).css("text-align", "left").css("width", "5%");
                    $('td:eq(4)', nRow).css("text-align", "left").css("width", "10%");
                    $('td:eq(5)', nRow).css("text-align", "center").css("width", "5%");
                    $('td:eq(6)', nRow).css("text-align", "center").css("width", "5%");
                    $('td:eq(7)', nRow).css("text-align", "center").css("width", "5%");
                    $('td:eq(8)', nRow).css("text-align", "center").css("width", "5%").css("font-weight", "bold");
                    $('td:eq(9)', nRow).css("text-align", "center").css("width", "5%").css("font-weight", "bold");
                    $('td:eq(10)', nRow).css("text-align", "center").css("width", "5%").css("font-weight", "bold");
                    $('td:eq(11)', nRow).css("text-align", "center").css("width", "10%").attr("class", "win");
                    $('td:eq(12)', nRow).css("display", "none");
                    $('td:eq(13)', nRow).css("display", "none");
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
                    { data: 'POSTULANTE' },
                    { data: 'SCELULAR' },
                    { data: 'STELEFONOFIJO' },
                    { data: 'SCORREO' },
                    { data: 'NEVAL_CUR_AU' },
                    { data: 'NEVAL_CUR_OGA' },
                    { data: 'NEVAL_CUR_OGRH' },
                    { data: 'NEVAL_CUR' },
                    { data: 'NEVAL_TECNICA' },
                    { data: 'NPUNTAJE' },
                    { data: 'NGANADORT' },
                    { data: 'DFECHAFIRMA' },
                    { data: 'FECHAPUB' },
                    { data: 'NFIRMA' },
                    { data: 'NGANADOR' }
                ]
            });
            var cont = 0;
            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                  t.column(1, {}).nodes().each(function (cell, i) {
                      t.column(0, {}).nodes().each(function (cell, j) { if (i == j) { NIDPROCESOUSU = cell.innerHTML; } });
                      cell.innerHTML = '<div><a href="#" onclick="Ver_RPT_FICHA(' + NIDPROCESOUSU + ');">' + cell.innerHTML + '</a></div>'
                  });
                }
            }).draw();
        }
    });

}
$('#tbl_PostulantesE').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_PostulantesE').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    $('#hddNIDPROCESOUSU').val($(this).closest('tr').find('td:eq(0)').text());
    var nganador = $(this).closest('tr').find('td:eq(15)').text()
    if (nganador == 1) {
        $("#divFirma").show();
        var fechaPub = $(this).closest('tr').find('td:eq(13)').text()
        var fechaFirma = $(this).closest('tr').find('td:eq(12)').text()
        var nfirma = $(this).closest('tr').find('td:eq(14)').text()
        if (nfirma == "1") {
            $("#DFECHA_PUB").attr("disabled", true)
            $("#DFECHA_FIRMA").attr("disabled", true)
        } {
            $("#DFECHA_PUB").attr("disabled", false)
            $("#DFECHA_FIRMA").attr("disabled", false)
        }
        $("#DFECHA_PUB").val(fechaPub)
        $("#DFECHA_FIRMA").val(fechaFirma)
    }
    else{
        $("#divFirma").hide();
    }
});

function Descalificar(id) {
    var NIDPROCESOUSU = $("#hddNIDPROCESOUSU").val();
    if (NIDPROCESOUSU != 0) {
        bootbox.confirm("¿Está seguro que desea descalificar a este postulante?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDPROCESOUSU': NIDPROCESOUSU
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_DESCALIFICAR_POSTULANTE',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK")
                            listarPostulantesEval(id)
                        else
                            bootbox.alert(result.SMENSAJE);
                    }
                });
            }
        });
    }
    else {
        bootbox.alert("Debe seleccionar un postulante.");
    }
    $("#hddNIDPROCESOUSU").val(0);
}

function Ver_RPT_FICHA(NIDPROCESOUSU_P) {

    var ventana = "../Reports/RPT_FICHA.aspx";

    NIDPROCESOUSU = NIDPROCESOUSU_P;

    //alert(ventana + '?NIDPROCESOUSU=' + NIDPROCESOUSU);
    window.open(ventana + '?NIDPROCESOUSU=' + NIDPROCESOUSU, "");
}
function GuardarEstadoE(tipoEval) {

    var NIDCONVOCATORIA = $("#idconv").val();
    var NTIPO_EVAL = tipoEval
    var NIDESTADO = $('#NIDESTADO').val();
    if (NIDESTADO == 0) {
        bootbox.alert('Debe seleccionar la etapa de evaluación a procesar.');
    } else {

        bootbox.confirm("Está seguro de realizar la operación?", function (resultado) {
            if (resultado != true) {
                bootbox.alert("Operación Cancelada.");
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDCONVOCATORIA': NIDCONVOCATORIA,
                    'NTIPO_EVAL': NTIPO_EVAL,
                    'NIDESTADO': NIDESTADO
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_ESTADO_EVAL',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK") {
                            ListarEstadosConvocatoria(NIDCONVOCATORIA, $("#sconv").val())
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
function DeclararDecierto(idProceso) {
    var NIDPROCESO = idProceso
    if (NIDCONVOCATORIA == 0) {
        bootbox.alert('Debe seleccionar el proceso al que declarará desierto.');
    } else {
        bootbox.confirm("Está seguro de realizar la operación?", function (resultado) {
            if (resultado != true) {
                bootbox.alert("Operación Cancelada.");
                return;
            } else {
                var dataObject = JSON.stringify({
                    'BESTADO': 3,
                    'NIDPROCESO': NIDPROCESO
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_PROCESO',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK") {
                            bootbox.alert("Se procesó con éxito.")
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
function ProcesarGanadores(idProceso) {
    var NIDCONVOCATORIA = $("#idconv").val();
    var NIDPROCESO = idProceso
    if (NIDCONVOCATORIA == 0 ) {
        bootbox.alert('Debe seleccionar la convocatoria a procesar.');
    } else {
        bootbox.confirm("Está seguro de procesar ganadores para este proceso?", function (resultado) {
            if (resultado != true) {
                bootbox.alert("Operación Cancelada.");
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDCONVOCATORIA': NIDCONVOCATORIA,
                    'NIDPROCESO': NIDPROCESO
                });
                $.ajax({
                    async: false,
                    url: baseUrl + 'Gestion/SP_PROCESAR_GANADORES',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK") {
                            if (idProceso > 0)
                                listarPostulantesEval(idProceso)
                            else
                                ListarEstadosConvocatoria(NIDCONVOCATORIA, $("#sconv").val())
                            bootbox.alert("Se procesó con éxito.")
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
function ListarComite(NIDPROCESO) {
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
                    { "width": "35%", "targets": 2, "orderable": true },
                    { "width": "45%", "targets": 3, "orderable": true },
                    { "width": "10%", "targets": 4, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "<b>Miembros del Comité</b>",
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
                    "lengthMenu": [[10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "left").css("width", "40%");
                        $('td:eq(3)', nRow).css("text-align", "left").css("width", "35%");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                        return nRow;
                    },
                    "bFilter": false,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": false,
                    destroy: true,

                    columns: [
                        { data: 'NIDCOMITE' },
                        { data: 'NIDPERSONAL' },
                        { data: 'SNOMBREPERSONA' },
                        { data: 'SOFICINA' },
                        { data: 'STIPO_EVALUADOR' }
                    ]
                });

            
        }
    });
  
}
function ListarOficinasConv(id) {
    var dataObject = JSON.stringify({
        'NIDTABLA': id,
        'SDATO': 'O',
        'NIDPROCESO': 0
    });
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_TABLA_D',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var inf = data;
            var t = $('#tbl_memo').DataTable({
                data: inf,
                "order": [
                          [1, "desc"],
                          [2, "desc"]
                ],
                "columnDefs": [
                { "width": "0%", "targets": 0, "orderable": false },
                { "width": "20%", "targets": 1, "orderable": false },
                { "width": "20%", "targets": 2, "orderable": true },
                { "width": "20%", "targets": 3, "orderable": true }
                ],
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "<div style='padding-top:10px'><b>Lista de direcciones participantes</b></div>",
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
                    $('td:eq(0)', nRow).css("display", "none");
                    $('td:eq(1)', nRow).css("text-align", "left").css("width", "60%");
                    $('td:eq(2)', nRow).css("text-align", "center").css("width", "20%");
                    $('td:eq(3)', nRow).css("text-align", "center").css("width", "20%");
                    return nRow;
                },
                "bFilter": false,
                //"scrollX": true,
                "bLengthChange": true,
                "info": true,
                destroy: true,

                columns: [
                    { data: 'IDOFICODIGO' },
                    { data: 'DOFICINA' },
                    { data: 'NRO_PROCESOS' },
                    { data: 'IDOFICODIGO' }
                ]
            });
            var cont = 0;
            t.on('order.dt search.dt', function () {
                cont += 1;
                if (cont == 1) {
                    t.column(3, {}).nodes().each(function (cell, i) {
                        cell.innerHTML = "<a href='" + baseUrl + "Gestion/ExportarFormato?NIDPROCESO=" + cell.innerHTML + "&NOPT=9&NIDCONVOCATORIA="+id+"' target='_blank' STYLE='PADDING-RIGHT:10PX'>Generar Memo</a>";
                    });
                }
            }).draw();
        }
    });

}
function firmaC(id) {
    var NIDPROCESOUSU = $("#hddNIDPROCESOUSU").val();
    var FECHAGANADOR = $("#DFECHA_PUB").val();
    var FECHAFIRMA = $("#DFECHA_FIRMA").val();
    var NIPROCESO = $("#hddNIDPROCESO").val()
    if (FECHAGANADOR == "")
    {
        bootbox.alert("Debe ingresar la fecha que fue declarado ganador.");
        return;
    }
    if (FECHAFIRMA == "" && id == 1) {
        bootbox.alert("Debe ingresar la fecha que vino a firmar el contrato.");
        return;
    }
    if (NIDPROCESOUSU != 0) {
        bootbox.confirm("¿Está seguro que desea realizar esta operación?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'NFIRMA': id,
                    'DFECHAFIRMA':FECHAFIRMA,
                    'DFECHAGANADOR': FECHAGANADOR
                });
                $.ajax({
                    url: baseUrl + 'Gestion/SP_GUARDAR_FIRMA',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        if (result.SMENSAJE == "OK") {
                            if (id == 2)
                                ProcesarGanadores(NIPROCESO);
                            else {
                                listarPostulantesEval(NIPROCESO)
                                bootbox.alert("Se grabó la información ingresada.");
                            }
                            $("#divFirma").hide();
                            $("#hddNIDPROCESOUSU").val(0);
                        }
                        else
                            bootbox.alert(result.SMENSAJE);
                    }
                });
            }
        });
    }
    else {
        bootbox.alert("Debe seleccionar un postulante.");
    }
}