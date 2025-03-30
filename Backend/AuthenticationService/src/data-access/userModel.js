// authentication-service/src/data-access/userModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true
});
