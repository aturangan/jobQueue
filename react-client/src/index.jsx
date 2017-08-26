import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import List from './components/List.jsx';
import ListItem from './components/ListItem.jsx'; 
import styles from './styles.js'; 

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: []
    }
    this.search = this.search.bind(this); 
  }

  search(input) {
    input = input.toString();  
    let www = input.slice(0, 5); 
    
    if (www === 'www.') {
      input = 'http://' + input; 
    }

    axios.post('/scrape', { input: input }).then(res => {
      if (!res.data) {
        console.log('Error receiving data from the server'); 
      } else {
        console.log('Data received from Server: ', res.data); 
        this.setState({ searchResults: res.data });
      }
    });
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <h1 style={ styles.title }>Job Queue</h1>
            <ListItem searchResults={ this.state.searchResults }/>
            <br/>
            <List onSearch={ this.search }/>
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

