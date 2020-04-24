module.exports = () => {
  console.info(`  USAGE: goodmorning [-hvwmjts]
  
  DESCRIPTION
  Daily assistant cli app for tracking weather, mood, journal entries, and todos
  
  If no arguments are given, all functions will be prompted and all responses will be saved

  The following operations are available:
    -h, --help          Show help documentation
    -v, --version       Show package version number
    -w, --weather       Show current local weather
    -m, --mood          Give current personal mood
    -j, --journal       Write a journal entry
    -t, --todos         Update personal todos
    -s, --save          Save data received from prompts, if no other options are given nothing will be saved`
  )
}
