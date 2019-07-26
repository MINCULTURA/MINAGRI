using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppMC.Models
{
    public class PersonaEL
    {
        public int intIdPersonal { get; set; }
        public string strApePaterno { get; set; }
        public string strEstado { get; set; }
        public int intOrden { get; set; }
        public string strApeMaterno { get; set; }
        public string strNombres { get; set; }
        public string strNombresApellidos { get; set; }
        public string strTipoDocumento { get; set; }
        public string strDocumento { get; set; }
        public string strFlagAsignado { get; set; }
        public string strCorreo { get; set; }
        public string strUsuario { get; set; }
        public string strCargo { get; set; }
        public string strFechaNac { get; set; }
        public int intIdPerfil { get; set; }
        public bool blnvalidacion { get; set; }
        public UsuarioEL UsuarioEL { get; set; }
        public string strFlagActivo { get; set; }
        public string strFlagUltimo { get; set; }
        public string strSexo { get; set; }
        //public EmpresaEL EmpresaEL { get; set; }
        //public MensajeEL MensajeEL { get; set; }
        public string mensaje { get; set; }
        public int intBloqueado { get; set; }
        public int intHabilitado { get; set; }
        public string strTelefono { get; set; }
        public string msg { get; set; }
        public int codMsg { get; set; }
    }
}