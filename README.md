# SCN

SCN (Structured Class Names) is a multi-modal classnames management utility with a simple interface. Put simply: it helps you manage classnames.

```jsx
import { scn } from 'scn'

const Component = ({ disabled }) => {
  const c = scn({
    base: 'b',
    disabled: {
      true: 't',
      false: 'f',
    },
  })

  return <div className={c({ disabled })}>Hey</div>
}

c({ disabled: true }) // 'b t'
c({ disabled: false }) // 'b f'
c({}) // Error: Registered mode not provided: disabled
c() // Error: Registered mode not provided: disabled
```

## Explanation

A common practice in frontend development is using class names to style elements. Often those classes will be styled conditionally based on the state of the component that the element exists within, e.g., different classes are applied to a `div` element within a component based on whether or not the component is disabled. This can result in code that looks as follows:

```js
let classes = 'a b'
classes += disabled ? ' d' : ' e'
```

While this might be manageable, I'd like to argue that it is not good code (though I've still written things like it countless times). As your component grows in complexity, it gets undeniably unwieldy. You are managing the conditional growth of a white-space sensitive string. The conditional growth is not inherently localized, and can occur anywhere in variable scope, leading to line drift. This makes it harder to read and reason about, and manipulate further.

SCN aims to solve the above problems by representing class names within the inherent modal structures of your component. You provide an object representing your component's modes, with each mode defining its modalities and classes, to `scn`. The returned function then will construct your classes string, provided an object of each mode and its particular modality.

```jsx
const Component = ({ disabled, checked, size }) => {
  const c = scn({
    base: 'b',
    disabled: {
      true: 'dt',
      false: 'df',
    },
    checked: {
      true: 'ct',
    },
    size: {
      [Size.Large]: 'sl',
      [Size.Medium]: 'sm',
      [Size.Small]: 'ss',
    },
  })

  return <div className={c({ disabled, checked, someThreeAry })}>hey</div>
}
```

## How-To

### Add simple classes

```jsx
const c = scn({ base: 'simple classes' })
c() // 'simple classes'
```

### Add modal classes

```jsx
const c = scn({ base: 'a', disabled: { true: 'b', false: 'c' } })
c({ disabled: false }) // 'a c'
```

### Add modes ahead of time

```jsx
const withShadow = {
  disabled: {
    true: 'no shadow',
    false: 'some shadow',
  },
}

const withHover = {
  disabled: {
    true: 'no hover',
    false: 'some hover',
  },
}

const Component = ({ disabled }) => {
  const c = scn(withShadow, withHover, {
    base: 'b',
    disabled: {
      true: 'dt',
      false: 'df',
    },
  })

  return <div className={c({ disabled })}>hey</div>
}
```

### Add modal classes to a complex component

```jsx
const Component = ({ disabled }) => {
  const parent = scn({ base: 'pb', disabled: { true: 'pdt', false: 'pdf' } })
  const childOne = scn({
    base: 'c1b',
    disabled: { true: 'c1dt', false: 'c1df' },
  })
  const childTwo = scn({
    base: 'c2b',
    disabled: { true: 'c2dt', false: 'c2df' },
  })

  return (
    <div className={parent({ disabled })}>
      <div className={childOne({ disabled })}></div>
      <div className={childTwo({ disabled })}></div>
    </div>
  )
}
```

### Keep code easy to read

Note that the initial structure is wholistic. Apart from `base`, all modes and modalities are arbitrary. You do not need to define your classes inside your component. You only need to run the final classes-generating function inside your component.

```jsx
const c = scn({ base: 'b', disabled: { true: 'dt', false: 'df' } })

const Component = ({ disabled }) => {
  return <div className={c({ disabled })}></div>
}
```

This creates a nice separation of concerns. When you want to think about styles wholistically, you can go to that part of the file, while the logic and structure stay nice and tidy within the component. Be aware, however, that your wholistic class structure is necessarily **coupled** to the structure of your component, so don't separate them too far apart. SCN's are per element, not per component. Changing the structure of your component means CRUD'ing elements, which means CRUD'ing your SCNs.
