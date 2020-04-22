const inquirer = require('inquirer')

module.exports = async () => {
  const a = await inquirer
    .prompt([
      {
        type: 'editor',
        name: 'journal',
        message: 'What\'s on your mind?',
      },
    ])

  return a.journal
}
