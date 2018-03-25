import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchHealthIfNotChecked, requestHealthCheck } from '../actions/health';
import { SystemState } from '../reducers/system';
import { SystemStore } from '../store';

export interface LandingPageProps {
  system: SystemState;
  dispatch: any;
}

class LandingPage extends React.Component<LandingPageProps, any> {

    static fetchData(store: any) {
        return store.dispatch(requestHealthCheck());
      }

    componentDidMount() {
        this.props.dispatch(fetchHealthIfNotChecked());
      }

  render() {

    const { system } = this.props;

    return (
      <div>
        <Helmet>
          <title>Landing Page Title</title>
        </Helmet>

        <h1>Landing Page.</h1>
        {system.status_requesting ?
        <p>Checking API health</p> 
        : system.status_failed ? 
        <p>Error fetching API health</p> :
        <p>API is {system.status}</p>
        }
        <Link to={'/posts'}>Page that requires external data.</Link>
      </div>
    );
  }
}

const mapStateToProps = (state: SystemStore) => ({
    system: state.system
});

export default connect(mapStateToProps)(LandingPage);
