import React, { PropTypes } from 'react'
import { kebabCase } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './homepage.scss'
import * as LoadingActions from '../../../actions/loading'
import { fetchSiteContent, fetchRestContent } from '../../../fetch-content-helper'
import { FrontPageHero } from 'organisms'
import { makeParagraphs, wrapParagraphs } from '../paragraph-mapper'
import { findSection } from '../../../services/menu'

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  static propTypes = {
    // TODO: PropTypes.shape({})
    removeLoader: PropTypes.func.isRequired
  }

  async fetchHomepageData() {
    const siteMap = await fetchSiteContent('siteMap')
    const homepageNodeId = findSection(siteMap, 'home-page')
    if (homepageNodeId && homepageNodeId.node) {
      const homepageData = await fetchRestContent('node', homepageNodeId.node)
      return { data: homepageData, siteMap }
    }
  }

  componentDidMount() {
    const { removeLoader } = this.props
    this.fetchHomepageData()
      .then(result => this.setState(result))
      .then(() => removeLoader())
  }

  render() {
    const { data, siteMap } = this.state

    if (!data) {
      return null
    }

    const { buttons, hero, paragraphs } = data

    // Get the menu tile collection content
    const [{ siteSection }] = paragraphs.filter(({ type }) => type === 'panelMenu')
    const sectionData = findSection(siteMap, kebabCase(siteSection))

    const paragraphElements = wrapParagraphs(makeParagraphs(paragraphs, null, null, {}, sectionData), {
      other: styles.textSection,
      textSection: styles.textSection,
      sectionHeader: styles.sectionHeader,
      image: styles.image,
      callToAction: styles.callToAction,
      cardCollection: styles.cardCollection
    })

    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <FrontPageHero hero={hero} button={buttons[0]} />
        </div>
        {paragraphElements.map(element => {
          const {
            props: { id }
          } = element
          const sectionClassName = id.startsWith('panelMenu')
            ? styles.sectionPanelMenu
            : styles.sectionWithPadding
          return (
            <div className={sectionClassName} key={id}>
              {element}
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(LoadingActions, dispatch)
  }
}

export { Homepage }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage)
