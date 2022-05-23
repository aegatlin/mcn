# ClassModes

ClassModes is a multi-modal classnames management utility with a simple interface. 

Put simply: it helps you manage classnames.

```js
import {classModes} from 'classModes'

const c = classModes({
  base: 'b1 b2',
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

const checkbox = document.getElementById('checkbox-id')
checkbox.className = c({ disabled: true, checked: false, size: 'small' })
// 'b1 b2 dt cf ss'
checkbox.className = c({ disabled: false, checked: true, size: 'large' })
// 'b1 b2 df ct sl'
```

## Terminology

Each class has an arbitrary number of modes, and each mode has an arbitrary number of modalities. In the example above, the mode 'checked' has two modalities: true and false. The mode 'size' has three modalities: small, medium, large. The mode 'base' has one modality, expressed as a string.

## Parameterized Classes

The ClassModes object will treat any top-level string as a base class, so you can pass in parameterized classes however you'd like.

```ts
import { classModes } from 'classmodes'

const myComponent = (
  parameterClasses: string = 'p',
  disabled: boolean = false
) => {
  const c = classModes({
    parameterClasses,
    base: 'b',
    disabled: {
      true: 't',
      false: 'f',
    },
  })

  c({ disabled }) // with defaults: 'p b f'
}
```

This behavior also allows for nested complexity

```ts
const l1 = (disabled: boolean = false) => {
  const c = classModes({
    base: 'b1',
    disabled: {
      true: 't',
      false: 'f',
    },
  })

  return l2(c({ disabled }))
}

const l2 = (additionalClasses: string, size: string = 'large') => {
  const c = classModes({
    additionalClasses,
    base: 'b2'
    size: {
      small: 's',
      large: 'l',
    },
  })

  return c({ size }) // with defaults: 'b1 f b2 l'
}

// A slightly different construction could've resulted in the following shape:
// return c1({c2: c2({disabled}), size}) with the same results
```
