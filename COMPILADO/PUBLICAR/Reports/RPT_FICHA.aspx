<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RPT_FICHA.aspx.cs" Inherits="AppMC.Reports.RPT_FICHA" %>
<%@ Register assembly="Telerik.ReportViewer.WebForms, Version=6.0.12.215, Culture=neutral, PublicKeyToken=a9d7983dfcc261be" namespace="Telerik.ReportViewer.WebForms" tagprefix="telerik" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <telerik:ReportViewer ID="ReportViewer1" runat="server" Height="600px"  Width="100%">
            <Resources ExportButtonText="Exportación" ExportSelectFormatText="Exportación al formato seleccionado" ExportToolTip="Exportación" FirstPageToolTip="Primera página" LabelOf="de" LastPageToolTip="Última página" NavigateBackToolTip="Navegar hacia atras" NavigateForwardToolTip="Navegar hacia adelante" NextPageToolTip="Pagina siguiente" PreviousPageToolTip="Pagina anterior" PrintToolTip="Impresión" ProcessingReportMessage="Generación de informe ..." RefreshToolTip="Actualizar" TogglePageLayoutToolTip="Cambiar a la vista interactiva | Cambie a la vista preliminar" />
        </telerik:ReportViewer>
    </div>
    </form>
</body>
</html>
