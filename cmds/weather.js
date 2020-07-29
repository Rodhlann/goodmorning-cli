const axios = require('axios')
const ora = require('ora')

module.exports = async () => {
  const spinner = ora().start()
  try {
    const { data: ip } = await axios({
      method: 'get',
      url: 'https://ipinfo.io/ip',
    })

    const { data: { data: { city_name: city, subdivision_1_name: state } } } = await axios({
      method: 'get',
      url: `https://ipvigilante.com/${ip}`,
    }) 
  
    const { data: { current: { temperature, feelslike, humidity, precip } } }  = await axios({
      method: 'get',
      url: 'http://api.weatherstack.com/forecast',
      params: {
        access_key: process.env.WEATHER_STACK_ACCESS,
        units: 'f',
        query: `${city} ${state}`,
      },
    })

    spinner.stop()
    
    console.info(`It's ${temperature}º today in ${city}, ${state}`)
    console.info(feelslike === temperature ? 'And it feels like it too!' : `But it feels like ${feelslike}º`)
    console.info(`With humidity around ${humidity}%`)
    console.info(precip ? 'And a bit of rain' : 'But it\'s nice and dry!')

    return { location: { city, state }, weather: { temperature, feelslike, humidity, precip } }
  } catch (e) {
    spinner.stop()
    console.error(e)
    process.exit(1)
  }
}
