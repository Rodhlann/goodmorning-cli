process.chdir(__dirname)
require('dotenv').config()
const inquirer = require('inquirer')
const argv = require('minimist')(process.argv.slice(2))
const { format } = require('date-fns')

module.exports = async () => {
  const args = require('./utils/handleArgs')(argv)
  const showAll = Object.keys(args).length === 0
  const { weather, mood, journal, todos, save } = args
  const date = new Date()
  const greeting = `Goodmorning! It's ${format(date, 'EEEE MMMM dd, yyyy')}`
  
  console.info(''.padStart(greeting.length, '-'))
  console.info(greeting)
  console.info('Try your best today ❤️')
  console.info(''.padStart(greeting.length, '-'))
 
  let data = { date }

  if (showAll) {
    const w = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'weather',
          message: 'Do you want to know the weather?',
        },
      ])

    if (w.weather) {
      data = { ...data, ...(await require('./cmds/weather')()) }
    }

    const m = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'mood',
          message: 'Do you want to share your mood?',
        },
      ])

    if (m.mood) {
      data.mood = await require('./cmds/mood')()
    }

    const j = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'journal',
          message: 'Do you want to share any thoughts today?',
        },
      ])

    if (j.journal) {
      data.journal = await require('./cmds/journal')()
    }

    const t = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'todos',
          message: 'Do you want to work on your todos?',
        },
      ])

    if (t.todos) {
      data.todos = await require('./cmds/todos')()
    }
  }

  if (weather) {
    data = { ...data, ...(await require('./cmds/weather')()) }
  }

  if (mood) {
    data.mood = await require('./cmds/mood')()
  }

  if (journal) {
    data.journal = await require('./cmds/journal')()
  }

  if (todos) {
    data.todos = await require('./cmds/todos')()
  }

  if (showAll || save) {
    await require('./utils/db').save(data)
  }
}
