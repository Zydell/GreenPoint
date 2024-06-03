/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     3/6/2024 13:49:06                            */
/*==============================================================*/


drop table tb_admin;

drop table tb_canjea_oferta;

drop table tb_ciudadano;

drop table tb_credenciales;

drop table tb_greencoin_cdn;

drop table tb_historial_cdn;

drop table tb_historial_negocio;

drop table tb_materiales;

drop table tb_negocio;

drop table tb_ofertas;

drop table tb_puntos_verdes;

drop table tb_reciclaje;

drop table tb_registra_reciclaje;

/*==============================================================*/
/* Table: tb_admin                                              */
/*==============================================================*/
create table tb_admin (
   admin_id             SERIAL               not null,
   credencial_id        INT4                 null,
   ofertas_id           INT4                 null,
   punto_verde_id       INT4                 null,
   negocio_id           INT4                 null,
   nombre               VARCHAR(25)          null,
   correo               VARCHAR(50)          null,
   password             VARCHAR(25)          null,
   constraint PK_TB_ADMIN primary key (admin_id)
);

/*==============================================================*/
/* Table: tb_canjea_oferta                                      */
/*==============================================================*/
create table tb_canjea_oferta (
   canjeo_id            SERIAL               not null,
   ofertas_id           INT4                 null,
   ciudadano_id         INT4                 null,
   fecha                DATE                 null,
   constraint PK_TB_CANJEA_OFERTA primary key (canjeo_id)
);

/*==============================================================*/
/* Table: tb_ciudadano                                          */
/*==============================================================*/
create table tb_ciudadano (
   ciudadano_id         SERIAL               not null,
   greencoin_id         INT4                 null,
   nombre               VARCHAR(100)         not null,
   apellido             VARCHAR(100)         not null,
   telefono             CHAR(10)             not null,
   fecha_nac            DATE                 not null,
   fecharegistro        DATE                 not null,
   constraint PK_TB_CIUDADANO primary key (ciudadano_id)
);

/*==============================================================*/
/* Table: tb_credenciales                                       */
/*==============================================================*/
create table tb_credenciales (
   credencial_id        SERIAL               not null,
   correo_electronico   VARCHAR(100)         not null,
   contrasena           VARCHAR(100)         not null,
   tipousuario          INT4                 not null,
   usuario_id           INT4                 not null,
   constraint PK_TB_CREDENCIALES primary key (credencial_id)
);

/*==============================================================*/
/* Table: tb_greencoin_cdn                                      */
/*==============================================================*/
create table tb_greencoin_cdn (
   greencoin_id         SERIAL               not null,
   registro_id          INT4                 null,
   canjeo_id            INT4                 null,
   total                INT4                 null,
   constraint PK_TB_GREENCOIN_CDN primary key (greencoin_id)
);

/*==============================================================*/
/* Table: tb_historial_cdn                                      */
/*==============================================================*/
create table tb_historial_cdn (
   historial_id         SERIAL               not null,
   ciudadano_id         INT4                 null,
   punto_verde_id       INT4                 not null,
   reciclaje_id         INT4                 not null,
   cantidad             FLOAT8               not null,
   fecha                DATE                 not null,
   green_coins_obtenidos INT4                 not null,
   constraint PK_TB_HISTORIAL_CDN primary key (historial_id)
);

/*==============================================================*/
/* Table: tb_historial_negocio                                  */
/*==============================================================*/
create table tb_historial_negocio (
   historial_id         SERIAL               not null,
   negocio_id           INT4                 not null,
   punto_verde_id       INT4                 not null,
   reciclaje_id         INT4                 not null,
   cantidad             FLOAT8               not null,
   fecha                DATE                 not null,
   constraint PK_TB_HISTORIAL_NEGOCIO primary key (historial_id)
);

/*==============================================================*/
/* Table: tb_materiales                                         */
/*==============================================================*/
create table tb_materiales (
   materiales_id        SERIAL               not null,
   tipo                 VARCHAR(100)         not null,
   valor_por_libra      INT4                 not null,
   constraint PK_TB_MATERIALES primary key (materiales_id)
);

/*==============================================================*/
/* Table: tb_negocio                                            */
/*==============================================================*/
create table tb_negocio (
   negocio_id           SERIAL               not null,
   nombre               VARCHAR(100)         not null,
   propietario          VARCHAR(100)         not null,
   tipo_negocio         INT4                 not null,
   direccion            VARCHAR(200)         not null,
   telefono             CHAR(10)             not null,
   fecharegistro        DATE                 not null,
   constraint PK_TB_NEGOCIO primary key (negocio_id)
);

/*==============================================================*/
/* Table: tb_ofertas                                            */
/*==============================================================*/
create table tb_ofertas (
   ofertas_id           SERIAL               not null,
   descripcion          VARCHAR(200)         not null,
   gc_necesarios        INT4                 not null,
   negocio_id           INT4                 not null,
   fecha_inicio         DATE                 not null,
   fecha_fin            DATE                 not null,
   constraint PK_TB_OFERTAS primary key (ofertas_id)
);

/*==============================================================*/
/* Table: tb_puntos_verdes                                      */
/*==============================================================*/
create table tb_puntos_verdes (
   punto_verde_id       SERIAL               not null,
   direccion            VARCHAR(200)         not null,
   descripcion          VARCHAR(200)         not null,
   latitud              FLOAT8               not null,
   longitud             FLOAT8               not null,
   negocio_id           INT4                 not null,
   constraint PK_TB_PUNTOS_VERDES primary key (punto_verde_id)
);

