import assert from 'node:assert/strict'
import test from 'node:test'
import { tarquin } from '../index.js'

test('creates classes from simple class-modes', () => {
  const c = tarquin({ base: 'a b' })
  assert.equal(c(), 'a b')
})

test('creates classes from multiple string-only class-modes', () => {
  const c = tarquin({ base: 'a', default: 'b', anything: 'c' })
  assert.equal(c(), 'a b c')
})

test('creates components with exceedingly minimal styles', () => {
  const c = tarquin({
    disabled: {
      false: 'f',
    },
  })

  assert.equal(c({ disabled: false }), 'f')
  assert.equal(c({ disabled: true }), '')
})

test('creates components with functionally-defined classes', () => {
  const a = tarquin({ default: 'a', disabled: { true: 'at', false: 'af' } })
  const b = tarquin({ a, base: 'b', disabled: { true: 'bt', false: 'bf' } })
  assert.equal(b({ disabled: true }), 'a at b bt')
  assert.equal(b({ disabled: false }), 'a af b bf')
})
