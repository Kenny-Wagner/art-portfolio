const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const {Umzug, SequelizeStorage} = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres'
})

const migrationConfig = {
  migrations: {
    glob: 'migrations/*.js'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations'} ),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async() => {
    const seeder = new Umzug(migrationConfig)
    const migrations = await seeder.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig)=> mig.name),
    })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const runSeeders = async() => {
  const seeder = new Umzug({
      migrations: {
          glob: 'seeders/*.js'
      },
      storage: new SequelizeStorage({ sequelize, tableName: 'seeders'}),
      context: sequelize.getQueryInterface(),
      logger:console,
  })

  const seeders = await seeder.up()
  console.log('Seeders up to date', {
      files: seeders.map((seed)=> seed.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    await runSeeders()
    console.log('connected to the database')
  } catch (err) {
    console.log(`failed to connect to the database, ERROR: ${err}`)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }