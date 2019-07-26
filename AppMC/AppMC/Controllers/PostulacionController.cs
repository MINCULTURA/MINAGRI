using System;
using System.Xml.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Web.Mvc;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Linq;
using System.IO;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppMC.Controllers
{
    public class PostulacionController : Controller
    {
        //
        // GET: /Postulacion/

        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Ficha()
        {
            ViewBag.NIDPERFIL = int.Parse(Request.Cookies["idperfil"].Value);
            ViewBag.NCODIGOUSUARIO = int.Parse(Request.Cookies["idusuario"].Value);
            if (Request.Cookies["mensaje_ult"].Value == null)
                ViewBag.MENSAJE = "";
            else
                ViewBag.MENSAJE = Request.Cookies["mensaje_ult"].Value;
            Response.Cookies["mensaje_ult"].Value = "";
            return View();
        }
       

    }

}
