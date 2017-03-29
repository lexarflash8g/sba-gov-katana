import React from 'react';
import styles from './radio.scss';
import _ from "lodash";
import formHelperStyles from "../helpers/form-helpers.scss";
/* esfmt-ignore-start */
class RadioButtonGroup extends React.Component {
  constructor(props) {
    super();
  }
  fireChange(index) {
    this.props.onChange(this.props.options[index].value);
  }
  handleChange() {}
  handleClick(index, me) {
    me.fireChange(index);
  }
  handleKeyPress(event, index, me) {
    let code = (event.keyCode
      ? event.keyCode
      : event.which);
    if (code == 32) {
      me.fireChange(index);
      event.preventDefault();
    }
  }
  render() {
    let me = this;
    let radioButtons = this.props.options.map(function(item, index) {
      let id = "radio" + index;
      let isChecked = item.value === me.props.value;
      return <div className={ styles.radioItem + " " + (isChecked ? styles.radioItemSelected : styles.radioItemNotSelected) } onClick={ (event) => me.handleClick(index, me) } key={ index } tabIndex="0" onKeyPress={ (event) => me.handleKeyPress(event, index, me) }>
               <input className={ styles.regularRadio } type="radio" name={ me.props.name } checked={ isChecked } tabIndex="0" onChange={ me.handleChange } id={ id }
                 value={ item.value }></input>
               <label className={ styles.myLabel } htmlFor={ id } />
               <span className={ styles.radioText }>{ item.text }</span>
             </div>;
    });

    let errorMessage = this.props.validationState == 'error' ? <p className={ styles.errorText }> { errorText } </p> : undefined;

    return (
      <div>
        <label className={ formHelperStyles.controlLabel }>
          { this.props.label }
        </label>
        <div>
          { radioButtons }
        </div>
        {errorMessage}
      </div>
      );
  }
}
/* esfmt-ignore-end */
/* options is array of name/value/text triples */
RadioButtonGroup.propTypes = {
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};

export default RadioButtonGroup;
