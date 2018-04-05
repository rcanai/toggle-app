const on = function() {
  axios.post('/update', {
    status: true
  }).then(function(response) {
    location.reload(false);
  });
}

const off = function() {
  axios.post('/update', {
    status: false
  }).then(function(response) {
    location.reload(false);
  });
}

