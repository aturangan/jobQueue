import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import List from './components/List.jsx';
import ListItem from './components/ListItem.jsx'; 
import { queueJob } from './helpers.js';
import styles from './styles.js'; 

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      //url: '',
      feedback: 'Add Some Jobs!',
      jobList: [],
      searchResults: [] //might not need search results, come back to this
    }
    this.handleInput = this.handleInput.bind(this); 
    this.checkUrl = this.checkUrl.bind(this); 
  }

  checkUrl(url) {
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    return validUrl; 
  }

  handleInput(url) {
   // url.preventDefault();
    
    if (this.checkUrl(url)) {
      queueJob({ url: url }, job => {
        this.setState({
          jobList: this.state.jobList.concat([job]),
          feedback: `Job ${ job.jobId } queued!`
        })
      });
    }
  }

  // updateStatus(job) {
  //   getJobStatus(job.jobId, status => {
  //     let newState = this.state.jobs;
  //     let newMessage;

  //     if (status) {
  //       for (var i in newState) {
  //         if (newState[i].jobId == job.jobId) {
  //           newState[i].html = job.html;
  //           newState[i].completed = true;
  //           break;
  //         }
  //       }
  //       newMessage = `JOB-ID ${job.jobId} has been processed`;
  //     } else {
  //       newMessage = `JOB-ID ${job.jobId} has not yet been processed`
  //     }
  //     this.setState({ 
  //       jobs: newState,
  //       message: newMessage
  //     });
  //   });
  // }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <h1 style={ styles.title }>Job Queue</h1>
            <ListItem handleInput={ this.handleInput }/>
            <List searchResults={ this.state.searchResults }/>
            <h3 style={ styles.h3 }>{ this.state.feedback }</h3>
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

