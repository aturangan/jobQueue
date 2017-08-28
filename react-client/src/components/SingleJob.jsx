import React, { PropTypes } from 'react';
import styles from '../styles';

class SingleJob extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const job = this.props.job;
    return (
      <tr style={ styles.jobList }>
        <td>{ job.jobId }</td>
        <td>
          <a
            onClick={ this.props.checkJobStatus.bind(null, job) } 
            href={ job.completed ? `/html/${job.jobId}` : '#' }
          >
            { job.completed ? 'View HTML' : 'Check Status' }
          </a>
        </td>
        <td>{ job.url }</td>
      </tr>
    )
  }
}

SingleJob.propTypes = {
  job: PropTypes.object.isRequired,
  checkJobStatus: PropTypes.func.isRequired
}

export default SingleJob;