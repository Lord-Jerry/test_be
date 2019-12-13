module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM(['todo', 'done']),
      allowNull: false,
      defaultValue: 'todo',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
  });
  // eslint-disable-next-line no-unused-vars
  tasks.associate = function models(model) {
    tasks.belongsTo(model.users, { foreignKey: 'userId' });
  };
  return tasks;
};
