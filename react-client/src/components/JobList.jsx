import React, { PropTypes } from 'react';
import SearchInput from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../styles';
import SingleJob from './SingleJob.jsx';

const blank = []; 

class JobList extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      input: ''
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
          dataSource={ blank }
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






        <table className="table-jobs" style={ styles.jobList }>
          <thead>
          <tr>
            <th className="row-id">Job Id</th>
            <th className="row-action">Action</th>
            <th className="row-url">Url</th>
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