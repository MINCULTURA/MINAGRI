using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AppMC.Models
{
    public class UserModels
    {
        DTL.CLS_User ObjDato = new DTL.CLS_User();     

        [Required]
        [Display(Name = "Nombre de usuario")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }        

        [Display(Name = "¿Recordar cuenta?")]
        public bool RememberMe { get; set; }

        public string Msge { get; set; }
        public string TipoPersona { get; set; }
        public int IdPerfil { get; set; }
        public int IdUsuario { get; set; }
        public int IdSesion { get; set; }

        /*Lo agregue para insertar usuarios*/
        public string strApePaterno { get; set; }
        public string strApeMaterno { get; set; }
        public string strNombres { get; set; }
        public string strNombresApellidos { get; set; }
        public string strTipoDocumento { get; set; }
        public string strDocumento { get; set; }
        public string strCorreo { get; set; }
        public string mensaje { get; set; }
        public string sexo { get; set; }
        public string fnacimiento { get; set; }
        public string PasswordAnt { get; set; }
        public string strCelular { get; set; }
        /*******/

        public string loginUsuario { get; set; }
        public string NombrePerfil { get; set; }
        public string DatosUsuario { get; set; }
        public int IdOrganigrama { get; set; }
        public string NombreOrganigrama { get; set; }

        public bool IsValid(string _username, string _password)
        {            
            UserModels User = new UserModels();

            User = ObjDato.ObtenerInformacionUsuarioPS(_username, _password);

            User.Msge = "ACCESO";
            if (User.Msge == "ACCESO")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}