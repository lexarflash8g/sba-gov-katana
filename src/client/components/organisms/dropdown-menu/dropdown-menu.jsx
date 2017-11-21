import React from 'react'
import { isEmpty } from 'lodash'

import styles from './dropdown-menu.scss'
import { FeaturedCallout, UtilityLink } from 'atoms'
import { PageLinkGroup, SmallInverseCta } from 'molecules'
import clientConfig from '../../../services/client-config.js'
import constants from '../../../services/constants.js'

class DropdownMenu extends React.Component {
  constructor(props) {
    super()
    this.state = {
      goToNextSectionShown: false
    }
  }

  highestLeafIndex = -1

  handleGoToNextFocus(event) {
    event.preventDefault()
    this.setState({ goToNextSectionShown: true })
  }

  handleGoToNextBlur(event) {
    event.preventDefault()
    this.setState({ goToNextSectionShown: false })
  }

  handleSkipLinkKeyDown(event, menuIndex) {
    let code = event.keyCode ? event.keyCode : event.which
    if (code === 13) {
      this.props.onSkipToNext(event)
      event.preventDefault()
    }
  }

  render() {
    let sizingStyle = ''
    let indent = false
    let menuId = this.props.menuId
    let smallInverseCta = false
    if (menuId === 0) {
      sizingStyle = styles.one
      smallInverseCta = true
    }
    if (menuId === 1) {
      sizingStyle = this.props.featuredCallout ? styles.twoWithFeaturedCallout : styles.two
      indent = this.props.featuredCallout ? false : true
    }
    if (menuId === 2) {
      sizingStyle = styles.three
    }
    if (menuId === 3) {
      sizingStyle = styles.four
    }
    if (menuId === 4) {
      sizingStyle = styles.five
    }
    if (menuId === 5) {
      sizingStyle = styles.six
    }

    let businessGuideCtaData = {
      url: constants.routes.tenSteps,
      buttonText: 'See the guide',
      actionText: 'Not sure where to start? Start your business in 10 steps.',
      eventCategory: 'Ten Steps CTA',
      eventLabel: 'Inverse Small'
    }

    if (!isEmpty(this.props.links)) {
      let pageLinkGroups = this.props.links.map((data, index) => {
        let children = data.children || []
        let mappedChildren = children.map(function(item) {
          return { url: item.link, text: item.linkTitle }
        })

        const isLastGroup = index === this.props.links.length - 1 && !smallInverseCta

        return (
          <PageLinkGroup
            key={index}
            id={this.props.id + '-group-' + index}
            title={data.linkTitle}
            titleLink={data.link}
            isLastGroup={isLastGroup}
            onFinalBlur={this.props.onFinalBlur.bind(this)}
            links={mappedChildren}
            indent={indent}
          />
        )
      })

      const goToNextButton = this.props.hasNext ? (
        <ul className={styles.skipLink}>
          <UtilityLink
            id={this.props.id + '-go-to-next'}
            visible={this.state.goToNextSectionShown}
            text="Go to Next Section"
            onKeyDown={event => this.handleSkipLinkKeyDown(event)}
            onFocus={event => this.handleGoToNextFocus(event)}
            onBlur={event => this.handleGoToNextBlur(event)}
          />
        </ul>
      ) : (
        undefined
      )
      return (
        <ul
          id={this.props.id}
          key={1}
          aria-label="submenu"
          className={
            styles.dropdownMenu + ' ' + sizingStyle + ' ' + (this.props.shown ? styles.show : styles.hide)
          }
        >
          {goToNextButton}
          {pageLinkGroups}
          {this.props.featuredCallout ? <FeaturedCallout {...this.props.featuredCallout} /> : undefined}
          {smallInverseCta ? (
            <div className={styles.businessGuideCTA}>
              <SmallInverseCta {...businessGuideCtaData} />
            </div>
          ) : (
            undefined
          )}
        </ul>
      )
    } else {
      return <div />
    }
  }
}

DropdownMenu.defaultProps = {
  menuId: 0,
  shown: false,
  data: [],
  onSkipToNext: function() {},
  onFinalBlur: function() {}
}

export default DropdownMenu