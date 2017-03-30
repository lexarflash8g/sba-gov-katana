import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
import styles from '../../styles/success-page/confirm-section.scss';
import thumbNail from '../../../../public/assets/images/placeholder370x170.png';
import * as ConfirmationEmailActions from '../../actions/confirmation-email.js';

const Resource = (props) => (
  <div className={ styles.resource }>
    <h4>{ props.title }</h4>
    <p>
      { props.duration }
    </p>
    <hr />
    <p>
      { props.description }
    </p>
    <a className={ styles.seeMoreBtn } href={ props.buttonURL } target="_blank">
      { props.buttonText }
    </a>
  </div>
);

class ConfirmSection extends React.Component {
    constructor(props) {
        super();
        this.state = {
            resendClicked: false
        };
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({resendClicked: true});
    }
  resend() {
    this.props.actions.resendConfirmationEmail(this.props.email);
  }

  render() {
      let resendLink = this.state.resendClicked ? <span>Email was re-sent.</span> : <a onClick={this.handleClick.bind(this)} href="">Click here to resend.</a>;
    return (
      // Section
      <div className={ styles.section }>
        <h1>{this.props.name.split(" ")[0]}, check your email.</h1>
        <h5>We sent an email to {this.props.email}. Click on the verification link inside.
        <br />Don’t see a confirmation email? <a className={ styles.resendLink} href="">Click here to resend.</a></h5>
        <div className={ styles.resources }>
          <Resource title="Free business plan template" duration="1-hour activity" description="You stated you don’t have a business plan. Many lenders expect one — consider using this template."
            buttonURL="https://www.sba.gov/tools/business-plan/1" buttonText="Create Plan" />
          <Resource title="How to prep a loan proposal" duration="30-minute video" description="This video learning course will walk you through commonly requested documents."
            buttonURL="https://www.sba.gov/tools/sba-learning-center/training/how-prepare-loan-package" buttonText="Watch Video" />
          <Resource title="5 Tips for loan applications" duration="5-minute read" description="This blog features tips and tricks on getting through the loan process quickly and easily."
            buttonURL="https://www.sba.gov/blogs/5-tips-successfully-navigating-sba-loan-application-process" buttonText="Read Blog" />
        </div>
      </div>
    )
  }

}

function mapReduxStateToProps(reduxState) {
  return {
    name: reduxState.lenderMatch.contactInfoData ? reduxState.lenderMatch.contactInfoData.contactFullName : "SBA",
    email: reduxState.lenderMatch.contactInfoData ? reduxState.lenderMatch.contactInfoData.contactEmailAddress : "sba@sba.gov"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConfirmationEmailActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(ConfirmSection);
