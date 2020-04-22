const inquirer = require('inquirer')

module.exports = async () => {

  const choices = ['Not great', 'Meh', 'Pretty good!', 'Great!!']
  const a = await inquirer.prompt([
    {
      type: 'list',
      name: 'mood',
      message: 'How are you feeling today?',
      choices,
    },
  ])

  switch(a.mood) {
  case choices[0]:     
  case choices[1]: 
    console.info('You got this! Take a walk if you need to 🙂')
    break
  case choices[2]:
    console.info('Glad to hear it! You\'re gonna do great today!')
    break
  case choices[3]:
    console.info('Fantastic! Do something fun today to celebrate!')
    break
  default:
    break
  }
  
  return a.mood
}

