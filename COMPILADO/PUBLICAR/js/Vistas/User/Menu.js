//window.onload = function () {
//    getMenu();
//};

$(document).ready(function () {
    getMenu();
});

function getMenu() {

    $.ajax({
        url: baseUrl + 'User/LISTA_MENU',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            if (data.length > 0) {
                var inf = data;
                var str = '';
                var ctrl = String(location.href.replace(/#.*/, "").split("/")[4]); //3 desa - 4 prod
                var pag = String(location.href.replace(/#.*/, "").split("/")[5]); // 4 desa - 5 prod

                var dscmenu = '';
                var dscsmenu = '';
                var dscclass = '';

                $('#iOpcionesMenu').empty();
                $('#lbNombreMenuPrincipal').empty();
                $('#lbNombreMenuSecundario').empty();


                $('#ListaMenu').empty();

                for (var i = 0; i < data.length; i++) {
                    var url = String(data[i]["SURL"].replace(/#.*/, "").split("/")[2]);
                    if (data[i]["LISCLASS"] == " ") {

                        if (pag == url) {
                            str += '<li class="active"> ' +
                            '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                            '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                            '</a> ' +
                            '</li> ';

                            dscmenu = ' ' + ctrl; dscsmenu = pag; dscclass = data[i]["SICONCLASS"];

                        } else {
                            str += '<li> ' +
                            '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                            '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                            '</a> ' +
                            '</li> ';
                        }


                    } else {
                        if (data[i]["LISCLASS"] == "despleg") {
                            var ctrlnext = String(data[i + 1]["SURL"].replace(/#.*/, "").split("/")[1]);

                            if (ctrl == ctrlnext) {
                                str += '<li class="active open"> ' +
                                '<a href="javascript:void(0)"><i class="' + data[i]["SICONCLASS"] + '"></i><span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><i class="icon-arrow"></i><span class="selected"></span></a> ' +
                                 '<ul class="sub-menu"> ';

                                dscmenu = ' ' + ctrl; dscsmenu = pag; dscclass = data[i]["SICONCLASS"];


                            } else {
                                str += '<li> ' +
                                '<a href="javascript:void(0)"><i class="' + data[i]["SICONCLASS"] + '"></i><span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><i class="icon-arrow"></i><span class="selected"></span></a> ' +
                                 '<ul class="sub-menu"> ';
                            }

                        } else {
                            if (typeof data[i + 1] == 'undefined') {

                                if (pag == url) {
                                    str += '<li class="active open">' +
                                    '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                                    '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                                    '</a> ' +
                                    '</li> </ul> </li> ';

                                    dscmenu = ' ' + ctrl; dscsmenu = pag; dscclass = data[i]["SICONCLASS"];

                                } else {
                                    str += '<li>' +
                                    '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                                    '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                                    '</a> ' +
                                    '</li> </ul> </li> ';
                                }

                            } else {

                                if (data[i]["LISCLASS"] == "sub-menu" && data[i + 1]["LISCLASS"] != "despleg") {

                                    if (pag == url) {
                                        str += '<li class="active open">' +
                                   '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                                   '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                                   '</a> ' +
                                   '</li> ';

                                        dscmenu = ' ' + ctrl; dscsmenu = pag; dscclass = data[i]["SICONCLASS"];

                                    } else {
                                        str += '<li>' +
                                   '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                                   '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                                   '</a> ' +
                                   '</li> ';
                                    }

                                } else {

                                    if (pag == url) {
                                        str += '<li class="active open">' +
                                    '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                                    '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                                    '</a> ' +
                                    '</li> </ul> </li> ';

                                        dscmenu = ' ' + ctrl; dscsmenu = pag; dscclass = data[i]["SICONCLASS"];

                                    } else {
                                        str += '<li>' +
                                    '<a href="' + data[i]["SURL"] + '"><i class="' + data[i]["SICONCLASS"] + '"></i> ' +
                                    '<span class="title"> ' + data[i]["SDESCRIPCION"] + ' </span><span class="selected"></span> ' +
                                    '</a> ' +
                                    '</li> </ul> </li> ';
                                    }

                                }
                            }
                        }

                    }


                }

                $('#iOpcionesMenu').append(dscmenu);
                $('#iOpcionesMenu').addClass(dscclass);
                $('#lbNombreMenuPrincipal').append(dscsmenu);

                $('#ListaMenu').append(str);
                Main.init();

            }
        }
    });

}

