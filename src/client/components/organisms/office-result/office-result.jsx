import React from 'react'
import styles from './office-result.scss'
import { Address, PhoneNumber } from 'molecules'
import { Button } from 'atoms'
import PropTypes from 'prop-types'
import clientConfig from '../../../services/client-config.js'
import marker from 'assets/svg/marker.svg'
import classNames from 'classnames'

class OfficeResult extends React.PureComponent {
  componentDidMount() {
    if (document) {
      const { id, length } = this.props
      if (id === `result-${length - 1}`) {
        document.querySelector('.search-info-panel').focus()
      }
    }
  }

  onClick(e) {
    this.props.showDetailState(e)
  }

  render() {
    const {
      id,
      item: { fields: item, exprs },
      hoveredMarkerId
    } = this.props
    const distance = exprs ? exprs.distance : null
    if (!item) {
      return null
    }

    const city = item.location_city ? item.location_city[0] : null
    const state = item.location_state ? item.location_state[0] : null

    const sbaOfficeNames = clientConfig.sbaOfficeNames
    const officeType = item.office_type ? item.office_type[0] : ''
    const isOfficialOffice = sbaOfficeNames.includes(officeType)
    const isFirstResult = id === 'result-0'
    const isHovered = this.props.item.id === hoveredMarkerId

    const cardLayoutClassName = classNames({
      'card-layout': true,
      [styles.officeResultContainer]: true,
      [styles.hoveredBorder]: isHovered,
      [styles.focus]: true
    })

    const innerDivClassName = classNames({
      [styles.officeResult]: true,
      [styles.hoveredInnerDiv]: isHovered,
      [styles.isFirstHoveredResult]: isHovered && isFirstResult,
      [styles.focus]: true
    })

    //elasticsearch returns all single value elements as an array *sigh*
    return (
      <a
        id={`office-result-container-${id}`}
        className={cardLayoutClassName}
        aria-label={item.title[0]}
        tabIndex="0"
        onMouseOver={() => {
          if (!isHovered) {
            this.props.onResultHover(this.props.item.id)
          }
        }}
        onFocus={() => {
          if (!isHovered) {
            this.props.onResultHover(this.props.item.id)
          }
        }}
        onMouseOut={() => {
          if (isHovered) {
            this.props.onResultHover({})
          }
        }}
        onBlur={() => {
          if (isHovered) {
            this.props.onResultHover({})
          }
        }}
        onClick={e => {
          e.preventDefault()
          this.onClick({
            item,
            distance
          })
        }}
        onKeyUp={obj => {
          const enterKeyCode = 13
          if (obj.keyCode === enterKeyCode) {
            this.onClick({
              item,
              distance
            })
          }
        }}
      >
        <div id={`office-result-${id}`} className={innerDivClassName}>
          <div>
            <div className={styles.distance}>
              <div>
                <img src={marker} className={styles.marker} />
              </div>
              <div id={`office-miles-${id}`} className={styles.miles}>
                {distance !== null ? (
                  <Distance distance={distance} />
                ) : (
                  <Location city={city} state={state} />
                )}
              </div>
              <div className={styles.clear} />
            </div>
            <div id={`office-title-${id}`}>
              <h2>
                <i className="fa fa-chevron-right" data-cy="open detail" />
                {item.title[0]}
              </h2>
            </div>
            <div id={`office-type-${id}`}>
              <div className={styles.officeType}>
                {isOfficialOffice && <i className={'fa fa-shield ' + styles.fa} />}
                <span>{officeType}</span>
              </div>
            </div>
          </div>
          <div>
            {item.office_service ? (
              <div className={styles.serviceList + ' service-list'}>
                {' '}
                <h3>Services</h3>
                <div>{item.office_service.join(', ')}</div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.hr}>
          <hr />
        </div>
      </a>
    )
  }
}

const Distance = ({ distance }) => <div>{`${Number(distance).toFixed(1)} miles`}</div>
const Location = ({ city, state }) => (
  <div>{`${[city, state].filter(item => item !== null).join(', ')}`}</div>
)

OfficeResult.defaultProps = {
  id: 'result',
  onClick: () => {},
  onResultHover: () => {}
}

OfficeResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string, //.isRequired
  onClick: PropTypes.func,
  onResultHover: PropTypes.func
}

export default OfficeResult
