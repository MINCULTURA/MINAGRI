/*
$('.solo-numero').keyup(function () {
    this.value = (this.value + '').replace(/[^0-9 -]/g, '');
});*/

$(".solo-numero").keypress(function (key) {
    if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45)) //retroceso
    {
        return false;
    }
});

$(".cls-fecha").keypress(function (key) {
    if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45) //retroceso
        && (key.charCode != 47)) // slash 
    {
        return false;
    }
});

$(".letras").keypress(function (key) {
    //window.console.log(key.charCode)
    if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas
        && (key.charCode != 45) //retroceso
        && (key.charCode != 241) //ñ
         && (key.charCode != 209) //Ñ
         && (key.charCode != 32) //espacio
         && (key.charCode != 225) //á
         && (key.charCode != 233) //é
         && (key.charCode != 237) //í
         && (key.charCode != 243) //ó
         && (key.charCode != 250) //ú
         && (key.charCode != 193) //Á
         && (key.charCode != 201) //É
         && (key.charCode != 205) //Í
         && (key.charCode != 211) //Ó
         && (key.charCode != 218) //Ú

        )
        return false;
});

$(".letras-numeros").keypress(function (key) {
    if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas menos Ñ
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas menos ñ
        && (key.charCode < 48 || key.charCode > 57) //numeros
        && (key.charCode != 45) //retroceso
        && (key.charCode != 241) //ñ
         && (key.charCode != 209) //Ñ
         && (key.charCode != 32) //espacio
         && (key.charCode != 225) //á
         && (key.charCode != 233) //é
         && (key.charCode != 237) //í
         && (key.charCode != 243) //ó
         && (key.charCode != 250) //ú
         && (key.charCode != 193) //Á
         && (key.charCode != 201) //É
         && (key.charCode != 205) //Í
         && (key.charCode != 211) //Ó
         && (key.charCode != 218) //Ú
        )
        return false;
});

$(".letras-numeros-enter").keypress(function (key) {
    if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas menos Ñ
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas menos ñ
        && (key.charCode < 48 || key.charCode > 57) //numeros
        && (key.charCode != 45) //retroceso
        && (key.charCode != 13) //retroceso
        && (key.charCode != 241) //ñ
         && (key.charCode != 209) //Ñ
         && (key.charCode != 32) //espacio
         && (key.charCode != 225) //á
         && (key.charCode != 233) //é
         && (key.charCode != 237) //í
         && (key.charCode != 243) //ó
         && (key.charCode != 250) //ú
         && (key.charCode != 193) //Á
         && (key.charCode != 201) //É
         && (key.charCode != 205) //Í
         && (key.charCode != 211) //Ó
         && (key.charCode != 218) //Ú
        )
        return false;
});



$('.mayus').keyup(function () {
    this.value = this.value.toUpperCase();
});

$(window).load(function () {
    Cargar_InfAcademica();
    carga_bases();
});

$(document).ready(function () {
    setCalendar('d_exp');
    setCalendar('d_aca');
    setCalendar('d_cap');
    setCalendar('h_exp');
    setCalendar('h_aca');
    setCalendar('h_cap');
    setCalendar('_rna');
    cargarPDF();
});

function carga_bases() {
    var formacionAcademica = "";
    var experienciaGeneral = "";
    var experienciaEspecifica = "";
    var cursos = "";
    var conocimientos = "";
    var otros = "";
    var NIDPROCESO = $('#txtidproceso').val();
    var dataObject = JSON.stringify({
        'NIDPROCESO': NIDPROCESO,
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

            $("#NCONOCIMEINTO_B").append('<option value="0" selected>Seleccione</option>');
            $("#NCONOCIMEINTO_B").append('<option value="1">Adicional</option>');
            for (var i = 0; i < data.length; i++) {
                switch (data[i]["NIDITEM"]) {
                    case 1: formacionAcademica = formacionAcademica + "<li>" + data[i]["SDESCRIPCION"] + "</li>";
                        break;
                    case 2: experienciaGeneral = experienciaGeneral + "<li><B>EG</B> - " + data[i]["SDESCRIPCION"] + "</li>";
                        break;
                    case 3: experienciaEspecifica = experienciaEspecifica + "<li><B>EE</B> - " + data[i]["SDESCRIPCION"] + "</li>";
                        break;
                    case 4: cursos = cursos + "<li>" + data[i]["SDESCRIPCION"] + "</li>";
                        break;
                    case 13: conocimientos = conocimientos + "<li>" + data[i]["SDESCRIPCION"] + "</li>";
                        $("#NCONOCIMEINTO_B").append('<option value="' + data[i]["NIDREGISTRO"] + '">' + data[i]["SDESCRIPCION"] + '</option>');
                        break;
                    case 15: otros = otros + "<li>" + data[i]["SDESCRIPCION"] + "</li>";
                        break;
                }
            }
            $("#divFA").html("<p>FORMACIÓN REQUERIDA EN LAS BASES:<ul>" + formacionAcademica + "</ul></p>");
            $("#divCURSO").html("<p>ESPECIALIZACIÓN REQUERIDA EN LAS BASES:<ul>" + cursos + "</ul></p>");
            $("#divCRS").html("<p>CONOCIMIENTOS RELACIONADOS AL SERVICIO REQUERIDO EN LAS BASES:<ul>" + conocimientos + otros + "</ul></p>");
            $("#divEXP").html("<p>EXPERIENCIA REQUERIDA EN LAS BASES:<ul>" + experienciaGeneral + experienciaEspecifica + "</ul></p>");
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de PDF.' + ex);
        }
    });
}

function cargarPDF() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var dataObject = JSON.stringify({
        'NIDTABLA': NIDPROCESOUSU,
        'SDATO': 'D',
        'NIDPROCESO': 0
    });
    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_CONS_TABLA_D',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            var html = "<div id='idmaxS'>" + data.length + "</div>"
            for (var i = 0; i < data.length; i++) {
                html = html + '<a id="ECS_' + i + '" href="../' + $("#hddRUTADOC").val() + '/' + data[i]["RUTA"] + '" target="_blank" download="' + data[i]["NOMBRE"] + '">ECS</a>'
            }
            $("#divECS").html(html);
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de PDF.' + ex);
        }
    });
}
function descargarECS() {
    var max = $("#idmaxS").html();
    for (i = 0; i < max; i++) {
        $('#ECS_' + i)[0].click();
        var j = 0;
        for (j = 0; j < 1400000000; j++) {
            j = j;
        }
    }
}
function setDate(ext_id){
    $('#div_fecha'+ext_id).datetimepicker('update');
}

$("a[href='#FormAcademica']").on('shown.bs.tab', function (e) {
    Cargar_InfAcademica();
});

$("a[href='#Capacitacion']").on('shown.bs.tab', function (e) {
    Cargar_Capacitacion();
});

$("a[href='#ConEspecializado']").on('shown.bs.tab', function (e) {
    Cargar_Conocimiento();
});

$("a[href='#ConInformatico']").on('shown.bs.tab', function (e) {
    Cargar_ConocimientoInf();
});

$("a[href='#Idioma']").on('shown.bs.tab', function (e) {
    Cargar_Idioma();
});

$("a[href='#Experiencia']").on('shown.bs.tab', function (e) {
    Cargar_Experiencia();
});

$("a[href='#DatosAdicional']").on('shown.bs.tab', function (e) {
    Cargar_DatosAdic();
});

