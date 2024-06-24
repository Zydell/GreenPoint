module.exports = (sequelize, DataTypes) => {
    const HistorialNegocio = sequelize.define('tb_historial_negocio', {
      historial_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      negocio_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      punto_verde_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reciclaje_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'tb_historial_negocio',
      timestamps: false
    });
  
    HistorialNegocio.associate = function(models) {
      HistorialNegocio.belongsTo(models.tb_puntos_verdes, { foreignKey: 'punto_verde_id' });
      HistorialNegocio.belongsTo(models.tb_reciclaje, { foreignKey: 'reciclaje_id' });
      HistorialNegocio.belongsTo(models.tb_negocio, { foreignKey: 'negocio_id' });
    };
  
    return HistorialNegocio;
  };
  