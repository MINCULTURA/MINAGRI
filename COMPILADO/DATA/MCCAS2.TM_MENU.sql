SET DEFINE OFF;
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (7, 'MANTENIMIENTOS', 'clip-list-2', '../Gestion/TablaGeneral', 4, 
    '2', '1', 4, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (4, 'GESTIÓN', 'clip-enter', 'javascript:void(0)', 4, 
    '2', '1', 1, 'despleg');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (5, 'COMITÉ', 'clip-list-2', '../Gestion/Comite', 4, 
    '2', '1', 2, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (6, 'EVALUACIÓN', 'clip-list-2', '../Gestion/Evaluacion', 4, 
    '2', '1', 3, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (9, 'CONSULTA GENERAL', 'clip-list-2', '../Gestion/ConsultaGeneral', 4, 
    '2', '1', 6, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (11, 'VOLUNTARIADO', 'clip-list-2', '../Gestion/Voluntariado', 4, 
    '2', '1', 10, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (12, 'LISTADO VOL.', 'clip-list-2', '../Gestion/ListadoVol', 4, 
    '2', '1', 11, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (1, 'POSTULACIÓN', 'clip-enter', 'javascript:void(0)', 1, 
    '1', '1', 1, 'despleg');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (2, 'FICHA', 'clip-list-2', '../Postulacion/Ficha', 1, 
    '1', '1', 3, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (3, 'DATOS PERS.', 'clip-list-2 ', '../Postulacion/DatosGen', 1, 
    '1', '1', 2, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (8, 'RESULTADOS', 'clip-list-2', '../Gestion/Resultados', 4, 
    '2', '1', 5, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (10, 'GANADORES', 'clip-list-2', '../Gestion/Ganadores', 4, 
    '2', '1', 5, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (14, 'VOLUNTARIADO', 'clip-list-2', '../Postulacion/Voluntariado', 1, 
    '1', '1', 14, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (13, 'RESULTADOS VOL.', 'clip-list-2', '../Gestion/ResultadosVol', 4, 
    '2', '1', 12, 'sub-menu');
Insert into TM_MENU
   (NCODIGOMENU, SDESCRIPCION, SICONCLASS, SURL, NCODIGOPADRE, 
    SMODULO, SESTADO, NORDEN, LISCLASS)
 Values
   (15, 'ASISTENCIA VOL.', 'clip-list-2', '../Gestion/Asistencia', 4, 
    '2', '1', 15, 'sub-menu');
COMMIT;