function Cargar_InfAcademica() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    
    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });
    var modo = $('#modo').val();
    if (modo == "Editar") {
        modo = "show";
    } else {
        modo = "none";
    }
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_FORMACIONAC',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_FormAcademica').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 13, "orderable": false },
                    { "width": "0%", "targets": 14, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sEmptyTable": "No hay registros disponibles",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando..."
                    },
                    "lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(5)', nRow).css("text-align", "left").css("width", "10%");
                        $('td:eq(6)', nRow).css("text-align", "left").css("width", "30%");
                        $('td:eq(7)', nRow).css("text-align", "left").css("width", "10%");
                        $('td:eq(8)', nRow).css("text-align", "left").css("width", "30%");
                        $('td:eq(9)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(10)', nRow).css("display", "none");
                        $('td:eq(11)', nRow).css("display", "none");
                        $('td:eq(12)', nRow).css("display", "none");
                        $('td:eq(13)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit").css("display", modo);;
                        $('td:eq(14)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);;
                        $('td:eq(15)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(16)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(17)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(18)', nRow).css("text-align", "center").css("display", "none");
                        return nRow;

                    },
                    "bFilter": false,
                    //"scrollX": true,
                    "bLengthChange": false,
                    "info": false,
                    "paging": false,
                    destroy: true,

                    columns: [
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'NIDFACADEMICA' },
                        { data: 'NIDTIPOFORMACION' },
                        { data: 'STIPOFORMACION' },
                        { data: 'SINSTITUCION' },
                        { data: 'SGRADOACADEMICO' },
                        { data: 'SPROFESION' },
                        { data: 'DFECHA_DESDE' },
                        { data: 'DFECHA_HASTA' },
                        { data: 'NANIOSESTUDIO' },
                        { data: 'SFOLIO' },
                        { data: 'NIDFACADEMICA' },
                        { data: 'NIDFACADEMICA' },
                        { data: 'NIDGRADOACADEMICO' },
                        { data: 'SRUTADOC' },
                        { data: 'COD_INSTITUCION' },
                        { data: 'COD_CARRERA' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        if (modo != "none") {
                            t.column(13, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                            });

                            t.column(14, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarInfAcad(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                            });
                        }

                        t.column(5, {}).nodes().each(function (cell, i) {
                            t.column(16, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            if (SRUTADOC != "")
                                cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML + '</a></div>'
                        });
                    }
                }).draw();
        }
    });

    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_COLEGIATURA',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Colegiatura').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "5%", "targets": 8, "orderable": false },
                    { "width": "5%", "targets": 9, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
                        "sEmptyTable": "No hay registros disponibles",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando..."
                    },
                    "lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "15%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(7)', nRow).css("display", "none");
                        $('td:eq(8)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit").css("display", modo);;
                        $('td:eq(9)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);;
                        $('td:eq(10)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(11)', nRow).css("text-align", "center").css("display", "none");
                        return nRow;
                    },
                    "bFilter": false,
                    //"scrollX": true,
                    "bLengthChange": false,
                    "info": false,
                    "paging": false,
                    destroy: true,

                    columns: [
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'NIDCOLEGIATURA' },
                        { data: 'SCOLEGIO' },
                        { data: 'SNROCOLEGIATURA' },
                        { data: 'SCONDICION' },
                        { data: 'SFOLIO' },
                        { data: 'NIDCOLEGIATURA' },
                        { data: 'NIDCOLEGIATURA' },
                        { data: 'BCONDICION' },
                        { data: 'SRUTADOC' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        if (modo != "none") {
                            t.column(8, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                            });

                            t.column(9, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarColeg(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                            });
                        }

                        t.column(4, {}).nodes().each(function (cell, i) {
                            t.column(11, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            if (SRUTADOC != "")
                                cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML + '</a></div>'
                        });
                    }
                }).draw();
            
        }
    });
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_RNA',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_RNA').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "10%", "targets": 6, "orderable": false },
                    { "width": "10%", "targets": 7, "orderable": false }
                    ],
                    "oLanguage": {
                        "sProcessing": "Procesando...",
                        "sEmptyTable": "No hay registros disponibles",
                        "sInfoPostFix": "",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando..."
                    },
                    "lengthMenu": [[10, 20, 30, 40, 50, -1], [10, 20, 30, 40, 50, "Todo"]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $('td:eq(0)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(1)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "40%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "40%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%").attr("class", "edit").css("display", modo);
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "10%").attr("class", "delete").css("display", modo);
                        return nRow;
                    },
                    "bFilter": false,
                    //"scrollX": true,
                    "bLengthChange": false,
                    "info": false,
                    "paging": false,
                    destroy: true,

                    columns: [
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'NIDRNA' },
                        { data: 'SCODIGO_INS' },
                        { data: 'DFECHA_REG' },
                        { data: 'NIDRNA' },
                        { data: 'NIDRNA' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        if (modo != "none") {
                            t.column(6, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                            });

                            t.column(7, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarRNA(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                            });
                        }
                    }
                }).draw();
           
        }
    });
}

function EliminarInfAcad(NIDFACADEMICA) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDFACADEMICA': NIDFACADEMICA,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_FORMACIONAC',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó el registro de Información Académica con éxito.!");
                    Cargar_InfAcademica();
                }
            });
        }
    });
}



$('#tbl_FormAcademica').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_FormAcademica').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    var id_proceso = $("#txtidproceso").val();
    CARGARDDL(1, 'NIDTIPOFORMACION', $(this).closest('tr').find('td:eq(4)').text(), id_proceso,'0');
    CARGARDDL(2, 'NIDGRADOACADEMICO', $(this).closest('tr').find('td:eq(15)').text(), 0);
    $('#hddNIDFACADEMICA').val($(this).closest('tr').find('td:eq(3)').text());
    CARGARDDL(0, 'NIDINSTITUCION', $(this).closest('tr').find('td:eq(17)').text(), 0, 'Seleccione', 'INST', 'S')
    //CARGARDDL($("#NIDINSTITUCION").val(), 'NIDESPECIALIDAD', $(this).closest('tr').find('td:eq(18)').text(), 0, 'Seleccione', 'CARR', 'S')
    cargaInstitucion($("#NIDTIPOFORMACION").val())
    cargaCarrera($("#NIDINSTITUCION").val())
    $("#NIDESPECIALIDAD").val($(this).closest('tr').find('td:eq(18)').text()).trigger("change");
    //$(".modal-body #NIDTIPOFORMACION").val($(this).closest('tr').find('td:eq(4)').text());
    $("#SINSTITUCION").val($(this).closest('tr').find('td:eq(6)').text());
    $("#SPROFESION").val($(this).closest('tr').find('td:eq(8)').text());
    $("#NANIOSESTUDIO").val($(this).closest('tr').find('td:eq(11)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(16)').text());
    $("#DFECHA_DESDE_ACA").val($(this).closest('tr').find('td:eq(9)').text());
    $("#DFECHA_HASTA_ACA").val($(this).closest('tr').find('td:eq(10)').text());
    mostrarRutaDoc("ACA", $("#SRUTADOC").val());
    setDate('d_aca');
    setDate('h_aca');
    $('#ModalFA').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

});
function NuevoModalFA() {
    $('#ModalFA').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
    var id_proceso = $("#txtidproceso").val();

    CARGARDDL(1, 'NIDTIPOFORMACION', 0, id_proceso, 0);
    CARGARDDL(2, 'NIDGRADOACADEMICO', 0, 0);
    CARGARDDL(0, 'NIDINSTITUCION', 0, 0, 'Seleccione', 'INST', 'S')
    CARGARDDL(0, 'NIDESPECIALIDAD', 0, 0, 'Seleccione', 'CARR', 'S')
    cargaInstitucion($("#NIDTIPOFORMACION").val())
    $('#hddNIDFACADEMICA').val(0);
    //$(".modal-body #NIDTIPOFORMACION").val($(this).closest('tr').find('td:eq(4)').text());
    $("#SINSTITUCION").val("");
    $("#SGRADOACADEMICO").val("");
    $("#SPROFESION").val("");

    $("#DFECHA_DESDE_ACA").val("");
    $("#DFECHA_HASTA_ACA").val("");
    $("#NANIOSESTUDIO").val("");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("ACA");
}
function GuardarFormAcadem() {
    $(".modal-footer").css("display","none" );
    var NIDFACADEMICA = $('#hddNIDFACADEMICA').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var NIDTIPOFORMACION = $('#NIDTIPOFORMACION').val();
    var NIDGRADOACADEMICO = $('#NIDGRADOACADEMICO').val();
    var SINSTITUCION = $('#SINSTITUCION').val();
    var SPROFESION = $('#SPROFESION').val();
    var DFECHA_DESDE = $('#DFECHA_DESDE_ACA').val();
    var DFECHA_HASTA = $('#DFECHA_HASTA_ACA').val();
    var NANIOSESTUDIO = $('#NANIOSESTUDIO').val();
    var NIDINSTITUCION = $('#NIDINSTITUCION').val();
    var NIDESPECIALIDAD = $('#NIDESPECIALIDAD').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (NIDTIPOFORMACION == "0") {
        error += "tipo de información académica, ";
    }
    if (NIDTIPOFORMACION < 9) {
        if (NIDINSTITUCION != "0") {
            SINSTITUCION = $('select[name="NIDINSTITUCION"] option:selected').text()
            if (NIDINSTITUCION != 199999999 && NIDINSTITUCION != 299999999) {
                if (NIDESPECIALIDAD != "0") {
                    SPROFESION = $('select[name="NIDESPECIALIDAD"] option:selected').text()
                }
            } else {
                SINSTITUCION = $('#SINSTITUCION').val();
                SPROFESION = $('#SPROFESION').val();
            }
        }
    } else {
        SINSTITUCION = $('#SINSTITUCION').val();
        SPROFESION = $('#SPROFESION').val();
    }
        if (SINSTITUCION == "") {
            error += "institución, ";
        }
        if (SPROFESION == "") {
            error += "profesión, ";
        }
    if (NIDGRADOACADEMICO == "0") {
        error += "grado académico, ";
    }
    
    if (DFECHA_DESDE == "") {
        error += "fecha de expedición, ";
    }
    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }
    
    if (error != '' || error2 != '') {

        $(".modal-footer").css("display", "block");
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("ACA", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {
                    $(".modal-footer").css("display", "block");
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else
                return;
        }
        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                $(".modal-footer").css("display", "block");
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDFACADEMICA': NIDFACADEMICA,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'NIDTIPOFORMACION': NIDTIPOFORMACION,
                    'SINSTITUCION': SINSTITUCION,
                    'NIDGRADOACADEMICO': NIDGRADOACADEMICO,
                    'SPROFESION': SPROFESION,
                    'DFECHA_DESDE': DFECHA_DESDE,
                    'DFECHA_HASTA': DFECHA_HASTA,
                    'NANIOSESTUDIO': NANIOSESTUDIO,
                    'BACTIVO': BACTIVO,
                    'SRUTADOC': $("#SRUTADOC").val(),
                    'NINSTITUCION': NIDINSTITUCION,
                    'COD_CARRERA': NIDESPECIALIDAD
                });

                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_FORMACIONAC',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_InfAcademica();
                        $('#ModalFA').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
                $(".modal-footer").css("display", "block");
            }
        });
    }
}

