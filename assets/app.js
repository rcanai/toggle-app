axios.defaults.crossDomain = true;

var on = function() {
  axios.post('/update', {
    status: true
  }).then(function(response) {
    location.reload(false);
  });
}

var off = function() {
  axios.post('/update', {
    status: false
  }).then(function(response) {
    location.reload(false);
  });
}

