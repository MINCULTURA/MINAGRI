$(".tipo-documento").keypress(function (key) {
    //this.value = (this.value + '').replace(/[^0-9]/g, '');
    var ddltipodoc = $("#ddltipodoc").val();
    
    if (ddltipodoc == 'DNI') {
        $("#txtnrodoc").attr("maxlength", "8");
        if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45) //retroceso
            ) { 
            return false;
        }
    }

    if (ddltipodoc == 'CEE') {
        $("#txtnrodoc").attr("maxlength", "12");
        if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45) //retroceso
            ) { 
            return false;
        }
    }
    if (ddltipodoc == 'PTP') {
        $("#txtnrodoc").attr("maxlength", "20");
        if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45) //retroceso
            ) {
            return false;
        }
    }
});
$(".numero").keypress(function (key) {
   
        if ((key.charCode < 48 || key.charCode > 57)// solo numeros
            && (key.charCode != 45) //retroceso
            ) {
            return false;
        }
   
});
$(".letras").keypress(function (key) {
    window.console.log(key.charCode)
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

$(".usuario-login").keypress(function (key) {
    window.console.log(key.charCode)
    if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas menos Ñ
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas menos ñ
        && (key.charCode != 45) //retroceso
        && (key.charCode < 48 || key.charCode >57) //numeros
        )
        return false;
});

$('#ddltipodoc').change(function () {
    $("#txtnrodoc").val("");
    $("#txtnombre").val("");
    $("#txtappat").val("");
    $("#txtapmat").val("");
    $("#NCODIGOPERSONA").val(0);

    if ($("#ddltipodoc").val() == 'DNI') {
        $("#txtnombre").attr("disabled", true);
        $("#txtappat").attr("disabled", true);
        $("#txtapmat").attr("disabled", true);
    }
    else {
        $("#txtnombre").attr("disabled", false);
        $("#txtappat").attr("disabled", false);
        $("#txtapmat").attr("disabled", false);
    }
   
});

$('.mayus').keyup(function () {
    this.value = this.value.toUpperCase();
});

function ModalNuevoUsuario() {
    $("#myModalNuevoUsuario").modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#divCargando").hide();
    $("#txtnrodoc").val("");
    $("#txtnombre").val("");
    $("#txtappat").val("");
    $("#txtapmat").val("");
    $("#txtcorreo").val("");
    $("#txtpassword1").val("");
    $("#txtpassword2").val("");
    $("#NCODIGOPERSONA").val(0);
}

function ModalRecuperarPass() {
    $("#myModalRecuperarPass").modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true
    });

    $("#divCargando2").hide();
    $("#txtnrodocr").val("");
    $("#txtnrodoc_R").val("");
    $("#txttipodoc_R").val("");
    $("#NCODIGOPERSONA_R").val(0);
}

