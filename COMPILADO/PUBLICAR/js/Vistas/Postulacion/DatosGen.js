$(".solo-numero").keypress(function (key) {
    if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45)) //retroceso
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
        && (key.charCode != 241) //ñ
         && (key.charCode != 209) //Ñ
        && (key.charCode != 45) //retroceso
         && (key.charCode != 32) //espacio
        )
        return false;
});

$('.mayus').keyup(function () {
    this.value = this.value.toUpperCase();
});
$('#txtUploadFile_BRE').on('change', function (e) {
    return validaExtension("#txtUploadFile_BRE")
});
$('#ddl_departamenton').change(function () { SP_OBT_PROVINCIAN(); });
$('#ddl_provincian').change(function () { SP_OBT_DISTRITON(); });
$('#ddl_departamentod').change(function () { SP_OBT_PROVINCIAD(); });
$('#ddl_provinciad').change(function () { SP_OBT_DISTRITOD(); });
$('#btn_guardar').click(function () { SP_GUARDAR_DATOSPERS(); });

$(window).load(function () {
    SP_CONSULTA_DATOSPERS();
    CARGARDDL_DG();
});

var picker3 = $('#dtm_fechanac').data('datetimepicker');
$('#dtm_fechanac').datetimepicker({
    language: 'es-PE',
    pickTime: false
});

var ubigdpton = "";
var ubigprovn = "";
var ubigdistn = "";
var ubigprovd = "";
var ubigdptod = "";
var ubigdistd = "";
var estcivil = "";

function CARGARDDL_DG() {
    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_OBT_ESTADOCIVIL',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#ddl_estcivil").empty();
            $("#ddl_estcivil").append('<option value="0" selected>Seleccione</option>');
            for (var i = 0; i < data.length; i++) {
                $("#ddl_estcivil").append('<option value="' + data[i]["NIDESTADOCIVIL"] + '">' +
                     data[i]["SDESCRIPCION"] + '</option>');
            }

            if (estcivil != 0) {
                $("#ddl_estcivil").val(estcivil);
            }

        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de estado civil.' + ex);
        }
    });

    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_OBT_DEPARTAMENTO',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#ddl_departamenton").empty();
            $("#ddl_departamenton").append('<option value="0" selected>Seleccione</option>');
            $('#ddl_provincian').append('<option value="0">Seleccione</option>');
            $('#ddl_distriton').append('<option value="0">Seleccione</option>');
            for (var i = 0; i < data.length; i++) {
                $("#ddl_departamenton").append('<option value="' + data[i]["NDEPARTAMENTO"] + '">' +
                     data[i]["SDEPARTAMENTO"] + '</option>');
                $("#ddl_departamentod").append('<option value="' + data[i]["NDEPARTAMENTO"] + '">' +
                     data[i]["SDEPARTAMENTO"] + '</option>');
            }

            if (ubigdpton != 0) {
                var $ddldpton = $("#ddl_departamenton");
                //$ddldpton.val(ubigdpton).trigger("change");
                $ddldpton.val(ubigdpton);
                SP_OBT_PROVINCIAN();
                
            }
            if (ubigdptod != 0) {
                var $ddldptod = $("#ddl_departamentod");
             //   console.log(ubigdptod);
                //$ddldptod.val(ubigdptod).trigger("change");
                $ddldptod.val(ubigdptod);
                SP_OBT_PROVINCIAD();

            }

        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de departamentos.' + ex);
        }
    });
}

function SP_OBT_PROVINCIAN() {    
    var NDEPARTAMENTO = $('#ddl_departamenton').val();

    var dataObject = JSON.stringify({
        'NDEPARTAMENTO': NDEPARTAMENTO
    });
    
    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_OBT_PROVINCIA',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            $("#ddl_provincian").empty();
            $("#ddl_provincian").append('<option value="0">Seleccione</option>');
            $('#ddl_distriton').append('<option value="0">Seleccione</option>');
            for (var i = 0; i < data.length; i++) {
                $("#ddl_provincian").append('<option value="' + data[i]["NPROVINCIA"] + '">' +
                     data[i]["SPROVINCIA"] + '</option>');
            }
            
            if (ubigprovn != "") {                
                var $ddl_provincian = $("#ddl_provincian");
               // console.log(ubigprovn);
                //$ddl_provincian.val(ubigprovn).trigger("change");
                $ddl_provincian.val(ubigprovn);
                SP_OBT_DISTRITON();
            }
            
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de provincias.' + ex);
        }
    });
}

