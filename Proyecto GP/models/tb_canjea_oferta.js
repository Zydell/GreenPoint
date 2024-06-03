module.exports = (sequelize, DataTypes) => {
    const CanjeaOferta = sequelize.define('tb_canjea_oferta', {
      canjeo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ofertas_id: DataTypes.INTEGER,
      ciudadano_id: DataTypes.INTEGER,
      fecha: DataTypes.DATE
    }, {
      tableName: 'tb_canjea_oferta',
      timestamps: false
    });
  
    CanjeaOferta.associate = function(models) {
      CanjeaOferta.belongsTo(models.tb_ofertas, { foreignKey: 'ofertas_id' });
      CanjeaOferta.belongsTo(models.tb_ciudadano, { foreignKey: 'ciudadano_id' });
    };
  
    return CanjeaOferta;
  };
  