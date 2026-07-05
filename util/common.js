const common = require('@root/config/common')

const PORT = process.env.PORT

module.exports = {
  ...common,
  PORT,
}
