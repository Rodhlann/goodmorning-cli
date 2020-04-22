const inquirer = require('inquirer')

const displayTodos = (todos) => {
  return todos.forEach(todo => console.info(`  ◯  ${todo.trim()}`))
}

module.exports = async () => {
  console.info('Okay! Let me grab those for you')
  let todos = await require('../utils/db').getTodos()
  
  const o = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'old',
        message: 'Do you want to try and check off some of your current todos?',
      },
    ])

  if (o.old) {
    if (todos.length) {
      const c = await inquirer
        .prompt([
          {
            type: 'checkbox',
            name: 'todos',
            message: 'Here\'s what\'s on your plate:',
            choices: todos,
          },
        ])

      if (c.todos.length) {
        todos = todos.filter(todo => !c.todos.includes(todo))
      }

      console.info(todos.length ? 'Your updated todos list:' : 'Looks like you\'re all caught up!')
      displayTodos(todos)
    } else {
      console.info('Looks like there\'s nothing here!')
    }
  }

  const n = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'new',
        message: 'Do want to add any new todos?',
      },
    ])

  if (n.new) {
    const t = await inquirer
      .prompt([
        {
          type: 'editor',
          name: 'todos',
          message: 'Let\'s hear them!',
        },
      ])

    if (t.todos) {
      todos = todos.concat(t.todos.split('\n').map(todo => todo.trim()).filter(Boolean))
    }

    console.info(todos.length ? 'Your finalized todos list:' : 'Huh, guess not!')
    displayTodos(todos)
  }

  return todos
}
