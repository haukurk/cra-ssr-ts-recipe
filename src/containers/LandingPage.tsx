import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

import { requestHealthCheck } from '../actions/health';

class LandingPage extends React.Component<any, any> {

    static fetchData(store: any) {
        return store.dispatch(requestHealthCheck());
      }

    componentDidMount() {
        this.props.dispatch(requestHealthCheck());
      }

      shouldComponentUpdate(nextProps: any) {
        if (!isEqual(this.props.comments, nextProps.comments)) {
          return true;
        }
    
        return false;
      }

  render() {

    const { system } = this.props;

    return (
      <div>
        <Helmet>
          <title>Landing Page Title</title>
        </Helmet>

        <h1>Landing Page.</h1>
        <p>API is {system.status}</p>
        <Link to={'/posts'}>Page that requires external data.</Link>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
    system: state.system
});

export default connect(mapStateToProps)(LandingPage);
