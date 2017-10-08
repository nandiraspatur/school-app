module.exports = function(score){
  if(score > 85){
    return 'A'
  }
  if(score > 70){
    return 'B'
  }
  if(score > 55){
    return 'C'
  }
  if(score <= 55){
    return 'E'
  }
}
