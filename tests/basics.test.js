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
