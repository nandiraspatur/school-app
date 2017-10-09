module.exports = function(passwd){
  const crypto = require('crypto');
  const hash = crypto.createHmac('sha256', passwd)
                     .digest('hex');
  return hash;
}
