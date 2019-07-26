using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AppMC.Models
{
    public class PostulacionModels
    {
        public class DatosGen
        {
            public int NIDCODIGOUSUARIO { get; set; }
            public string SAPATERNO { get; set; }
            public string SAMATERNO { get; set; }
            public string SNOMBRES { get; set; }
            public int NEDAD { get; set; }
            public int NIDESTADOCIVIL { get; set; }
            public string SUBIGEONAC { get; set; }
            public DateTime DFECHANAC { get; set; }
            public string SSEXO { get; set; }
            public string SDNI { get; set; }
            public string SRUC { get; set; }
            public string SBREVETE { get; set; }
            public string SCATBREVETE { get; set; }
            public string SDIRECCION { get; set; }
            public string SUBIGEODIR { get; set; }
            public string SNROLOTE { get; set; }
            public string STELEFONOFIJO { get; set; }
            public string SCELULAR { get; set; }
            public string SCORREO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public DateTime DFECHAREGIS { get; set; }
            public string SRUTADOC { get; set; }
            public int NTIPODOC { get; set; }
            public string SNOMBRE_C { get; set; }
            public string STELEFONO { get; set; }
            public string SPARENTESCO { get; set; }
            public string SRUTADOC_NAC { get; set; }
            public string SPAIS_NAC { get; set; }
        }

        public class Ubigeo
        {
            public string NDEPARTAMENTO { get; set; }
            public string NPROVINCIA { get; set; }
            public string NDISTRITO { get; set; }
        }

        public class ProcesoUsuario
        {
            public int NIDPROCESOUSU { get; set; }
            public int NIDCODIGOUSUARIO { get; set; }
            public int NIDPROCESO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public int BACTIVO { get; set; }
            public DateTime DFECHAREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public int BESTADO { get; set; }
            public string SEXP_ESP { get; set; }
            public string SEXP_GEN { get; set; }
            public int NACTIVIDAD { get; set; }
            public int NFIRMA { get; set; }
            public string DFECHAGANADOR { get; set; }
            public string DFECHAFIRMA { get; set; }
        }

        public class FormacionAc
        {
            public int NIDFACADEMICA { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public int NIDTIPOFORMACION { get; set; }
            public string SINSTITUCION { get; set; }
            public int NIDGRADOACADEMICO { get; set; }
            public string SPROFESION { get; set; }
            public int NMESDESDE { get; set; }
            public int NANIODESDE { get; set; }
            public int NMESHASTA { get; set; }
            public int NANIOHASTA { get; set; }
            public int NANIOSESTUDIO { get; set; }
            public string SFOLIO { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public string SRUTADOC { get; set; }
            public DateTime DFECHA_DESDE { get; set; }
            public DateTime DFECHA_HASTA { get; set; }
            public int NCICLO { get; set; }
            public int NINSTITUCION { get; set; }
            public string COD_CARRERA { get; set; }

        }

        public class Colegiatura
        {
            public int NIDCOLEGIATURA { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SCOLEGIO { get; set; }
            public string SNROCOLEGIATURA { get; set; }
            public string SPROFESION { get; set; }
            public int BCONDICION { get; set; }
            public string SFOLIO { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public string SRUTADOC { get; set; }
        }

        public class Capacitacion
        {
            public int NIDCAPACITACION { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public DateTime DFECHA_DESDE { get; set; }
            public DateTime DFECHA_HASTA { get; set; }
            public string SCURSO { get; set; }
            public string SINTITUCION { get; set; }
            public int NHORAS { get; set; }
            public string SFOLIO { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public string SRUTADOC { get; set; }
        }

        public class Conocimiento
        {
            public int NIDCONOCIMIENTO { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SDESCRIPCION { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public int NIDTIPO { get; set; }
            public string SRUTADOC { get; set; }
            public int NCONOCIMEINTO_B { get; set; }
        }

        public class ConocimientoInf
        {
            public int NIDCONOCIMIENTOINF { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SCONOCIMIENTO { get; set; }
            public string BTIPO { get; set; }
            public string SFOLIO { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public string SRUTADOC { get; set; }
        }

        public class Idioma
        {
            public int NIDIDIOMA { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SIDIOMA { get; set; }
            public string BTIPO { get; set; }
            public string SFOLIO { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public string SRUTADOC { get; set; }
        }

        public class Experiencia
        {
            public int NIDEXPERIENCIA { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SENTIDAD { get; set; }
            public string SAREA { get; set; }
            public string SCARGO { get; set; }
            public string SFUNCIONES { get; set; }
            public string SMODALIDAD { get; set; }
            public string SMOTIVORETIRO { get; set; }
            public string SNOMBRECARGOJEFE { get; set; }
            public int NTIEMPOSERVICIO { get; set; }
            public int NMESDESDE { get; set; }
            public int NANIODESDE { get; set; }
            public int NMESHASTA { get; set; }
            public int NANIOHASTA { get; set; }
            public int NREMUNERACION { get; set; }
            public string STELEFONO { get; set; }
            public string SFOLIO { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public string SRUTADOC { get; set; }
            public int NPRESENTACIONES { get; set; }
            public DateTime DFECHA_HASTA { get; set; }
            public DateTime DFECHA_DESDE { get; set; }
            public int BSECTOR { get; set; }
            public int BESPECIFICA { get; set; }
            public string STIEMPOSERVICIO { get; set; }
        }

        public class DatosAdic
        {
            public int NIDDATOSADIC { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public int BFAMILIADIRECTA { get; set; }
            public string SFAMILIADIRECTA { get; set; }
            public int BDISCAPACIDAD { get; set; }
            public string STIPO { get; set; }
            public string SFOLIO { get; set; }
            public int BDEUDOR { get; set; }
            public int BANTECEDENTES { get; set; }
            public string SANTECEDENTES { get; set; }
            public int BFUERZAARMADA { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public int BTERM_COND { get; set; }
            public string SRUTADOC_DIS { get; set; }
            public string SRUTADOC_LFA { get; set; }
            public string BINHAB_ESTADO { get; set; }
            public string BINCOMP_ESTADO { get; set; }
            public string BPENSIONISTA { get; set; }
            public string BTIPO_PENSION { get; set; }
            public string BPENSION_SUSP { get; set; }
            public string BPARENTESCO { get; set; }
            public string SRUTADOC_OCI { get; set; }
            public string SRUTADOC_A3B { get; set; }
            public int BDEPORTISTA { get; set; }
            public string SRUTADOC_DEP { get; set; }
        }
        public class Tabla_General
        {
            public int NIDTABLA { get; set; }
            public int NIDITEM { get; set; }
            public string SDITEM { get; set; }
            public string SSITEM { get; set; }
            public string SFECHA1 { get; set; }
            public string SFECHA2 { get; set; }
            public int NPARAM1 { get; set; }
            public int NPARAM2 { get; set; }
            public int BACTIVO { get; set; }
            public int NIDUSUCREACION { get; set; }
            public string SDATO { get; set; }
            public int NIDPROCESO { get; set; }
        }
        public class RNA
        {
            public int NIDRNA { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SCODIGO_INS { get; set; }
            public int BACTIVO { get; set; }
            public int NUSUARIO { get; set; }
            public int NIDUSUARIOREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public DateTime DFECHA_REG { get; set; }
        }
        public class VOLUNTARIADO
        {
            public int CODIGO{ get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SDATO { get; set; }
            public string SRUTADOC { get; set; }
            public string SDESCRIPCION { get; set; }
            public string SDETALLE { get; set; }
            public int NTIPO { get; set; }
            public int NUSUARIO { get; set; }
            public int BACTIVO { get; set; }
            public string SMENSAJE { get; set; }
            public string DFECHA_REG { get; set; }
            public int NENFERMEDAD { get; set; }
            public string SENFERMEDAD { get; set; }
            public int NSEGURO { get; set; }
            public string SSEGURO { get; set; }
            public int NIDIDIOMA { get; set; }
        }
        public class ASISTENCIA
        {
            public int NIDASISTENCIA { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string DFECHA { get; set; }
            public string SHORA { get; set; }
            public string SHORA2 { get; set; }
            public int NTIPO_MARCA { get; set; }
            public int NESTADO { get; set; }
            public int NTIPO_HORA { get; set; }
            public string SIP { get; set; }
            public int NIDUSUARIO { get; set; }
            public string SLONGITUD { get; set; }
            public string SLATITUD { get; set; }
            public string SERROR { get; set; }
            public string SEXPLORADOR { get; set; }
            public string SMENSAJE { get; set; }
        }
    }
}