/*==============================================================*/
/* Table: tb_reciclaje                                          */
/*==============================================================*/
create table tb_reciclaje (
   reciclaje_id         SERIAL               not null,
   material_id          INT4                 not null,
   cantidad             FLOAT8               not null,
   constraint PK_TB_RECICLAJE primary key (reciclaje_id)
);

/*==============================================================*/
/* Table: tb_registra_reciclaje                                 */
/*==============================================================*/
create table tb_registra_reciclaje (
   registro_id          SERIAL               not null,
   negocio_id           INT4                 not null,
   ciudadano_id         INT4                 not null,
   punto_verde_id       INT4                 not null,
   reciclaje_id         INT4                 not null,
   cantidad             FLOAT8               not null,
   fecha                DATE                 not null,
   gc_obtenidos         INT4                 not null,
   constraint PK_TB_REGISTRA_RECICLAJE primary key (registro_id)
);

alter table tb_admin
   add constraint FK_TB_ADMIN_REFERENCE_TB_CREDE foreign key (credencial_id)
      references tb_credenciales (credencial_id)
      on delete restrict on update restrict;

alter table tb_admin
   add constraint FK_TB_ADMIN_REFERENCE_TB_OFERT foreign key (ofertas_id)
      references tb_ofertas (ofertas_id)
      on delete restrict on update restrict;

alter table tb_admin
   add constraint FK_TB_ADMIN_REFERENCE_TB_PUNTO foreign key (punto_verde_id)
      references tb_puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table tb_admin
   add constraint FK_TB_ADMIN_REFERENCE_TB_NEGOC foreign key (negocio_id)
      references tb_negocio (negocio_id)
      on delete restrict on update restrict;

alter table tb_canjea_oferta
   add constraint FK_TB_CANJE_REFERENCE_TB_OFERT foreign key (ofertas_id)
      references tb_ofertas (ofertas_id)
      on delete restrict on update restrict;

alter table tb_canjea_oferta
   add constraint FK_TB_CANJE_REFERENCE_TB_CIUDA foreign key (ciudadano_id)
      references tb_ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table tb_ciudadano
   add constraint FK_TB_CIUDA_REFERENCE_TB_GREEN foreign key (greencoin_id)
      references tb_greencoin_cdn (greencoin_id)
      on delete restrict on update restrict;

alter table tb_credenciales
   add constraint FK_TB_CREDE_REFERENCE_TB_CIUDA foreign key (usuario_id)
      references tb_ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table tb_credenciales
   add constraint FK_TB_CREDE_REFERENCE_TB_NEGOC foreign key (usuario_id)
      references tb_negocio (negocio_id)
      on delete restrict on update restrict;

alter table tb_greencoin_cdn
   add constraint FK_TB_GREEN_REFERENCE_TB_REGIS foreign key (registro_id)
      references tb_registra_reciclaje (registro_id)
      on delete restrict on update restrict;

alter table tb_greencoin_cdn
   add constraint FK_TB_GREEN_REFERENCE_TB_CANJE foreign key (canjeo_id)
      references tb_canjea_oferta (canjeo_id)
      on delete restrict on update restrict;

alter table tb_historial_cdn
   add constraint FK_TB_HISTO_REFERENCE_TB_CIUDA foreign key (ciudadano_id)
      references tb_ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table tb_historial_cdn
   add constraint FK_TB_HISTO_REFERENCE_TB_PUNTO foreign key (punto_verde_id)
      references tb_puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table tb_historial_cdn
   add constraint FK_TB_HISTO_REFERENCE_TB_RECIC foreign key (reciclaje_id)
      references tb_reciclaje (reciclaje_id)
      on delete restrict on update restrict;

alter table tb_historial_negocio
   add constraint FK_TB_HISTO_REFERENCE_TB_PUNTO foreign key (punto_verde_id)
      references tb_puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table tb_historial_negocio
   add constraint FK_TB_HISTO_REFERENCE_TB_RECIC foreign key (reciclaje_id)
      references tb_reciclaje (reciclaje_id)
      on delete restrict on update restrict;

alter table tb_historial_negocio
   add constraint FK_TB_HISTO_REFERENCE_TB_NEGOC foreign key (negocio_id)
      references tb_negocio (negocio_id)
      on delete restrict on update restrict;

alter table tb_ofertas
   add constraint FK_TB_OFERT_REFERENCE_TB_NEGOC foreign key (negocio_id)
      references tb_negocio (negocio_id)
      on delete restrict on update restrict;

alter table tb_puntos_verdes
   add constraint FK_TB_PUNTO_REFERENCE_TB_NEGOC foreign key (negocio_id)
      references tb_negocio (negocio_id)
      on delete restrict on update restrict;

alter table tb_reciclaje
   add constraint FK_TB_RECIC_REFERENCE_TB_MATER foreign key (material_id)
      references tb_materiales (materiales_id)
      on delete restrict on update restrict;

alter table tb_registra_reciclaje
   add constraint FK_TB_REGIS_REFERENCE_TB_NEGOC foreign key (negocio_id)
      references tb_negocio (negocio_id)
      on delete restrict on update restrict;

alter table tb_registra_reciclaje
   add constraint FK_TB_REGIS_REFERENCE_TB_CIUDA foreign key (ciudadano_id)
      references tb_ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table tb_registra_reciclaje
   add constraint FK_TB_REGIS_REFERENCE_TB_PUNTO foreign key (punto_verde_id)
      references tb_puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table tb_registra_reciclaje
   add constraint FK_TB_REGIS_REFERENCE_TB_RECIC foreign key (reciclaje_id)
      references tb_reciclaje (reciclaje_id)
      on delete restrict on update restrict;

