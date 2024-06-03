module.exports = (sequelize, DataTypes) => {
    const HistorialCdn = sequelize.define('tb_historial_cdn', {
      historial_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ciudadano_id: DataTypes.INTEGER,
      punto_verde_id: DataTypes.INTEGER,
      reciclaje_id: DataTypes.INTEGER,
      cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      green_coins_obtenidos: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'tb_historial_cdn',
      timestamps: false
    });
  
    HistorialCdn.associate = function(models) {
      HistorialCdn.belongsTo(models.tb_ciudadano, { foreignKey: 'ciudadano_id' });
      HistorialCdn.belongsTo(models.tb_puntos_verdes, { foreignKey: 'punto_verde_id' });
      HistorialCdn.belongsTo(models.tb_reciclaje, { foreignKey: 'reciclaje_id' });
    };
  
    return HistorialCdn;
  };
  