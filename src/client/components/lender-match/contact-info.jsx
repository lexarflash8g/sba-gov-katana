import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, ValidTextInput } from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx';
import * as ContactInfoActions from '../../actions/contact-info.js';
import { browserHistory } from 'react-router';
import { getNameValidationState, getPhoneValidationState, getEmailValidationState, getAlwaysValidValidationState } from '../helpers/page-validator-helpers.jsx';
import styles from '../../styles/lender-match/lender-match.scss';
import { Col } from 'react-bootstrap';

class ContactInfoForm extends React.Component {
    constructor(props){
        super();
        this.state = {
            contactInfoFields: Object.assign({},{
                contactPhoneNumber: "",
                contactFullName: "",
                contactEmailAddress: ""
            }, props.contactInfoFields),
            validStates: {
                "contactFullName": null,
                "contactPhoneNumber": null,
                "contactEmailAddress": null
            }
        };
    }

    isValidForm(){
        let validForm = true;
        for (var inputState in this.state.validStates){
            if(this.state.validStates[inputState] === "error" || this.state.validStates[inputState] === null){
                validForm = false;
            }
        }
        return validForm;
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createContactInfo(this.state.contactInfoFields);
        browserHistory.push('/form/business');
        this.contactInfoForm.reset();
    }

    handleChange(e){
        let contactInfoFields = {};
        contactInfoFields[e.target.name] = e.target.value;
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
        this.getValidationState(e);
    }

    handlePhoneChange(e){
        let contactInfoFields = {};
        let phoneNumber = e.target.value.replace(/[\D]/g,"");
        contactInfoFields[e.target.name] = phoneNumber;
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
        this.getValidationState(e);
    }

    getValidationState(e) {
        let validStates = {};
        if (e.target.name === "contactFullName") {
            validStates = getNameValidationState(e);
        } else if (e.target.name === "contactPhoneNumber") {
            validStates = getPhoneValidationState(e);
        } else if (e.target.name === "contactEmailAddress") {
            validStates = getEmailValidationState(e);
        }else if (e.target.name === "contactSecondaryEmailAddress") {
            validStates = getAlwaysValidValidationState(e);
        }
        this.setState({validStates: {...this.state.validStates, ...validStates}});
    }

    render() {
        return (
            <FormPanel title="How do we reach you?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput     label="What is your full name?"
                                   name="contactFullName"
                                   handleChange={this.handleChange.bind(this)}
                                   value={this.state.contactInfoFields.contactFullName}
                                   getValidationState={this.state.validStates["contactFullName"]}
                                   autoFocus
                                   required
                    />

                    <TextInput     label="What is your phone number?"
                                   name="contactPhoneNumber"
                                   handleChange={this.handlePhoneChange.bind(this)}
                                   value={this.state.contactInfoFields.contactPhoneNumber}
                                   getValidationState={this.state.validStates["contactPhoneNumber"]}
                                   required
                    />

                    <TextInput     label="What is your email address?"
                                   name="contactEmailAddress"
                                   handleChange={this.handleChange.bind(this)}
                                   value={this.state.contactInfoFields.contactEmailAddress}
                                   getValidationState={this.state.validStates["contactEmailAddress"]}
                                   required
                    />

                    {/* HoneyPot -- this comment should not appear in the minified code*/}
                    <TextInput     label="What is your second email address?"
                                   name="contactSecondaryEmailAddress"
                                   tabIndex={-1}
                                   handleChange={this.handleChange.bind(this)}
                                   getValidationState={this.state.validStates["contactSecondaryEmailAddress"]}
                                   hidden

                    />
                    <Col md={6} mdOffset={3} >
                        <button className={styles.continueBtn}
                                type="submit"
                                disabled={!(this.isValidForm())}
                        > Continue </button>
                    </Col>
                </form>
            </FormPanel>
        );
    }
}

function mapStateToProps(state) {
    let newProps = {
        contactInfoFields: Object.assign({}, state.contactInfoReducer.contactInfoData)
    };
    return newProps;
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(ContactInfoActions, dispatch)
    };
}

export {ContactInfoForm};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactInfoForm);

