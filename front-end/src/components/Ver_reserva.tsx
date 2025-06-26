module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reserva', {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valorGastoReais: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    milhasGastas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estadoReserva: {
      type: DataTypes.ENUM('pendente', 'confirmada', 'cancelada'),
      allowNull: false,
    },
     {
    tableName: 'reservas',
    timestamps: true,
    underscored: true,
    
  });
  
};
const { Sequelize, DataTypes } = require('sequelize');
const ReservaModel = require('../models/reserva');

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Reserva = ReservaModel(sequelize, DataTypes);


 


