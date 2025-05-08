// models/reserva.js
module.exports = (sequelize: { define: (arg0: string, arg1: { codigo: { type: any; allowNull: boolean; unique: boolean; }; dataHora: { type: any; allowNull: boolean; }; origem: { type: any; allowNull: boolean; }; destino: { type: any; allowNull: boolean; }; valorGastoReais: { type: any; allowNull: boolean; }; milhasGastas: { type: any; allowNull: boolean; }; estadoReserva: { type: any; allowNull: boolean; }; }) => any; }, DataTypes: { STRING: any; DATE: any; DECIMAL: (arg0: number, arg1: number) => any; INTEGER: any; ENUM: (arg0: string, arg1: string, arg2: string) => any; }) => {
  const Reserva = sequelize.define('Reserva', {
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
  });

  return Reserva;
};
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
});

const Reserva = require('./models/reserva')(sequelize, DataTypes);

sequelize.sync({ force: true }) // ou { alter: true } para manter dados
  .then(() => {
    console.log("Rserva criada!");
  }).catch((err: any) => {
    console.error("Reserva nao encontrada", err);
  });
