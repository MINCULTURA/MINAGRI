using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AppMC.Models
{
    public class SessionUsuarioModels
    {
        private Int64 numeroSesion;
        private string loginUsuario;
        private string paternoUsuario;
        private string maternoUsuario;
        private string nombreUsuario;
        private int codigoAplicativo;
        private string nombreAplicativo;
        private string abreviaturaAplicativo;
        private string tipoControl;
        private Int64 codigoVersion;
        private string numeroVersion;
        private int codigoPerfil;
        private string nombrePerfil;
        private Int64 codigoUsuRed;
        private string nombreUsuRed;
        private Int64 codigoEquipo;
        private string nombreEquipo;
        private string descripcionEquipo;
        private Int64 codigoIp;
        private string numeroIp;
        private Int64 codigoMac;
        private string direccionMac;
        private Int64 codigoSistemaOpe;
        private string descripcionSistemaOpe;
        private Int64 codigoNavegador;
        private string descripcionNavegador;
        private DateTime fechaInicio;
        private DateTime fechaFin;
        private int codigoTipoSalida;
        private string descripcionTipoSalida;
        private int codigoUsuario;

        public int CodigoUsuario
        {
            get { return codigoUsuario; }
            set { codigoUsuario = value; }
        }

        public Int64 NumeroSesion
        {
            get { return numeroSesion; }
            set { numeroSesion = value; }
        }

        public string LoginUsuario
        {
            get { return loginUsuario; }
            set { loginUsuario = value; }
        }

        public string PaternoUsuario
        {
            get { return paternoUsuario; }
            set { paternoUsuario = value; }
        }

        public string MaternoUsuario
        {
            get { return maternoUsuario; }
            set { maternoUsuario = value; }
        }

        public string NombreUsuario
        {
            get { return nombreUsuario; }
            set { nombreUsuario = value; }
        }

        public int CodigoAplicativo
        {
            get { return codigoAplicativo; }
            set { codigoAplicativo = value; }
        }

        public string NombreAplicativo
        {
            get { return nombreAplicativo; }
            set { nombreAplicativo = value; }
        }

        public string AbreviaturaAplicativo
        {
            get { return abreviaturaAplicativo; }
            set { abreviaturaAplicativo = value; }
        }

        public string TipoControl
        {
            get { return tipoControl; }
            set { tipoControl = value; }
        }

        public Int64 CodigoVersion
        {
            get { return codigoVersion; }
            set { codigoVersion = value; }
        }

        public string NumeroVersion
        {
            get { return numeroVersion; }
            set { numeroVersion = value; }
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

        public Int64 CodigoUsuRed
        {
            get { return codigoUsuRed; }
            set { codigoUsuRed = value; }
        }

        public string NombreUsuRed
        {
            get { return nombreUsuRed; }
            set { nombreUsuRed = value; }
        }

        public Int64 CodigoEquipo
        {
            get { return codigoEquipo; }
            set { codigoEquipo = value; }
        }

        public string NombreEquipo
        {
            get { return nombreEquipo; }
            set { nombreEquipo = value; }
        }

        public string DescripcionEquipo
        {
            get { return descripcionEquipo; }
            set { descripcionEquipo = value; }
        }

        public Int64 CodigoIp
        {
            get { return codigoIp; }
            set { codigoIp = value; }
        }

        public string NumeroIp
        {
            get { return numeroIp; }
            set { numeroIp = value; }
        }

        public Int64 CodigoMac
        {
            get { return codigoMac; }
            set { codigoMac = value; }
        }

        public string DireccionMac
        {
            get { return direccionMac; }
            set { direccionMac = value; }
        }

        public Int64 CodigoSistemaOpe
        {
            get { return codigoSistemaOpe; }
            set { codigoSistemaOpe = value; }
        }

        public string DescripcionSistemaOpe
        {
            get { return descripcionSistemaOpe; }
            set { descripcionSistemaOpe = value; }
        }

        public Int64 CodigoNavegador
        {
            get { return codigoNavegador; }
            set { codigoNavegador = value; }
        }

        public string DescripcionNavegador
        {
            get { return descripcionNavegador; }
            set { descripcionNavegador = value; }
        }

        public DateTime FechaInicio
        {
            get { return fechaInicio; }
            set { fechaInicio = value; }
        }

        public DateTime FechaFin
        {
            get { return fechaFin; }
            set { fechaFin = value; }
        }

        public int CodigoTipoSalida
        {
            get { return codigoTipoSalida; }
            set { codigoTipoSalida = value; }
        }

        public string DescripcionTipoSalida
        {
            get { return descripcionTipoSalida; }
            set { descripcionTipoSalida = value; }
        }
    }
}