function EliminarColeg(NIDCOLEGIATURA) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCOLEGIATURA': NIDCOLEGIATURA,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_COLEGIATURA',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se eliminó el registro de Colegiatura.!");
                    Cargar_InfAcademica();
                }
            });
        }
    });
}

$('#tbl_Colegiatura').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Colegiatura').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#hddNIDCOLEGIATURA").val($(this).closest('tr').find('td:eq(3)').text());
    $(".modal-body #BCONDICION_CO").val($(this).closest('tr').find('td:eq(10)').text());
    $("#SNROCOLEGIATURA_CO").val($(this).closest('tr').find('td:eq(5)').text());
    $("#SCOLEGIO_CO").val($(this).closest('tr').find('td:eq(4)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(11)').text());
    mostrarRutaDoc("COL", $("#SRUTADOC").val());
    $('#ModalCO').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

});

function EliminarRNA(NIDRNA) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDRNA': NIDRNA,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_RNA',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se eliminó el registro RNA.!");
                    Cargar_InfAcademica();
                }
            });
        }
    });
}

$('#tbl_RNA').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_RNA').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#hddNIDRNA").val($(this).closest('tr').find('td:eq(3)').text());
    $("#SCODIGO_INS").val($(this).closest('tr').find('td:eq(4)').text());
    $("#DFECHA_REG").val($(this).closest('tr').find('td:eq(5)').text());
    setDate('_rna');
    $('#ModalRNA').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

});
function GuardarRNA() {
    var NIDRNA = $('#hddNIDRNA').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var SCODIGO_INS = $('#SCODIGO_INS').val();
    var DFECHA_REG = $('#DFECHA_REG').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (SCODIGO_INS == "") {
        error += "código de inscripción, ";
    }

    if (DFECHA_REG == "") {
        error += "fecha de registro, ";
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
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDRNA': NIDRNA,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'DFECHA_REG': DFECHA_REG,
                    'SCODIGO_INS': SCODIGO_INS,
                    'BACTIVO': BACTIVO
                });
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_RNA',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_InfAcademica();
                        $('#ModalRNA').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}

function GuardarColegiatura() {
    var NIDCOLEGIATURA = $('#hddNIDCOLEGIATURA').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var BCONDICION = $('#BCONDICION_CO').val();
    var SNROCOLEGIATURA = $('#SNROCOLEGIATURA_CO').val();
    var SCOLEGIO = $('#SCOLEGIO_CO').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (SCOLEGIO == "") {
        error += "colegio profesional, ";
    }

    if (SNROCOLEGIATURA == "") {
        error += "nro. de colegiatura, ";
    }

    if (BCONDICION != "0" && BCONDICION != "1") {
        error += "condición, ";
    }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }
    
    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("COL", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else
                return;
        }
        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDCOLEGIATURA': NIDCOLEGIATURA,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'BCONDICION': BCONDICION,
                    'SINSTITUCION': SINSTITUCION,
                    'SNROCOLEGIATURA': SNROCOLEGIATURA,
                    'SCOLEGIO': SCOLEGIO,
                    'BACTIVO': BACTIVO,
                    'SRUTADOC': $("#SRUTADOC").val()
                });
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_COLEGIATURA',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_InfAcademica();
                        $('#ModalCO').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}

function Cargar_Capacitacion() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();

    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });
    var modo = $('#modo').val();
    if (modo == "Editar") {
        modo = "show";
    } else {
        modo = "none";
    }
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_CAPACITACION',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Capacitacion').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "10%", "targets": 4, "orderable": true },
                    { "width": "10%", "targets": 5, "orderable": true },
                    { "width": "10%", "targets": 6, "orderable": true },
                    { "width": "15%", "targets": 7, "orderable": true },
                    { "width": "10%", "targets": 8, "orderable": true },
                    { "width": "10%", "targets": 9, "orderable": true },
                    { "width": "5%", "targets": 10, "orderable": false },
                    { "width": "5%", "targets": 11, "orderable": false },
                    { "width": "0%", "targets": 12, "orderable": false }
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
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "15%");
                        $('td:eq(8)', nRow).css("text-align", "center").css("width", "10%");
                        $('td:eq(9)', nRow).css("display", "none");
                        $('td:eq(10)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit").css("display", modo);
                        $('td:eq(11)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);
                        $('td:eq(12)', nRow).css("text-align", "center").css("display", "none");
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
                        { data: 'NIDCAPACITACION' },
                        { data: 'DFECHA_DESDE' },
                        { data: 'DFECHA_HASTA' },
                        { data: 'SCURSO' },
                        { data: 'SINTITUCION' },
                        { data: 'NHORAS' },
                        { data: 'SFOLIO' },
                        { data: 'NIDCAPACITACION' },
                        { data: 'NIDCAPACITACION' },
                        { data: 'SRUTADOC' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {
                        if (modo != "none") {
                            t.column(10, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="' + modo + '"></i></div>'
                            });

                            t.column(11, {}).nodes().each(function (cell, i) {
                                cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarCapa(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                            });
                        }

                        t.column(6, {}).nodes().each(function (cell, i) {
                            t.column(12, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            if (SRUTADOC != "")
                                cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML + '</a></div>'
                        });
                    }

                }).draw();
        }
    });
}

$('#tbl_Capacitacion').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Capacitacion').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#hddNIDCAPACITACION").val($(this).closest('tr').find('td:eq(3)').text());
    $("#DFECHA_DESDE_CAP").val($(this).closest('tr').find('td:eq(4)').text());
    $("#DFECHA_HASTA_CAP").val($(this).closest('tr').find('td:eq(5)').text());
    $("#SCURSO_CA").val($(this).closest('tr').find('td:eq(6)').text());
    $("#SINTITUCION_CA").val($(this).closest('tr').find('td:eq(7)').text());
    $("#NHORAS_CA").val($(this).closest('tr').find('td:eq(8)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(12)').text());
    mostrarRutaDoc("CAP", $("#SRUTADOC").val());
    setDate('d_cap');
    setDate('h_cap');
    $('#ModalCA').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

});

