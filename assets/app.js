axios.defaults.crossDomain = true;

var on = function() {
  axios.post('/update', {
    status: true
  }).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.error(error);
  });
}

var off = function() {
  axios.post('/update', {
    status: false
  }).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.error(error);
  });
}
