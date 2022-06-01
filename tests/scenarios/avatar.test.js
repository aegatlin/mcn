// import assert from 'node:assert/strict'
// import test from 'node:test'
// import { tarquin } from '../../index.js'

// /*
// Scenario:

// You have an Avatar component that can receive text or an imgSrc, and which
// has three size, small medium and large. A text avatar will apply different
// text sizes based on avatar size, as well as base text styles, while an
// image avatar is simpler and will just apply img styles.
// */

// test('avatar scenario', () => {
//   // Pretending to be a ts enum
//   const AvatarSize = {
//     Large: 0,
//     Medium: 1,
//     Small: 2,
//   }

//   const c = tarquin({
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

//   assert(c({ type: 'image', size: AvatarSize.Small }), 'b ti ss')
//   assert(c({ type: 'text', size: AvatarSize.Large }), 'b ttb ttsl sl')
// })