function GuardarCapacitacion() {
    var NIDCAPACITACION = $('#hddNIDCAPACITACION').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var DFECHA_DESDE = $('#DFECHA_DESDE_CAP').val();
    var DFECHA_HASTA = $('#DFECHA_HASTA_CAP').val();
    var SCURSO = $('#SCURSO_CA').val();
    var SINTITUCION = $('#SINTITUCION_CA').val();
    var NHORAS = $('#NHORAS_CA').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (DFECHA_DESDE == "") {
        error += "fecha desde, ";
    }
    if (DFECHA_HASTA == "") {
        error += "fecha hasta, ";
    }
    if (SCURSO == "") {
        error += "curso/evento, ";
    }
    if (SINTITUCION == "") {
        error += "institución, ";
    }
    if (NHORAS == "") {
        error += "horas lectivas, ";
    }
    var dato = DFECHA_DESDE.split('/');
    var fdesde = dato[2] + dato[1] - 1 + dato[0];
    dato = DFECHA_HASTA.split('/');
    var fhasta = dato[2] + dato[1] - 1 + dato[0];
    if (fhasta < fdesde) {
        error2 += "fecha desde debe ser menor que fecha hasta.";
    }
  
    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }
    
    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("CAP", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else
                return;
        }
        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDCAPACITACION': NIDCAPACITACION,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'DFECHA_DESDE': DFECHA_DESDE,
                    'DFECHA_HASTA': DFECHA_HASTA,
                    'SCURSO': SCURSO,
                    'SINTITUCION': SINTITUCION,
                    'NHORAS': NHORAS,
                    'BACTIVO': BACTIVO,
                    'SRUTADOC': $("#SRUTADOC").val()
                });
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_CAPACITACION',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_Capacitacion();
                        $('#ModalCA').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}

function EliminarCapa(NIDCAPACITACION) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCAPACITACION': NIDCAPACITACION,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_CAPACITACION',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó el registro de Capacitación Obligatoria.!");
                    Cargar_Capacitacion();
                }
            });
        }
    });
}

function Cargar_Conocimiento() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();

    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });
    var modo = $('#modo').val();
    if (modo == "Editar") {
        modo = "show";
    } else {
        modo = "none";
    }
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_CONOCIMIENTO',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Conocimiento').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "20%", "targets": 4, "orderable": true },
                    { "width": "70%", "targets": 5, "orderable": true },
                    { "width": "5%", "targets": 6, "orderable": false },
                    { "width": "5%", "targets": 7, "orderable": false },
                    { "width": "0%", "targets": 8, "orderable": false },
                    { "width": "0%", "targets": 9, "orderable": false }
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
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "20%");
                        $('td:eq(5)', nRow).css("text-align", "left").css("width", "70%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit").css("display", modo);
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);
                        $('td:eq(8)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(9)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(10)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(11)', nRow).css("text-align", "center").css("display", "none");
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
                        { data: 'NIDCONOCIMIENTO' },
                        { data: 'STIPO' },
                        { data: 'SCONOCIMIENTO_B' },
                        { data: 'NIDCONOCIMIENTO' },
                        { data: 'NIDCONOCIMIENTO' },
                        { data: 'NIDTIPO' },
                        { data: 'SRUTADOC' },
                        { data: 'NCONOCIMIENTO_B' },
                        { data: 'SDESCRIPCION' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {

                        t.column(6, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                        });

                        t.column(7, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarCon(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                        });
                        t.column(5, {}).nodes().each(function (cell, i) {
                            t.column(9, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            t.column(11, {}).nodes().each(function (cell, j) { if (i == j) { DESCRIP = cell.innerHTML; } });
                            cell.innerHTML = cell.innerHTML + ' - ' + DESCRIP
                            if (SRUTADOC != "")
                                cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML  + '</a></div>'
                        });
                    }

                }).draw();
        }
    });
}

$('#tbl_Conocimiento').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Conocimiento').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    CARGARDDL(3, 'NIDTIPO', $(this).closest('tr').find('td:eq(8)').text());
    $('#hddNIDCONOCIMIENTO').val($(this).closest('tr').find('td:eq(3)').text());
    $("#SDESCRIPCION_CE").val($(this).closest('tr').find('td:eq(11)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(9)').text());
    mostrarRutaDoc("CRS", $("#SRUTADOC").val());
    $("#NCONOCIMEINTO_B").val($(this).closest('tr').find('td:eq(10)').text());
    $('#ModalCE').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

});

function GuardarConocimiento() {
    var NIDCONOCIMIENTO = $('#hddNIDCONOCIMIENTO').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var SDESCRIPCION = $('#SDESCRIPCION_CE').val();
    var NIDTIPO = $('#NIDTIPO').val();
    var NCONOCIMEINTO_B = $('#NCONOCIMEINTO_B').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (SDESCRIPCION == "") {
        error += "descripción sobre el conocimiento, ";
    }
    if (NIDTIPO == "0") {
        error += "tipo, ";
    }
    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }

    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("CRS", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else
                return;
        }
        var dataObject = JSON.stringify({
            'NIDCONOCIMIENTO': NIDCONOCIMIENTO,
            'NIDPROCESOUSU': NIDPROCESOUSU,
            'SDESCRIPCION': SDESCRIPCION,
            'BACTIVO': BACTIVO,
            'NIDTIPO': NIDTIPO,
            'SRUTADOC': $('#SRUTADOC').val(),
            'NCONOCIMEINTO_B': NCONOCIMEINTO_B
        });

        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_CONOCIMIENTO',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_Conocimiento();
                        $('#ModalCE').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}

function EliminarCon(NIDCONOCIMIENTO) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCONOCIMIENTO': NIDCONOCIMIENTO,
                'BACTIVO': 0,
            });
            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_CONOCIMIENTO',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó el registro de Conocimiento Especializado.!");
                    Cargar_Conocimiento();
                }
            });
        }
    });
}

function Cargar_ConocimientoInf() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var modo = $('#modo').val();
    if (modo == "Editar") {
        modo = "show";
    } else {
        modo = "none";
    }
    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_CONOCIMIENTOINF',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_ConocimientoInf').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "5%", "targets": 6, "orderable": false },
                    { "width": "5%", "targets": 7, "orderable": false },
                    { "width": "0%", "targets": 8, "orderable": false },
                    { "width": "0%", "targets": 9, "orderable": false }
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
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "30%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "30%");
                        $('td:eq(6)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit").css("display", modo);
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);
                        $('td:eq(8)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(9)', nRow).css("text-align", "center").css("display", "none");
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
                        { data: 'NIDCONOCIMIENTOINF' },
                        { data: 'SCONOCIMIENTO' },
                        { data: 'STIPO' },
                        { data: 'NIDCONOCIMIENTOINF' },
                        { data: 'NIDCONOCIMIENTOINF' },
                        { data: 'BTIPO' },
                        { data: 'SRUTADOC' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {

                        t.column(6, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                        });

                        t.column(7, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarConInf(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                        });
                        t.column(4, {}).nodes().each(function (cell, i) {
                            t.column(9, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            if (SRUTADOC != "")
                                cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML + '</a></div>'
                        });
                    }

                }).draw();
        }
    });
}

$('#tbl_ConocimientoInf').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {
    }
    else {
        $('#tbl_ConocimientoInf').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#hddNIDCONOCIMIENTOINF").val($(this).closest('tr').find('td:eq(3)').text());
    $("#SCONOCIMIENTO_CI").val($(this).closest('tr').find('td:eq(4)').text());
    $(".modal-body #BTIPO_CI").val($(this).closest('tr').find('td:eq(8)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(9)').text());
    mostrarRutaDoc("INF", $("#SRUTADOC").val());
    $('#ModalCI').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
});

