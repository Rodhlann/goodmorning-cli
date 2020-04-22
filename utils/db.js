const admin = require('firebase-admin')
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const collection = process.env.DATABASE_COLLECTION
const ora = require('ora')
const { uuid } = require('uuidv4')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
})

const save = async ({ todos, weather, mood, journal, ...rest }) => {
  const spinner = ora().start()
  const hasData = weather || mood || journal
  const data = { weather, mood, journal, ...rest }
  Object.keys(data).forEach(e => !data[e] && delete data[e])
  try {
    if (todos && hasData) {
      await Promise.all([
        admin.firestore().collection(collection).doc(uuid()).set(data),
        admin.firestore().collection(collection).doc('todos').set({ todos }),
      ])
    } else if (hasData) {
      await admin.firestore().collection(collection).doc(uuid()).set(data)
    } else if (todos) {
      await admin.firestore().collection(collection).doc('todos').set({ todos })
    }
    spinner.stop()
    process.exit()  
  } catch (e) {
    spinner.stop()
    console.error('ERROR: Unable to contact database', e)
    process.exit(1)
  }
}

const getTodos = async () => {
  const spinner = ora().start()
  try {
    const todos = await admin.firestore().collection(collection).doc('todos').get()
    spinner.stop()
    return todos.data().todos
  } catch (e) {
    spinner.stop()
    console.error('ERROR: Unable to get data', e)
    process.exit(1)
  }
}

module.exports = {
  save,
  getTodos,
}
