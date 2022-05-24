# Tarquin

Tarquin is a multi-modal classnames management utility with a simple interface.

Put simply: it helps you manage classnames.

```js
import { tarquin } from 'tarquin'

const c = tarquin({
  base: 'b1 b2',
  disabled: {
    true: 't',
    false: 'f',
  },
})

c({ disabled: true }) // 'b1 b2 t'
c({ disabled: false }) // 'b1 b2 f'
c() // Error: Registered mode not provided: disabled
```

## Terminology

In the example above, the modes are 'base', and 'disabled'. 'disabled' has two modalities, 'true' and 'false', while 'base' has a single modality, represented by a string.

Each classnames group has an arbitrary number of modes with each mode having an arbitrary number of modalities.

Modalities come in three types: objects, strings, and functions.

## Examples

Internally, tarquin passes your classes through a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to remove duplication. (That said, tarquin is **not** stateful. Instead of classes, tarquin uses lightweight curried functions.)

```js
const c = tarquin('simple classes no duplicates no no')
c() // 'simple classes no duplicates'
```

Tarquin modes are arbitrary

```js
const c = tarquin({
  base: 'b',
  default: 'd',
  madeUp: 'mu',
  whatever: {
    your: 'y',
    heart: 'h',
    desires: 'de',
  },
})

c({ whatever: 'heart' }) // 'b d mu h'
```

Tarquin manages all the modalities of your classnames in a single place.

```js
const c = tarquin({
  base: 'b',
  disabled: {
    true: 'dt',
    false: 'df',
  },
  checked: {
    true: 'ct',
    false: 'cf',
  },
  size: {
    small: 'ss',
    medium: 'sm',
    large: 'sl',
  },
})

function component({disabled = false, checked = true, size = 'large}) {
  return c({disabled, checked, size})
}

component() // 'b df ct sl'
component({disabled: true, size: 'small'}) // 'b dt ct ss'
```

Tarquin also allows you to compose modalities easily by passing in a function mode. This will let you do things like define a multi-modal shadow behavior once, and use it in multiple places easily.

```js
const shadow = tarquin({
  disabled: {
    false: 'shadow-lg hover:shadow-xl',
  },
})

function component({ disabled = false }) {
  const c = tarquin({
    shadow,
    base: 'b',
    disabled: {
      true: 'dt',
      false: 'df',
    },
  })

  return c({ disabled })
}

component() // 'shadow-lg hover:shadow-xl b df'
component({ disabled: true }) // 'b dt'
```

## Experimental

This is currently an experimental project. The API is still in flux, and feedback is appreciated.
