module.exports = function(passwd, secret){
  const crypto = require('crypto');

  const hash = crypto.createHmac('sha256', secret)
                     .update(passwd)
                     .digest('hex');
  return hash;
}
