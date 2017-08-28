const axios = require('axios');

export const queueJob = (data, action) => {
  axios.post('/jobs', data)
  .then(res => {
    if (res.status >= 400) { throw new Error('Something Went Wrong!'); }
    return res;
  })
  .then(data => {
    if (action) action(data.data);
  })
};

export const jobUpdate = (id, action) => {
  axios.get(`/jobs/${ id }`)
  .then(res => {
    if (res.status >= 400) { throw new Error('Something Went Wrong!'); }    
    return res;
  })
  .then(update => {
    if (action) action(update);
  })
};