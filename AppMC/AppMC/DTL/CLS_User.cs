using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using AppMC.wsAcceso;
using System.Data;
using Oracle.DataAccess.Client;
using System.Text;
using AppMC.Models;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Net.Mail;


namespace AppMC.DTL
{
    public class CLS_User
    {
        string conn = ConfigurationManager.ConnectionStrings["ConnectionOrcl"].ConnectionString;
        string esquema = ConfigurationManager.AppSettings["Esquema"];
        string paquete = ConfigurationManager.AppSettings["PaqueteREAD"];
        string paqueteUser = ConfigurationManager.AppSettings["PaqueteUSER"];

        public Models.UserModels ObtenerInformacionUsuarioMC(string usuario, string password) {
            Models.UserModels User = new Models.UserModels();

            SessionServiceClient cliente = new SessionServiceClient();
            sesionIniciarWebRequest inicioRequest = new sesionIniciarWebRequest();
            sesionIniciarWebResponse inicioResponse = new sesionIniciarWebResponse();

            try
            {
                inicioRequest.user = usuario.Trim().ToUpper();
                inicioRequest.pass = password.Trim();
                inicioRequest.app = ConfigurationManager.AppSettings["app"].ToString();
                inicioRequest.version = ConfigurationManager.AppSettings["version"].ToString();
                OracleParameter[] oraParam = new OracleParameter[4];

                oraParam[0] = new OracleParameter("P_USUARIO", inicioRequest.user);
                oraParam[1] = new OracleParameter("P_CLAVE", inicioRequest.pass);
                oraParam[2] = new OracleParameter("C_DATA", OracleDbType.RefCursor);
                oraParam[2].Direction = ParameterDirection.Output;
                oraParam[3] = new OracleParameter("P_RESULTADO", OracleDbType.Int32);
                oraParam[3].Direction = ParameterDirection.Output;
                using (OracleDataReader dr = OracleDataAccess.ExecuteReader(conn, CommandType.StoredProcedure, esquema + ".PKG_CAS_USER.SP_LOGIN_MC", oraParam))
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            User.Msge = "ACCESO";
                            User.UserName = inicioRequest.user;
                            Models.SessionUsuarioModels sesionCIRA = new Models.SessionUsuarioModels();
                            Models.UsuarioEL usuarioCIRA = new Models.UsuarioEL();
                            User.IdPerfil = Convert.ToInt32(dr["IDPERFIL"]);
                            User.IdSesion = Convert.ToInt32(dr["SESION"]);
                            User.IdUsuario = Convert.ToInt32(dr["IDUSUARIO"]);
                            User.loginUsuario = usuario;// sesionCIRA.LoginUsuario;
                            User.NombrePerfil = Convert.ToString(dr["SNOMBREPERFIL"]);
                            User.DatosUsuario = Convert.ToString(dr["DATOSUSUARIO"]);
                            User.TipoPersona = "MC";
                        }
                    }
                }
             //   inicioResponse = cliente.sesionIniciarWeb(inicioRequest);