function GuardarConocimientoInf() {
    var NIDCONOCIMIENTOINF = $('#hddNIDCONOCIMIENTOINF').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var SCONOCIMIENTO = $('#SCONOCIMIENTO_CI').val();
    var BTIPO = $('#BTIPO_CI').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (SCONOCIMIENTO == "") {
        error += "conocimiento, ";
    }

    if (BTIPO == "0") {
        error += "tipo, ";
    }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }
    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("INF", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else
                return;
        }
        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDCONOCIMIENTOINF': NIDCONOCIMIENTOINF,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'SCONOCIMIENTO': SCONOCIMIENTO,
                    'BTIPO': BTIPO,
                    'BACTIVO': BACTIVO,
                    'SRUTADOC': $("#SRUTADOC").val()
                });
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_CONOCIMIENTOINF',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_ConocimientoInf();
                        $('#ModalCI').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}

function EliminarConInf(NIDCONOCIMIENTOINF) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDCONOCIMIENTOINF': NIDCONOCIMIENTOINF,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_CONOCIMIENTOINF',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó el registro de Conocimiento Informático.!");
                    Cargar_ConocimientoInf();
                }
            });
        }
    });
}

function Cargar_Idioma() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var modo = $('#modo').val();
    if (modo == "Editar") {
        modo = "show";
    } else {
        modo = "none";
    }
    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });

    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_IDIOMA',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Idioma').DataTable({
                    data: inf,
                    "columnDefs": [
                    { "width": "0%", "targets": 0, "orderable": false },
                    { "width": "0%", "targets": 1, "orderable": false },
                    { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "5%", "targets": 7, "orderable": false },
                    { "width": "5%", "targets": 8, "orderable": false },
                    { "width": "0%", "targets": 9, "orderable": false },
                    { "width": "0%", "targets": 10, "orderable": false }
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
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "left").css("width", "30%");
                        $('td:eq(5)', nRow).css("text-align", "center").css("width", "30%");
                        $('td:eq(6)', nRow).css("display", "none");
                        $('td:eq(7)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit").css("display", modo);
                        $('td:eq(8)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);
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
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'NIDIDIOMA' },
                        { data: 'SIDIOMA' },
                        { data: 'STIPO' },
                        { data: 'SFOLIO' },
                        { data: 'NIDIDIOMA' },
                        { data: 'NIDIDIOMA' },
                        { data: 'BTIPO' },
                        { data: 'SRUTADOC' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {

                        t.column(7, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                        });

                        t.column(8, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarIdioma(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                        });
                        t.column(4, {}).nodes().each(function (cell, i) {
                            t.column(10, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            if (SRUTADOC !="")
                                cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML + '</a></div>'
                        });
                    }
                }).draw();
        }
    });
}

$('#tbl_Idioma').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Idioma').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#hddNIDIDIOMA").val($(this).closest('tr').find('td:eq(3)').text());
    $("#SIDIOMA_I").val($(this).closest('tr').find('td:eq(4)').text());
    $(".modal-body #BTIPO_I").val($(this).closest('tr').find('td:eq(9)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(10)').text());
    mostrarRutaDoc("IDI", $("#SRUTADOC").val());
    $('#ModalI').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

});

function GuardarIdioma() {
    var NIDIDIOMA = $('#hddNIDIDIOMA').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var SIDIOMA = $('#SIDIOMA_I').val();
    var BTIPO = $('#BTIPO_I').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (SIDIOMA == "") {
        error += "idioma, ";
    }

    if (BTIPO == "0") {
        error += "tipo, ";
    }
    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }
    
    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("IDI", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else
                return;
        }
        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDIDIOMA': NIDIDIOMA,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'SIDIOMA': SIDIOMA,
                    'BTIPO': BTIPO,
                    'BACTIVO': BACTIVO,
                    'SRUTADOC': $("#SRUTADOC").val()
                });
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_IDIOMA',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_Idioma();
                        $('#ModalI').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
            }
        });
    }
}

function EliminarIdioma(NIDIDIOMA) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDIDIOMA': NIDIDIOMA,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_IDIOMA',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó el registro de Idioma.!");
                    Cargar_Idioma();
                }
            });
        }
    });
}

function Cargar_Experiencia() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();

    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });
    var modo = $('#modo').val();
    if (modo == "Editar") {
        modo = "show";
    } else {
        modo = "none";
    }
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_EXP_ACUM',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (result) {
            $("#divExpEsp").html("Experiencia Específica: " + result.SEXP_ESP);
            $("#divExpGen").html("Experiencia General: " + result.SEXP_GEN);
        }/*,
        error: function (xhr, status, p3, p4) {
            alert(xhr.responseText);
        }*/
    });

    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_EXPERIENCIA',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
                var inf = data;
                var t = $('#tbl_Experiencia').DataTable({
                    data: inf,
                    "order": [
                              [6, "desc"],
                              [2, "desc"]
                    ],
                    "columnDefs": [
                    { "width": "5%", "targets": 0, "orderable": false },
                    { "width": "5%", "targets": 1, "orderable": false },
                     { "width": "0%", "targets": 2, "orderable": false },
                    { "width": "0%", "targets": 3, "orderable": false },
                    { "width": "0%", "targets": 4, "orderable": false },
                    { "width": "0%", "targets": 5, "orderable": false },
                    { "width": "5%", "targets": 14, "orderable": false },
                    { "width": "5%", "targets": 15, "orderable": false },
                    { "width": "10%", "targets": 16, "orderable": true },
                    { "width": "0%", "targets": 19, "orderable": false },
                    { "width": "0%", "targets": 20, "orderable": false },
                    { "width": "0%", "targets": 21, "orderable": false },
                    { "width": "0%", "targets": 22, "orderable": false },
                    { "width": "0%", "targets": 23, "orderable": false }
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
                        $('td:eq(0)', nRow).css("text-align", "center").css("width", "5%").attr("class", "edit");
                        $('td:eq(1)', nRow).css("text-align", "center").css("width", "5%").attr("class", "delete").css("display", modo);;
                        $('td:eq(2)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(3)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(4)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(5)', nRow).css("text-align", "center").css("display", "none");
                        $('td:eq(6)', nRow).css("text-align", "left").css("width", "12%");
                        $('td:eq(7)', nRow).css("text-align", "left").css("width", "13%");
                        $('td:eq(8)', nRow).css("text-align", "left").css("width", "9%");
                        $('td:eq(9)', nRow).css("text-align", "left").css("width", "23%");
                        $('td:eq(10)', nRow).css("text-align", "left").css("width", "9%");
                        $('td:eq(11)', nRow).css("text-align", "left").css("width", "9%");
                        $('td:eq(12)', nRow).css("display", "none");
                        $('td:eq(13)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(14)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(15)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(16)', nRow).css("text-align", "center").css("width", "5%");
                        $('td:eq(17)', nRow).css("display", "none");
                        $('td:eq(18)', nRow).css("display", "none");
                        $('td:eq(19)', nRow).css("display", "none");
                        $('td:eq(20)', nRow).css("display", "none");
                        $('td:eq(21)', nRow).css("display", "none");
                        $('td:eq(22)', nRow).css("display", "none");
                        $('td:eq(23)', nRow).css("display", "none");
                        return nRow;
                    },
                    "bFilter": true,
                    //"scrollX": true,
                    "bLengthChange": true,
                    "info": true,
                    destroy: true,

                    columns: [
                        { data: 'NIDEXPERIENCIA' },
                        { data: 'NIDEXPERIENCIA' },
                        { data: 'NIDPROCESOUSU' },
                        { data: 'NIDPROCESO' },
                        { data: 'NIDCODIGOUSUARIO' },
                        { data: 'NIDEXPERIENCIA' },
                        { data: 'SENTIDAD' },
                        { data: 'SAREA' },
                        { data: 'SCARGO' },
                        { data: 'SFUNCIONESC' },
                        { data: 'SMODALIDAD' },
                        { data: 'SMOTIVORETIRO' },
                        { data: 'SNOMBRECARGOJEFE' },
                        { data: 'STIEMPOSERVICIO' },
                        { data: 'DFECHA_DESDE' },
                        { data: 'DFECHA_HASTA' },
                        { data: 'NREMUNERACION' },
                        { data: 'STELEFONO' },
                        { data: 'SFOLIO' },
                        { data: 'BESPECIFICA' },
                        { data: 'BSECTOR' },
                        { data: 'SFUNCIONES' },
                        { data: 'SRUTADOC' },
                        { data: 'NPRESENTACIONES' }
                    ]
                });

                var cont = 0;

                t.on('order.dt search.dt', function () {
                    cont += 1;
                    if (cont == 1) {

                        t.column(0, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-pencil" onclick="" style="font-size: 20px;" title="EDITAR"></i></div>'
                        });

                        t.column(1, {}).nodes().each(function (cell, i) {
                            cell.innerHTML = '<div><i class="fa fa-trash-o" onclick="EliminarExp(' + cell.innerHTML + ');" style="font-size: 20px;" title="ELIMINAR"></i></div>'
                        });
                        t.column(6, {}).nodes().each(function (cell, i) {
                            t.column(22, {}).nodes().each(function (cell, j) { if (i == j) { SRUTADOC = cell.innerHTML; } });
                            if (SRUTADOC != "")
                            cell.innerHTML = '<div><a href="../' + $("#hddRUTADOC").val() + '/' + SRUTADOC + '" target="_blank">' + cell.innerHTML + '</a></div>'
                        });
                    }
                }).draw();
        }
    });
}

