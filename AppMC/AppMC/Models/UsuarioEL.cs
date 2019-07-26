using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppMC.Models
{
    public class UsuarioEL
    {
        private int codigoUsuario;
        private int codigoOrganigrama;
        private string nombreOrganigrama;
        private string login;
        private string clave;
        private int cambioClave;
        private DateTime fechaCambio;
        private int vigenciaUsuario;
        private int vigenciaClave;
        private int accesosFallidos;
        private int externo;
        private int bloqueado;
        private int habilitado;
        private string observacion;
        private string fechaActual;
        private int codigoPerfil;
        private string nombrePerfil;        

        public int CodigoUsuario
        {
            get { return codigoUsuario; }
            set { codigoUsuario = value; }
        }

        public int CodigoOrganigrama
        {
            get { return codigoOrganigrama; }
            set { codigoOrganigrama = value; }
        }

        public string NombreOrganigrama
        {
            get { return nombreOrganigrama; }
            set { nombreOrganigrama = value; }
        }

        public string Login
        {
            get { return login; }
            set { login = value; }
        }

        public string Clave
        {
            get { return clave; }
            set { clave = value; }
        }

        public int CambioClave
        {
            get { return cambioClave; }
            set { cambioClave = value; }
        }

        public DateTime FechaCambio
        {
            get { return fechaCambio; }
            set { fechaCambio = value; }
        }

        public int VigenciaUsuario
        {
            get { return vigenciaUsuario; }
            set { vigenciaUsuario = value; }
        }

        public int VigenciaClave
        {
            get { return vigenciaClave; }
            set { vigenciaClave = value; }
        }

        public int AccesosFallidos
        {
            get { return accesosFallidos; }
            set { accesosFallidos = value; }
        }

        public int Externo
        {
            get { return externo; }
            set { externo = value; }
        }

        public int Bloqueado
        {
            get { return bloqueado; }
            set { bloqueado = value; }
        }

        public int Habilitado
        {
            get { return habilitado; }
            set { habilitado = value; }
        }

        public string Observacion
        {
            get { return observacion; }
            set { observacion = value; }
        }

        public string FechaActual
        {
            get { return fechaActual; }
            set { fechaActual = value; }
        }

        public int CodigoPerfil
        {
            get { return codigoPerfil; }
            set { codigoPerfil = value; }
        }

        public string NombrePerfil
        {
            get { return nombrePerfil; }
            set { nombrePerfil = value; }
        }

    }
}