exports.test = {
  x : "xx",
  f : function() {return 'x';},
  booTimer : function() {
    setInterval(function () {
    console.log('boo')
    }, 1000)
  },

  f : function() {return 'x';},
  fooTimer : function() {
    setInterval(function () {
    console.log('foo')
    }, 500)
  }
}