$('#tbl_Experiencia').on('click', 'tr', function (event) {
    if ($(this).hasClass('selected')) {

    }
    else {
        $('#tbl_Experiencia').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}).on('click', 'tbody td.edit i', function (event) {
    $("#hddNIDEXPERIENCIA").val($(this).closest('tr').find('td:eq(5)').text());
    $("#SENTIDAD_EX").val($(this).closest('tr').find('td:eq(6)').text());
    $("#SAREA_EX").val($(this).closest('tr').find('td:eq(7)').text());
    $("#SCARGO_EX").val($(this).closest('tr').find('td:eq(8)').text());
    $("#SFUNCIONES_EX").val($(this).closest('tr').find('td:eq(21)').text());
    $("#SMODALIDAD_EX").val($(this).closest('tr').find('td:eq(10)').text());
    $("#SMOTIVORETIRO_EX").val($(this).closest('tr').find('td:eq(11)').text());
    $("#SNOMBRECARGOJEFE_EX").val($(this).closest('tr').find('td:eq(12)').text());
    $("#divTiempoServicio").html($(this).closest('tr').find('td:eq(13)').text());

    if ($(this).closest('tr').find('td:eq(19)').text() == "1")
        $("#BESPECIFICA").prop("checked", "checked");
    else
        $("#BESPECIFICA").prop("checked", "");
    $("#BSECTOR").val($(this).closest('tr').find('td:eq(20)').text());

    $("#DFECHA_DESDE_EXP").val($(this).closest('tr').find('td:eq(14)').text());
    $("#DFECHA_HASTA_EXP").val($(this).closest('tr').find('td:eq(15)').text());
    $("#NPRESENTACIONES").val($(this).closest('tr').find('td:eq(23)').text());

    $("#NREMUNERACION_EX").val($(this).closest('tr').find('td:eq(16)').text());
    $("#STELEFONO_EX").val($(this).closest('tr').find('td:eq(17)').text());
    $("#SRUTADOC").val($(this).closest('tr').find('td:eq(22)').text());
    mostrarRutaDoc("EXP", $("#SRUTADOC").val());
    setDate('d_exp');
    setDate('h_exp');
    $('#ModalEX').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
});

function GuardarExp() {
    $(".modal-footer").css("display", "none");
    var NIDEXPERIENCIA = $('#hddNIDEXPERIENCIA').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var BESPECIFICA = $("#BESPECIFICA").is(':checked') ? 1 : 0;
    var SENTIDAD = $("#SENTIDAD_EX").val();
    var SAREA = $("#SAREA_EX").val();
    var SCARGO = $("#SCARGO_EX").val();
    var SFUNCIONES = $("#SFUNCIONES_EX").val();
    var SMODALIDAD = $("#SMODALIDAD_EX").val();
    var SMOTIVORETIRO = $("#SMOTIVORETIRO_EX").val();
    var SNOMBRECARGOJEFE = $("#SNOMBRECARGOJEFE_EX").val();
    var NPRESENTACIONES = $("#NPRESENTACIONES").val();
    var DFECHA_DESDE = $("#DFECHA_DESDE_EXP").val();
    var DFECHA_HASTA = $("#DFECHA_HASTA_EXP").val();
    var BSECTOR = $("#BSECTOR").val();
    var NREMUNERACION = $("#NREMUNERACION_EX").val();
    var STELEFONO = $("#STELEFONO_EX").val();
    
    var BACTIVO = 1;
    var error = "";
    var error2 = "";

    if (SENTIDAD == "") {
        error += "entidad, ";
    }

    if (SAREA == "") {
        error += "área, ";
    }

    if (SCARGO == "") {
        error += "cargo, ";
    }

    if (SFUNCIONES == "") {
        error += "funciones, ";
    }

    if (SMODALIDAD == "") {
        error += "modalidad de contratación, ";
    }

    if (SMOTIVORETIRO == "") {
        error += "motivo de retiro, ";
    }

    if (SNOMBRECARGOJEFE == "") {
        error += "nombre y cargo del jefe directo, ";
    }

    if (DFECHA_DESDE == "") {
        error += "fecha desde, ";
    }
    if (DFECHA_HASTA == "") {
        error += "fecha hasta, ";
    }
    if (BSECTOR == "0") {
        error += "sector, ";
    }
    if (NREMUNERACION == "") {
        error += "remuneración o retribución,";
    }

    if (STELEFONO == "") {
        error += "teléfono oficina, ";
    }
    var dato = DFECHA_DESDE.split('/');
    var fdesde = dato[2] + dato[1] - 1 + dato[0];
    dato = DFECHA_HASTA.split('/');
    var fhasta = dato[2] + dato[1] - 1 + dato[0];
    if (fhasta < fdesde) {
        error2 += "fecha desde debe ser menor que fecha hasta.";
    }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }
    
    if (error != '' || error2 != '') {

        $(".modal-footer").css("display", "block");
        bootbox.alert(error + error2);
    } else {
        var SRUTADOC = ""
        if ($("#FLG_UPLOAD").val() == "S") {
            if (uploadFile("EXP", NIDPROCESOUSU)) {
                if (SRUTADOC == "NOK") {

                    $(".modal-footer").css("display", "block");
                    bootbox.alert("Error al intentar subir archivo adjunto.");
                    return;
                }
            }
            else {
                $(".modal-footer").css("display", "block");
                return;
            }
        }

        bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
            if (resultado != true) {
                $(".modal-footer").css("display", "block");
                return;
            } else {
                var dataObject = JSON.stringify({
                    'NIDEXPERIENCIA': NIDEXPERIENCIA,
                    'NIDPROCESOUSU': NIDPROCESOUSU,
                    'SENTIDAD': SENTIDAD,
                    'SAREA': SAREA,
                    'SCARGO': SCARGO,
                    'SFUNCIONES': SFUNCIONES,
                    'SMODALIDAD': SMODALIDAD,
                    'SMOTIVORETIRO': SMOTIVORETIRO,
                    'SNOMBRECARGOJEFE': SNOMBRECARGOJEFE,
                    'NPRESENTACIONES': NPRESENTACIONES,
                    'DFECHA_DESDE': DFECHA_DESDE,
                    'DFECHA_HASTA': DFECHA_HASTA,
                    'BESPECIFICA': BESPECIFICA,
                    'BSECTOR': BSECTOR,
                    'NREMUNERACION': NREMUNERACION,
                    'STELEFONO': STELEFONO,
                    'BACTIVO': BACTIVO,
                    'SRUTADOC': $("#SRUTADOC").val()
                });
                $.ajax({
                    url: baseUrl + 'Postulacion/SP_GUARDAR_EXPERIENCIA',
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: dataObject,
                    success: function (result) {
                        Cargar_Experiencia();
                        $('#ModalEX').modal('hide');
                        bootbox.alert(result.mensaje);
                    }
                });
                $(".modal-footer").css("display", "block");
            }
        });
    }
}

