import React from "react";
import styles from "./google-translate.scss";
import {UtilityLink} from "atoms";

class GoogleTranslate extends React.Component {

  constructor(props) {
    super();
    this.state = {
      expanded: false
    };
  }

  handleGoogleTranslateClick(e) {
    event.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    let googleTranslateClass = this.state.expanded
      ? styles.googleTranslateElementVisible
      : styles.googleTranslateElement;
    return (<div className={styles.container}>
        <div className={googleTranslateClass} id="google_translate_element"></div>
        <UtilityLink id="translate-toggle-new" visible={!this.state.expanded} onClick={this.handleGoogleTranslateClick.bind(this)} text="Translate"></UtilityLink>
      </div>);

  }
}

GoogleTranslate.propTypes = {};

export default GoogleTranslate;
