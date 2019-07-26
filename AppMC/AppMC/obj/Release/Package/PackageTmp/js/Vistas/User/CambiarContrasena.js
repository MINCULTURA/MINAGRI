$(window).load(function () {
    $("#txtPasswordAnt").val("");
    $("#txtPasswordNew").val("");
    $("#txtPasswordNew2").val("");
});

function CambiarContrasena() {
    var txtcodusu = $("#txtcodusu").val();
    var txtPasswordAnt = $("#txtPasswordAnt").val();
    var txtPasswordNew = $("#txtPasswordNew").val();
    var txtPasswordNew2 = $("#txtPasswordNew2").val();
    var error = "";
    var error2 = "";

    if (txtPasswordAnt == "" || txtPasswordAnt == null || txtPasswordAnt == undefined) { error += "contraseña anterior, "; }

    if (txtPasswordNew == "" || txtPasswordNew == null || txtPasswordNew == undefined) { error += "nueva contraseña, "; }

    if (txtPasswordNew2 == "" || txtPasswordNew2 == null || txtPasswordNew2 == undefined) { error += "confirmación de contraseña, "; }

    if (txtPasswordNew != txtPasswordNew2) { error2 += " Las contraseñas ingresadas no coinciden."; }

    if (txtPasswordNew == txtPasswordNew2 && txtPasswordNew.length >= 1 && txtPasswordNew.length < 6) { error2 += " La contraseña deber ser mínimo de 6 caracteres."; }

    if (txtPasswordNew == txtPasswordNew2 && txtPasswordAnt == txtPasswordNew) { error2 += " La nueva contraseña ingresada no debe ser igual que la anterior."; }

    error = error.substring(0, error.length - 2);

    if (error != '') {
        error = 'Debe ingresar ' + error + '. ';
    }

    if (error != '' || error2 != '') {
        bootbox.alert(error + error2);
    }
    else {
        var dataObject = JSON.stringify({
            'IdUsuario': txtcodusu,
            'Password': txtPasswordNew,
            'PasswordAnt': txtPasswordAnt
        });

        $.ajax({
            url: baseUrl + 'User/CambiarContrasena2',
            type: 'POST',
            datatype: 'json',
            contentType: 'application/json',
            data: dataObject,
            success: function (data) {
                
                var mensaje = data[0]["MENSAJE"];
                if (mensaje == "OK") {
                    $("#txtPasswordAnt").val("");
                    $("#txtPasswordNew").val("");
                    $("#txtPasswordNew2").val("");
                    bootbox.alert("Se cambió con éxito su nueva contraseña. Se le enviará una notificación al correo electrónico ingresado en el registro: " + data[0]["SCORREO"] + " .");
                } else if (mensaje == "IGUAL") {

                    bootbox.alert("La nueva contraseña no debe ser igual que la anterior.");
                } else if (mensaje == "DIFF") {
                    bootbox.alert("Las contraseñas actuales no coinciden.");
                }
                else {
                    bootbox.alert("No se realizó ninguna acción.");
                }
            },
            error: function (ex) {
                bootbox.alert('Error, no se realizó el cambio de contraseña del usuario.'/* + ex*/);
            }
        });
    }
}

