/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     3/6/2024 13:40:50                            */
/*==============================================================*/


drop table admin;

drop table canjea_oferta;

drop table ciudadano;

drop table credenciales;

drop table greencoin_cdn;

drop table historial_reciclaje_ciudadano;

drop table historial_reciclaje_negocio;

drop table materiales;

drop table negocio;

drop table ofertas;

drop table puntos_verdes;

drop table reciclaje;

drop table registra_reciclaje;

/*==============================================================*/
/* Table: admin                                                 */
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
   constraint PK_ADMIN primary key (admin_id)
);

/*==============================================================*/
/* Table: canjea_oferta                                         */
/*==============================================================*/
create table tb_canjea_oferta (
   canjeo_id            SERIAL               not null,
   ofertas_id           INT4                 null,
   ciudadano_id         INT4                 null,
   fecha                DATE                 null,
   constraint PK_CANJEA_OFERTA primary key (canjeo_id)
);

/*==============================================================*/
/* Table: ciudadano                                             */
/*==============================================================*/
create table tb_ciudadano (
   ciudadano_id         SERIAL               not null,
   greencoin_id         INT4                 null,
   nombre               VARCHAR(100)         not null,
   apellido             VARCHAR(100)         not null,
   telefono             CHAR(10)             not null,
   fecha_nac            DATE                 not null,
   fecharegistro        DATE                 not null,
   constraint PK_CIUDADANO primary key (ciudadano_id)
);

/*==============================================================*/
/* Table: credenciales                                          */
/*==============================================================*/
create table tb_credenciales (
   credencial_id        SERIAL               not null,
   correo_electronico   VARCHAR(100)         not null,
   contrasena           VARCHAR(100)         not null,
   tipousuario          INT4                 not null,
   usuario_id           INT4                 not null,
   constraint PK_CREDENCIALES primary key (credencial_id)
);

/*==============================================================*/
/* Table: greencoin_cdn                                         */
/*==============================================================*/
create table tb_greencoin_cdn (
   greencoin_id         SERIAL               not null,
   registro_id          INT4                 null,
   canjeo_id            INT4                 null,
   total                INT4                 null,
   constraint PK_GREENCOIN_CDN primary key (greencoin_id)
);

/*==============================================================*/
/* Table: historial_reciclaje_ciudadano                         */
/*==============================================================*/
create table tb_hist_reciclaje_cdn (
   historial_id         SERIAL               not null,
   ciudadano_id         INT4                 null,
   punto_verde_id       INT4                 not null,
   reciclaje_id         INT4                 not null,
   cantidad             FLOAT8               not null,
   fecha                DATE                 not null,
   green_coins_obtenidos INT4                 not null,
   constraint PK_HISTORIAL_RECICLAJE_CIUDADA primary key (historial_id)
);

/*==============================================================*/
/* Table: historial_reciclaje_negocio                           */
/*==============================================================*/
create table tb_hist_reciclaje_ngc (
   historial_id         SERIAL               not null,
   negocio_id           INT4                 not null,
   punto_verde_id       INT4                 not null,
   reciclaje_id         INT4                 not null,
   cantidad             FLOAT8               not null,
   fecha                DATE                 not null,
   constraint PK_HISTORIAL_RECICLAJE_NEGOCIO primary key (historial_id)
);

/*==============================================================*/
/* Table: materiales                                            */
/*==============================================================*/
create table tb_materiales (
   materiales_id        SERIAL               not null,
   tipo                 VARCHAR(100)         not null,
   valor_por_libra      INT4                 not null,
   constraint PK_MATERIALES primary key (materiales_id)
);

/*==============================================================*/
/* Table: negocio                                               */
/*==============================================================*/
create table tb_negocio (
   negocio_id           SERIAL               not null,
   nombre               VARCHAR(100)         not null,
   propietario          VARCHAR(100)         not null,
   tipo_negocio         INT4                 not null,
   direccion            VARCHAR(200)         not null,
   telefono             CHAR(10)             not null,
   fecharegistro        DATE                 not null,
   constraint PK_NEGOCIO primary key (negocio_id)
);

/*==============================================================*/
/* Table: ofertas                                               */
/*==============================================================*/
create table tb_ofertas (
   ofertas_id           SERIAL               not null,
   descripcion          VARCHAR(200)         not null,
   gc_necesarios        INT4                 not null,
   negocio_id           INT4                 not null,
   fecha_inicio         DATE                 not null,
   fecha_fin            DATE                 not null,
   constraint PK_OFERTAS primary key (ofertas_id)
);

/*==============================================================*/
/* Table: puntos_verdes                                         */
/*==============================================================*/
create table tb_puntos_verdes (
   punto_verde_id       SERIAL               not null,
   direccion            VARCHAR(200)         not null,
   descripcion          VARCHAR(200)         not null,
   latitud              FLOAT8               not null,
   longitud             FLOAT8               not null,
   negocio_id           INT4                 not null,
   constraint PK_PUNTOS_VERDES primary key (punto_verde_id)
);

