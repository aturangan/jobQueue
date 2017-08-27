const axios = require('axios');

export const queueJob = (data, action) => {
  axios.post('/jobs', data)
  .then(res => {
    if (res.status >= 400) { throw new Error('Something Went Wrong!') };
    return res; //res.json() ???
  })
  .then(data => {
    action(data);
  })
};