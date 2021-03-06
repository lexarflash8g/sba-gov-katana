import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Footer } from 'organisms'
import * as utils from '../../../../../../src/client/services/utils.js'

describe('Front Page Hero', () => {
  let stubGetLanguageOverride
  beforeAll(() => {
    stubGetLanguageOverride = sinon.stub(utils, 'getLanguageOverride')
    stubGetLanguageOverride.returns('en')
  })
  afterAll(() => {
    stubGetLanguageOverride.restore()
  })

  test('should render correctly', () => {
    const component = renderer.create(<Footer />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
