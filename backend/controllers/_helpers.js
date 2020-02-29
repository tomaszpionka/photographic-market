const bcrypt = require('bcryptjs');
const {createUser} = require('../actions/signUp');
const {createItem} = require('../actions/inventory');
const logger = require('../logger');

function comparePass(userPassword, databasePassword, userIsValid, userIsNotValid) {
  logger.info("Comparing passwords...");
  return bcrypt.compare(userPassword, databasePassword)
  .then((validPassword) => {
      if (validPassword) {
          logger.info("User successfully authenticated!");
          return userIsValid;
      }
      logger.info("Rejecting the login attempt.");
      return userIsNotValid;
  })
  .catch(Error => {throw new Error('operation failed')})
  .catch(err => logger.error(err)) 
}

function hashPass(email, password, givingTokenToUser, userNotSaved, catchingError) {
    logger.info("Hashing passwords...");
    bcrypt.hash(password, 10)
    .then((hash) => {
      logger.debug(`password: ${password}, hash: ${hash}`);
      return createUser(email, hash)
      .then(givingTokenToUser)
      .catch(userNotSaved)
    })
    .catch(catchingError)
};

function addItem(name, category, itemNotSaved, catchingError) {
  logger.info("Creating item...")
  .then(() => {
    logger.debug(`name: ${name}, category: ${category}`);
    return createItem(name, category)
    .then(logger.info("Success..."))
    .catch(itemNotSaved)
  })
  .catch(catchingError)
};

module.exports = {
  comparePass,
  hashPass,
  addItem
};


