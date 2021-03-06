import React, { PureComponent } from 'react'
import { isEmpty } from 'lodash'
import { Button, Link, SearchIcon, TextInput } from 'atoms'
import { Paginator, SuggestedRouteCard } from 'molecules'
import { fetchSiteContent } from '../../../fetch-content-helper'
import { logPageEvent } from '../../../services/analytics.js'
import styles from './search-page.scss'

const getQueryParams = search => {
  const decoded = decodeURIComponent(search)
  const formatted = decoded.replace(/\+/g, ' ')

  let searchTerm = formatted.split('q=')[1]
  if (!isEmpty(searchTerm)) {
    searchTerm = searchTerm.indexOf('&') !== -1 ? searchTerm.split('&')[0] : searchTerm
  } else {
    searchTerm = ''
  }

  let pageNumber = formatted.split('p=')[1]
  if (!isEmpty(pageNumber)) {
    pageNumber = Number(pageNumber.indexOf('&') !== -1 ? pageNumber.split('&')[0] : pageNumber)
    pageNumber = isNaN(pageNumber) ? 1 : pageNumber
  } else {
    pageNumber = 1
  }

  return {
    searchTerm,
    pageNumber
  }
}

class SearchPage extends PureComponent {
  constructor() {
    super()

    this.state = {
      searchTerm: '',
      newSearchTerm: '',
      searchResults: null,
      pageNumber: 1,
      pageSize: 10,
      itemCount: 0,
      start: 0
    }
  }

