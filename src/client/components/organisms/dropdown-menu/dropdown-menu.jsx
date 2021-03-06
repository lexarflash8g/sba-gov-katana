import React from 'react'
import { isEmpty } from 'lodash'
import classNames from 'classnames'

import styles from './dropdown-menu.scss'
import clientConfig from '../../../services/client-config'
import { Link, Button, UtilityLink } from 'atoms'
import { PageLinkGroup } from 'molecules'
import { determineMainMenuTitleLink, getLanguageOverride } from '../../../services/utils'
import { TRANSLATIONS } from '../../../translations'

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props)
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
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 13) {
      this.props.onSkipToNext(event)
      event.preventDefault()
    }
  }

  render() {
    const {
      featuredCallout,
      hasNext,
      id,
      links,
      menuId,
      onFinalBlur,
      shown,
      target,
      text,
      title
    } = this.props

    let indent = false
    let shouldShowCallToAction = false

    if (menuId === 0) {
      shouldShowCallToAction = true
    }

    if (menuId === 1) {
      indent = !featuredCallout
    }

    // if (menuId === 4) {
    //   sizingStyle = clientConfig.localAssistMenuHeight ? styles.fiveTallLocalAssistMenuHeight : styles.five
    // }

    const ulStyles = classNames({
      [styles.dropdownMenu]: true,
      [styles.show]: shown,
      [styles.hide]: !shown
    })

    if (!isEmpty(links)) {
      const langCode = getLanguageOverride(true)
      const pageLinkGroups = links.map((data, index) => {
        const children = data.children || []
        const mappedChildren = children.map(function(item) {
          const childTitleLinkData = determineMainMenuTitleLink(langCode, item)
          return {
            url: childTitleLinkData.link,
            text: childTitleLinkData.linkTitle
          }
        })

        const isLastGroup = index === links.length - 1 && !shouldShowCallToAction
        const titleLinkData = determineMainMenuTitleLink(langCode, data)
        return (
          <PageLinkGroup
            key={index}
            id={id + '-group-' + index}
            title={titleLinkData.linkTitle}
            titleLink={titleLinkData.link}
            isLastGroup={isLastGroup}
            onFinalBlur={onFinalBlur.bind(this)}
            links={mappedChildren}
            indent={indent}
          />
        )
      })

      const goToNextButton = hasNext ? (
        <ul className={styles.skipLink}>
          <UtilityLink
            id={id + '-go-to-next'}
            visible={this.state.goToNextSectionShown}
            text="Go to Next Section"
            onKeyDown={event => this.handleSkipLinkKeyDown(event)}
            onFocus={event => this.handleGoToNextFocus(event)}
            onBlur={event => this.handleGoToNextBlur(event)}
          />
        </ul>
      ) : (
        <ul className={styles.skipLink}>
          <UtilityLink
            id={id + '-go-to-main-content'}
            visible={this.state.goToNextSectionShown}
            text="Go to Main Content"
            onKeyDown={event => {
              if (event.keyDown === 13) {
                location.href = '#main-content'
              }
            }}
            onFocus={event => this.handleGoToNextFocus(event)}
            onBlur={event => this.handleGoToNextBlur(event)}
          />
        </ul>
      )

      const { headline, link, linkText } = TRANSLATIONS.tenStepsNavigationCta[langCode]

      return (
        <ul id={id} key={1} aria-label="submenu" className={ulStyles}>
          {goToNextButton}
          <div className={styles.columns}>{pageLinkGroups}</div>
          {shouldShowCallToAction ? (
            <div className={styles.callToAction}>
              <h6>{headline}</h6>
              <Button children={linkText} url={link} secondary />
            </div>
          ) : null}
          {featuredCallout ? (
            <div className={styles.featuredCallout}>
              <Link to={target} title={title}>
                <img src="/assets/image/disaster.png" alt={text} title={title} />
                <p>{text}</p>
              </Link>
            </div>
          ) : null}
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
