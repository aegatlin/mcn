// import assert from 'node:assert/strict'
// import test from 'node:test'
// import { scn } from '../../index.js'

// /*
// Scenario:

// You have an Avatar component that can receive text or an imgSrc, and which
// has three size, small medium and large. A text avatar will apply different
// text sizes based on avatar size, as well as base text styles, while an
// image avatar is simpler and will just apply img styles.
// */

// // Pretending to be a ts enum
// const AvatarSize = {
//   Large: 0,
//   Medium: 1,
//   Small: 2,
// }

// test('avatar scenario', () => {
//   const c = scn({
//     base: 'b',
//     type: {
//       image: 'ti',
//       text: {
//         base: 'ttb',
//         size: {
//           [AvatarSize.Large]: 'ttsl',
//           [AvatarSize.Medium]: 'ttsm',
//           [AvatarSize.Small]: 'ttss',
//         },
//       },
//     },
//     size: {
//       [AvatarSize.Large]: 'sl',
//       [AvatarSize.Medium]: 'sm',
//       [AvatarSize.Small]: 'ss',
//     },
//   })

//   assert.equal(c({ type: 'image', size: AvatarSize.Small }), 'b ti ss')
//   assert.equal(c({ type: 'text', size: AvatarSize.Large }), 'b ttb ttsl sl')
// })

// test('avatar scenario two', () => {
//   const withSize = {
//     size: {
//       [AvatarSize.Large]: 'sl',
//       [AvatarSize.Medium]: 'sm',
//       [AvatarSize.Small]: 'ss',
//     },
//   }

//   const withType = {
//     type: {
//       image: 'ti',
//       text: {
//         size: {
//           [AvatarSize.Large]: 'ttsl',
//           [AvatarSize.Medium]: 'ttsm',
//           [AvatarSize.Small]: 'ttss',
//         },
//       },
//     },
//   }

//   const c = scn(withSize, withType, { base: 'b' })

//   assert.equal(c({ size: AvatarSize.Small, type: 'image' }), 'b ti ss')
//   assert.equal(
//     c({ size: AvatarSize.Large, type: 'text' }),
//     'b ttb ttsl sm bllah blah'
//   )
// })
