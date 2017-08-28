import React, { PropTypes } from 'react';
import SearchInput from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../styles';
import SingleJob from './SingleJob.jsx';

class JobList extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      input: '',
      blank: []
    };
    this.onUpdateInput = this.onUpdateInput.bind(this); 
  }

  onUpdateInput(input) {
    this.setState({
      input: input
    });
  }

  render() {
    return (
      <div>
        <SearchInput
          style={ styles.main }
          hintText="http://www.amazon.com"
          dataSource={ this.state.blank }
          searchText={ this.state.input }
          onUpdateInput={ this.onUpdateInput }
        />
        <RaisedButton
          style={ styles.searchButton }
          label="Search" 
          backgroundColor={ styles.mainColor }
          labelColor="rgb(255, 255, 255)"
          onTouchTap={ () => this.props.handleInput(this.state.input) }
        />
        <table style={ styles.jobList }>
          <thead>
          <tr>
            <th>Job ID</th>
            <th>Result</th>
            <th>URL</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.jobsList.map(job => 
              <SingleJob 
                key={ job.jobId } 
                job={ job } 
                checkJobStatus={ this.props.checkJobStatus }
              />
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

JobList.propTypes = {
  jobsList: PropTypes.array.isRequired,
  checkJobStatus: PropTypes.func.isRequired
}

export default JobList; 