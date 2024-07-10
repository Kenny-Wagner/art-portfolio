const app = require('./app')
const {sequelize} = require('./models')

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });