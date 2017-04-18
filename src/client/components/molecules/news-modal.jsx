import React from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as ModalActions from "../../actions/show-modal.js";
import styles from "./news-modal.scss";
import TextInput from "../atoms/text-input.jsx";
import exitIcon from "../../../../public/assets/svg/close_button.svg";
import clientConfig from "../../services/config.js";
import {getEmailValidationState, getAlwaysValidValidationState, containsErrorOrNull} from "../../services/page-validator-helpers.js";
import {includes} from "lodash";
import envelope from '../../../../public/assets/svg/envelope.svg';

class SbaNewsModal extends React.Component {

    constructor(props) {
        super();
        this.state = {
            userEmailAddress: "",
            userZipCode:  "",
            modalIsOpen: true,
            validStates: {
                userEmailAddress: null,
                userZipCode: null
            }
        };
    }

    componentDidMount() {
        this.validateFields(["userEmailAddress", "userZipCode"]);
        window.scrollTo(0, 0);
    }


    validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
        let validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null);
        if(validationState[name] === "error"){
            logEvent({"category": "Lender Match Form", "action": "Error Event", "label": name});
        }
        return validationState;
    }

    validateFields(fields, defaultWhenNotSuccessful) {
        let validStates = this.state.validStates;

        if (includes(fields, "userEmailAddress")) {
            validStates = Object.assign(validStates, this.validateSingleField(getEmailValidationState, "userEmailAddress", defaultWhenNotSuccessful));
        }
        if (includes(fields, "userZipCode")) {
            validStates = Object.assign(validStates, this.validateSingleField(getAlwaysValidValidationState, "userZipCode", defaultWhenNotSuccessful));
        }
        this.setState({validStates: validStates})
    }

    isValidForm() {
        return !containsErrorOrNull(this.state.validStates);
    }

    handleSubmit(e) {
        e.preventDefault();
        //send data to the server.
        this.newsletterModalForm.reset();
    }

    handleChange(e) {
        let newState = {};
        let name = e.target.name;
        newState[name] = e.target.value;
        this.setState(newState, () => this.validateFields([name]));
    }

    handleBlur(e) {
        this.validateFields([e.target.name], "error");
    }

    handleFocus(nameOrEvent) {

    }

    handleClose(e){
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <ReactModal isOpen={this.state.modalIsOpen} className={styles.content} overlayClassName={styles.overlay} contentLabel="Modal">
                <div>
                    <h2 className={styles.title}>Get business advice and invitations to local business events.</h2>
                    <a onClick={this.handleClose.bind(this)}><img className={styles.exitIcon} src={exitIcon}/></a>
                </div>
                <div>
                    <form id="newsletter-modal-form" ref={(input) => this.newsletterModalForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                        <TextInput name="userEmailAddress" errorText={clientConfig.messages.validation.invalidNewsLetterEmail} placeholder="Your email address"  handleChange={this.handleChange.bind(this)} value={this.state.userEmailAddress} getValidationState={this.state.validStates.userEmailAddress} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
                        <div>
                            <div className={styles.zipTextBox}><TextInput name="userZipCode" errorText={clientConfig.messages.validation.invalidNewsLetterZipCode}  placeholder="Zip code"  handleChange={this.handleChange.bind(this)} value={this.state.userZipCode} getValidationState={this.state.validStates.userZipCode} maxLength="5" onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/></div>
                            <button className={styles.btnSubscribe} type="submit" disabled={!(this.isValidForm())}>
                                SUBSCRIBE
                            </button>
                        </div>

                    </form>
                    <p className={styles.privacyLink}><a  href="about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy">Privacy policy</a></p>
                </div>
            </ReactModal>
        );
    }
}

function mapStateToProps(state) {
    return {
        userEmailAddress: state.modalReducer.modalProps.userEmailAddress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(ModalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SbaNewsModal);