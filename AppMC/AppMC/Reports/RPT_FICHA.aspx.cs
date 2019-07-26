using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AppMC.Reports
{
    public partial class RPT_FICHA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportesMC.RPT_FICHA rpt = new ReportesMC.RPT_FICHA();

            rpt.ReportParameters["PNIDPROCESOUSU"].Value = int.Parse(Request.QueryString["NIDPROCESOUSU"].ToString());// "1";
            ReportViewer1.Report = rpt;
        }
    }
}