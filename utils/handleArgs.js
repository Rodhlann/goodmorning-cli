module.exports = (argv) => {
  const data = {}
  
  if (argv['h'] || argv['help']) {
    require('./help.js')()
    process.exit()
  } else if (argv['v'] || argv['version']) {
    console.info('v' + require('../package.json')['version'])
    process.exit()
  } 
  
  if (argv['w'] || argv['weather']) {
    data.weather = true
  } 
  if (argv['m'] || argv['mood']) {
    data.mood = true
  } 
  if (argv['j'] || argv['journal']) {
    data.journal = true
  } 
  if (argv['t'] || argv['todos']) {
    data.todos = true
  }
  if (argv['s'] || argv['save']) {
    data.save = true
  }

  return data
}
