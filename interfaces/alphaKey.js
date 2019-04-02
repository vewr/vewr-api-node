var AlphaKey = require('../models/alphaKey');

class AlphaKeyInterface {
  createAlphaKey() {
    // generate key
    return new AlphaKey({ key: this.generateKey() }).save();
  }

  findAlphaKeyById(id) {
    // return the promise
    return AlphaKey.findOne({ _id: id }).lean();
  }

  findAlphaKeyByKey(key) {
    return AlphaKey.findOne({ key }).lean();
  }

  deleteAlphaKeyById(id) {
    return AlphaKey.deleteOne({ _id: id });
  }

  deleteAlphaKeyById(key) {
    return AlphaKey.deleteOne({ key });
  }

  generateKey() {
    const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Q", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const keyLength = 36;
    
    let newKey = '';

    for(let i = 0; i < keyLength; i++) {
      newKey += characters[parseInt(Math.random() * characters.length)];
    }
    
    return newKey;
  }
}

// export a singleton so we don't have to keep re-initializing 
// the interface and waste memory (not like we're wasting any already Kappa)
module.exports = new AlphaKeyInterface;