  componentWillMount() {
    // if there is are parameters
    if (!isEmpty(document.location.search)) {
      // on componentMount, pull search term from url
      const { searchTerm, pageNumber } = getQueryParams(document.location.search)

      // also, match the new search term to this current search term
      // this enables the input field and the submit button to function
      // as expected when the browser refreshes the page
      const newSearchTerm = searchTerm

      this.setState(
        {
          searchTerm,
          newSearchTerm,
          pageNumber
        },
        () => {
          let newStartValue = 0
          pageNumber > 1 ? (newStartValue = (pageNumber - 1) * 10) : (newStartValue = 0)

          fetchSiteContent('search', {
            term: searchTerm,
            pageNumber: pageNumber,
            pageSize: this.state.pageSize,
            start: newStartValue
          }).then(results => {
            let searchResults = []
            let itemCount = 0

            if (!isEmpty(results)) {
              searchResults = results.hits.hit
              itemCount = results.hits.found
            }

            const newState = {
              searchResults,
              itemCount
            }
            this.setState(newState)
          })
        }
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    // The SearchBar child component's browserHistory.push() call
    // triggers this componentWillReceiveProps() lifecyle method

    // on componentWillReceiveProps
    // get the search term from the React Router url
    const { searchTerm } = getQueryParams(nextProps.location.search)

    // update search results
    const { searchResults, itemCount } = nextProps

    const data = {
      searchTerm,
      searchResults,
      itemCount
    }

    this.setState(data)
  }

  /* eslint-disable no-invalid-this */
  updateSearchInputValue(value) {
    const input = document.getElementById('search')
    input.value = value
  }

  onSearchInputChange(newSearchTerm) {
    const encoded = encodeURIComponent(newSearchTerm)
    this.setState({ newSearchTerm: encoded })
  }

  onPageNumberChange(pageNumber) {
    if (pageNumber > 1) {
      this.setState({
        start: (pageNumber - 1) * 10
      })
    } else {
      this.setState({
        start: 0
      })
    }
    this.setState(
      {
        pageNumber
      },
      () => {
        this.onSubmit(true)
      }
    )
  }

  onSubmit(resetPageNumber) {
    const { newSearchTerm: term, pageNumber, pageSize, start } = this.state

    if (resetPageNumber === 1) {
      this.setState(
        {
          pageNumber: 1
        },
        function() {
          window.location.href = `/search/?p=${this.state.pageNumber}&q=${term}`
        }
      )
    }
    window.location.href = `/search/?p=${pageNumber}&q=${term}`
  }
  /* eslint-enable no-invalid-this */

  render() {
    const { searchTerm, newSearchTerm, searchResults } = this.state

    return (
      <div>
        <div className={styles.banner}>
          <h2>Search</h2>
          <div className={styles.searchBoxContainer}>
            <SearchBar
              searchTerm={searchTerm}
              newSearchTerm={newSearchTerm}
              onSearchInputChange={this.onSearchInputChange.bind(this)}
              onSubmit={this.onSubmit.bind(this)}
            />
          </div>
        </div>
        {!isEmpty(searchTerm) && (
          <div className={styles.searchResults}>
            <div>
              <SuggestedRouteCard searchTerm={searchTerm} />
            </div>
            <div>
              {searchResults && searchResults.length > 0 && (
                <div>
                  <ResultsList {...this.state} onPageNumberChange={this.onPageNumberChange.bind(this)} />
                </div>
              )}
              {!searchResults && (
                <div>
                  <p className="results-message">loading...</p>
                </div>
              )}
              {searchResults && searchResults.length === 0 && (
                <div>
                  <p className="results-message">
                    Sorry, we didn't find any results that matched your search.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const SearchBar = props => {
  const { searchTerm, newSearchTerm, onSearchInputChange, onSubmit } = props

  const submit = term => {
    props.actions.fetchContentIfNeeded('search', 'search', {
      term
    })
    window.location.href = `/search?q=${term}`
  }

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.textInputContainer}>
        <TextInput
          id="search"
          errorText={'Please enter the correct thing.'}
          label="What are you looking for?"
          validationState={''}
          defaultValue={searchTerm}
          onChange={obj => {
            onSearchInputChange(obj.target.value)
          }}
          onKeyDown={obj => {
            const enterKeyCode = 13
            if (obj.keyCode === enterKeyCode && newSearchTerm.length > 0) {
              onSubmit(1)
            }
          }}
          aria-controls="results-list"
        />
        <div className={styles.searchIcon}>
          <SearchIcon aria-hidden="true" />
        </div>
      </div>
      <div className={styles.searchButton}>
        <Button
          alternate
          aria-controls="results-list"
          id="submit-button"
          onClick={() => {
            if (newSearchTerm.length > 0) {
              onSubmit(1)
            }
          }}
          primary
        >
          Search
        </Button>
      </div>
    </div>
  )
}

const ResultsList = props => {
  const { searchTerm, pageNumber, pageSize, searchResults, itemCount, onPageNumberChange } = props

  const handleBack = () => {
    const newPageNumber = Math.max(1, pageNumber - 1)
    onPageNumberChange(newPageNumber)
    logPageEvent({
      category: 'Show-More-Results',
      action: 'Previous'
    })
  }

  const handleForward = () => {
    const newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / pageSize)), pageNumber + 1)
    onPageNumberChange(newPageNumber)
    logPageEvent({
      category: 'Show-More-Results',
      action: 'Next'
    })
  }

  const renderPaginator = section => {
    return (
      <div className={styles.paginator}>
        <Paginator
          id={`current-total-result-number-${section}`}
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={itemCount}
          onBack={() => {
            handleBack()
          }}
          onForward={() => {
            handleForward()
          }}
        />
      </div>
    )
  }

  const renderList = () => {
    return (
      <div className={styles.results}>
        {searchResults.map((item, index) => {
          let title
          let summary
          let url

          if (!isEmpty(item.fields)) {
            title = item.fields.title
            summary = item.fields.summary
            url = item.fields.url[0]
          }

          // only show results with URL
          if (url) {
            return (
              <div key={index} className={`${styles.result}  result-box`}>
                <div className={styles.title}>
                  <Link to={url} className="result-title">
                    {title}
                  </Link>
                </div>
                <div className={`${styles.summary} result-summary`}>{summary}</div>
                <Link to={url}>{url}</Link>
              </div>
            )
          }

          return null
        })}
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className={styles.searchTerm}>
          <h3 id="search-term-title">Search results for "{searchTerm}"</h3>
        </div>
      </div>
      <div role="region" id="results-list" aria-live="polite" aria-relevant="additions removals">
        {renderList()}
      </div>
      {renderPaginator('bottom')}
    </div>
  )
}

export default SearchPage

export { SearchPage, SearchBar, ResultsList }
