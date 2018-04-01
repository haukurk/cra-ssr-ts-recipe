import * as React from 'react';
import * as PropTypes from 'prop-types';

class NoMatch extends React.Component<{}, {}> {

  static contextTypes = {
      router: PropTypes.shape({
        staticContext: PropTypes.object
      }).isRequired
    };

  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    if (this.context.router.staticContext) {
      this.context.router.staticContext.statusCode = 404;
    }
  }

  render() {
    return 'Sorry, page not found';
  }
}

export default NoMatch;
