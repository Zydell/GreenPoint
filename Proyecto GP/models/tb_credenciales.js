module.exports = (sequelize, DataTypes) => {
    const Credenciales = sequelize.define('tb_credenciales', {
      credencial_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      correo_electronico: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipousuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      usuario_id: DataTypes.INTEGER,
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fechacreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'tb_credenciales',
      timestamps: false
    });
  
    Credenciales.associate = function(models) {
      Credenciales.belongsTo(models.tb_ciudadano, { foreignKey: 'usuario_id' });
      Credenciales.belongsTo(models.tb_negocio, { foreignKey: 'usuario_id' });
    };
  
    return Credenciales;
  };
  