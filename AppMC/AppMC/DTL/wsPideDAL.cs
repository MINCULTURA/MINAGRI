using AppMC.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using AppMC.SR_AUT;
using AppMC.SR_DNI;
namespace AppMC.DTL
{
    public class wsPideDAL
    {
        public PersonaEL ObtenerDatosPersona(string p_strDNI)
        {
            PersonaEL persona = new PersonaEL();
            string Mensaje = "";
            int codMsg = 0;
            try
            {
                string codUserPIDE = ConfigurationManager.AppSettings["CodUserPIDE"];
                string codTransacPIDE = ConfigurationManager.AppSettings["CodTransacPIDE"];
                string codEntidadPIDE = ConfigurationManager.AppSettings["CodEntidadPIDE"];
                string usuario = ConfigurationManager.AppSettings["UsuarioPIDE"];
                string password = ConfigurationManager.AppSettings["ContrasenaPIDE"];

                using (ws_DNI.ReniecConsultaDni ws = new ws_DNI.ReniecConsultaDni())
                {
                    persona.strDocumento = p_strDNI;
                    ws_DNI.peticionConsulta pc = new ws_DNI.peticionConsulta();
                    pc.nuDniConsulta = persona.strDocumento;
                    pc.nuDniUsuario = usuario;
                    pc.nuRucUsuario = "20537630222";
                    pc.password = password;
                    ws_DNI.resultadoConsulta rc = ws.consultar(pc);
                    persona.strApePaterno = rc.datosPersona.apPrimer;
                    persona.strApeMaterno = rc.datosPersona.apSegundo;
                    persona.strNombres = rc.datosPersona.prenombres;
                    Mensaje = "OK";
                    codMsg = 1;
                }
            }
            catch (Exception ex)
            {
                codMsg = -20;
                Mensaje = "Ocurrió un error en la conexión. Inténtelo más tarde.";
                Console.Write(ex.Message);
            }
            persona.msg = Mensaje;
            persona.codMsg = codMsg;
            return persona;
        }
        public PersonaEL ObtenerDatosCE(string p_strCE)
        {
            PersonaEL persona = new PersonaEL();
            string Mensaje = "";
            int codMsg = 0;
            try
            {
                string strCodInstitucion = ConfigurationManager.AppSettings["strCodInstitucion"];
                string strMac = ConfigurationManager.AppSettings["strMac"];
                string strNroIp = ConfigurationManager.AppSettings["strNroIp"];
                string strTipoDocumento = ConfigurationManager.AppSettings["strTipoDocumento"];
             
                using (SR_CE.MigraCarnetdeExtrajeria ws = new SR_CE.MigraCarnetdeExtrajeria())
                {
                    persona.strDocumento = p_strCE;
                    SR_CE.solicitudBean pc = new SR_CE.solicitudBean();
                    pc.strCodInstitucion = strCodInstitucion;
                    pc.strMac = strMac;
                    pc.strNroIp = strNroIp;
                    pc.strNumDocumento = persona.strDocumento;
                    pc.strTipoDocumento = strTipoDocumento;
                    SR_CE.respuestaBean rc = ws.consultarDocumento(pc);
                    persona.strApePaterno = rc.strPrimerApellido;
                    persona.strApeMaterno = rc.strSegundoApellido;
                    persona.strNombres = rc.strNombres;
                    Mensaje = "OK";
                    codMsg = 1;
                }
            }
            catch (Exception ex)
            {
                codMsg = -20;
                Mensaje = "Ocurrió un error en la conexión. Inténtelo más tarde.";
                Console.Write(ex.Message);
            }
            persona.msg = Mensaje;
            persona.codMsg = codMsg;
            return persona;
        }
    }
}