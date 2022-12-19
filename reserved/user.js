const bcrypt = require("bcryptjs");

class Auth {
  #saltRounds = 10;

  async setPassword(password) {
    try {
      const generateSalt = await bcrypt.genSalt(this.#saltRounds);
      try {
        const getHash = await bcrypt.hash(password, generateSalt);
        return getHash;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async checkPassword(password, hashPassword) {
    try {
      const check = await bcrypt.compare(password, hashPassword);
      return check;
    } catch (error) {
      console.log(error);
    }
  }

  checkEmail(inputEmail, savedEmail) {
    if (inputEmail === savedEmail) {
      return true;
    }
  }
}

// const auth = new Auth();
// auth.checkPassword("admin123", "$2a$10$m.OZMPpQtkWEDgFSlxtHDuoBMbZo.yazteA.w1ShMwBRmui03liSu");

module.exports = Auth;
