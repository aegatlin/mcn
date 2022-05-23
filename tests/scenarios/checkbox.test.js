import assert from 'node:assert/strict'
import test from 'node:test'
import { Clxss } from '../../index.js'
/* 
You want to style a checkbox based on disabled boolean, checked boolean, and a 
3-nary of size of small, medium, large. Lastly, it is provided a classes string.
*/

test('checkbox scenario', () => {
  const givenClasses = 'g1 g2 g3'
  const baseClasses = 'b1 b2 b3'
  const disabledMode = {
    disabled: {
      true: 'dt1 dt2',
      false: 'df1 df2',
    },
  }
  const checkedMode = {
    checked: {
      true: 'ct1 ct2',
      false: 'cf1 cf2',
    },
  }
  const sizeMode = {
    size: {
      small: 'ss1 ss2',
      medium: 'sm1 sm2',
      large: 'sl1 sl2',
    },
  }

  const classes = Clxss.base(baseClasses, givenClasses).modes({
    ...disabledMode,
    ...checkedMode,
    ...sizeMode,
  })

  const state1 = { disabled: true, checked: false, size: 'large' }
  const expectedClasses1 = 'g1 g2 g3 b1 b2 b3 dt1 dt2 cf1 cf2 sl1 sl2'
  assert(matchingClasses(classes.put(state1), expectedClasses1))
})

function matchingClasses(c1, c2) {
  const a1 = c1.split(' ')
  const a2 = c2.split(' ')
  return a1.every((e1) => a2.some((e2) => e1 == e2))
}
