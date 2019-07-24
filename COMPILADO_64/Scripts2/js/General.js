


function RemoveClases() {


    $("#liModSecretarial").removeClass("active open");

    $("#liTramite").removeClass("active open");
    // $("#liTramite").addClass("active close");
    $("#liTaip").removeClass("active open");
    // $("#liTaip").addClass("active close");
    $("#liAsignados").removeClass("active open");

    //para el Icono de la opciones de MENU
    $("#iOpcionesMenu").removeClass("clip-home-3");
    $("#iOpcionesMenu").removeClass("clip-archive");
    $("#iOpcionesMenu").removeClass("clip-screen");
    $("#iOpcionesMenu").removeClass("clip-note");


    $("#liDocPen").removeClass("active");
    $("#liDocRem").removeClass("active");
    $("#liDocDer").removeClass("active");
    $("#liDocNot").removeClass("active");
    $("#liDocArc").removeClass("active");


    $("#liDocSolicitadoTaiP").removeClass("active");
    $("#liDocPendienteTaiP").removeClass("active");
    $("#liDocRemitidoTaiP").removeClass("active");
    $("#liDocDerivadoTaiP").removeClass("active");
    $("#liDocNotificadoTaiP").removeClass("active");
    $("#liDocArchivadoTaiP").removeClass("active");
    $("#liDocAnuladoTaiP").removeClass("active");
    $("#liDocAtendidosTaiP").removeClass("active");

    $("#liEvaluacion").removeClass("active");
    $("#liAtendidos").removeClass("active");


}

function cargarVista(url) {
    $.ajax({
        url: url,
        dataType: 'html',
        type: 'get',
        contentType: 'text/xml; charset=utf-8',
        // async: false,
        success: function (result) {
            $('#divProceso').html("");
            $('#divProceso').html(result);
        }
    });
}


function CountCharactersControlTxt(obj, lblObject, max) {
    try {
        var total = max;
        cant = document.getElementById(obj).value.length;
        total = total - cant
        if (cant > max) {
            var aux = document.getElementById(obj).value;
            document.getElementById(obj).value = aux.substring(0, max);
            return;
        }
        $("#" + lblObject).html("Nº Caracteres: " + cant + " restan " + total);
    } catch (e) {
        alert(e.Message);
    }
}
