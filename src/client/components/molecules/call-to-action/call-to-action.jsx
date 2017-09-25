import React from "react";
import _ from "lodash"
import {
  SmallInversePrimaryButton,
  SmallInverseSecondaryButton,
  LargePrimaryButton
} from "atoms";
import styles from "./call-to-action.scss";
import cornerGraphicLarge from "./corner-graphic-large.png";
import cornerGraphicSmall from "./corner-graphic-small.png";
import {createCtaNavigation} from "../../../services/navigation";

export class CallToAction extends React.Component {

  getCssClassNameBySize() {

    const size = this.props.size ? this.props.size.toLowerCase() : "";
    let css = {};

    if (size === "button only") {
      css = styles.btnOnly;
    } else {
      css = styles[size] || null;
    }

    return css;

  }

  backgroundImageStyles() {
    return {
      "background": "url(" + this.props.image + ") no-repeat center center",
      "backgroundSize": "cover",
      "width": "100%",
      "height": "100%"
    };
  }

  render() {
   let eventCategory = "General-CTA-"+this.props.size;
   let eventAction = _.camelCase(this.props.btnTitle) + ": " + this.props.btnUrl;

    const secondaryButtonProps = {
      className: styles.btnSecondary,
      text: this.props.btnTitle,
      onClick: createCtaNavigation(this.props.btnUrl, eventCategory,  eventAction, 2)
    };
    const secondaryButton = this.props.size === "Button only"
      ? <LargePrimaryButton {...secondaryButtonProps}/>
      : <SmallInverseSecondaryButton {...secondaryButtonProps}/>;
    return (
      <div className={this.getCssClassNameBySize()}>
        <div id="call-to-action" className={styles.ctaContainer}>
          <div className={styles.image}>
            <div title={this.props.imageAlt} style={this.backgroundImageStyles()}></div>
          </div>
          <div className={styles.contentContainer}>
            <h4 className={styles.headline}>{this.props.headline}</h4>
            <p className={styles.blurb}>{this.props.blurb}</p>
            <SmallInversePrimaryButton className={styles.btn} text={this.props.btnTitle}
                                       onClick={createCtaNavigation(this.props.btnUrl, eventCategory,  eventAction, 1)}/>
          </div>
          <img className={styles.cornerGraphicLarge} src={cornerGraphicLarge} alt=""/>
          <img className={styles.cornerGraphicSmall} src={cornerGraphicSmall} alt=""/>
        </div>
        {secondaryButton}
      </div>

    );
  }
}

export default CallToAction;
