import React from 'react';
import ExtraLargeTitleText from '../../atoms/extra-large-title-text/extra-large-title-text.jsx';
import SubtitleText from '../../atoms/subtitle-text/subtitle-text.jsx';
import CaptionText from '../../atoms/caption-text/caption-text.jsx';

import LargePrimaryButton from '../../atoms/large-primary-button/large-primary-button.jsx';
import LargeSecondaryButton from '../../atoms/large-secondary-button/large-secondary-button.jsx';
import LargeInversePrimaryButton from '../../atoms/large-inverse-primary-button/large-inverse-primary-button.jsx';
import LargeInverseSecondaryButton from '../../atoms/large-inverse-secondary-button/large-inverse-secondary-button.jsx';

import SmallPrimaryButton from '../../atoms/small-primary-button/small-primary-button.jsx';
import SmallSecondaryButton from '../../atoms/small-secondary-button/small-secondary-button.jsx';
import SmallInversePrimaryButton from '../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx';
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';

import LargeGreySecondaryButton from '../../atoms/large-grey-secondary-button/large-grey-secondary-button.jsx';
import SmallGreySecondaryButton from '../../atoms/small-grey-secondary-button/small-grey-secondary-button.jsx';

import SbaModal from '../../molecules/modal.jsx';
import Callout from '../../molecules/callout/callout.jsx';
import Hero from '../../organisms/hero/hero.jsx';
import styles from './style-guide.scss';

import TextInput from '../../atoms/text-input/text-input.jsx';
import TextArea from "../../atoms/textarea/textarea.jsx";
import RadioBtnGroup from "../../atoms/radio/radio.jsx";
import Checkbox from "../../atoms/checkbox/checkbox.jsx";

import HeroDesktopImage from './hero.jpg'
import HeroMobileImage from './hero-mobile.jpg'

import SimpleCta from "../../molecules/simple-cta/simple-cta.jsx"
import Cta from "../../molecules/call-to-action/call-to-action.jsx"

class StyleGuide extends React.Component {
  constructor() {
    super();
    this.state = {
      exampleModalIsOpen: false
    };
  }
  handleModalExampleClick(e) {
    e.preventDefault();
    this.setState({
      exampleModalIsOpen: !this.state.exampleModalIsOpen
    });
  }

  handleLargeBtnClicked(e) {
      e.preventDefault();
  }

  render() {
      let buttonsArray = [
            {
              onClickHandler: this.handleLargeBtnClicked,
              btnText: "LARGE BUTTON",
              btnType: "SmallInverseSecondaryButton"
            }
          ];
    return (
      <div>
        <Typography onModalExampleClick={this.handleModalExampleClick.bind(this)}/>
        <ButtonGroup/>
        <ColorPalette/>
        <h1>Form Inputs</h1>
        <FormElements/>
        <h1>Hero</h1>
        <Hero title="Hey this is a cool title." message="Whether you're already up and running or just getting started, we can help. Come take a look now." buttons={buttonsArray} desktopImage={HeroDesktopImage} mobileImage={HeroMobileImage}/>
        <h1>Calls to Action</h1>
        <div className={styles.ctaContainer}>
          <Cta size="large" btnUrl="http://www.example.com/" btnTitle="find happiness" image="http://content.sbagov.fearlesstesters.com/sites/default/files/2017-04/Counselor_Match_CTA_Image.jpg" imageAlt="alt text for image" headline="This is the headline for the CTA." blurb="This is the blurb for the CTA. I am not sure how many characters are allowed in here and I am too lazy to count them so I will just put in a bunch. Ok I think this is enough for now."/>
        </div>
        <div className={styles.simpleCtaContainer}>
            <SimpleCta/>
        </div>
        <h1>Future components...</h1>
        {this.state.exampleModalIsOpen
          ? <SbaModal onClose={() => {
              this.setState({exampleModalIsOpen: false})
            }} onClickOk={() => {
              document.location = "http://www.example.com/"
            }}/>
          : <div/>}
      </div>
    );
  }
}

export default StyleGuide;

const Typography = ({onModalExampleClick}) => <div className={styles.typography}>
  <ExtraLargeTitleText text="XL:h1 Source Sans Pro Black"/>
  <h1>h1 Source Sans Pro Black</h1>
  <h2>h2 Source Sans Pro Black</h2>
  <h3>h3 Source Sans Pro Black</h3>
  <h4>h4 Source Sans Pro Bold</h4>
  <h5>h5 Merriweather Regular</h5>
  <SubtitleText text="h5:subtitle Merriweather Regular Italic"/>
  <h6>h6 Source Sans Pro Bold 18px</h6>
  <p>Body style Source Sans Pro Regular 18px. ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.
  </p>
  <p>This is just to show spacing between paragraphcs: ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim.</p>
  <CaptionText text="Image Caption: Source Sans Pro Regular Italic 18px. ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor."/>
  <LargeSecondaryButton text="Click for Modal" onClick={onModalExampleClick}/>
