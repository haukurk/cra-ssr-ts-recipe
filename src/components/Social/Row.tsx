import * as React from 'react';

import SocialIcon from './Icon';
import './styles.css';

export default class SocialRow extends React.Component {
  render() {
    return (
      <div className="socialInformationRow">
        <h1 className="socialHeader"><b>You can find me on the web</b></h1>
        <div className="socialIconGrids">
        <div className="socialIcons">
            <SocialIcon name="facebook" link="https://www.facebook.com/haukur.kristinsson" />
            <SocialIcon name="twitter" link="https://twitter.com/haukurk" />
            <SocialIcon name="linkedin" link="https://is.linkedin.com/in/haukurk/" />
            <SocialIcon name="github" link="https://github.com/haukurk" />
            <SocialIcon name="stackoverflow" link="http://stackoverflow.com/users/3830822/haukur-kristinsson" />
        </div>
        </div>
      </div>
    );
  }
}
