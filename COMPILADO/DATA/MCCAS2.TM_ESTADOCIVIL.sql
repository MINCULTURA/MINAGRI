﻿SET DEFINE OFF;
Insert into TM_ESTADOCIVIL
   (NIDESTADOCIVIL, SDESCRIPCION, BACTIVO, NIDUSUCREACION, DFECHACREACION)
 Values
   (1, 'SOLTERO', 1, 18954265, TO_DATE('01/17/2017 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into TM_ESTADOCIVIL
   (NIDESTADOCIVIL, SDESCRIPCION, BACTIVO, NIDUSUCREACION, DFECHACREACION)
 Values
   (2, 'CASADO', 1, 18954265, TO_DATE('01/17/2017 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into TM_ESTADOCIVIL
   (NIDESTADOCIVIL, SDESCRIPCION, BACTIVO, NIDUSUCREACION, DFECHACREACION)
 Values
   (3, 'VIUDO', 1, 18954265, TO_DATE('01/17/2017 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into TM_ESTADOCIVIL
   (NIDESTADOCIVIL, SDESCRIPCION, BACTIVO, NIDUSUCREACION, DFECHACREACION)
 Values
   (4, 'DIVORCIADO', 1, 18954265, TO_DATE('01/17/2017 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
COMMIT;