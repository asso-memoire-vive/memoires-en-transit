import React from 'react'
import { shallow } from 'enzyme'

import { TimeLine } from '../TimeLine'

describe('timeLine', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = {
        dates : [
          {
            start: 601257600,
            end: 957139200
          },
          {
            start: 957139200,
            end: 1217980800
          },
          {
            start: 601257600,
            end: 957139200
          },
          {
            start: 1217980800,
            end: 1219980800
          }

        ]
      }

      // when
      const wrapper = shallow(
        <TimeLine {...props}>
          <div />
        </TimeLine>
      )

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
