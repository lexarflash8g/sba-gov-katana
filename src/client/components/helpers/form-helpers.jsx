import React from 'react';
import { FormGroup, FormControl, Checkbox, ControlLabel, Col } from 'react-bootstrap';
import styles from './form-helpers.scss';


//standard react form components to be used throughout application

export class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {handleChange, handleFormat, value, getValidationState, ...rest} = this.props;
    return (<TextInput {...rest} getValidationState={ getValidationState } handleChange={ handleChange } onBlur={ handleFormat } value={ value } />);
  }
}


export const TextInput = ({handleChange, getValidationState, errText, hidden, ...props}) => {

  function iconValidation() {
    return getValidationState == 'success' ? <i className={ "fa fa-check-circle " + styles.textInputIconValid } aria-hidden="true"></i> : null
  }

  function inputValidation() {
    return getValidationState == 'error' ? styles.textInputInvalid : styles.textInput
  }

  function errMsg() {
    return getValidationState == 'error' ? <p className={ styles.errText }>
                                             { errText }
                                           </p> : null
  }

  return (
    <div className={ styles.inputContainer } hidden={ hidden }>
      <label className={ styles.controlLabel }>
        { props.label }
      </label>
      <div className={ styles.textInputContainer }>
        <input {...props} className={ inputValidation() } onChange={ handleChange } />
        { iconValidation() }
      </div>
      { errMsg() }
    </div>);
};

export const TextArea = ({handleChange, getValidationState, errText, hidden, ...props}) => {

  function iconValidation() {
    return getValidationState == 'success' ? <i className={ "fa fa-check-circle " + styles.textAreaIconValid } aria-hidden="true"></i> : null
  }

  function inputValidation() {
    return getValidationState == 'error' ? styles.textAreaInvalid : styles.textArea
  }

  function errMsg() {
    return getValidationState == 'error' ? <p className={ styles.errText }>
                                             { errText }
                                           </p> : null
  }

  return (
    <div className={ styles.inputContainer } hidden={ hidden }>
      <label className={ styles.controlLabel }>
        { props.label }
      </label>
      <div className={ styles.textAreaContainer }>
        <textarea {...props} className={ inputValidation() } onChange={ handleChange } maxLength="250" />
        { iconValidation() }
      </div>
      <span className={ styles.textAreaCounter }>{ props.value.length }/250</span>
      { errMsg() }
    </div>);
};


export const SelectBox = ({handleChange, label, getValidationState, ...props}) => <Col xs={ 12 } xsOffset={ 0 }>
                                                                                  <FormGroup validationState={ getValidationState }>
                                                                                    <ControlLabel className={ styles.controlLabel }>
                                                                                      { label }
                                                                                    </ControlLabel>
                                                                                    <FormControl {...props} onChange={ handleChange } componentClass="select" />
                                                                                  </FormGroup>
                                                                                  </Col>;

