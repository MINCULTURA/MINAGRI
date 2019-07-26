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

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using NotesFor.HtmlToOpenXml;


using A = DocumentFormat.OpenXml.Drawing;
using DW = DocumentFormat.OpenXml.Drawing.Wordprocessing;
using PIC = DocumentFormat.OpenXml.Drawing.Pictures;

namespace AppMC.Controllers
{
    public class GestionController : Controller
    {
        //
        // GET: /Gestion/

        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Comite()
        {
            string rutaDOC = ConfigurationManager.AppSettings["RUTADOC"];
            string max_size = ConfigurationManager.AppSettings["MAX_SIZE"];
            ViewBag.rutaDOC = rutaDOC;
            ViewBag.max_size = max_size;
            return View();
        }

        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Evaluacion()
        {
            ViewBag.NIDPERFIL = int.Parse(Request.Cookies["idperfil"].Value);
            ViewBag.NCODIGOUSUARIO = int.Parse(Request.Cookies["idusuario"].Value);
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Asistencia()
        {
            ViewBag.NIDPERFIL = int.Parse(Request.Cookies["idperfil"].Value);
            ViewBag.NCODIGOUSUARIO = int.Parse(Request.Cookies["idusuario"].Value);
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult TablaGeneral()
        {
            return View();
        }

        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Resultados()
        {
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult ResultadosVol()
        {
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult ConsultaGeneral()
        {
            ViewBag.NCODIGOUSUARIO = int.Parse(Request.Cookies["idusuario"].Value);
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Ganadores()
        {
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Voluntariado()
        {
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Voluntariado_D()
        {
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Actividad_D()
        {
            return View();
        }
        [Authorize]
        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult ListadoVol()
        {
            string rutaDOC = ConfigurationManager.AppSettings["RUTADOC"];
            ViewBag.rutaDOC = rutaDOC;
            return View();
        }
    
    }
}


                                                                                           