
jQuery(document).ready(function () {
    var waitimageUrl = baseUrl + 'assets/images/loading.gif';
    
    var options = {
        AjaxWait: {
            AjaxWaitMessage: "<h5><img style='height: 20px' src='" + waitimageUrl + "' /> Procesando...</h5>",
            AjaxWaitMessageCss: { width: "20px", left: "20%" }
        },
        AjaxErrorMessage: "<h6>Error! Por favor contacte con el Administrador del sistema!</h6>"
    };
    var AjaxGlobalHandler = {
        Initiate: function (options) {
            try {
                // Ajax events fire in following order
                jQuery(document).ajaxStart(function () {
                    jQuery.blockUI({
                        message: options.AjaxWait.AjaxWaitMessage
                       // baseZ: 2000
                        // css: options.AjaxWait.AjaxWaitMessageCss
                    });
                }).ajaxSend(function (e, xhr, opts) {
                }).ajaxError(function (e, xhr, opts) {
                    if (500 == xhr.status) {
                        document.location.replace("");
                        return;
                    }
                    jQuery.unblockUI();
                    //            $.colorbox({ html: options.AjaxErrorMessage });
                }).ajaxSuccess(function (e, xhr, opts) {
                }).ajaxComplete(function (e, xhr, opts) {
                }).ajaxStop(function () {
                    jQuery.unblockUI();
                });
            } catch (e) {
                jQuery.unblockUI();
            }
        }
    };

    AjaxGlobalHandler.Initiate(options);
    var loc = document.location.href.split(/[\?#]/).shift().replace(/\/$/, '');
    jQuery("a").each(function () {
        if (this.href.toLowerCase() == loc.toLowerCase()) jQuery(this).addClass("ui-state-highlight");
    });
});


