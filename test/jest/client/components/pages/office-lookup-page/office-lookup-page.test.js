import React from 'react'
import { shallow } from 'enzyme'
import OfficeLookupPage from 'pages/office-lookup-page/office-lookup-page.jsx'
import SearchTemplate from '../../../../../../src/client/components/templates/search/search'
import Results from '../../../../../../src/client/components/organisms/results/results.jsx'
import OfficeResult from '../../../../../../src/client/components/organisms/office-result/office-result'
import DefaultOfficeResult from '../../../../../../src/client/components/organisms/office-result/default-office-result'
import { TaxonomyMultiSelect } from 'atoms'
var sinon = require('sinon')
import * as helper from 'client/fetch-content-helper'

describe('OfficeLookupPage', () => {
  let stubFetchSiteContent
  beforeAll(done => {
    stubFetchSiteContent = sinon.stub(helper, 'fetchSiteContent')
    done()
  })

  afterAll(done => {
    stubFetchSiteContent.restore()
    done()
  })

  beforeEach(done => {
    history.pushState({}, null, '?lang=en')
    stubFetchSiteContent.reset()
    done()
  })

  // when OfficeLookUp page renders
  // is the TaxonomyMultiSelect component available?
  it('should detect one TaxonomyMultiSelect component', () => {
    stubFetchSiteContent.returns(Promise.resolve([]))
    const component = shallow(<OfficeLookupPage />)
    expect(component.find(TaxonomyMultiSelect)).toHaveLength(1)
  })

  it('should render Results', () => {
    const mockResults = [
      {
        id: '17660',
        fields: {
          location_city: ['Baltimore'],
          location_phone_number: ['410-962-4539'],
          location_zipcode: ['21201'],
          location_name: ['Baltimore U.S. Export Assistance Center'],
          location_fax: ['410-962-4529'],
          location_state: ['MD'],
          title: ['Baltimore U.S. Export Assistance Center'],
          office_type: ['U.S. Export Assistance Center'],
          geolocation: ['39.286447,-76.619681'],
          office_website: ['http://export.gov/maryland/'],
          type: ['office'],
          location_street_address: ['300 West Pratt Street, Suite 300 ']
        },
        exprs: {
          distance: 0.983913464330374
        }
      },
      {
        id: '17669',
        fields: {
          location_city: ['Baltimore'],
          location_phone_number: ['410-962-4539'],
          location_zipcode: ['21201'],
          location_name: ['Baltimore U.S. Export Assistance Center'],
          location_fax: ['410-962-4529'],
          location_state: ['MD'],
          title: ['Baltimore U.S. Export Assistance Center'],
          office_type: ['U.S. Export Assistance Center'],
          geolocation: ['39.286447,-76.619681'],
          office_website: ['http://export.gov/maryland/'],
          type: ['office'],
          location_street_address: ['300 West Pratt Street, Suite 300 ']
        },
        exprs: {
          distance: 0.983913464330374
        }
      }
    ]

    const mockResults2 = []

    stubFetchSiteContent.returns(Promise.resolve([]))
    const component = shallow(<OfficeLookupPage />)
      .find(SearchTemplate)
      .dive()
    component.setState({ results: mockResults, isZeroState: false })
    component.update()

    expect(component.find(Results)).toHaveLength(1)
    expect(component.find(OfficeResult)).toHaveLength(1)
    expect(component.find(DefaultOfficeResult)).toHaveLength(0)

    console.log(component.html())
    console.log(component.debug())
  })
})
