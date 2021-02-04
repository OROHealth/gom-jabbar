INSERT INTO adm_pay (pay_ide,pay_nom_eng,pay_nom_fra,pay_abr) VALUES (1,'France','France','FRA');
INSERT INTO adm_reg (reg_ide,reg_nom,reg_abr,pay_id) VALUES (1,'Region 1','RG1',1);
INSERT INTO adm_sit (sit_ide,sit_typ,sit_nom_eng,sit_nom_fra,sit_abr,sit_abr_num,reg_id) VALUES (1,'International','Mereva','Mereva','ME','001',1);
INSERT INTO auth_user (id,password,is_superuser,username,first_name,last_name,email,is_staff,is_active,date_joined) VALUES (1,'pbkdf2_sha256$150000$qe1v2XJKkik8$jF6iFZ+4GpK1JzBdHzRG0H3XsYY+YphYpxc9Cbgg+7Y=',True,'admin','','','jerome.le-carrou@u-bordeaux.fr',True,True, '2020-11-20');
INSERT INTO adm_pro (pro_ide,site_id,user_id,pro_fon,pro_tel,pro_con,pro_lis_ran) VALUES (1,1,1,'Application administrator','+33',1,1);	
UPDATE django_site SET domain='localhost:8000', name='localhost' WHERE id=1;