             //   if (inicioResponse.@return.numeroSesion <= 0)
            /*    if (Convert.ToInt32(oraParam[3].Value.ToString()) <= 0)
                {
                    int codError = Convert.ToInt32(oraParam[3].Value.ToString());
                    switch (codError)
                    {
                        case -1:

                            User.Msge = "El nombre de usuario no existe.";
                            break;

                        case -2:
                            User.Msge = "La clave es incorrecta.";
                            break;

                        case -3:
                            User.Msge = "Tiene que habilitar su cuenta de usuario. Por favor, haga clic en el enlace que se le adjunto a su correo.";
                            break;

                        case -4:
                            User.Msge = "El usuario no tiene un perfil asignado.";
                            break;

                        case -5:
                            User.Msge = "La cuenta de usuario ha caducado. Comuníquese con Informática.";
                            break;

                        case -6:
                            User.Msge = "La clave ha caducado. Comuníquese con Informática.";
                            break;

                        case -7:
                            User.Msge = "El usuario no tiene control permisos.";
                            break;

                        case -8:
                            User.Msge = "Número de IP no autorizado.";
                            break;

                        case -9:
                            User.Msge = "Dirección MAC no autorizada.";
                            break;

                        case -10:
                            User.Msge = "El aplicativo no se encuentra autorizado.";
                            break;

                        case -11:
                            User.Msge = "EL usuario se encuentra bloqueado.";
                            break;

                        case -12:
                            User.Msge = "El perfil del usuario se encuentra deshabilitado.";
                            break;

                        case -13:
                            User.Msge = "El aplicativo se encuentra en mantenimiento.";
                            break;

                        case -14:
                            User.Msge = "El aplicativo se encuentra inhabilitado.";
                            break;

                        case -15:
                            User.Msge = "El usuario tiene múltiple perfil.";
                            break;

                        case -16:
                            User.Msge = "Parámetros de acceso incorrecctos o no existen.";
                            break;

                        case -17:
                            User.Msge = "Acceso no autorizado. Debe cambiar su clave.";
                            break;

                        case -18:
                            User.Msge = "La aplicación no se encuentra disponible.";
                            break;

                        default:
                            User.Msge = "Ha ocurrido un problema de conexión. Intente conectarse más tarde.";
                            break;
                    }

                }*/
                return User;
            }
            catch (Exception ex)
            {
                //Console.Write(ex.Message);
                User.Msge = "Ha ocurrido un problema de conexión. Intente conectarse más tarde. " + ex.Message;
                return User;
            }
        }

        public Models.UserModels ObtenerInformacionUsuarioPS(string usuario, string password)
        {
            
            OracleParameter[] oraParam = new OracleParameter[5];

            oraParam[0] = new OracleParameter("P_SLOGIN", usuario);
            oraParam[1] = new OracleParameter("P_SCLAVE", password);
            oraParam[2] = new OracleParameter("P_NIDCODIGOUSUARIO", OracleDbType.Int32, int.MaxValue);
            oraParam[2].Direction = ParameterDirection.Output;
            oraParam[3] = new OracleParameter("P_NCODIGOPERFIL", OracleDbType.Int32, int.MaxValue);
            oraParam[3].Direction = ParameterDirection.Output;
            oraParam[4] = new OracleParameter("P_MENSAJE", OracleDbType.Int32, int.MaxValue);
            oraParam[4].Direction = ParameterDirection.Output;

            AppMC.Models.UserModels ObjEnt = new Models.UserModels();

            OracleDataAccess.ExecuteNonQuery(conn, CommandType.StoredProcedure, esquema + "." + paqueteUser + ".SP_CONSULTAR_USUARIO2", oraParam);

            int IdUsuario = int.Parse(oraParam[2].Value.ToString());
            int IdPerfil = int.Parse(oraParam[3].Value.ToString());
            ObjEnt.IdUsuario = IdUsuario;
            ObjEnt.IdPerfil = IdPerfil;
            ObjEnt.UserName = usuario;

            if (oraParam[4].Value.ToString() == "1") { ObjEnt.Msge = "Usuario no existe."; }
            if (oraParam[4].Value.ToString() == "2") { ObjEnt.Msge = "Contraseña Incorrecta."; }
            if (oraParam[4].Value.ToString() == "3") { ObjEnt.Msge = "ACCESO"; }
             
            return ObjEnt;
        }


        /*
        public Models.UserModels ObtenerInformacionUsuario(string usuario, string password)
        {
            AppMC.Models.UserModels User = new Models.UserModels();

            SessionServiceClient cliente = new SessionServiceClient();
            sesionIniciarWebRequest inicioRequest = new sesionIniciarWebRequest();
            sesionIniciarWebResponse inicioResponse = new sesionIniciarWebResponse();

            try
            {
                inicioRequest.user = usuario.Trim().ToUpper();
                inicioRequest.pass = password.Trim();
                inicioRequest.app = ConfigurationManager.AppSettings["app"].ToString();
                inicioRequest.version = ConfigurationManager.AppSettings["version"].ToString();

                inicioResponse = cliente.sesionIniciarWeb(inicioRequest);

                if (inicioResponse.@return.numeroSesion <= 0)
                {
                    int codError = inicioResponse.@return.numeroSesion;
                    switch (codError)
                    {
                        case -1:

                            User.Msge = "El nombre de usuario no existe.";
                            break;

                        case -2:
                            User.Msge = "La clave es incorrecta.";
                            break;

                        case -3:
                            User.Msge = "Tiene que habilitar su cuenta de usuario. Por favor, haga clic en el enlace que se le adjunto a su correo.";
                            break;

                        case -4:
                            User.Msge = "El usuario no tiene un perfil asignado.";
                            break;

                        case -5:
                            User.Msge = "La cuenta de usuario ha caducado. Comuníquese con Informática.";
                            break;

                        case -6:
                            User.Msge = "La clave ha caducado. Comuníquese con Informática.";
                            break;

                        case -7:
                            User.Msge = "El usuario no tiene control permisos.";
                            break;

                        case -8:
                            User.Msge = "Número de IP no autorizado.";
                            break;

                        case -9:
                            User.Msge = "Dirección MAC no autorizada.";
                            break;

                        case -10:
                            User.Msge = "El aplicativo no se encuentra autorizado.";
                            break;

                        case -11:
                            User.Msge = "EL usuario se encuentra bloqueado.";
                            break;

                        case -12:
                            User.Msge = "El perfil del usuario se encuentra deshabilitado.";
                            break;

                        case -13:
                            User.Msge = "El aplicativo se encuentra en mantenimiento.";
                            break;

                        case -14:
                            User.Msge = "El aplicativo se encuentra inhabilitado.";
                            break;

                        case -15:
                            User.Msge = "El usuario tiene múltiple perfil.";
                            break;

                        case -16:
                            User.Msge = "Parámetros de acceso incorrecctos o no existen.";
                            break;

                        case -17:
                            User.Msge = "Acceso no autorizado. Debe cambiar su clave.";
                            break;

                        case -18:
                            User.Msge = "La aplicación no se encuentra disponible.";
                            break;

                        default:
                            User.Msge = "Ha ocurrido un problema de conexión. Intente conectarse más tarde.";
                            break;
                    }

                    return User;
                }
                else
                {
                    User.Msge = "ACCESO";
                    User.UserName = inicioRequest.user;

                    // Obtenemos los datos de la Sesion

                    Models.SessionUsuarioModels sesionCIRA = new Models.SessionUsuarioModels();
                    Models.UsuarioEL usuarioCIRA = new Models.UsuarioEL();
                    sesionCIRA = ObtenerDatosSesion(inicioResponse.@return.numeroSesion);
                    usuarioCIRA = ObtenerDatosUsuario(sesionCIRA.LoginUsuario);

                    //Session["IdSession"] = sesionCIRA.NumeroSesion;
                    //Session["IdUsuario"] = sesionCIRA.CodigoUsuario;

                    //Session["loginUsuario"] = sesionCIRA.LoginUsuario;
                    //Session["IdPerfil"] = sesionCIRA.CodigoPerfil;

                    User.IdPerfil = sesionCIRA.CodigoPerfil;
                    User.IdSesion = Convert.ToInt32(sesionCIRA.NumeroSesion);
                    User.IdUsuario = Convert.ToInt32(sesionCIRA.CodigoUsuario);

                    //Session["NombrePerfil"] = sesionCIRA.NombrePerfil;
                    //Session["DatosUsuario"] = sesionCIRA.NombreUsuario.Trim().ToString() + " " + sesionCIRA.PaternoUsuario.Trim().ToString() + " " + sesionCIRA.MaternoUsuario.Trim().ToString();
                    //Session["IdOrganigrama"] = usuarioCIRA.CodigoOrganigrama;
                    //Session["NombreOrganigrama"] = usuarioCIRA.NombreOrganigrama;

                    //int codPerfilAdministrado = int.Parse(ConfigurationManager.AppSettings["codPerfilAdministrado"]);

                    return User;
                }
            }
            catch (Exception ex)
            {
                //Console.Write(ex.Message);
                User.Msge = "Ha ocurrido un problema de conexión. Intente conectarse más tarde. " + ex.Message;
                return User;
            }
        }
        */

        private Models.SessionUsuarioModels ObtenerDatosSesion(int numeroSesion)
        {
            SessionServiceClient cliente = new SessionServiceClient();
            leerSesionPorNumeroRequest DatosRequest = new leerSesionPorNumeroRequest();
            DatosRequest.numeroSesion = numeroSesion;
            leerSesionPorNumeroResponse DatosResponse = new leerSesionPorNumeroResponse();
            DatosResponse = cliente.leerSesionPorNumero(DatosRequest);
            Models.SessionUsuarioModels sesionCIRA = new Models.SessionUsuarioModels();
            sesionCIRA.AbreviaturaAplicativo = DatosResponse.@return[0].abreviaturaAplicativo;
            sesionCIRA.CodigoAplicativo = DatosResponse.@return[0].codigoAplicativo;
            sesionCIRA.CodigoEquipo = DatosResponse.@return[0].codigoEquipo;
            sesionCIRA.CodigoIp = DatosResponse.@return[0].codigoIp;
            sesionCIRA.CodigoMac = DatosResponse.@return[0].codigoMac;
            sesionCIRA.CodigoNavegador = DatosResponse.@return[0].codigoNavegador;
            sesionCIRA.CodigoPerfil = DatosResponse.@return[0].codigoPerfil;
            sesionCIRA.CodigoSistemaOpe = DatosResponse.@return[0].codigoSistemaOpe;
            sesionCIRA.CodigoTipoSalida = DatosResponse.@return[0].codigoTipoSalida;
            sesionCIRA.CodigoUsuRed = DatosResponse.@return[0].codigoUsuRed;
            sesionCIRA.CodigoVersion = DatosResponse.@return[0].codigoVersion;
            sesionCIRA.DescripcionEquipo = DatosResponse.@return[0].descripcionEquipo;
            sesionCIRA.DescripcionNavegador = DatosResponse.@return[0].descripcionNavegador;
            sesionCIRA.DescripcionSistemaOpe = DatosResponse.@return[0].descripcionSistemaOpe;
            sesionCIRA.DescripcionTipoSalida = DatosResponse.@return[0].descripcionTipoSalida;
            sesionCIRA.DireccionMac = DatosResponse.@return[0].direccionMac;
            sesionCIRA.FechaFin = DatosResponse.@return[0].fechaFin;
            sesionCIRA.FechaInicio = DatosResponse.@return[0].fechaInicio;
            sesionCIRA.LoginUsuario = DatosResponse.@return[0].loginUsuario;
            sesionCIRA.MaternoUsuario = DatosResponse.@return[0].maternoUsuario;
            sesionCIRA.NombreAplicativo = DatosResponse.@return[0].nombreAplicativo;
            sesionCIRA.NombreEquipo = DatosResponse.@return[0].nombreEquipo;
            sesionCIRA.NombrePerfil = DatosResponse.@return[0].nombrePerfil;
            sesionCIRA.NombreUsuario = DatosResponse.@return[0].nombreUsuario;
            sesionCIRA.NombreUsuRed = DatosResponse.@return[0].nombreUsuRed;
            sesionCIRA.NumeroIp = DatosResponse.@return[0].numeroIp;
            sesionCIRA.NumeroSesion = DatosResponse.@return[0].numeroSesion;
            sesionCIRA.NumeroVersion = DatosResponse.@return[0].numeroVersion;
            sesionCIRA.PaternoUsuario = DatosResponse.@return[0].paternoUsuario;
            sesionCIRA.TipoControl = DatosResponse.@return[0].tipoControl;
            sesionCIRA.CodigoUsuario = DatosResponse.@return[0].codigoUsuario;
            return sesionCIRA;
        }

        private Models.UsuarioEL ObtenerDatosUsuario(string login)
        {
            Models.UsuarioEL usuarioCIRA = new Models.UsuarioEL();
            SessionServiceClient cliente = new SessionServiceClient();
            leerUsuarioPorLoginRequest UsuarioRequest = new leerUsuarioPorLoginRequest();
            UsuarioRequest.login = login;
            leerUsuarioPorLoginResponse UsuarioResponse = new leerUsuarioPorLoginResponse();
            UsuarioResponse = cliente.leerUsuarioPorLogin(UsuarioRequest);

            usuarioCIRA.AccesosFallidos = UsuarioResponse.@return[0].accesosFallidos;
            usuarioCIRA.Bloqueado = UsuarioResponse.@return[0].bloqueado;
            usuarioCIRA.CambioClave = UsuarioResponse.@return[0].cambioClave;
            usuarioCIRA.Clave = UsuarioResponse.@return[0].clave;
            usuarioCIRA.CodigoOrganigrama = UsuarioResponse.@return[0].codigoOrganigrama;
            usuarioCIRA.CodigoPerfil = UsuarioResponse.@return[0].codigoPerfil;
            usuarioCIRA.CodigoUsuario = UsuarioResponse.@return[0].codigoUsuario;
            usuarioCIRA.Externo = UsuarioResponse.@return[0].externo;
            usuarioCIRA.FechaActual = UsuarioResponse.@return[0].fechaActual;
            usuarioCIRA.FechaCambio = UsuarioResponse.@return[0].fechaCambio;
            usuarioCIRA.Habilitado = UsuarioResponse.@return[0].habilitado;
            usuarioCIRA.Login = UsuarioResponse.@return[0].login;
            usuarioCIRA.NombreOrganigrama = UsuarioResponse.@return[0].nombreOrganigrama;
            usuarioCIRA.NombrePerfil = UsuarioResponse.@return[0].nombrePerfil;
            usuarioCIRA.Observacion = UsuarioResponse.@return[0].observacion;
            usuarioCIRA.VigenciaClave = UsuarioResponse.@return[0].vigenciaClave;
            usuarioCIRA.VigenciaUsuario = UsuarioResponse.@return[0].vigenciaUsuario;

            return usuarioCIRA;
        }
        
        public Models.UserModels InsertarUsuario2(Models.UserModels user)
        {
            int cod_persona = 0;

            user.strTipoDocumento = user.strTipoDocumento.Trim().ToUpper();
            user.strApePaterno = user.strApePaterno.Trim().ToUpper();
            user.strApeMaterno = user.strApeMaterno.Trim().ToUpper();
            user.strNombres = user.strNombres.Trim().ToUpper();
            user.strCorreo = user.strCorreo.Trim().ToUpper(); 

            SessionServiceClient wsCliente = new SessionServiceClient();

            leerPersonaPorDocumentoRequest vleerPersona = new leerPersonaPorDocumentoRequest();
            vleerPersona.numeroDocumento = user.strDocumento;
            vleerPersona.tipoDocumento = user.strTipoDocumento;

            leerPersonaPorDocumentoResponse rleerPersona = new leerPersonaPorDocumentoResponse();
            rleerPersona = wsCliente.leerPersonaPorDocumento(vleerPersona);

            if (rleerPersona.@return == null) //Si la persona no existe
            {
                //Se inserta la persona
                insertarPersonaRequest vinsertarPersona = new insertarPersonaRequest();
                insertarPersonaResponse rinsertarPersona = new insertarPersonaResponse();
                vinsertarPersona.p_strTipoDocumento = user.strTipoDocumento;
                vinsertarPersona.p_strNumeroDocumento = user.strDocumento;
                vinsertarPersona.p_strPaternoPersona = user.strApePaterno;
                vinsertarPersona.p_strMaternoPersona = user.strApeMaterno;
                vinsertarPersona.p_strNombresPersona = user.strNombres;
                vinsertarPersona.p_strFechaNacimiento = "";
                vinsertarPersona.p_strSexoPersona = "";
                vinsertarPersona.p_strtipoEntidad_Telef = "P";
                vinsertarPersona.p_strreferencia_Telef = "PERSONAL";
                vinsertarPersona.p_strnumeroTelefonico = "";
                vinsertarPersona.p_strtipoEntidad_Correo = "P";
                vinsertarPersona.p_strreferencia_Correo = "PERSONAL";
                vinsertarPersona.p_strCorreo = user.strCorreo;
                vinsertarPersona.p_intnumeroSesion = 0;
                vinsertarPersona.p_intauditoriaOrigen = 0;
                rinsertarPersona = wsCliente.insertarPersona(vinsertarPersona);

                if (rinsertarPersona.@return == 1) //Hubo un error en la inserción
                {
                    //Procedimiento.fn_muestra_mensaje_Error(Constantes.NombreControles.S_MSG_BOX_ERROR, "Hubo un error en el registro. Inténtelo más tarde", this.upDatos);
                    user.mensaje = "Hubo un error al tratar de insertar a la Persona. Inténtelo más tarde.";
                    return user;
                }
                else
                { 
                
                }
            }

            /*Se obtiene el Código de Persona*/
            vleerPersona = new leerPersonaPorDocumentoRequest();
            vleerPersona.numeroDocumento = user.strDocumento;
            vleerPersona.tipoDocumento = user.strTipoDocumento;
            rleerPersona = new leerPersonaPorDocumentoResponse();
            rleerPersona = wsCliente.leerPersonaPorDocumento(vleerPersona);
            
            if (rleerPersona.@return != null){
                cod_persona = rleerPersona.@return[0].codigoPersona;
            }

           

            buscarUsuarioPorDocumentoRequest vusuarioDocumento = new buscarUsuarioPorDocumentoRequest();
            buscarUsuarioPorDocumentoResponse rusuarioDocumento = new buscarUsuarioPorDocumentoResponse();
            
            leerUsuarioPorLoginRequest vusuarioLogin = new leerUsuarioPorLoginRequest();
            leerUsuarioPorLoginResponse pusuarioLogin = new leerUsuarioPorLoginResponse();

            vusuarioDocumento.p_strtipoDocumento = user.strTipoDocumento;
            string srtNumeroDocumento = String.Empty;
            srtNumeroDocumento = user.strDocumento;
            vusuarioDocumento.p_strnumeroDocumento = srtNumeroDocumento;
            rusuarioDocumento = wsCliente.buscarUsuarioPorDocumento(vusuarioDocumento);

            if (rusuarioDocumento.@return == null)
            {
                vusuarioLogin.login = srtNumeroDocumento;
                pusuarioLogin = wsCliente.leerUsuarioPorLogin(vusuarioLogin);

                if (pusuarioLogin.@return == null) //Si el usuario no existe
                {
                    /*Se obtiene el Código de Persona*/
                    vleerPersona = new leerPersonaPorDocumentoRequest();
                    vleerPersona.numeroDocumento = srtNumeroDocumento;
                    vleerPersona.tipoDocumento = user.strTipoDocumento;
                    rleerPersona = new leerPersonaPorDocumentoResponse();
                    rleerPersona = wsCliente.leerPersonaPorDocumento(vleerPersona);

                    if (rleerPersona.@return != null)
                    {
                        insertarUsuarioRequest vinsertarUsuario = new insertarUsuarioRequest();
                        insertarUsuarioResponse rinsertarUsuario = new insertarUsuarioResponse();

                        vinsertarUsuario.p_strTipoDocumento = user.strTipoDocumento;
                        vinsertarUsuario.p_strNumeroDocumento = srtNumeroDocumento;// persona.strDocumento.Trim().ToString();
                        vinsertarUsuario.p_intcodigoPersona = rleerPersona.@return[0].codigoPersona;
                        vinsertarUsuario.p_intcodigoUsuario = rleerPersona.@return[0].codigoPersona;
                        cod_persona = vinsertarUsuario.p_intcodigoPersona;
                        vinsertarUsuario.p_strPaternoPersona = user.strApePaterno.Trim().ToUpper();
                        vinsertarUsuario.p_strMaternoPersona = user.strApeMaterno.Trim().ToUpper();
                        vinsertarUsuario.p_strNombresPersona = user.strNombres.Trim().ToUpper();
                        vinsertarUsuario.p_strFechaNacimiento = "01/01/1990";
                        vinsertarUsuario.p_strSexoPersona = "";
                        vinsertarUsuario.p_strlogin = srtNumeroDocumento;// persona.strDocumento.Trim().ToString();
                        vinsertarUsuario.p_strclave = user.Password;// txtPasswordAdministrado.Text;
                        vinsertarUsuario.p_intvigenciaUsuario = 0;
                        vinsertarUsuario.p_intvigenciaClave = 0;
                        vinsertarUsuario.p_strobservacion = "Creado desde el Sistema de Registro de Convocatorias CAS.";
                        vinsertarUsuario.p_intCambioClave = 0;
                        vinsertarUsuario.p_intnumeroSesion = 0;
                        rinsertarUsuario = wsCliente.insertarUsuario(vinsertarUsuario);

                        if (rinsertarUsuario.@return != null)
                        {
                            if (rinsertarUsuario.@return == 1)
                            {
                                user.mensaje = "Hubo un error al tratar de insertar al usuario. Inténtelo más tarde.";
                                return user;
                            }
                        }
                    }
                }
            }

            //Obtengo el código del usuario
            vusuarioLogin = new leerUsuarioPorLoginRequest();
            pusuarioLogin = new leerUsuarioPorLoginResponse();
            vusuarioLogin.login = srtNumeroDocumento;
            pusuarioLogin = wsCliente.leerUsuarioPorLogin(vusuarioLogin);

            int codigo = 0;
            string strLogin = String.Empty;
            int esExterno = 0;
            int esHabilitado = 0;

            if (pusuarioLogin.@return == null)
            {
                codigo = rusuarioDocumento.@return[0].codigoUsuario;
                esExterno = rusuarioDocumento.@return[0].externo;
                esHabilitado = rusuarioDocumento.@return[0].habilitado;
                strLogin = rusuarioDocumento.@return[0].login;
            }
            else
            {
                codigo = pusuarioLogin.@return[0].codigoUsuario;
                strLogin = srtNumeroDocumento;
                esExterno = 1;
                esHabilitado = 0;
            }

            //Leer Perfil x usuario
            leerPerfilUsuarioRequest vLeerPerfiUsuario = new leerPerfilUsuarioRequest();
            leerPerfilUsuarioResponse pLeerPerfilUsuario = new leerPerfilUsuarioResponse();

            int codPerfil = 0;
            codPerfil = ObtenerPerfilAdministradoporAplicativo();
            vLeerPerfiUsuario.p_intcodigoPerfil = codPerfil;
            vLeerPerfiUsuario.p_intcodigoUsuario = codigo;// pusuarioLogin.@return[0].codigoUsuario;
            pLeerPerfilUsuario = wsCliente.leerPerfilUsuario(vLeerPerfiUsuario);
            if (pLeerPerfilUsuario.@return != null) //Si existe, entonces el usuario ya esta asignado a un perfil
            {
                user.mensaje = "El usuario ya se encuentra registrado en el sistema.";
                return user;
            }
            else
            {
                //Leer si tiene el aplicativo habilitado
                listarPerfilesxUsuarioAplicativoRequest vAppUsuario = new listarPerfilesxUsuarioAplicativoRequest();
                listarPerfilesxUsuarioAplicativoResponse pAppUsuario = new listarPerfilesxUsuarioAplicativoResponse();
                
                    vAppUsuario.p_intCodAplicativo = 49; //sistema de Registro de Convocatorias CAS
                    vAppUsuario.p_intCodUsuario = codigo;
                    pAppUsuario = wsCliente.listarPerfilesxUsuarioAplicativo(vAppUsuario);                    
                    if (pAppUsuario.@return != null)
                    {
                        /*for (int i = 0; i < pAppUsuario.@return.Length; i++)
                        {
                            PerfilEL oPerfil = new PerfilEL();
                            oPerfil.intCodigoAplicativo = pAppUsuario.@return[i].codigoAplicativo;
                            oPerfil.intCodigoPerfil = pAppUsuario.@return[i].codigoPerfil;
                            oPerfil.strNombrePerfil = pAppUsuario.@return[i].nombrePerfil;
                            oPerfil.intHabilitado = pAppUsuario.@return[i].habilitado;
                            lstPerfiles.Add(oPerfil);
                        }
                        lstPerfiles = lstPerfiles.Where(n => n.strNombrePerfil == "ADMINISTRADO" && n.intHabilitado == 1).ToList();
                        foreach (PerfilEL item in lstPerfiles)
                        {
                            codPerfil = item.intCodigoPerfil;
                        }*/
                        user.mensaje = "El usuario ya se encuentra registrado.";
                        return user;
                    }




                //Inserta el perfil -- No encuentra un usuario asignado a ese perfil
                insertarPerfilUsuarioRequest vPerfilUsuario = new insertarPerfilUsuarioRequest();
                insertarPerfilUsuarioResponse pPerfilUsuario = new insertarPerfilUsuarioResponse();
                vPerfilUsuario.p_intcodigoPerfil = 204; //ADMINISTRADO
                vPerfilUsuario.p_intnumeroSesion = 0;
                vPerfilUsuario.p_intcodigoUsuario = codigo;
                vPerfilUsuario.p_intcodigoAplicativo = 49; //sistema de Registro de Convocatorias CAS
                pPerfilUsuario = wsCliente.insertarPerfilUsuario(vPerfilUsuario);
                
                if (pPerfilUsuario.@return != null)
                {
                    if (pPerfilUsuario.@return == 1)
                    {
                        user.mensaje = "Hubo un error al tratar de insertar el perfil. Inténtelo más tarde.";
                        return user;
                    }
                    else
                    { user.mensaje = "Se registró su usuario con éxito"; }
                }
            }

            return user;
        }

        private int ObtenerPerfilAdministradoporAplicativo()
        {
            int codPerfil = 0;
            SessionServiceClient wsCliente = new SessionServiceClient();
            listarPerfilesPorAplicativoRequest listarPerfilesRequest = new listarPerfilesPorAplicativoRequest();
            listarPerfilesPorAplicativoResponse listarPerfilesResponse = new listarPerfilesPorAplicativoResponse();
            try
            {
                listarPerfilesRequest.p_intCodAplicativo = 49;
                listarPerfilesResponse = wsCliente.listarPerfilesPorAplicativo(listarPerfilesRequest);
                List<PerfilEL> lstPerfiles = new List<PerfilEL>();
                if (listarPerfilesResponse != null)
                {
                    for (int i = 0; i < listarPerfilesResponse.@return.Length; i++)
                    {
                        PerfilEL oPerfil = new PerfilEL();
                        oPerfil.intCodigoAplicativo = listarPerfilesResponse.@return[i].codigoAplicativo;
                        oPerfil.intCodigoPerfil = listarPerfilesResponse.@return[i].codigoPerfil;
                        oPerfil.strNombrePerfil = listarPerfilesResponse.@return[i].nombrePerfil;
                        oPerfil.intHabilitado = listarPerfilesResponse.@return[i].habilitado;
                        lstPerfiles.Add(oPerfil);
                    }
                    lstPerfiles = lstPerfiles.Where(n => n.strNombrePerfil == "ADMINISTRADO" && n.intHabilitado == 1).ToList();
                    foreach (PerfilEL item in lstPerfiles)
                    {
                        codPerfil = item.intCodigoPerfil;
                    }
                }
                return codPerfil;
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                return 0;
            }
        }

        public List<Dictionary<string, object>> GetTableRowsUser(DataTable dtData)
        {
            List<Dictionary<string, object>> lstRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> dictRow = null;
            try
            {
                foreach (DataRow dr in dtData.Rows)
                {
                    dictRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dtData.Columns)
                    {
                        dictRow.Add(col.ColumnName, dr[col]);
                    }
                    lstRows.Add(dictRow);
                }
            }
            catch (Exception ex) {
                lstRows = null;
            }

            return lstRows;
        }

        public DataTable PRC_LISTA_MENU_PERFIL(Models.UserModels ObjEnt)
        {
            OracleParameter[] oraParam = new OracleParameter[3];

            oraParam[0] = new OracleParameter("V_NCODPERFIL_IN", ObjEnt.IdPerfil);
            oraParam[1] = new OracleParameter("CURSORS", OracleDbType.RefCursor);
            oraParam[1].Direction = ParameterDirection.Output;
            oraParam[2] = new OracleParameter("V_NIDUSUARIO_IN", ObjEnt.IdUsuario);
            try
            {
                DataSet ObjDS = OracleDataAccess.ExecuteDataset(conn, CommandType.StoredProcedure, esquema + "." + paquete + ".SP_LISTA_MENU_PERFIL", oraParam);
                return ObjDS.Tables[0];
            }
            catch (Exception ex){
                return null;
            }
        }

        public Models.PersonaEL ValidarDNI(Models.PersonaEL persona)
        {
            wsPideDAL wsservicio = new wsPideDAL();
            
         //   wsservicio.servicio();
            persona.strTipoDocumento = persona.strTipoDocumento.Trim().ToUpper();
            persona.strDocumento = persona.strDocumento.Trim().ToUpper();

           SessionServiceClient wsCliente = new SessionServiceClient();

           /*  leerPersonaPorDocumentoRequest vleerPersona = new leerPersonaPorDocumentoRequest();
            vleerPersona.numeroDocumento = persona.strDocumento;
            vleerPersona.tipoDocumento = persona.strTipoDocumento;

            leerPersonaPorDocumentoResponse rleerPersona = new leerPersonaPorDocumentoResponse();
      

            rleerPersona = wsCliente.leerPersonaPorDocumento(vleerPersona);*/

            OracleParameter[] oraParam = new OracleParameter[2];

            oraParam[0] = new OracleParameter("P_NRODNI", persona.strDocumento);
            oraParam[1] = new OracleParameter("C_DATA", OracleDbType.RefCursor);
            oraParam[1].Direction = ParameterDirection.Output;

            using (OracleDataReader dr = OracleDataAccess.ExecuteReader(conn, CommandType.StoredProcedure, esquema + ".PKG_CAS_USER.SP_CONSULTA_PERSONA", oraParam)){
             if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                    persona.intIdPersonal = Convert.ToInt32(dr["NCODIGOPERSONA"]);
                    persona.strApePaterno= Convert.ToString(dr["SPATERNO"]);
                    persona.strApeMaterno = Convert.ToString(dr["SMATERNO"]);
                    persona.strNombres = Convert.ToString(dr["SNOMBRE"]);
                    }}
            }

            if (String.IsNullOrEmpty(persona.strApePaterno)) //Si la persona no existe
            {
                //buscar en reniec si es DNI
                    wsPideDAL wsPide = new wsPideDAL();
                if (persona.strTipoDocumento == "DNI")
                {
                    persona = wsPide.ObtenerDatosPersona(persona.strDocumento);
                    persona.strTipoDocumento = "DNI";
                }
                else if (persona.strTipoDocumento == "CEE")
                {
                    persona = wsPide.ObtenerDatosCE(persona.strDocumento);
                    persona.strTipoDocumento = "CEE";
                }
                if (persona.msg == "OK")
                {
                    //Se inserta la persona
                    insertarPersonaRequest vinsertarPersona = new insertarPersonaRequest();
                    insertarPersonaResponse rinsertarPersona = new insertarPersonaResponse();
                    vinsertarPersona.p_strTipoDocumento = persona.strTipoDocumento;
                    vinsertarPersona.p_strNumeroDocumento = persona.strDocumento;
                    vinsertarPersona.p_strPaternoPersona = persona.strApePaterno;
                    vinsertarPersona.p_strMaternoPersona = persona.strApeMaterno;
                    vinsertarPersona.p_strNombresPersona = persona.strNombres;
                    vinsertarPersona.p_strFechaNacimiento = "";
                    vinsertarPersona.p_strSexoPersona = persona.strSexo;
                    vinsertarPersona.p_strtipoEntidad_Telef = "P";
                    vinsertarPersona.p_strreferencia_Telef = "PERSONAL";
                    vinsertarPersona.p_strnumeroTelefonico = "";
                    vinsertarPersona.p_strtipoEntidad_Correo = "P";
                    vinsertarPersona.p_strreferencia_Correo = "PERSONAL";
                    vinsertarPersona.p_strCorreo = "Correo";
                    vinsertarPersona.p_intnumeroSesion = 0;
                    vinsertarPersona.p_intauditoriaOrigen = 0;
                    rinsertarPersona = wsCliente.insertarPersona(vinsertarPersona);

                    if (rinsertarPersona.@return == 1) //Hubo un error en la inserción
                    {
                        //Procedimiento.fn_muestra_mensaje_Error(Constantes.NombreControles.S_MSG_BOX_ERROR, "Hubo un error en el registro. Inténtelo más tarde", this.upDatos);
                        persona.msg = "Hubo un error al tratar de insertar a la Persona. Inténtelo más tarde.";
                        return persona;
                    }
                }
            }

            return persona;
        }

        public Models.PersonaEL ValidarOtrosDocs(Models.PersonaEL persona)
        {
            persona.strTipoDocumento = persona.strTipoDocumento.Trim().ToUpper();
            persona.strDocumento = persona.strDocumento.Trim().ToUpper();
            persona.strApePaterno = persona.strApePaterno.Trim().ToUpper();
            persona.strApeMaterno = persona.strApeMaterno.Trim().ToUpper();
            persona.strNombres = persona.strNombres.Trim().ToUpper();
            persona.strCorreo = persona.strCorreo.Trim().ToUpper(); 

            SessionServiceClient wsCliente = new SessionServiceClient();

            leerPersonaPorDocumentoRequest vleerPersona = new leerPersonaPorDocumentoRequest();
            vleerPersona.numeroDocumento = persona.strDocumento;
            vleerPersona.tipoDocumento = persona.strTipoDocumento;

            leerPersonaPorDocumentoResponse rleerPersona = new leerPersonaPorDocumentoResponse();
            rleerPersona = wsCliente.leerPersonaPorDocumento(vleerPersona);

            if (rleerPersona.@return == null) //Si la persona no existe
            {
                if (persona.strTipoDocumento != "DNI")
                {                   
                    //Se inserta la persona
                    insertarPersonaRequest vinsertarPersona = new insertarPersonaRequest();
                    insertarPersonaResponse rinsertarPersona = new insertarPersonaResponse();
                    vinsertarPersona.p_strTipoDocumento = persona.strTipoDocumento;
                    vinsertarPersona.p_strNumeroDocumento = persona.strDocumento;
                    vinsertarPersona.p_strPaternoPersona = persona.strApePaterno;
                    vinsertarPersona.p_strMaternoPersona = persona.strApeMaterno;
                    vinsertarPersona.p_strNombresPersona = persona.strNombres;
                    vinsertarPersona.p_strFechaNacimiento = "";
                    vinsertarPersona.p_strSexoPersona = "";
                    vinsertarPersona.p_strtipoEntidad_Telef = "P";
                    vinsertarPersona.p_strreferencia_Telef = "PERSONAL";
                    vinsertarPersona.p_strnumeroTelefonico = "";
                    vinsertarPersona.p_strtipoEntidad_Correo = "P";
                    vinsertarPersona.p_strreferencia_Correo = "PERSONAL";
                    vinsertarPersona.p_strCorreo = "Correo";
                    vinsertarPersona.p_intnumeroSesion = 0;
                    vinsertarPersona.p_intauditoriaOrigen = 0;
                    rinsertarPersona = wsCliente.insertarPersona(vinsertarPersona);

                    if (rinsertarPersona.@return == 1) //Hubo un error en la inserción
                    {
                        //Procedimiento.fn_muestra_mensaje_Error(Constantes.NombreControles.S_MSG_BOX_ERROR, "Hubo un error en el registro. Inténtelo más tarde", this.upDatos);
                        persona.msg = "Hubo un error al tratar de insertar a la Persona. Inténtelo más tarde.";
                        return persona;
                    }
                }
            }

            return persona;
        }

        public DataTable ValidarDoc(Models.PersonaEL ObjEnt)
        {
            OracleParameter[] oraParam = new OracleParameter[3];

            oraParam[0] = new OracleParameter("P_STIPODOCUMENTO", ObjEnt.strTipoDocumento);
            oraParam[1] = new OracleParameter("P_SNUMERODOCUMENTO", ObjEnt.strDocumento);
            oraParam[2] = new OracleParameter("C_DATA", OracleDbType.RefCursor);
            oraParam[2].Direction = ParameterDirection.Output;

            DataSet ObjDS = OracleDataAccess.ExecuteDataset(conn, CommandType.StoredProcedure, esquema + "." + paqueteUser + ".SP_CONSULTAR_PERSONA", oraParam);
            return ObjDS.Tables[0];
        }

        public DataTable validarUsu(Models.UserModels ObjEnt)
        {
            OracleParameter[] oraParam = new OracleParameter[2];

            oraParam[0] = new OracleParameter("P_SLOGIN", ObjEnt.UserName);
            oraParam[1] = new OracleParameter("C_DATA", OracleDbType.RefCursor);
            oraParam[1].Direction = ParameterDirection.Output;

            DataSet ObjDS = OracleDataAccess.ExecuteDataset(conn, CommandType.StoredProcedure, esquema + "." + paqueteUser + ".SP_CONSULTAR_USUARIO", oraParam);
            return ObjDS.Tables[0];
        }

        public Models.UserModels InsertarUsuario(Models.UserModels ObjEnt)
        {
            OracleParameter[] oraParam = new OracleParameter[13];

            oraParam[0] = new OracleParameter("P_NCODIGOUSUARIO", ObjEnt.IdUsuario);
            oraParam[1] = new OracleParameter("P_SAPATERNO", ObjEnt.strApePaterno);
            oraParam[2] = new OracleParameter("P_SAMATERNO", ObjEnt.strApeMaterno);
            oraParam[3] = new OracleParameter("P_SNOMBRES", ObjEnt.strNombres);
            oraParam[4] = new OracleParameter("P_STIPODOCUMENTO", ObjEnt.strTipoDocumento);
            oraParam[5] = new OracleParameter("P_SNUMERODOCUMENTO", ObjEnt.strDocumento);
            oraParam[6] = new OracleParameter("P_SCORREO", ObjEnt.strCorreo);
            oraParam[7] = new OracleParameter("P_SCLAVE", ObjEnt.Password);
            oraParam[8] = new OracleParameter("P_NUSUARIO", ObjEnt.IdUsuario);
            oraParam[9] = new OracleParameter("P_MENSAJE", OracleDbType.Varchar2, 1000);
            oraParam[9].Direction = ParameterDirection.Output;
            oraParam[10] = new OracleParameter("P_SEXO", ObjEnt.sexo);
            oraParam[11] = new OracleParameter("P_FNACIMIENTO", ObjEnt.fnacimiento);
            oraParam[12] = new OracleParameter("P_CELULAR", ObjEnt.strCelular);

            OracleDataAccess.ExecuteNonQuery(conn, CommandType.StoredProcedure, esquema + "." + paqueteUser + ".SP_GUARDAR_USUARIO", oraParam);

            ObjEnt.mensaje = oraParam[9].Value.ToString();

            return ObjEnt;
        }

        public string CambiarContrasena(int ncodigo)
        {
            OracleParameter[] oraParam = new OracleParameter[2];

            oraParam[0] = new OracleParameter("P_NCODIGOUSUARIO", ncodigo);
            oraParam[1] = new OracleParameter("P_MENSAJE", OracleDbType.Varchar2, 1000);
            oraParam[1].Direction = ParameterDirection.Output;

            OracleDataAccess.ExecuteNonQuery(conn, CommandType.StoredProcedure, esquema + "." + paqueteUser + ".SP_CAMBIAR_CONTRASENA", oraParam);
            
            return oraParam[1].Value.ToString();
        }
        public string ResetearClave(string dni)
        {
            string resultado;
            OracleParameter[] oraParam = new OracleParameter[2];

            oraParam[0] = new OracleParameter("sdni", dni);
            oraParam[1] = new OracleParameter("sresultado", OracleDbType.Varchar2, 1000);
            oraParam[1].Direction = ParameterDirection.Output;

            OracleDataAccess.ExecuteNonQuery(conn, CommandType.StoredProcedure, esquema + ".usp_resetea_clave", oraParam);

            resultado = oraParam[1].Value.ToString();

            return resultado;
        }
        public Models.UserModels CambiarContrasena2(Models.UserModels ObjEnt)
        {
            OracleParameter[] oraParam = new OracleParameter[4];

            oraParam[0] = new OracleParameter("P_NCODIGOUSUARIO", ObjEnt.IdUsuario);
            oraParam[1] = new OracleParameter("P_SCLAVE_ANT", ObjEnt.PasswordAnt);
            oraParam[2] = new OracleParameter("P_SCLAVE_NEW", ObjEnt.Password);
            oraParam[3] = new OracleParameter("P_MENSAJE", OracleDbType.Varchar2, 1000);
            oraParam[3].Direction = ParameterDirection.Output;

            OracleDataAccess.ExecuteNonQuery(conn, CommandType.StoredProcedure, esquema + "." + paqueteUser + ".SP_CAMBIAR_CONTRASENA2", oraParam);

            ObjEnt.mensaje = oraParam[3].Value.ToString();

            return ObjEnt;
        }

        public void EnvioCorreo(string strCuerpo, string strSMTPServer, string strCorreoRemitente, string strContrasenaRemitente, string strAsunto, string strCorreoDestinatario, string strCorreoRespaldo, string strCorreoEmpresa)
        {
            try
            {
                SmtpClient SmtpServer = new SmtpClient(strSMTPServer);
                SmtpServer.UseDefaultCredentials = true;
                MailMessage mail = new MailMessage(strCorreoRemitente, strCorreoDestinatario);
                MailAddress bcc = new MailAddress(strCorreoRespaldo);
                mail.Bcc.Add(bcc);
                if (!strCorreoEmpresa.Trim().ToString().Equals(""))
                {
                    MailAddress cc = new MailAddress(strCorreoEmpresa);
                    mail.CC.Add(cc);
                }
                mail.Subject = strAsunto;
                mail.Priority = MailPriority.High;
                mail.IsBodyHtml = true;
                mail.Body = strCuerpo;
                SmtpServer.Credentials = new System.Net.NetworkCredential(strCorreoRemitente, strContrasenaRemitente);
                try
                {
                    SmtpServer.Send(mail);
                }
                catch (Exception ex)
                {
                    Console.Write(ex.Message);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        /*
        public void EnviarCorreoNotificacionUsuario(string strRuta, string strCorreoDestinatario, string usuario, string contrasena, string strCorreoEmpresa, ref string strCode)
        {
            string str_CorreoRemitente = ConfigurationManager.AppSettings["CorreoNotificacion"].ToString();
            string str_CorreoRespaldo = ConfigurationManager.AppSettings["CorreoSistemas"].ToString();
            string str_SMTPServer = ConfigurationManager.AppSettings["SMTPServer"].ToString();
            string str_Contrasena = ConfigurationManager.AppSettings["ContrasenaNotificacion"].ToString();
            try
            {
                using (StreamReader objLeer = new StreamReader(strRuta))
                {
                    string strCuerpo;
                    // strCuerpo = objLeer.ReadToEnd().Replace("%USUARIO%", usuario).Replace("%CONTRASENA%", contrasena);
                    StringBuilder sbody = new StringBuilder();
                    string code;
                    code = Guid.NewGuid().ToString();
                    // here i am sending a link to the user's mail address with the three values email,code,uname
                    // these three values i am sending  this link with the values using querystring method.
                    string urlGenerarContrasena = ConfigurationManager.AppSettings["urlGenerarContrasena"];
                    sbody.Append("<a href=" + urlGenerarContrasena + strCorreoDestinatario);
                    sbody.Append("&code=" + code + "&usuario=" + usuario + ">Clic aquí para cambiar tu contraseña.</a>");
                    strCuerpo = objLeer.ReadToEnd().Replace("%USUARIO%", usuario).Replace("%ENLACE%", sbody.ToString());
                    strCode = code;

                    EnvioCorreo(strCuerpo, str_SMTPServer, str_CorreoRemitente, str_Contrasena, "Confirmación Cuenta de Usuario", strCorreoDestinatario, str_CorreoRespaldo, strCorreoEmpresa);
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
        }

        public void EnviarCorreoCreacionExpediente(string strRuta, string strCorreoDestinatario, string strRecurrente, string strNroExpediente)
        {
            string str_CorreoRemitente = ConfigurationManager.AppSettings["CorreoNotificacion"].ToString();
            string str_CorreoRespaldo = ConfigurationManager.AppSettings["CorreoSistemas"].ToString();
            string str_SMTPServer = ConfigurationManager.AppSettings["SMTPServer"].ToString();
            string str_Contrasena = ConfigurationManager.AppSettings["ContrasenaNotificacion"].ToString();
            try
            {
                using (StreamReader objLeer = new StreamReader(strRuta))
                {
                    string strCuerpo;
                    StringBuilder sbody = new StringBuilder();
                    strCuerpo = objLeer.ReadToEnd().Replace("%ADMINISTRADO%", strRecurrente).Replace("%EXPEDIENTE%", strNroExpediente);
                    EnvioCorreo(strCuerpo, str_SMTPServer, str_CorreoRemitente, str_Contrasena, "Confirmación Cuenta de Usuario - Formulario de Postulación CAS del Ministerio de Cultura", strCorreoDestinatario, str_CorreoRespaldo, "");
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
        }
        */
    }
}