using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Data;
using AppMC.Models;
using System.Configuration;
using System.Collections;
using System.Web.Script.Serialization;
using System.Reflection;
using System.Net.Mail;
using System.Text;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
//using UTILITARIO;
//using ENTIDAD;
//using DATOS;

namespace AppMC.Controllers
{
    public class UserController : Controller
    {
        DTL.CLS_User ObjDato = new DTL.CLS_User();
        DTL.wsPideDAL ObjPide = new DTL.wsPideDAL();
        UserModels ObjEnt = new UserModels();

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Models.UserModels user)
        {
            String patronER   = "[0-9]";
            Regex RegER = new Regex(patronER, RegexOptions.ExplicitCapture);

            if (ModelState.IsValid)
            {
                MatchCollection machER = RegER.Matches(user.UserName);
                if (machER.Count > 0)
                {
                    user = ObjDato.ObtenerInformacionUsuarioPS(user.UserName, user.Password);

                    if (user.Msge == "ACCESO")
                    {
                        FormsAuthentication.SetAuthCookie(user.UserName, user.RememberMe);
                        Response.Cookies["idperfil"].Value = user.IdPerfil.ToString();
                        Response.Cookies["idperfil"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["user_name"].Value = user.UserName.ToString();
                        Response.Cookies["user_name"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["idusuario"].Value = user.IdUsuario.ToString();
                        Response.Cookies["idusuario"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["mensaje_ult"].Value = "";
                        Response.Cookies["mensaje_ult"].Expires = DateTime.Now.AddDays(1);

                        return RedirectToAction("DatosGen", "Postulacion");
                    }
                    else
                    {
                        ModelState.AddModelError("", user.Msge);
                    }

                }
                else
                {
                    user = ObjDato.ObtenerInformacionUsuarioMC(user.UserName, user.Password);

                    if (user.Msge == "ACCESO")
                    {
                        FormsAuthentication.SetAuthCookie(user.UserName, user.RememberMe);
                        Response.Cookies["idperfil"].Value = user.IdPerfil.ToString();////"207";
                        Response.Cookies["idperfil"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["user_name"].Value = user.UserName.ToString();//"20133694154"; 
                        Response.Cookies["user_name"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["idusuario"].Value = user.IdUsuario.ToString(); //// //"336";
                        Response.Cookies["idusuario"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["idsesion"].Value = user.IdSesion.ToString();  //
                        Response.Cookies["idsesion"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["NombrePerfil"].Value = user.NombrePerfil.ToString();  //
                        Response.Cookies["NombrePerfil"].Expires = DateTime.Now.AddDays(1);
                        Response.Cookies["DatosUsuario"].Value = user.DatosUsuario.ToString();  //
                        Response.Cookies["DatosUsuario"].Expires = DateTime.Now.AddDays(1);

                        return RedirectToAction("Evaluacion", "Gestion");
                    }
                    else
                    {
                        ModelState.AddModelError("", user.Msge);
                    }
                } 
            }

            return View(user);
        }

        [HttpGet]
        public ActionResult CambiarContrasena()
        {
            ViewBag.NIDPERFIL = int.Parse(Request.Cookies["idperfil"].Value);
            ViewBag.NCODIGOUSUARIO = int.Parse(Request.Cookies["idusuario"].Value);    

            return View();
        }

        [HttpPost]
        public ActionResult CambiarContrasena(Models.UserModels user)
        {
            ViewBag.NIDPERFIL = int.Parse(Request.Cookies["idperfil"].Value);
            ViewBag.NCODIGOUSUARIO = int.Parse(Request.Cookies["idusuario"].Value);    

            return View(user);
        }
        
        public ActionResult Logout()
        {
            Response.Cookies[ConfigurationManager.AppSettings["app"] + "idperfil"].Expires = DateTime.Now.AddDays(-1);
            Response.Cookies[ConfigurationManager.AppSettings["app"] + "user_name"].Expires = DateTime.Now.AddDays(-1);
            Response.Cookies[ConfigurationManager.AppSettings["app"] + "mensaje_ult"].Expires = DateTime.Now.AddDays(-1);
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "User");
        }

        public JsonResult InsertarUsuario(Models.UserModels user)
        {            
            user.mensaje = "";
            Models.PersonaEL persona = new Models.PersonaEL();
          /*  
                persona = ObjPide.ObtenerDatosPersona(user.strDocumento);
                if (persona.msg == "OK")
                {
                    user.fnacimiento = persona.strFechaNac;
                    user.sexo = persona.strSexo;
                    user.strNombres = persona.strNombres;
                }*/
            user = ObjDato.InsertarUsuario(user);

            persona.strDocumento=user.strDocumento;
            persona.strTipoDocumento = user.strTipoDocumento;

            DataTable dtmenu = new DataTable();
            
            dtmenu = ObjDato.ValidarDoc(persona);

            DataColumn ESTADO = dtmenu.Columns.Add("ESTADO_GUARDADO", typeof(String));
            ESTADO.AllowDBNull = true;
            ESTADO.Unique = false;
            dtmenu.Rows[0][8] = user.mensaje;
            string strCorreo = dtmenu.Rows[0][6].ToString();

            List<Dictionary<string, object>> lstmenu;
            lstmenu = ObjDato.GetTableRowsUser(dtmenu);

            var jsonResult = Json(lstmenu, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;


            /**************************/
         /*   string str_CorreoRemitente = ConfigurationManager.AppSettings["CorreoNotificacion"].ToString();
            string str_CorreoRespaldo = ConfigurationManager.AppSettings["CorreoSistemas"].ToString();
            string str_SMTPServer = ConfigurationManager.AppSettings["SMTPServer"].ToString();
            string str_Contrasena = ConfigurationManager.AppSettings["ContrasenaNotificacion"].ToString();
            string str_UrlSistemaLogin = ConfigurationManager.AppSettings["UrlSistemaLogin"].ToString();
            string strAsunto = "";
            string strCuerpo = "";
            string strNombres = "";
            strNombres = user.strNombres.ToUpper() + " " + user.strApePaterno.ToUpper() + " " + user.strApeMaterno.ToUpper();

            if (user.mensaje == "OK")
            {
                strAsunto = "Confirmación de creación de cuenta de usuario";
                strCuerpo = 
                    "<html>" +
                    "<head>" +
                    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
                     "<title>CONFIRMACIÓN DE CREACIÓN DE CUENTA DE USUARIO</title>" +
                     "</head>" +
                     "<body>" +
                    "<div>" +
                    "<h4 style=\"text-align:center\"><b>CONFIRMACIÓN DE CREACIÓN DE CUENTA DE USUARIO</b></h4><br/>" +
                                    "Estimado(a) " + strNombres + " :<br/><br/>" +
                                    "Mediante el presente correo se confirma la creación de usuario para el acceso al Formulario de Postulación a Convocatorias CAS del Ministerio de Cultura.<br/>" +
                                    "<b>Usuario : </b>" + user.strDocumento + "<br/>" +
                                    "<b>Contraseña : </b>" + user.Password + "<br/><br/>" +
                                    "Para poder ingresar favor dar clic <a href=\"" + str_UrlSistemaLogin + "\">aquí</a>.<br/><br/>" +
                                    "Atentamente,<br/>" +
                                    "Oficina General de Estadística y Tecnologías de la Información y Comunicaciones.<br/>" +
                                    "</div> " +
                                    "</body>" +
                                    "</html>";

                ObjDato.EnvioCorreo(strCuerpo, str_SMTPServer, str_CorreoRemitente, str_Contrasena, strAsunto, strCorreo, str_CorreoRespaldo, "");
            }

            if (user.mensaje == "EXISTE")
            {
                strAsunto = "Cuenta de usuario existente";
                strCuerpo = 
                    "<html>" +
                    "<head>" +
                    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
                     "<title>CUENTA DE USUARIO EXISTENTE</title>" +
                     "</head>" +
                     "<body>" +
                    "<div>" +
                    "<h4 style=\"text-align:center\"><b>CUENTA DE USUARIO EXISTENTE</b></h4><br/>" +
                                    "Estimado(a) " + strNombres + " :<br/><br/>" +
                                    "Mediante el presente correo se informa que el usuario que ha intentado registrar ya existe.<br/>" +
                                    "<b>Usuario : </b>" + user.strDocumento + "<br/><br/>" +
                                    "Para poder ingresar o recuperar su contraseña favor dar clic <a href=\"" + str_UrlSistemaLogin + "\">aquí</a>.<br/><br/>" +
                                    "Atentamente,<br/>" +
                                    "Oficina General de Estadística y Tecnologías de la Información y Comunicaciones.<br/>" +
                                    "</div> " +
                                    "</body>" +
                                    "</html>";

                ObjDato.EnvioCorreo(strCuerpo, str_SMTPServer, str_CorreoRemitente, str_Contrasena, strAsunto, strCorreo, str_CorreoRespaldo, "");
            }*/
            /**************************/

            return jsonResult;
        }
        
        public JsonResult RecuperarPass(Models.UserModels user)
        {

            string mensaje = ObjDato.CambiarContrasena(user.IdUsuario);

            return Json(new { MENSAJE = mensaje });
        }

        public JsonResult CambiarContrasena2(Models.UserModels user)
        {
            string str_CorreoRemitente = ConfigurationManager.AppSettings["CorreoNotificacion"].ToString();
            string str_CorreoRespaldo = ConfigurationManager.AppSettings["CorreoSistemas"].ToString();
            string str_SMTPServer = ConfigurationManager.AppSettings["SMTPServer"].ToString();
            string str_Contrasena = ConfigurationManager.AppSettings["ContrasenaNotificacion"].ToString();
            string str_UrlSistemaLogin = ConfigurationManager.AppSettings["UrlSistemaLogin"].ToString();
            string strAsunto = "";
            string strCuerpo = "";
            string PasswordNew = user.Password;
            string strNombres = "";

            user.mensaje = "";
            user = ObjDato.CambiarContrasena2(user);
            user.UserName = Request.Cookies["user_name"].Value;

            DataTable dtmenu = new DataTable();
            dtmenu = ObjDato.validarUsu(user);
            DataColumn ESTADO = dtmenu.Columns.Add("MENSAJE", typeof(String));
            ESTADO.AllowDBNull = true;
            ESTADO.Unique = false;    
            dtmenu.Rows[0][9] = user.mensaje;
            strNombres = dtmenu.Rows[0][3].ToString().ToUpper() + " " + dtmenu.Rows[0][1].ToString().ToUpper() + " " + dtmenu.Rows[0][2].ToString().ToUpper();

            if (user.mensaje == "OK")
            {                           
                string login = dtmenu.Rows[0][7].ToString();
                string strCorreo = dtmenu.Rows[0][6].ToString();

                strAsunto = "Cambio de contraseña";
                strCuerpo = //"Mediante el presente correo se confirma la creación de usuario para el acceso al Formulario de Postulación a Convocatorias CAS del Ministerio de Cultura.<br/>";
                    "<html>" +
                    "<head>" +
                    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
                     "<title>CAMBIO DE CONTRASEÑA</title>" +
                     "</head>" +
                     "<body>" +
                    "<div>" +
                    "<h4 style=\"text-align:center\"><b>CAMBIO DE CONTRASEÑA</b></h4><br/>" +
                                    "Estimado(a) " + strNombres + " :<br/><br/>" + 
                                    "Mediante el presente correo se responde a su solicitud de cambio de contraseña para el acceso al Formulario de Postulación a Convocatorias CAS del Ministerio de Cultura.<br/><br/>" +
                                    "<b>Usuario : </b>" + login + "<br/>" +
                                    "<b>Contraseña : </b>" + PasswordNew + "<br/><br/>" +
                                    "Para poder ingresar favor dar clic <a href=\"" + str_UrlSistemaLogin + "\">aquí</a>.<br/><br/>" +
                                    "Atentamente,<br/>" +
                                    "Oficina General de Estadística y Tecnologías de la Información y Comunicaciones.<br/>" +
                                    "</div> " +
                                    "</body>" +
                                    "</html>";

                ObjDato.EnvioCorreo(strCuerpo, str_SMTPServer, str_CorreoRemitente, str_Contrasena, strAsunto, strCorreo, str_CorreoRespaldo, "");
            }

            /**************************/
            

            List<Dictionary<string, object>> lstmenu;
            lstmenu = ObjDato.GetTableRowsUser(dtmenu);

            var jsonResult = Json(lstmenu, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;
        }

        public JsonResult LISTA_MENU()
        {
            int IDPERFIL = 0;

            try
            {
                 IDPERFIL = int.Parse(Request.Cookies["idperfil"].Value);
                 ObjEnt.IdUsuario = int.Parse(Request.Cookies["idusuario"].Value);
            }
            catch { Logout();
                }
            DataTable dtmenu = new DataTable();
            ObjEnt.IdPerfil = IDPERFIL;

            dtmenu = ObjDato.PRC_LISTA_MENU_PERFIL(ObjEnt);

            List<Dictionary<string, object>> lstmenu;
            lstmenu = ObjDato.GetTableRowsUser(dtmenu);

            var jsonResult = Json(lstmenu, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;
        }

        public JsonResult valDoc(Models.PersonaEL persona)
        {                        
            DataTable dtmenu = new DataTable();

            persona = ObjDato.ValidarDNI(persona);

            dtmenu = ObjDato.ValidarDoc(persona);

            List<Dictionary<string, object>> lstmenu;
            lstmenu = ObjDato.GetTableRowsUser(dtmenu);

            var jsonResult = Json(lstmenu, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;
        }

        public JsonResult ValidarOtrosDocs(Models.PersonaEL persona)
        {                        
            DataTable dtmenu = new DataTable();

            if (persona.strTipoDocumento != "DNI")
            {
                if (persona.strApeMaterno == null ){
                    persona.strApeMaterno="";
                }

                persona = ObjDato.ValidarOtrosDocs(persona);
            }

            dtmenu = ObjDato.ValidarDoc(persona);

            List<Dictionary<string, object>> lstmenu;
            lstmenu = ObjDato.GetTableRowsUser(dtmenu);

            var jsonResult = Json(lstmenu, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;
        }

        public JsonResult valUsuario(Models.UserModels user)
        {
            DataTable dtmenu = new DataTable();

            dtmenu = ObjDato.validarUsu(user);

            List<Dictionary<string, object>> lstmenu;
            lstmenu = ObjDato.GetTableRowsUser(dtmenu);

            var jsonResult = Json(lstmenu, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;
        }

        public string GenerarPassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }
        public JsonResult ResetearClave(string sdni)
        {
            try{
                return Json(new { mensaje = ObjDato.ResetearClave(sdni) });
            }
            catch(Exception ex ){
                return Json(new { mensaje = ex.Message });
            };
            
        }

        public ActionResult update()
        {
            ViewBag.ruta = Request.PhysicalApplicationPath;
            return View();
        }
        public JsonResult CargaPostUPDATE(string docfile, string ruta)
        {
            var request = HttpContext.Request;
            if (request.Files.Count > 0)
            {
                try
                {
                    foreach (string file in request.Files)
                    {
                        var postedFile = request.Files[file];
                        var extension = Path.GetExtension(request.Files[file].FileName);
                        var filePath = HttpContext.Server.MapPath(string.Format("~/" + ruta + "/{0}", docfile + extension));
                        postedFile.SaveAs(filePath);
                    }
                    return Json(new { msg = "Exito" });
                }
                catch (Exception ex)
                {
                    return Json(new { msg = ex.Message });
                }
            }
            else
                return Json(new { msg = "No se cargo ningun archivo" });
        }
        
    }
}