/*==============================================================*/
/* Table: reciclaje                                             */
/*==============================================================*/
create table tb_reciclaje (
   reciclaje_id         SERIAL               not null,
   material_id          INT4                 not null,
   cantidad             FLOAT8               not null,
   constraint PK_RECICLAJE primary key (reciclaje_id)
);

/*==============================================================*/
/* Table: registra_reciclaje                                    */
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
   constraint PK_REGISTRA_RECICLAJE primary key (registro_id)
);

alter table tb_admin
   add constraint FK_ADMIN_REFERENCE_CREDENCI foreign key (credencial_id)
      references credenciales (credencial_id)
      on delete restrict on update restrict;

alter table tb_admin
   add constraint FK_ADMIN_REFERENCE_OFERTAS foreign key (ofertas_id)
      references ofertas (ofertas_id)
      on delete restrict on update restrict;

alter table admin
   add constraint FK_ADMIN_REFERENCE_PUNTOS_V foreign key (punto_verde_id)
      references puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table admin
   add constraint FK_ADMIN_REFERENCE_NEGOCIO foreign key (negocio_id)
      references negocio (negocio_id)
      on delete restrict on update restrict;

alter table canjea_oferta
   add constraint FK_CANJEA_O_REFERENCE_OFERTAS foreign key (ofertas_id)
      references ofertas (ofertas_id)
      on delete restrict on update restrict;

alter table canjea_oferta
   add constraint FK_CANJEA_O_REFERENCE_CIUDADAN foreign key (ciudadano_id)
      references ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table ciudadano
   add constraint FK_CIUDADAN_REFERENCE_GREENCOI foreign key (greencoin_id)
      references greencoin_cdn (greencoin_id)
      on delete restrict on update restrict;

alter table credenciales
   add constraint FK_CREDENCI_REFERENCE_CIUDADAN foreign key (usuario_id)
      references ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table credenciales
   add constraint FK_CREDENCI_REFERENCE_NEGOCIO foreign key (usuario_id)
      references negocio (negocio_id)
      on delete restrict on update restrict;

alter table greencoin_cdn
   add constraint FK_GREENCOI_REFERENCE_REGISTRA foreign key (registro_id)
      references registra_reciclaje (registro_id)
      on delete restrict on update restrict;

alter table greencoin_cdn
   add constraint FK_GREENCOI_REFERENCE_CANJEA_O foreign key (canjeo_id)
      references canjea_oferta (canjeo_id)
      on delete restrict on update restrict;

alter table historial_reciclaje_ciudadano
   add constraint FK_HISTORIA_REFERENCE_CIUDADAN foreign key (ciudadano_id)
      references ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table historial_reciclaje_ciudadano
   add constraint FK_HISTORIA_REFERENCE_PUNTOS_V foreign key (punto_verde_id)
      references puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table historial_reciclaje_ciudadano
   add constraint FK_HISTORIA_REFERENCE_RECICLAJ foreign key (reciclaje_id)
      references reciclaje (reciclaje_id)
      on delete restrict on update restrict;

alter table historial_reciclaje_negocio
   add constraint FK_HISTORIA_REFERENCE_PUNTOS_V foreign key (punto_verde_id)
      references puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table historial_reciclaje_negocio
   add constraint FK_HISTORIA_REFERENCE_RECICLAJ foreign key (reciclaje_id)
      references reciclaje (reciclaje_id)
      on delete restrict on update restrict;

alter table historial_reciclaje_negocio
   add constraint FK_HISTORIA_REFERENCE_NEGOCIO foreign key (negocio_id)
      references negocio (negocio_id)
      on delete restrict on update restrict;

alter table ofertas
   add constraint FK_OFERTAS_REFERENCE_NEGOCIO foreign key (negocio_id)
      references negocio (negocio_id)
      on delete restrict on update restrict;

alter table puntos_verdes
   add constraint FK_PUNTOS_V_REFERENCE_NEGOCIO foreign key (negocio_id)
      references negocio (negocio_id)
      on delete restrict on update restrict;

alter table reciclaje
   add constraint FK_RECICLAJ_REFERENCE_MATERIAL foreign key (material_id)
      references materiales (materiales_id)
      on delete restrict on update restrict;

alter table registra_reciclaje
   add constraint FK_REGISTRA_REFERENCE_NEGOCIO foreign key (negocio_id)
      references negocio (negocio_id)
      on delete restrict on update restrict;

alter table registra_reciclaje
   add constraint FK_REGISTRA_REFERENCE_CIUDADAN foreign key (ciudadano_id)
      references ciudadano (ciudadano_id)
      on delete restrict on update restrict;

alter table registra_reciclaje
   add constraint FK_REGISTRA_REFERENCE_PUNTOS_V foreign key (punto_verde_id)
      references puntos_verdes (punto_verde_id)
      on delete restrict on update restrict;

alter table registra_reciclaje
   add constraint FK_REGISTRA_REFERENCE_RECICLAJ foreign key (reciclaje_id)
      references reciclaje (reciclaje_id)
      on delete restrict on update restrict;

