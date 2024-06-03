module.exports = (sequelize, DataTypes) => {
    const PuntosVerdes = sequelize.define('tb_puntos_verdes', {
      punto_verde_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      encargado: {
        type: DataTypes.STRING(100),
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
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'tb_puntos_verdes',
      timestamps: false
    });
  
    return PuntosVerdes;
  };
  