function SP_OBT_DISTRITON() {
    var NPROVINCIA = $('#ddl_provincian').val();
    var dataObject = JSON.stringify({
        'NPROVINCIA': NPROVINCIA
    });

    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_OBT_DISTRITO',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            $("#ddl_distriton").empty();
            $("#ddl_distriton").append('<option value="0">Seleccione</option>');
            for (var i = 0; i < data.length; i++) {
                $("#ddl_distriton").append('<option value="' + data[i]["NDISTRITO"] + '">' +
                     data[i]["SDISTRITO"] + '</option>');
            }            

            if (ubigdistn != "") {
                var $ddl_distriton = $("#ddl_distriton");
             //   console.log(ubigdistn);
                //$ddl_distriton.val(ubigdistn).trigger("change");
                $ddl_distriton.val(ubigdistn);
            }
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de distritos.' + ex);
        }
    });
}

function SP_OBT_PROVINCIAD() {
    var NDEPARTAMENTO = $('#ddl_departamentod').val();

    var dataObject = JSON.stringify({
        'NDEPARTAMENTO': NDEPARTAMENTO
    });

    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_OBT_PROVINCIA',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            $("#ddl_provinciad").empty();
            $("#ddl_provinciad").append('<option value="0">Seleccione</option>');
            $('#ddl_distritod').append('<option value="0">Seleccione</option>');
            for (var i = 0; i < data.length; i++) {
                $("#ddl_provinciad").append('<option value="' + data[i]["NPROVINCIA"] + '">' +
                     data[i]["SPROVINCIA"] + '</option>');
            }

            if (ubigprovd != "") {
                var $ddl_provincian = $("#ddl_provinciad");
                //$ddl_provincian.val(ubigprovd).trigger("change");
                $ddl_provincian.val(ubigprovd);
                SP_OBT_DISTRITOD();
            }            
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista de provincias.' + ex);
        }
    });
}

function SP_OBT_DISTRITOD() {
    var NPROVINCIA = $('#ddl_provinciad').val();
    var dataObject = JSON.stringify({
        'NPROVINCIA': NPROVINCIA
    });

    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_OBT_DISTRITO',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            $("#ddl_distritod").empty();
            $("#ddl_distritod").append('<option value="0">Seleccione</option>');
            for (var i = 0; i < data.length; i++) {
                $("#ddl_distritod").append('<option value="' + data[i]["NDISTRITO"] + '">' +
                     data[i]["SDISTRITO"] + '</option>');
            }
            
            if (ubigdistd != "") {
                var $ddl_distritod = $("#ddl_distritod");
                //$ddl_distritod.val(ubigdistd).trigger("change");
                $ddl_distritod.val(ubigdistd);
            }
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista.' + ex);
        }
    });
}

function SP_GUARDAR_DATOSPERS() {
    var NIDCODIGOUSUARIO = $('#txtcodusu').val();
    var SAPATERNO = $('#txtapaterno').val();
    var SAMATERNO = $('#txtamaterno').val();
    var SNOMBRES = $('#txtnombre').val();
    var NEDAD = $('#txtedad').val();
    var NIDESTADOCIVIL = $('#ddl_estcivil').val();
    var SUBIGEONAC = $('#ddl_distriton').val();
    var DFECHANAC = $('#txtfechanac').val();
    var SSEXO = $('#ddl_sexo').val();
    var SDNI = $('#txtdni').val();
    var SRUC = $('#txtruc').val();
    var SBREVETE = $('#txtbrevete').val();
    var SCATBREVETE = $('#txtcatbrevete').val();
    var SDIRECCION = $('#txtdireccion').val();
    var SUBIGEODIR = $('#ddl_distritod').val();
    var SNROLOTE = $('#txtlotedir').val();
    var STELEFONOFIJO = $('#txtfijo').val();
    var SCELULAR = $('#txtcelular').val();
    var SCORREO = $('#txtcorreo').val();
    var error = "";
    var SRUTADOC = ""
    var SRUTADOC2 = ""
    var NTIPODOC = $('#ddl_tipodoc').val();
    var SNOMBRE_C = $('#txtnombres_c').val();
    var STELEFONOS = $('#txttelefonos_c').val();
    var SPARENTESCO = $('#txtparentesco').val();
    var SPAIS_NAC = $('#txtPais').val();

    if (SRUC != "" && SRUC != null && SRUC != undefined) {
        if (SRUC.length != 11) {
            error += " nro. de RUC debe tener 11 caracteres, ";
        }        
    }

 /*   if (SBREVETE != "" && SBREVETE != null && SBREVETE != undefined) {
        if (SBREVETE.length >= 1 && SBREVETE.length <= 9) {
            expr = /^[A-Z]\d{8}$/;
            if (!expr.test(SBREVETE)) {
                error += " formato de brevete inválido, ";
            }
        }
    }
    if (SCATBREVETE != 0 && SBREVETE == ""){
        error += " favor de ingresar el número del brevete, ";
    }*/
    if (SCATBREVETE == 0) {
        SBREVETE = "";
    }
    if (SCORREO != "" && SCORREO != null && SCORREO != undefined) {
        if (SRUC.length > 1) {
            expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!expr.test(SCORREO)) {
                error += " dirección de correo incorrecta, ";
            }
        }
    }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        bootbox.alert('Verificar: ' + error + '.');
    } else {
        $("#SRUTADOC").val("");
        if (uploadFile("BRE", NIDCODIGOUSUARIO) || txtUploadFile_BRE == "") {
            SRUTADOC = $("#SRUTADOC").val();
            if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                $("#SRUTADOC_BRE").val(SRUTADOC);
            $("#SRUTADOC").val("");
            if (uploadFile("SPL", NIDCODIGOUSUARIO) || txtUploadFile_SPL == "") {
                SRUTADOC2 = $("#SRUTADOC").val();
                if ($("#SRUTADOC").val() != "" && $("#SRUTADOC").val() != "NOK")
                    $("#SRUTADOC_NAC").val(SRUTADOC2);
                bootbox.confirm("Está seguro que realizar la operación?", function (resultado) {
                    if (resultado != true) {
                        bootbox.alert("Operación Cancelada.");
                        return;
                    } else {
                        var dataObject = JSON.stringify({
                            'NIDCODIGOUSUARIO': NIDCODIGOUSUARIO,
                            'SAPATERNO': SAPATERNO,
                            'SAMATERNO': SAMATERNO,
                            'SNOMBRES': SNOMBRES,
                            'NEDAD': NEDAD,
                            'NIDESTADOCIVIL': NIDESTADOCIVIL,
                            'SUBIGEONAC': SUBIGEONAC,
                            'DFECHANAC': DFECHANAC,
                            'SSEXO': SSEXO,
                            'SDNI': SDNI,
                            'SRUC': SRUC,
                            'SBREVETE': SBREVETE,
                            'SCATBREVETE': SCATBREVETE,
                            'SDIRECCION': SDIRECCION,
                            'SUBIGEODIR': SUBIGEODIR,
                            'SNROLOTE': SNROLOTE,
                            'STELEFONOFIJO': STELEFONOFIJO,
                            'SCELULAR': SCELULAR,
                            'SCORREO': SCORREO,
                            'SRUTADOC': $("#SRUTADOC_BRE").val(),
                            'NTIPODOC': NTIPODOC,
                            'SNOMBRE_C': SNOMBRE_C,
                            'STELEFONO': STELEFONOS,
                            'SPARENTESCO': SPARENTESCO,
                            'SRUTADOC_NAC': $("#SRUTADOC_NAC").val(),
                            'SPAIS_NAC': SPAIS_NAC
                        });
                        $.ajax({
                            async: false,
                            url: baseUrl + 'Postulacion/SP_GUARDAR_DATOSPERS',
                            type: 'POST',
                            datatype: 'json',
                            contentType: 'application/json',
                            data: dataObject,
                            success: function (result) {
                                $('#txtcodusu').val(result.NIDCODIGOUSUARIO);
                                SP_CONSULTA_DATOSPERS();
                                bootbox.alert(result.mensaje);
                            }
                        });
                    }
                });
            }
            else
                bootbox.alert("Error al intentar subir archivo adjunto.");
        }
        else
            bootbox.alert("Error al intentar subir archivo adjunto.");
            
    }
}

