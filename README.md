# Clxss

Clxss helps you maintain HTML element classes.

```js
const checkboxClxss = Clxss.base('b1 b2')
  .add('a1 a2')
  .mode('disabled', {
    true: 'dt1 dt2',
    false: 'df1 df2',
  })
  .modes({
    checked: {
      true: 'ct1 ct2',
      false: 'cf1 cf2',
    },
    size: {
      small: 'ss1 ss2',
      medium: 'sm1 sm2',
      large: 'sl1 sl2',
    },
  })

const checkbox = document.getElementById('checkbox-id')

let disabled = true
let checked = false
let size = 'small'
checkbox.className = checkboxClxss.put({ disabled, checked, size })

let disabled = false
let checked = true
let size = 'large'
checkbox.className = checkboxClxss.put({ disabled, checked, size })
```
