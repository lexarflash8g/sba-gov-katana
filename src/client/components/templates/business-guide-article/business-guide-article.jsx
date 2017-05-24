import React from 'react'
import styles from './business-guide-article.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx";
import ImageSection from "../../molecules/image-section/image-section.jsx";
import TitleSection from "../../molecules/title-section/title-section.jsx";
import FeedbackForm from "../../molecules/feedback-form/feedback-form.jsx";
import TextReadMoreSection from "../../molecules/text-readmore-section/text-readmore-section.jsx";
import Lookup from "../../molecules/lookup/lookup.jsx"
import CallToAction from "../../molecules/call-to-action/call-to-action.jsx"
import Breadcrumb from "../../molecules/breadcrumb/breadcrumb.jsx";
<<<<<<< HEAD
=======
import CardCollection from "../../molecules/card-collection/card-collection.jsx";
>>>>>>> 5f02ee9aa0dfc78eaa8c3893630c3d7fd01d825f

const ParagraphTypeToBeImplemented = ({data, index}) => {
  return (
    <p>{JSON.stringify(data)}</p>
  );
}

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  sectionHeaders = [];

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    this.sectionHeaders = [];
    paragraphs = paragraphData.map(function(item, index, paragraphArray) {
      let paragraphGridStyle = styles.textSection;
      let paragraph = (<ParagraphTypeToBeImplemented key={index} data={item} index={index}/>);
      if (item && item.type) {
        if (item.type === "readMore") {
          paragraph = (
            <div></div>
          )
        } else if (item.type === "textSection") {
          if (paragraphArray[index + 1] && paragraphArray[index + 1].type === "readMore") {
            paragraphGridStyle = styles.textSection;
            paragraph = (<TextReadMoreSection key={index} textSectionItem={item} readMoreSectionItem={paragraphArray[index + 1]}/>);
          } else {
            paragraphGridStyle = styles.textSection;
            // DOMPurify is loaded from a minimize script tag in the header due to issues with jsdom and webpack
            let cleaned = DOMPurify.sanitize(item.text);
            paragraph = (<TextSection key={index} text={cleaned}/>);
          }
        } else if (item.type === "sectionHeader") {
          let sectionHeaderId = "section-header-" + index;
          paragraphGridStyle = styles.sectionHeader;
          paragraph = (<SectionHeader key={index} refId={sectionHeaderId} text={item.text}/>);
          this.sectionHeaders.push({id: sectionHeaderId, text: item.text});
        } else if (item.type === "image") {
          paragraphGridStyle = styles.image;
          paragraph = (<ImageSection key={index} imageObj={item.image} captionText={item.captionText}/>);
        } else if (item.type === "lookup") {
          paragraphGridStyle = styles.lookup;
          paragraph = (<Lookup key={index} title={item.sectionHeaderText} type="contacts" subtype={item.contactCategory} display={item.display}/>);
        } else if (item.type === "callToAction") {
          paragraphGridStyle = styles.callToAction;
          paragraph = (<CallToAction key={index}
                                     size={item.style}
                                     headline={item.headline}
                                     blurb={item.blurb}
                                     image={item.image}
                                     imageAlt={item.imageAlt}
                                     btnTitle={item.btnTitle}
                                     btnUrl={item.btnUrl} />)
        } else if(item.type === "cardCollection"){
            paragraph = (<CardCollection key={index} cards={item.cards}/>);
        }
      }
      return (
        <div key={index} id={item.type + "-" + index} className={paragraphGridStyle}>{paragraph}</div>
      );
    }.bind(this));

    return paragraphs;
  }

  makeBreadcrumbs(lineage) {
    return _.map(lineage, (item) => {
      return {url: item.fullUrl, title: item.title}
    });
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    let breadcrumbs = this.props.lineage
      ? this.makeBreadcrumbs(this.props.lineage)
      : <div></div>;
    return (
      <div className={styles.container}>
        <div key={1} className={styles.breadcrumb}><Breadcrumb items={breadcrumbs}/></div>
        <TitleSection key={2} gridClass={styles.titleSection} sectionHeaders={this.sectionHeaders} title={this.props.title} summary={this.props.summary}/> {paragraphs}
        <div key={3} className={styles.feedback}><FeedbackForm/></div>

      </div>
    );
  }
}

export default BusinessGuideArticle;
