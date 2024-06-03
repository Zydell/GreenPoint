module.exports = (sequelize, DataTypes) => {
    const Negocio = sequelize.define('tb_negocio', {
      negocio_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      propietario: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipo_negocio: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      telefono: {
        type: DataTypes.CHAR(10),
        allowNull: false
      },
      fecharegistro: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: 'tb_negocio',
      timestamps: false
    });
  
    return Negocio;
  };
  