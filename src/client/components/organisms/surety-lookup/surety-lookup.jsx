import React from 'react'
import { castArray, filter, intersection, isEmpty, sortBy } from 'lodash'

import style from './surety-lookup.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { MultiSelect } from 'atoms'
import { CardGrid, Paginator } from 'molecules'

const PAGE_SIZE = 9

class SuretyLookup extends React.Component {
  constructor(ownProps) {
    super()
    this.state = {
      filteredContacts: sortBy(ownProps.items, 'title') || [],
      suretyState: null,
      pageNumber: 1,
      numberOfTimesUserHasSelectedAState: 0,
      states: {
        name: 'state',
        terms: []
      }
    }
  }

  async componentWillMount() {
    const states = await this.fetchStates()

    if (states) {
      this.setState({
        states: states
      })
    }
  }

  componentWillReceiveProps(nextProps, ownProps) {
    this.setState({
      filteredContacts: sortBy(nextProps.items, 'title')
    })
  }

  async fetchStates() {
    let states
    const result = await fetchSiteContent('taxonomys', {
      names: 'state'
    })

    if (result.length > 0) {
      const { name, terms } = result[0]
      states = { name, terms }
    }

    return states
  }

  handleSelect(e) {
    const newValue = e.value
    this.setState(
      {
        suretyState: e.value,
        numberOfTimesUserHasSelectedAState: this.state.numberOfTimesUserHasSelectedAState + 1,
        pageNumber: 1
      },
      () => {
        this.filterContacts()
        if (this.props.afterChange) {
          this.props.afterChange('surety-lookup', newValue, this.state.numberOfTimesUserHasSelectedAState)
        }
      }
    )
  }

  filterContacts() {
    let filteredContacts
    if (this.state.suretyState === 'All') {
      filteredContacts = this.props.items
    } else {
      filteredContacts = filter(this.props.items, agency => {
        return !isEmpty(intersection(castArray(agency.stateServed), castArray(this.state.suretyState)))
      })
    }
    filteredContacts = sortBy(filteredContacts, ['title'])
    this.setState({ filteredContacts: filteredContacts })
  }

  multiSelectProps() {
    const options = this.state.states.terms.map(state => {
      return { label: state, value: state }
    })
    options.push({ label: '', value: null })
    options.unshift({ label: 'All', value: 'All' })
    return {
      id: 'surety-state-select',
      label: 'Show surety agencies licensed in',
      name: 'surety-state-select',
      options: options
    }
  }

  handleBack() {
    this.setState({
      pageNumber: Math.max(1, this.state.pageNumber - 1)
    })
  }

  handleForward() {
    this.setState({
      pageNumber: Math.min(
        Math.max(1, Math.ceil(this.state.filteredContacts.length / PAGE_SIZE)),
        this.state.pageNumber + 1
      )
    })
  }

  renderCard(data, index) {
    return (
      <div id={'surety-card' + index} className={style.card}>
        <h4 className={style.title}>{data.title}</h4>
        <div className={style.phoneContainer}>
          <i className={style.phoneIcon + ' fa fa-phone'} aria-hidden="true" />
          <span>{data.phoneNumber}</span>
        </div>
        <div>
          <i className={style.emailIcon + ' fa fa-envelope-o'} aria-hidden="true" />
          <a href={'mailto:' + data.email}>Email</a>
        </div>
      </div>
    )
  }

  renderCardContainer() {
    if (!isEmpty(this.state.filteredContacts)) {
      const start = (this.state.pageNumber - 1) * PAGE_SIZE
      const slice = this.state.filteredContacts.slice(start, start + PAGE_SIZE)
      return <CardGrid cards={slice} renderCard={this.renderCard} />
    } else if (isEmpty(this.state.filteredContacts)) {
      return <EmptyContacts />
    } else {
      return 'Loading'
    }
  }

  render() {
    return (
      <div id={'surety-lookup'}>
        <div className={style.banner}>
          <h2>Contact a surety bond agency</h2>
          <h5 className={style.blurb}>
            Check the database of surety agencies that offer SBA-guaranteed bonds. Contact a surety agency
            in your state to get started with the application process.
          </h5>
          <div className={style.multiSelect}>
            <MultiSelect
              {...this.multiSelectProps()}
              onChange={e => this.handleSelect(e)}
              value={this.state.suretyState}
              onBlur={() => {
                return null
              }}
              onFocus={() => {
                return null
              }}
              validationState=""
              errorText=""
              autoFocus={false}
              multi={false}
            />
          </div>
        </div>

        <div className={style.cardContainer}>{this.renderCardContainer()}</div>
        <div className={style.paginator}>
          <Paginator
            pageNumber={this.state.pageNumber}
            pageSize={PAGE_SIZE}
            total={this.state.filteredContacts.length}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const EmptyContacts = () => (
  <div className={style.emptyContacts}>
    <div>No surety agencies found</div>
  </div>
)

export default SuretyLookup
