import React from 'react';
import styles from "./section-link.scss";
import {createNavigation} from "../../../services/navigation";

class SectionLink extends React.Component {
  render() {
    let underlineStyle = this.props.showUnderline ?
      " " + styles.underline :
      "";
    let triangleColor = this.props.showTriangleMarker ?
      " " + styles.triangleTheme :
      "";
    return (
      <span id={this.props.id + "-container"} className={styles.link + underlineStyle} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
        <a id={this.props.id} className={styles.sectionLink} onTouchTap={createNavigation(this.props.url)} onKeyDown={this.props.onKeyDown}>{this.props.text}</a>
        <div className={styles.triangle + triangleColor}></div>
        {this.props.children}
      </span>
    )
  }
}

SectionLink.defaultProps = {
  showTriangleMarker: false
}

SectionLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  showTriangleMarker: React.PropTypes.bool,
  showUnderline: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func
};

export default SectionLink;