</div>;

const Buttons = () => <div className={styles.buttons}>
  <p>
    <a href="#">Link</a>
  </p>
  <br/>

  <h4>Primary</h4>
  <LargePrimaryButton text="Large Button"/>
  <br/>
  <br/>
  <SmallPrimaryButton text="Small Button"/>
  <br/>
  <br/>

  <h4>Secondary</h4>
  <LargeSecondaryButton text="Large Button"/>
  <br/>
  <br/>
  <SmallSecondaryButton text="Small Button"/>
  <br/>
  <br/>

  <h4>Inverse Primary</h4>
  <div className={styles.background}>
    <LargeInversePrimaryButton text="Large Button"/>
    <br/>
    <br/>
    <SmallInversePrimaryButton text="Small Button"/>
  </div>

  <h4>Inverse Secondary</h4>
  <div className={styles.background}>
    <LargeInverseSecondaryButton text="Large Button"/>
    <br/>
    <br/>
    <SmallInverseSecondaryButton text="Small Button"/>
  </div>

  <h4>Grey Secondary</h4>
  <LargeGreySecondaryButton text="Large Button"/>
  <br/>
  <br/>
  <SmallGreySecondaryButton disabled text="Small Button"/>
  <br/>
  <br/>

  <h4>Disabled</h4>
  <button disabled>Nope</button>
  <br/>
  <br/>
  <br/>
</div>;

const ButtonGroup = () => <div>
  <div className="sba-blue">
    <Buttons className={styles.buttons}/>
  </div>
  <div className="byzantine">
    <Buttons className={styles.buttons}/>
  </div>
  <div className="money-green">
    <Buttons className={styles.buttons}/>
  </div>
  <div className="cobalt-blue">
    <Buttons className={styles.buttons}/>

  </div>
</div>;

const ColorPalette = () => <div>
  <div className={styles.column}>
    <h4>SBA Blue</h4>
    <div className={styles.color + ' ' + styles.colorprimary + ' ' + styles.sbablue}>
      <p className={styles.colorName}>$sba-blue</p>
      <p className={styles.colorHex}>#0b97DD</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluedarkest}>
      <p className={styles.colorName}>$sba-blue-darkest</p>
      <p className={styles.colorHex}>#004265</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluedark}>
      <p className={styles.colorName}>$sba-blue-dark</p>
      <p className={styles.colorHex}>#006BA2</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluelight + ' ' + styles.textblack}>
      <p className={styles.colorName}>$sba-blue-light</p>
      <p className={styles.colorHex}>#9DDDFF</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluelightest + ' ' + styles.textblack}>
      <p className={styles.colorName}>$sba-blue-lightest</p>
      <p className={styles.colorHex}>#D6ECFC</p>
    </div>
  </div>
  <div className={styles.column}>
    <h4>Byzantine</h4>
    <div className={styles.color + ' ' + styles.colorprimary + ' ' + styles.byzantine}>
      <p className={styles.colorName}>$byzantine</p>
      <p className={styles.colorHex}>#AB3EA0</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinedarkest}>
      <p className={styles.colorName}>$byzantine-darkest</p>
      <p className={styles.colorHex}>#511D4C</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinedark}>
      <p className={styles.colorName}>$byzantine-dark</p>
      <p className={styles.colorHex}>#7E2E76</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinelight}>
      <p className={styles.colorName}>$byzantine-light</p>
      <p className={styles.colorHex}>#C661BB</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinelightest + ' ' + styles.textblack}>
      <p className={styles.colorName}>$byzantine-lightest</p>
      <p className={styles.colorHex}>#C661BB</p>
    </div>
  </div>
  <div className={styles.column}>
    <h4>Money Green</h4>
    <div className={styles.color + ' ' + styles.colorprimary + ' ' + styles.moneygreen}>
      <p className={styles.colorName}>$money-green</p>
      <p className={styles.colorHex}>#609F00</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreendarkest}>
      <p className={styles.colorName}>$money-green-darkest</p>
      <p className={styles.colorHex}>#1F3A00</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreendark}>
      <p className={styles.colorName}>$money-green-dark</p>
      <p className={styles.colorHex}>#336200</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreenlight + ' ' + styles.textblack}>
      <p className={styles.colorName}>$money-green-light</p>
      <p className={styles.colorHex}>#8BC03B</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreenlightest + ' ' + styles.textblack}>
      <p className={styles.colorName}>$money-green-lightest</p>
      <p className={styles.colorHex}>#DBEDC0</p>
    </div>
  </div>
  <div className={styles.column}>
    <h4>Cobalt Blue</h4>
    <div className={styles.color + ' ' + styles.colorprimary + ' ' + styles.cobaltblue}>
      <p className={styles.colorName}>$cobalt-blue</p>
      <p className={styles.colorHex}>#609F00</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluedarkest}>
      <p className={styles.colorName}>$cobalt-blue-darkest</p>
      <p className={styles.colorHex}>#1F3A00</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluedark}>
      <p className={styles.colorName}>$cobalt-blue-dark</p>
      <p className={styles.colorHex}>#336200</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluelight + ' ' + styles.textblack}>
      <p className={styles.colorName}>$cobalt-blue-light</p>
      <p className={styles.colorHex}>#8BC03B</p>
    </div>
    <div className={styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluelightest + ' ' + styles.textblack}>
      <p className={styles.colorName}>$cobalt-blue-lightest</p>
      <p className={styles.colorHex}>#DBEDC0</p>
    </div>
  </div>
