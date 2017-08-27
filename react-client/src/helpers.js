const axios = require('axios');

export const queueJob = (data, action) => {
  axios.post('/jobs', data)
  .then(res => {
    if (res.status >= 400) { throw new Error('Something Went Wrong!') };
    console.log('RESSSS', res); 
    return res; //res.json() ???
  })
  .then(data => {
    action(data.data);
  })
};