function EliminarExp(NIDEXPERIENCIA) {
    bootbox.confirm("¿Está seguro que desea eliminar este registro?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDEXPERIENCIA': NIDEXPERIENCIA,
                'BACTIVO': 0,
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_GUARDAR_EXPERIENCIA',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    bootbox.alert("Se emilinó el registro de Experiencia con éxito.!");
                    Cargar_Experiencia();
                }
            });
        }
    });
}

function Cargar_DatosAdic() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();

    var dataObject = JSON.stringify({
        'NIDPROCESOUSU': NIDPROCESOUSU
    });

    CARGARDDL(10, 'BPARENTESCO', null, null, "Seleccione Grado de Parentesco");
    CARGARDDL(11, 'BTIPO_PENSION', null, null, "Seleccione Tipo de Pensionista");
    CARGARDDL(12, 'SANTECEDENTES_DA', null, null, "Seleccione Tipo de Delito");
    $.ajax({
        url: baseUrl + 'Postulacion/SP_CONS_DATOSADIC',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            if (data.length > 0) {
                $('#hddNIDDATOSADIC').val(data[0]["NIDDATOSADIC"]);
                $('#BFAMILIADIRECTA_DA').val(data[0]["BFAMILIADIRECTA"]);
                $('#SFAMILIADIRECTA_DA').val(data[0]["SFAMILIADIRECTA"]);
                $('#BDISCAPACIDAD_DA').val(data[0]["BDISCAPACIDAD"]);
                $('#STIPO_DA').val(data[0]["STIPO"]);
                $('#BDEUDOR_DA').val(data[0]["BDEUDOR"]);
                $('#BANTECEDENTES_DA').val(data[0]["BANTECEDENTES"]);
                $('#SANTECEDENTES_DA').val(data[0]["SANTECEDENTES"]);
                $('#BFUERZAARMADA_DA').val(data[0]["BFUERZAARMADA"]);
                $('#BTERM_COND_DA').val(data[0]["BTERM_COND"]);
                $("#SRUTADOC_LFA").val(data[0]["SRUTADOC_LFA"]);
                mostrarRutaDoc("LFA", $("#SRUTADOC_LFA").val());
                $("#SRUTADOC_DIS").val(data[0]["SRUTADOC_DIS"]);
                mostrarRutaDoc("DIS", $("#SRUTADOC_DIS").val());
                $('#BINHAB_ESTADO').val(data[0]["BINHAB_ESTADO"]);
                $('#BINCOMP_ESTADO').val(data[0]["BINCOMP_ESTADO"]);
                $('#BPENSIONISTA').val(data[0]["BPENSIONISTA"]);
                $('#BTIPO_PENSION').val(data[0]["BTIPO_PENSION"]);
                $('#BPENSION_SUSP').val(data[0]["BPENSION_SUSP"]);
                $('#BPARENTESCO').val(data[0]["BPARENTESCO"]);
                $("#SRUTADOC_OCI").val(data[0]["SRUTADOC_OCI"]);
                mostrarRutaDoc("OCI", $("#SRUTADOC_OCI").val());
                $("#SRUTADOC_A3B").val(data[0]["SRUTADOC_A3B"]);
                mostrarRutaDoc("A3B", $("#SRUTADOC_A3B").val());
                $("#SRUTADOC_DEP").val(data[0]["SRUTADOC_DEP"]);
                mostrarRutaDoc("DEP", $("#SRUTADOC_DEP").val());
                $('#BDEPORTISTA').val(data[0]["BDEPORTISTA"]);
            }
            else {
                $('#hddNIDDATOSADIC').val(0);
                $('#BFAMILIADIRECTA_DA').val("");
                $('#SFAMILIADIRECTA_DA').val("");
                $('#BDISCAPACIDAD_DA').val("");
                $('#STIPO_DA').val("");
                $('#BDEUDOR_DA').val("");
                $('#BANTECEDENTES_DA').val("");
                $('#SANTECEDENTES_DA').val("");
                $('#BFUERZAARMADA_DA').val("");
                $('#BTERM_COND_DA').val("");
            }
            habilitaDivSN($('#BPENSIONISTA').val(), 1);
            habilitaDivSN($('#BFAMILIADIRECTA_DA').val(), 2);
            habilitaDivSN($('#BDISCAPACIDAD_DA').val(), 3);
            habilitaDivSN($('#BANTECEDENTES_DA').val(), 5);
            habilitaDivSN($('#BFUERZAARMADA_DA').val(), 6);
            habilitaDivSN($('#BDEPORTISTA').val(), 7);
        }
    });
}

function GuardarDatosAdic() {
    $("#btn_Guardar").hide();
    var NIDDATOSADIC = $('#hddNIDDATOSADIC').val();
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    var BFAMILIADIRECTA = $('#BFAMILIADIRECTA_DA').val();
    var SFAMILIADIRECTA = $('#SFAMILIADIRECTA_DA').val();
    var BDISCAPACIDAD = $('#BDISCAPACIDAD_DA').val();
    var STIPO = $('#STIPO_DA').val();
    var BDEUDOR = $('#BDEUDOR_DA').val();
    var BANTECEDENTES = $('#BANTECEDENTES_DA').val();
    var SANTECEDENTES = $('#SANTECEDENTES_DA').val();
    var BFUERZAARMADA = $('#BFUERZAARMADA_DA').val();
    var BTERM_COND = $('#BTERM_COND_DA').val();
    var BACTIVO = 1;
    var error = "";
    var error2 = "";
    var SRUTADOC = "";
    var SRUTADOC2 = "";
    var SRUTADOC3 = "";
    var SRUTADOC4 = "";
    var SRUTADOC5 = ""
    var BINHAB_ESTADO = $('#BINHAB_ESTADO').val();
    var BINCOMP_ESTADO = $('#BINCOMP_ESTADO').val();
    var BPENSIONISTA = $('#BPENSIONISTA').val();
    var BTIPO_PENSION = $('#BTIPO_PENSION').val();
    var BPENSION_SUSP = $('#BPENSION_SUSP').val();
    var BPARENTESCO = $('#BPARENTESCO').val();
    var BDEPORTISTA = $('#BDEPORTISTA').val();

    $('#divTC').css('border', 'solid 0px red');
    if (BFAMILIADIRECTA == "1" && SFAMILIADIRECTA == "") {
        error += "nombre y parentesco de familia directa, ";
    }

    if (BDISCAPACIDAD == "1" && STIPO == "") {
        error += "tipo de discapacidad, ";
    }

    if (BANTECEDENTES == "1" && SANTECEDENTES == "") {
        error += "antecedentes, ";
    }

    error = error.substring(0, error.length - 2);
    
    if (error != '') {
        error = 'Especificar ' + error + '. ';
    }
    if (BTERM_COND != "1")
    {
        $("#btn_Guardar").show();
        $('#divTC').css('border', 'solid 1px red');
        bootbox.alert("Para completar esta convocatoria debe indicar que conoce las bases del proceso.");
        return false;
    }
    if (error != '' || error2 != '') {
        $("#btn_Guardar").show();
        bootbox.alert(error + error2);
    } else {

        $("#SRUTADOC").val("");
        if (uploadFile("DIS", NIDPROCESOUSU) || txtUploadFile_DIS == "") {
            SRUTADOC = $("#SRUTADOC").val();
            if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                $("#SRUTADOC_DIS").val(SRUTADOC);
            $("#SRUTADOC").val("");
            if (uploadFile("LFA", NIDPROCESOUSU) || txtUploadFile_LFA == "") {
                SRUTADOC2 = $("#SRUTADOC").val();
                if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                    $("#SRUTADOC_LFA").val(SRUTADOC2);
                $("#SRUTADOC").val("");
                if (uploadFile("OCI", NIDPROCESOUSU) || txtUploadFile_OCI == "") {
                    SRUTADOC3 = $("#SRUTADOC").val();
                    if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                        $("#SRUTADOC_OCI").val(SRUTADOC3);
                    $("#SRUTADOC").val("");
                    if (uploadFile("A3B", NIDPROCESOUSU) || txtUploadFile_A3B == "") {
                        SRUTADOC4 = $("#SRUTADOC").val();
                        if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                            $("#SRUTADOC_A3B").val(SRUTADOC4);
                        $("#SRUTADOC").val("");
                        if (uploadFile("DEP", NIDPROCESOUSU) || txtUploadFile_A3B == "") {
                            SRUTADOC5 = $("#SRUTADOC").val();
                            if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                                $("#SRUTADOC_DEP").val(SRUTADOC5);

                    bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
                        if (resultado != true) {
                            $("#btn_Guardar").show();
                            bootbox.alert("Operación Cancelada.");
                            return;
                        } else {
                            var dataObject = JSON.stringify({
                                'NIDDATOSADIC': NIDDATOSADIC,
                                'NIDPROCESOUSU': NIDPROCESOUSU,
                                'BFAMILIADIRECTA': BFAMILIADIRECTA,
                                'SFAMILIADIRECTA': SFAMILIADIRECTA,
                                'BDISCAPACIDAD': BDISCAPACIDAD,
                                'STIPO': STIPO,
                                'BDEUDOR': BDEUDOR,
                                'BANTECEDENTES': BANTECEDENTES,
                                'SANTECEDENTES': SANTECEDENTES,
                                'BFUERZAARMADA': BFUERZAARMADA,
                                'BACTIVO': BACTIVO,
                                'BTERM_COND': BTERM_COND,
                                'SRUTADOC_DIS': $("#SRUTADOC_DIS").val(),
                                'SRUTADOC_LFA': $("#SRUTADOC_LFA").val(),
                                'BINHAB_ESTADO': BINHAB_ESTADO,
                                'BINCOMP_ESTADO': BINCOMP_ESTADO,
                                'BPENSIONISTA': BPENSIONISTA,
                                'BTIPO_PENSION': BTIPO_PENSION,
                                'BPENSION_SUSP': BPENSION_SUSP,
                                'BPARENTESCO': BPARENTESCO,
                                'SRUTADOC_OCI': $("#SRUTADOC_OCI").val(),
                                'SRUTADOC_A3B': $("#SRUTADOC_A3B").val(),
                                'BDEPORTISTA': BDEPORTISTA,
                                'SRUTADOC_DEP': $("#SRUTADOC_DEP").val(),
                            });
                            $.ajax({
                                url: baseUrl + 'Postulacion/SP_GUARDAR_DATOSADIC',
                                type: 'POST',
                                datatype: 'json',
                                contentType: 'application/json',
                                data: dataObject,
                                success: function (result) {
                                    if (result.mensaje == "OK") {
                                        window.location.href = "../Postulacion/Ficha"
                                    }
                                    else
                                        bootbox.alert(result.mensaje);
                                    $('#hddNIDDATOSADIC').val(result.NIDDATOSADIC);
                                    $("#btn_Guardar").show();
                                }
                            });
                        }
                    });
                    }
                    }
                }
            }
        }
    }
}