</div>;

class FormElements extends React.Component {
  constructor() {
    super();
    this.state = {
      textAreaValue: "",
      radioBtnValue: "",
      checkBoxFields: {
        checkbox1: false,
        checkbox2: false,
        checkbox3: false
      }
    };
  }

  handleTextAreaChange(e) {
    this.setState({textAreaValue: e.target.value})
  }

  handleRadioBtnChange(newValue) {
    this.setState({radioBtnValue: newValue})
  }

  handleCheckBoxChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.checked;
    console.log(newState)
    this.setState({
      checkBoxFields: {
        ...this.state.checkBoxFields,
        ...newState
      }
    })
  }

  render() {
    let radioButtonOptions = [
      {
        value: "Less than 1 year",
        text: "Less than 1 year"
      }, {
        value: "1-2 years",
        text: "1-2 years"
      }, {
        value: "2-5 years",
        text: "2-5 years"
      }, {
        value: "5+ years",
        text: "5+ years"
      }
    ]

    return (
      <div className={styles.formElements}>
        <div className={styles.inputContainer}>
          <TextInput id="lender-match-zero" errorText={"Please enter the correct thing."} label="What is the normal state?" validationState={""}/>
          <TextInput id="lender-match-one" errorText={"Please enter the correct thing."} label="What is the success state?" validationState={"success"} value="Good Data" onChange={() => {}}/>
          <TextInput id="lender-match-four" errorText={"Please enter the correct thing."} label="What does it look like without a success icon?" validationState={"success"} showSuccessIcon={false} value="Good Data" onChange={() => {}}/>
          <TextInput id="lender-match-two" errorText={"Please enter the correct thing."} label="What does the error state look like?" validationState={"error"} value="Bad Data" onChange={() => {}}/>
          <TextInput id="lender-match-three" errorText={"Please enter the correct thing."} label="What does it look like with an error icon?" validationState={"error"} showErrorIcon={true} value="Bad Data" onChange={() => {}}/>
          <TextArea id="lender-match-textarea-1" errorText={"Please enter the correct thing."} onChange={(e) => {
            this.handleTextAreaChange(e)
          }} value={this.state.textAreaValue} label="Describe how you plan to use these funds" name="loanDescription" validationState={""} placeholder="I plan to purchase a larger oven to double the number of pizzas I can serve in an hour..."/>
          <TextArea id="lender-match-textarea-2" errorText={"Please enter the correct thing."} onChange={(e) => {
            this.handleTextAreaChange(e)
          }} value={this.state.textAreaValue} label="TextArea with success" name="loanDescription" validationState={"success"} placeholder="Notice the success state"/>
          <TextArea id="lender-match-textarea-3" errorText={"Please enter the correct thing."} onChange={(e) => {
            this.handleTextAreaChange(e)
          }} value={this.state.textAreaValue} label="TextArea with error" name="loanDescription" validationState={"error"} placeholder="Notice the error state"/>

          <RadioBtnGroup gropuId="lender-match-radio-1" errorText={"Please enter the correct thing."} onChange={(e) => {
            this.handleRadioBtnChange(e)
          }} value={this.state.radioBtnValue} label="How much experience do you have?" name="industryExperience" validationState={""} options={radioButtonOptions}/>
          <label style={{
            marginTop: "40px"
          }}>Select all that apply to you:</label>
          <Checkbox id="lender-match-checkbox-1" name="checkbox1" label="This is the first checkbox" handleChange={(e) => {
            this.handleCheckBoxChange(e)
          }} checked={this.state.checkBoxFields.checkbox1}/>
          <Checkbox id="lender-match-checkbox-2" name="checkbox2" label="This is the second checkbox" handleChange={(e) => {
            this.handleCheckBoxChange(e)
          }} checked={this.state.checkBoxFields.checkbox2}/>
          <Checkbox id="lender-match-checkbox-3" name="checkbox3" label="This is the third checkbox" handleChange={(e) => {
            this.handleCheckBoxChange(e)
          }} checked={this.state.checkBoxFields.checkbox3}/>
        </div>
      </div>
    );
  }
}

export {FormElements}
