module.exports = (sequelize, DataTypes) => {
    const Reciclaje = sequelize.define('tb_reciclaje', {
      reciclaje_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    }, {
      tableName: 'tb_reciclaje',
      timestamps: false
    });
  
    return Reciclaje;
  };
  