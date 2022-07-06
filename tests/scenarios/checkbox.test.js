// import assert from 'node:assert/strict'
// import test from 'node:test'
// import { scn } from '../../index.js'

// /*
// Scenario:

// Style a checkbox based on disabled boolean, checked boolean, and a
// 3-nary of size of small, medium, large. Lastly, it is provided classes via a
// parameter called `givens`.
// */

// test('checkbox scenario', () => {
//   const givens = 'g'
//   const c = scn({
//     givens,
//     base: 'b1 b2',
//     disabled: {
//       true: 'dt',
//       false: 'df',
//     },
//     checked: {
//       true: 'ct',
//       false: 'cf',
//     },
//     size: {
//       small: 'ss',
//       medium: 'sm',
//       large: 'sl',
//     },
//   })

//   assert.equal(
//     c({ disabled: true, checked: false, size: 'large' }),
//     'g b1 b2 dt cf sl'
//   )

//   assert.equal(
//     c({ disabled: false, checked: true, size: 'small' }),
//     'g b1 b2 df ct ss'
//   )
// })
