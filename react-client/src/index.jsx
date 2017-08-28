import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import SingleJob from './components/SingleJob.jsx';
import JobList from './components/JobList.jsx'; 
import { queueJob, jobUpdate } from './helpers.js';
import styles from './styles.js'; 

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      //url: '',
      feedback: 'Add Some Jobs!',
      jobsList: [],
      searchResults: [] //might not need search results, come back to this
    }
    this.handleInput = this.handleInput.bind(this); 
    this.checkUrlFormat = this.checkUrlFormat.bind(this); 
    this.checkJobStatus = this.checkJobStatus.bind(this); 
  }

  checkUrlFormat(url) {
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    return validUrl; 
  }

  handleInput(url) {
    if (this.checkUrlFormat(url)) {
      queueJob({ url: url }, job => {
        this.setState({
          jobsList: this.state.jobsList.concat([job]),
          feedback: `Job ID: ${ job.jobId } queued!`
        })
      });
    }
  }

  checkJobStatus(job) {
    let currentFeedback; 
    jobUpdate(job.jobId, update => {
      let list = this.state.jobsList;
      if (update) {
        for (let prop in list) {
          if (list[prop].jobId === job.jobId) {
            list[prop].html = job.html;
            list[prop].completed = true; 
            break;
          }
        }
        currentFeedback = `Job ${ job.jobId } is complete!`;
      } else {
        currentFeedback = `Job ${ job.jobId } is not complete!`;
      }
      this.setState({
        jobsList: list,
        feedback: currentFeedback
      });
    });
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <h1 style={ styles.title }>Job Queue</h1>
            <h3 style={ styles.h3 }>{ this.state.feedback }</h3>
            <JobList 
              handleInput={ this.handleInput }
              jobsList={ this.state.jobsList } 
              checkJobStatus={ this.checkJobStatus } 
            />
            
            <br/>
           
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Create a job queue whose workers fetch data from a URL and store 
// the results in a database. The job queue should expose a REST API for 
// adding jobs and checking their status / results.

// Example:

// User submits www.google.com to your endpoint. The user gets back a job id. 
// Your system fetches www.google.com (the result of which would be HTML) and 
// stores the result. The user asks for the status of the job id and if the job 
// is complete, he gets a response that includes the HTML for www.google.com

