# mcn

mcn (modal class names) helps you manage classnames.

## How To

### Get Started

```sh
npm i mcn
```

```js
const classes = mcn({
  base: 'border',
  disabled: {
    false: 'border-blue-500',
    true: 'border-grey-500',
  },
})

classes({ disabled: false }) // 'border border-blue-500'
classes({ disabled: true }) // 'border border-grey-500'
classes({}) // Error: Registered mode not provided: disabled
```

### Add simple classes

```jsx
const c = mcn({ base: 'simple classes' })
c() // 'simple classes'
c({}) // 'simple classes'
```

### Add modal classes

```jsx
const c = mcn({ base: 'a', disabled: { true: 'b', false: 'c' } })
c({ disabled: false }) // 'a c'
```

## Explanation

Components consist of elements. The styles those elements have are dependent on the modalities of the component. For example, if a form field is invalid, a developer might want the label element text and the input element border to turn red, while if the component is disabled, they should both be grey, and otherwise black. Such a requirement can result in code that looks as follows:

```js
let label = 'font-xl'
let input = 'border'

// Using if-clauses
if (disabled) {
  label += ' font-grey'
  input += ' border-grey'
} else {
  label += ' font-black'
  input += ' border-black'
}

// Using ternaries
label += invalid ? ' font-red' : ' font-black'
input += invalid ? ' border-red' : ' border-black'
```

There are some problems with the above code: If you don't add whitespace the styles won't apply. You apply styles multiple times (and it's probably not worth the hassle of removing them). The places where you manipulate the string sprawls across multiple lines and leads to code drift, decentralizing the style manipulation and making the component harder to understand and reason about. The output string is essentially independent of the internal structure and functionality of the component, yet lives within it, increasing its size and decreasing its legibility.

`mcn` aims to solve these problems by centralizing the definitions of styles, and representing them in a way that respects the modalities of the component, and how they affect each element within.

```jsx
const classes = {
  parent: 'a b c',
  childOne: mcn({
    base: 'a b c',
    disabled: {
      false: 'f',
    },
  }),
  childTwo: mcn({
    base: 'd e f',
    disabled: {
      true: 't',
      false: 'f',
    },
    state: {
      [State.One]: 'one',
      [State.Two]: 'two',
      [State.Three]: 'three',
    },
  }),
}

const Component = ({ disabled, state }) => {
  return (
    <div className={classes.parent}>
      <div className={classes.childOne({ disabled })}>child one</div>
      <div className={classes.childTwo({ disabled, state })}>child two</div>
    </div>
  )
}
```
