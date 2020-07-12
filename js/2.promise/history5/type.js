const Promise = require(".//promise");

let promise = new Promise((resolve, reject) => {
  resolve()
})

var promise2 = promise.then(() => {
  setTimeout(() => {
    return promise2
  })
})

promise2.then(function() {

}, function(err) {
  console.log(err)
})