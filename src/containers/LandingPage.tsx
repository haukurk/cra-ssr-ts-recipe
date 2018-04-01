import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHealthIfNotChecked, requestHealthCheck } from '../actions/health';
import { SystemState } from '../reducers/system';
import { RootState } from '../reducers';

export interface LandingPageProps {
  system: SystemState;
  dispatch: any;
}

/**
 * Landing Page Container
 */
class LandingPage extends React.Component<LandingPageProps, {}> {

  // Dependecy before server rendering.
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
          <title>Title for the landing page.</title>
        </Helmet>

        <h1>Landing Page.</h1>
        <p>This page requests health status from the local API, that runs with the CRA app (isomoporphic).</p>
        {system.status_requesting ?
        <p>Checking API health</p> 
        : system.status_failed ? 
        <p>Error fetching API health</p> :
        <p>API health is {system.status}</p>}

        <Link to={'/posts'}>Page that requires external data.</Link>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
    system: state.system
});

export default connect(mapStateToProps)(LandingPage);
