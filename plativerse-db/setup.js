'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
// const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()
async function setup () {
  const answer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'Esta seguro de destruir la base de datos'
  })

  if (!answer.setup) {
    return console.log('No pasa nada')
  }
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || '21034276',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('Todo bien por hoy')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