function InsertarUsuario() {
    var ddltipodoc = $("#ddltipodoc").val();
    var txtnrodoc = $("#txtnrodoc").val();
    var txtnombre = $("#txtnombre").val();
    var txtappat = $("#txtappat").val();
    var txtapmat = $("#txtapmat").val();
    var txtcorreo = $("#txtcorreo").val();
    var txtcorreo2 = $("#txtcorreo2").val();
    var txtpassword1 = $("#txtpassword1").val();
    var txtpassword2 = $("#txtpassword2").val();
    var celular1 = $("#celular1").val();
    var celular2 = $("#celular2").val();
    var ncodigopersona = $("#NCODIGOPERSONA").val();
    var error = "";
    var error2 = "";

    if ((ddltipodoc == "CEE" || ddltipodoc == "PTP") && txtnrodoc.length > 0) {
        var dataObject = JSON.stringify({
            'strTipoDocumento': ddltipodoc,
            'strDocumento': txtnrodoc,
            'strNombres': txtnombre,
            'strApePaterno': txtappat,
            'strApeMaterno': txtapmat,
            'strCorreo': txtcorreo
        });

        $.ajax({
            url: baseUrl + 'User/ValidarOtrosDocs',
            type: 'POST',
            datatype: 'json',
            contentType: 'application/json',
            data: dataObject,
            success: function (data) {
                if (data[0]["NCODIGOPERSONA"] != 0) {
                    $("#txtnombre").val(data[0]["SNOMBRE"]);
                    $("#txtappat").val(data[0]["SPATERNO"]);
                    $("#txtapmat").val(data[0]["SMATERNO"]);
                    $("#NCODIGOPERSONA").val(data[0]["NCODIGOPERSONA"]);

                }

            },
            error: function (ex) {
                bootbox.alert('Error, no se pudo validar el DNI ingresado.'+ ex.message);
            }
        });
    }

    if (txtnrodoc == "" || txtnrodoc == null || txtnrodoc == undefined) {
        error += "nro. de documento, ";
    } else {
        if (ddltipodoc == 'DNI' && txtnrodoc.length != 8) {
            error2 += "Número de DNI incorrecto.";
        }            
    }

    if (ddltipodoc == 'DNI' && txtnrodoc.length == 8 && ncodigopersona==0) {
        error2 += "Código de Persona inválido. ";
    }

    if (txtnombre == "" || txtnombre == null || txtnombre == undefined) { error += "nombres, "; }

    if (txtappat == "" || txtappat == null || txtappat == undefined) { error += "apellido paterno, "; }
    
    if (ddltipodoc == "DNI") {
        if (txtapmat == "" || txtapmat == null || txtapmat == undefined) { error += "apellido materno, "; }
    }    

    if (txtcorreo == "" || txtcorreo == null || txtcorreo == undefined) {
        error += "correo electrónico, ";
    } else {
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!expr.test(txtcorreo)) {
            error2 += " Dirección de correo no válido.";
        }            
    }

    if (txtpassword1 == "" || txtpassword1 == null || txtpassword1 == undefined) { error += "contraseña, "; }

    if (txtpassword2 == "" || txtpassword2 == null || txtpassword2 == undefined) { error += "contraseña de confirmación, "; }

    if (txtpassword1 != txtpassword2) { error2 += " Las contraseñas ingresadas no coinciden."; }

    if (celular1 != celular2) { error2 += " Los números de celular deben coincidir en las dos casillas, caso contrario dejar en blanco."; }

    if (txtcorreo != txtcorreo2) { error2 += " Los correos ingresados no coinciden."; }

    if (txtpassword1 == txtpassword2 && txtpassword1.length >=1 && txtpassword1.length < 6) { error2 += " La contraseña deber ser mínimo de 6 caracteres."; }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }

    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    } else {    
        if ($("#NCODIGOPERSONA").val() != 0) {

            $("#divCargando").show();

            var dataObject = JSON.stringify({
                'strApePaterno': txtappat.trim() ,
                'strApeMaterno' : txtapmat.trim() ,
                'strNombres' : txtnombre.trim(),
                'strNombresApellidos' : txtnombre.trim() + " " + txtappat.trim() + " " + txtapmat.trim() ,
                'strTipoDocumento' : ddltipodoc,
                'strDocumento' : txtnrodoc,
                'strCorreo' : txtcorreo ,
                'Password' : txtpassword1,
                'IdUsuario': ncodigopersona,
                'strCelular': celular1
            });

            $.ajax({
                url: baseUrl + 'User/InsertarUsuario',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: dataObject,
                success: function (data) {
                    var mensaje = data[0]["ESTADO_GUARDADO"];
                    if (mensaje == "OK") {
                        $('#myModalNuevoUsuario').modal('hide');
                        bootbox.alert("Se creó el usuario con éxito. Se le enviará una notificación al correo electrónico: " + data[0]["SCORREO"] + " .");
                    } else if (mensaje == "EXISTE") {
                        $('#myModalNuevoUsuario').modal('hide');
                        bootbox.alert("El usuario ya existe. clic en el enlace ¿Olividaste tu contraseña? ");
                    } else {
                        bootbox.alert(mensaje);
                    }
                },
                error: function (ex) {
                    bootbox.alert('Error, no se realizó el registro del usuario.' + ex.responsetext);
                }
            });
        }             
    }
}