function cargaInstitucion(value) {
    if (value < 9) {
        $("#s2id_NIDINSTITUCION").show();
        $("#s2id_NIDESPECIALIDAD").show();
        $("#SINSTITUCION").hide();
        $("#SPROFESION").hide();
    } else {
        $("#s2id_NIDINSTITUCION").hide();
        $("#s2id_NIDESPECIALIDAD").hide();
        $("#SINSTITUCION").show();
        $("#SPROFESION").show();
    }
    $("#SINSTITUCION").val("");
    $("#SPROFESION").val("");
}


function cargaCarrera(value) {
    if (value == 199999999 || value == 299999999) {
        $("#s2id_NIDESPECIALIDAD").hide();
        $("#SINSTITUCION").show();
        $("#SPROFESION").show();
    }
    else {
        CARGARDDL(value, 'NIDESPECIALIDAD', 0, 0, 'Seleccione', 'CARR', 'S')
        $("#s2id_NIDESPECIALIDAD").show();
        $("#SINSTITUCION").hide();
        $("#SPROFESION").hide();
    }
    $("#SINSTITUCION").val("");
    $("#SPROFESION").val("");
}
function NuevoModalCO() {

    $('#ModalCO').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#hddNIDCOLEGIATURA").val(0);
   // $(".modal-body #BCONDICION_CO").val(0);
    $("#SNROCOLEGIATURA_CO").val("");
    $("#SCOLEGIO_CO").val("");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("COL");

}

function NuevoModalRNA() {

    $('#ModalRNA').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
    $("#hddNIDRNA").val(0);
    $("#SCODIGO_INS").val("");
    $("#DFECHA_REG").val("");
}

function NuevoModalCE() {

    $('#ModalCE').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });
    CARGARDDL(3, 'NIDTIPO', 0);
    $("#hddNIDCONOCIMIENTO").val(0);
    $("#SDESCRIPCION_CE").val("");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("CRS");
}

function NuevoModalCA() {

    $('#ModalCA').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#hddNIDCAPACITACION").val(0);
    $("#DFECHA_DESDE_CAP").val("");
    $("#DFECHA_HASTA_CAP").val("");
    $("#SCURSO_CA").val("");
    $("#SINTITUCION_CA").val("");
    $("#NHORAS_CA").val("");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("CAP");
}

function NuevoModalCI() {

    $('#ModalCI').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#hddNIDCONOCIMIENTOINF").val(0);
    $("#SCONOCIMIENTO_CI").val("");
    $(".modal-body #BTIPO_CI").val("B");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("INF");
}

function NuevoModalI() {
    $('#ModalI').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#hddNIDIDIOMA").val(0);
    $("#SIDIOMA_I").val("");
    $(".modal-body #BTIPO_I").val("B");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("IDI");
}

function NuevoModalEX() {
    $('#ModalEX').modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#hddNIDEXPERIENCIA").val(0);
    $("#SENTIDAD_EX").val("");
    $("#SAREA_EX").val("");
    $("#SCARGO_EX").val("");
    $("#SFUNCIONES_EX").val("");
    $("#SMODALIDAD_EX").val("");
    $("#SMOTIVORETIRO_EX").val("");
    $("#SNOMBRECARGOJEFE_EX").val("");
    $("#NTIEMPOSERVICIO_EX").val("");
    $("#NREMUNERACION_EX").val("");
    $("#STELEFONO_EX").val("");
    $("#SRUTADOC").val("");
    $("#FLG_UPLOAD").val("S");
    limpiarRutaDoc("EXP");


    $("#DFECHA_DESDE_EXP").val("");
    $("#DFECHA_HASTA_EXP").val("");
    $("#NPRESENTACIONES").val("");
    $("#divTiempoServicio").html("");
    $("#BSECTOR").val(0);
}

$('#txtUploadFile_EXP').on('change', function (e) {
    return validaExtension("#txtUploadFile_EXP")
});

$('#txtUploadFile_IDI').on('change', function (e) {
    return validaExtension("#txtUploadFile_IDI")
});

$('#txtUploadFile_CAP').on('change', function (e) {
    return validaExtension("#txtUploadFile_CAP")
});
$('#txtUploadFile_CRS').on('change', function (e) {
    return validaExtension("#txtUploadFile_CRS")
});

$('#txtUploadFile_INF').on('change', function (e) {
    return validaExtension("#txtUploadFile_INF")
});

$('#txtUploadFile_COL').on('change', function (e) {
    return validaExtension("#txtUploadFile_COL")
});

$('#txtUploadFile_ACA').on('change', function (e) {
    return validaExtension("#txtUploadFile_ACA")
});


function CargarCV() {
    var NIDPROCESOUSU = $('#txtidprocesousu').val();
    bootbox.confirm("¿Está seguro de realizar este proceso?", function (resultado) {
        if (resultado != true) {
            return;
        } else {
            var dataObject = JSON.stringify({
                'NIDPROCESOUSU': NIDPROCESOUSU
            });

            $.ajax({
                url: baseUrl + 'Postulacion/SP_CARGA_CV',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (result) {
                    if (result.SMENSAJE == "OK") {
                        bootbox.alert("Se cargó la información con éxito.!");
                        $('.nav-pills a[href="#FormAcademica"]').tab('show')
                        Cargar_InfAcademica();
                    }
                    else
                        bootbox.alert(result.SMENSAJE);
                }
            });
        }
    });
}

function closeModalE() {
    $('#ModalEX').modal('hide');
}

function habilitaDivSN(value,id) {
    if(value == 1)
        $("#divSN" + id).show();
    else
        $("#divSN" + id).hide();
}