using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AppMC.Models
{
    public class GestionModels
    {
        public class ProcesoComite
        {
            public string SP { get; set; }
            public int NIDCOMITE { get; set; }
            public int NIDPERSONAL { get; set; }
            public int NIDPROCESO { get; set; }
            public int NCODIGOUSUARIO { get; set; }
            public int BACTIVO { get; set; }
            public DateTime DFECHAREGIS { get; set; }
            public string SMENSAJE { get; set; }
            public int NOPT { get; set; }
            public int NIDPERFIL { get; set; }

            public string SPROCESO { get; set; }
            public string SSERVICIO { get; set; }
            public int NEXP_GEN { get; set; }
            public int NEXP_ESP { get; set; }
            public int BESTADO { get; set; }
            public int NCOLEG_OBLIG { get; set; }
            public int NPROCESO { get; set; }
            public int NCALIFICACION { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public int NIDCONVOCATORIA { get; set; }
            public string SIDSFORMACIONACAD { get; set; }
            public string SIDSGRADOSACAD { get; set; }

            public int NELENCO { get; set; }
            public int NPLAZAS { get; set; }
            public string SRUTADOC { get; set; }
            public int NTIPO_EVALUADOR { get; set; }

            public int NEVAL_CUR { get; set; }
            public string STIPO_EVAL { get; set; }

            public int NIDESTADO { get; set; }
            public string SOBSERVACION { get; set; }
            public int NTIPO_EVAL { get; set; }
            public int NASISTENCIA { get; set; }
            public int NIDACTIVIDAD { get; set; }

            public string DPUESTO { get; set; }
            public string DOBJETO { get; set; }
            public string DLUGAR { get; set; }
            public string SDURACION { get; set; }
            public int NSUELDO { get; set; }
            public string IDOFICODIGO { get; set; }
            public int NOBLIG_BREVETE { get; set; }
            public int NCOLEGHAB_OBLIG { get; set; }
            public int NRNA_OBLIG { get; set; }
            public int NRESULTADO { get; set; }
            public int NREVALCUR { get; set; }
            public int NREVALTEC { get; set; }
            public int NRENTREVISTA { get; set; }
            public string DSUSTENTOR { get; set; }
            public int NREEMPLAZO { get; set; }
            public string SMOTIVO { get; set; }
            public string SFECHA { get; set; }
            public int NOBLIG_DJ { get; set; }
            public int NOCI { get; set; }
            public int NMESES { get; set; }

            public string IDFTECODIGO { get; set; }
            public string AIRHSP { get; set; }
            public string SIAF { get; set; }
            public string IDSERCASCODIGO { get; set; }
            public int NTIPOBASE { get; set; }
        }

        public class Reporte
        {
            public string WHERE { get; set; }
            public string GRUPO { get; set; }
            public int IDUSUARIO { get; set; }
        }
        public class ProcesoBases
        {
            public int NIDPROCESO { get; set; }
            public int NIDREGISTRO { get; set; }
            public int NPRIORIDAD { get; set; }
            public int NCODIGOUSUARIO { get; set; }
            public int NTIPO { get; set; }
            public int NTIPO_TABLA { get; set; }
            public int BACTIVO { get; set; }

            public string SFECHA1 { get; set; }
            public string SFECHA2 { get; set; }
            public string SDESCRIPCION { get; set; }
            public string SMENSAJE { get; set; }
        }
        public class Actividad
        {
            public string IDOFICODIGO { get; set; }
            public string SNOMBRE { get; set; }
            public string SDESCRIPCION { get; set; }
            public string SPERFIL { get; set; }
            public string SACCIONES { get; set; }
            public int NIDPROCESO { get; set; }
            public int NIDACTIVIDAD { get; set; }
            public int NVACANTES { get; set; }
            public int NESTADO { get; set; }
            public int NCODIGOUSUARIO { get; set; }
            public string SMENSAJE { get; set; }
        }
        public class Contrato
        {
            public int NIDPROCESOUSU { get; set; }
            public string NOMBRE_ANIO { get; set; }
            public int NRO_CONTRATO { get; set; }
            public string SEXO_DIR { get; set; }
            public string NOMBRE_DIR { get; set; }
            public string DNI_DIR { get; set; }
            public string DRESOLUCION { get; set; }
            public string FECHA_RESOL { get; set; }
            public string NOMBRE_TRAB { get; set; }
            public string DNI_TRAB { get; set; }
            public string RUC_TRAB { get; set; }
            public string SERVICIO { get; set; }
            public string FINI_CONTRATO { get; set; }
            public string FFIN_CONTRATO { get; set; }
            public int NSUELDO { get; set; }
            public string DSUELDO { get; set; }
            public string OFICINA { get; set; }
            public string NRO_CONVOCATORIA { get; set; }
            public string FECHA_SUSCRIPCION { get; set; }
            public string RESULTADO { get; set; }
            public int NCODIGOUSUARIO { get; set; }
            public string DIRECCION { get; set; }
        }
        public class Parametros
        {
            public int NOPTION { get; set; }
            public int NIDPROCESO { get; set; }
            public int NIDACTIVIDAD { get; set; }
            public int NIDPROCESOUSU { get; set; }
            public string SFECHAINI { get; set; }
            public string SFECHAFIN { get; set; }
            public int NIDUSUARIO { get; set; }
        }
    }
}