function CambiarContrasena() {
    var txtnrodoc = $("#txtnrodocr").val();
    var error = "";

    if (txtnrodoc == "" || txtnrodoc == null || txtnrodoc == undefined) {
        error += "usuario.";
    } 

    if (error != '') {
        error = 'Debe ingresar ' + error;
    }

    if (error != '') {
        bootbox.alert(error);
    } else {

        $("#divCargando2").show();

        var dataObject = JSON.stringify({
            'UserName': txtnrodoc
        });

        $.ajax({
            url: baseUrl + 'User/valUsuario',
            type: 'POST',
            datatype: 'json',
            contentType: 'application/json',
            data: dataObject,
            success: function (data) {
                if (data[0]["NCODIGOPERSONA"] == 0) {
                    $('#myModalRecuperarPass').modal('hide');
                    bootbox.alert('El usuario no se encuentra registrado.');
                    return;
                }
                else {

                    var NCODIGOPERSONA = data[0]["NCODIGOPERSONA"];
                    $("#NCODIGOPERSONA_R").val(NCODIGOPERSONA);
                    var txttipodoc_R = data[0]["STIPODOCUMENTO"];
                    $("#txttipodoc_R").val(txttipodoc_R);
                    var txtnrodoc_R = data[0]["SNUMERODOCUMENTO"];
                    $("#txtnrodoc_R").val(txtnrodoc_R);

                    var dataObject = JSON.stringify({
                        'IdUsuario': NCODIGOPERSONA,
                        'strTipoDocumento' : txttipodoc_R,
                        'strDocumento' : txtnrodoc_R
                    });

                    $.ajax({
                        url: baseUrl + 'User/RecuperarPass',
                        type: 'POST',
                        datatype: 'json',
                        contentType: 'application/json',
                        data: dataObject,
                        success: function (data) {
                            var mensaje = data.MENSAJE;
                            if (mensaje == "OK") {
                                var saviso = "Se le envió un mensaje con una clave de acceso al correo electrónico y/o celular registrados en la creación de cuenta."
                                $('#myModalRecuperarPass').modal('hide');
                                bootbox.alert(saviso);
                            }
                            else {
                                bootbox.alert("No se realizó ninguna acción."); $("#divCargando2").hide();
                            }
                        },
                        error: function (ex) {
                            bootbox.alert('Error, no se pudo validar el usuario ingresado.'); $("#divCargando2").hide();
                        }
                    });
                }
            },
            error: function (ex) {
                bootbox.alert('Error, no se pudo validar el usuario ingresado.'); $("#divCargando2").hide();
            }
    });
    }
}

function validarDoc() {
    var ddltipodoc = $("#ddltipodoc").val();
    var txtnrodoc = $("#txtnrodoc").val();
    var txtnombre = $("#txtnombre").val();
    var txtappat = $("#txtappat").val();
    var txtapmat = $("#txtapmat").val();
    var txtcorreo = $("#txtcorreo").val();
    
    var dataObject = JSON.stringify({
        'strTipoDocumento': ddltipodoc,
        'strDocumento': txtnrodoc,
        'strNombres': txtnombre,
        'strApePaterno': txtappat,
        'strApeMaterno': txtapmat,
        'strCorreo': txtcorreo
    });

    if ((ddltipodoc == "DNI" && txtnrodoc.length == 8) || (ddltipodoc == "CEE" && txtnrodoc.length > 0) || ddltipodoc == "PTP") {
        $.ajax({
            async: false,
            url: baseUrl + 'User/valDoc',
            type: 'POST',
            datatype: 'json',
            contentType: 'application/json',
            data: dataObject,
            success: function (data) {
                if (data[0]["NCODIGOPERSONA"] != 0) {
                    $("#txtnombre").val(data[0]["SNOMBRE"]);
                    $("#txtappat").val(data[0]["SPATERNO"]);
                    $("#txtapmat").val(data[0]["SMATERNO"]);
                    $("#NCODIGOPERSONA").val(data[0]["NCODIGOPERSONA"]);
                }
            },
            error: function (ex) {
                bootbox.alert('Error, no se pudo validar el DNI ingresado.' + ex);
            }
        });
    }
    else {
        $("#txtnombre").val("");
        $("#txtappat").val("");
        $("#txtapmat").val("");
        $("#NCODIGOPERSONA").val(0);
    }
}