function SP_CONSULTA_DATOSPERS() {    
    var dataObject = JSON.stringify({
        'NIDCODIGOUSUARIO': $("#txtcodusu").val()
    });
    
    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_CONSULTA_DATOSPERS',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            if (data.length > 0) {
                //debugger;
                $('#txtcodusu').val(data[0]["NIDCODIGOUSUARIO"]);
                $('#txtapaterno').val(data[0]["SAPATERNO"]);
                $('#txtamaterno').val(data[0]["SAMATERNO"]);
                $('#txtnombre').val(data[0]["SNOMBRES"]);
                $('#txtedad').val(data[0]["NEDAD"]);
                //$('#ddl_estcivil').val(data[0]["NIDESTADOCIVIL"].toString());
                estcivil = data[0]["NIDESTADOCIVIL"];
                $('#txtfechanac').val(data[0]["DFECHANAC"]);
                $('#ddl_sexo').val(data[0]["SSEXO"]);
                $('#txtdni').val(data[0]["SDNI"]);
                $('#txtruc').val(data[0]["SRUC"]);
                $('#txtbrevete').val(data[0]["SBREVETE"]);
                $('#txtdireccion').val(data[0]["SDIRECCION"]);
                $('#txtlotedir').val(data[0]["SNROLOTE"]);
                $('#txtfijo').val(data[0]["STELEFONOFIJO"]);
                $('#txtcelular').val(data[0]["SCELULAR"]);
                $('#txtcorreo').val(data[0]["SCORREO"]);
                $('#ddl_tipodoc').val(data[0]["NTIPODOC"]);
                $('#txtnombres_c').val(data[0]["SNOMBRE_C"]);
                $('#txttelefonos_c').val(data[0]["STELEFONO"]);
                $('#txtparentesco').val(data[0]["SPARENTESCO"]);
                $('#txtPais').val(data[0]["SPAIS_NAC"]);
                
                if (data[0]["SUBIGEONAC"] != null) {
                    ubigdpton = data[0]["SUBIGEONAC"].toString().substring(0, 2) + "0000";
                    ubigprovn = data[0]["SUBIGEONAC"].toString().substring(0, 4) + "00";
                    ubigdistn = data[0]["SUBIGEONAC"].toString();
                }
              
                if (data[0]["SUBIGEODIR"] != null) {
                    ubigdptod = data[0]["SUBIGEODIR"].toString().substring(0, 2) + "0000";
                    ubigprovd = data[0]["SUBIGEODIR"].toString().substring(0, 4) + "00";
                    ubigdistd = data[0]["SUBIGEODIR"].toString();
                }
                $("#SRUTADOC_BRE").val(data[0]["SRUTADOC"]);
                mostrarRutaDoc("BRE", $("#SRUTADOC_BRE").val());
                $("#SRUTADOC_NAC").val(data[0]["SRUTADOC_NAC"])
                mostrarRutaDoc("SPL", $("#SRUTADOC_NAC").val());
                CARGARDDL(9, 'txtcatbrevete', null, null, 'Sin Brevete');
                $('#txtcatbrevete').val(data[0]["SCATBREVETE"]);

            }
        }
    });

}