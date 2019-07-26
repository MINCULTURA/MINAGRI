function validacionTipoDato() {
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
        window.console.log(key.charCode)
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
}

function CARGARDDL(id_tabla, id_control, value,idproceso,texto='Seleccione',dato = 'A',tcontrol) {
    var dataObject = JSON.stringify({
        'NIDTABLA': id_tabla,
        'SDATO': dato,
        'NIDPROCESO': idproceso
    });
    $.ajax({
        async: false,
        url: baseUrl + 'Postulacion/SP_CONS_TABLA_D',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: dataObject,
        success: function (data) {
            $("#" + id_control).empty();
            if (texto !='0')
                $("#" + id_control).append('<option value="0" selected>'+texto+'</option>');

            for (var i = 0; i < data.length; i++) {
                $("#" + id_control).append('<option value="' + data[i]["NIDITEM"] + '">' +
                     data[i]["SDITEM"] + '</option>');
            }

            if (value != 0) {
                var $ddlpueb = $(".modal-body #" + id_control);
                $ddlpueb.val(value).trigger("change");
            }
            if (tcontrol == "S") {
                $("#" + id_control).select2({
                    placeholder: texto,
                    allowClear: true
                });
            }
        },
        error: function (ex) {
            bootbox.alert('Error, no se cargó la lista del control.' + ex);
        }
    });

}
   
function setCalendar(ext_id) {

    var picker3 = $('#div_fecha' + ext_id).data('datetimepicker');
    $('#div_fecha' + ext_id).datetimepicker({
        language: 'es-PE',
        pickTime: false,
        autoclose: true
    });

    $('#div_fecha' + ext_id).datetimepicker().on('changeDate', function (ev) {
        if ($(".datepicker-days").is(":visible"))
            $('#div_fecha' + ext_id).datetimepicker('hide');
    });
}

function jsDecimalsHora(e) {
    var evt = (e) ? e : window.event;
    var key = (evt.keyCode) ? evt.keyCode : evt.which;
    if (key != null) {
        key = parseInt(key, 10);
        if ((key < 48 || key > 57) && (key < 96 || key > 105)) {
            if (!jsIsUserFriendlyCharHora(key, "Decimals")) {
                return false;
            }
        }
        else {
            if (evt.shiftKey) {
                return false;
            }
        }
    }
    return true;
}

function mostrarRutaDoc(sigla, rutaDoc) {
    if (rutaDoc != "") {
        $("#FLG_UPLOAD").val("N");
        var html = '<a href="../' + $("#hddRUTADOC").val() + '/' + rutaDoc + '" target="_blank"> Ver Archivo</a><i class="fa fa-pencil" onclick="mostrarRutaDoc(\'' + sigla + '\',\'\');" style="font-size: 20px; padding-left:20px;" title="EDITAR ARCHIVO"></i>'
        $("#divVerArchivo_" + sigla).html(html);
        $("#divVerArchivo_" + sigla).show();
        $("#divSelArchivo_" + sigla).hide();
    }
    else {
        $("#FLG_UPLOAD").val("S");
        $("#divVerArchivo_" + sigla).html("");
        $("#divVerArchivo_" + sigla).hide();
        $("#divSelArchivo_" + sigla).show();
        $("#txtUploadFile_" + sigla).val("");
    }
}

function limpiarRutaDoc(sigla) {
    $("#divVerArchivo_" + sigla).html("");
    $("#divVerArchivo_" + sigla).hide();
    $("#divSelArchivo_" + sigla).show();
    $("#txtUploadFile_" + sigla).val("");
}

function uploadFile(sigla, idPU, filename) {
    var files = document.getElementById('txtUploadFile_' + sigla).files;
    //var myID = 3; //uncomment this to make sure the ajax URL works
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }
            $.ajax({
                async: false,
                type: "POST",
                url: baseUrl + 'Postulacion/UploadFile?sigla=' + sigla + '&idPU=' + idPU,
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    if (result.mensaje == "OK")
                        $("#SRUTADOC").val(result.filename);
                    else{
                        $("#SRUTADOC").val(result.mensaje)
                        return false
                    }
                },
                error: function (xhr, status, p3, p4) {
                    var err = "Error " + " " + status + " " + p3 + " " + p4;
                    if (xhr.responseText && xhr.responseText[0] == "{")
                        err = JSON.parse(xhr.responseText).Message;
                    console.log(err);
                }
            });
            var j = 0;
            for (j = 0; j < 1400000000; j++) {
                j = j;
            }
        } else {
            bootbox.alert("Ocurrió un error al intentar subir el archivo.");
            return false;
        }
    } else {
        if (sigla == "EXP") {
            bootbox.alert("No ha seleccionado archivo de sustento.");
            return false;
        }
    }
    return true;
}

function validaExtension(id) {
    var enviar = /\.(pdf)$/i.test($(id).val());
    if (!enviar) {
        bootbox.alert("Solo puede seleccionar archivos con extensión PDF."); $(id).val(""); return false;
    };

    var input = document.getElementById(id.substring(1, id.length));
    var file = input.files[0];
    var max_size = $("#hddMAX_SIZE").val()

    if (file.size > max_size) {
        bootbox.alert("El tamaño del archivo no puede exceder los 2 MB."); $(id).val(""); return false;
    }
    return true;

}
function AbrirModal(tipo, titulo, id) {
    $("#NCODIGO").val(id);
    if ($("#NIDPROCESO").val() == 0 && tipo == "AC") {
        bootbox.alert("Debe seleccionar un proceso.");
    }
    else {
        $("#tipoModal").val(tipo);
        traervista(tipo);
        $('#ModalGeneral').modal({
            "backdrop": "static",
            "keyboard": true,
            "show": true
        });
        $("#tituloModal").html(titulo);
    }
}
function traervista(tipo) {
    var action;
    switch(tipo){
        case "PV": action ="Gestion/Voluntariado_D";
            break;
        case "AC": action = "Gestion/Actividad_D";
            break;
        case "AD": action = "Postulacion/Adjunto_D";
            break;
        case "IA": action = "Postulacion/Academica_D";
            break;
        case "DH": action = "Postulacion/Informacion_D";
            break;
    }
    $.ajax({
        type: 'GET',
        async: false,
        url: baseUrl + action,
        success: function (data) {
            $("#cuerpoModal").html(data);
        },
        error: function (a, b, e) {
            bootbox.alert("<p>No se pudo abrir la ventana.</p>" + e.Message);
        }
    });

}