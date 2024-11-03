const app = require('./app')
const { PORT } = require('./config/config')
const { connectToDatabase } = require('./services/dbService')


  const start = async () => {
    await connectToDatabase(); 

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

  start();