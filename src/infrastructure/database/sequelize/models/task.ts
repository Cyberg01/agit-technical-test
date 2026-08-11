import { DataTypes } from 'sequelize';
import sequelize from '../Sequelize';
import User from './user';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    field: 'title',
  },
  city: {
    type: DataTypes.STRING,
    field: 'city',
  },
  weatherInfo: {
    type: DataTypes.JSON,
    field: 'weather_info',
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_done',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updated_at',
  },
}, {
  tableName: 'task',
  timestamps: true,
  indexes: [
    {
      fields: ['id', 'user_id', 'title', 'is_done'],
    },
  ],
});

export default Task;
