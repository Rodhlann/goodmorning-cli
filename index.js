const inquirer = require('inquirer')
const { format } = require('date-fns')
require('dotenv').config()

module.exports = async () => {
  const date = new Date()
  const greeting = `Goodmorning! It's ${format(date, 'EEEE MMMM dd, yyyy')}`
  
  console.info(''.padStart(greeting.length, '-'))
  console.info(greeting)
  console.info('Try your best today ❤️')
  console.info(''.padStart(greeting.length, '-'))
    
  let data = { date }

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

  console.info('Thanks for checking in 🙂 I believe in you!')
  await require('./utils/db').save(data)
}
