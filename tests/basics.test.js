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

test('creates classes with just a string as input', () => {
  const c = tarquin('a b')
  assert.equal(c(), 'a b')
})

test('remove duplicate classes', () => {
  const a = tarquin({ base: 'a', disabled: { true: 't a', false: 'a' } })
  assert.equal(a({ disabled: false }), 'a')
  assert.equal(a({ disabled: true }), 'a t')

  const b = tarquin('a a')
  assert.equal(b(), 'a')
})

test('throws error when registered mode is not provided', () => {
  const c = tarquin({
    base: 'b',
    disabled: {
      true: 't',
      false: 'f',
    },
  })

  assert.throws(
    () => {
      c()
    },
    { message: 'Registered mode not provided: disabled' }
  )
})

test('throws error when just one of many registered modes are not provided', () => {
  const c = tarquin({
    base: 'b',
    d: {
      true: 't',
      false: 'f',
    },
    missingMode: {
      some: 's',
      thing: 't',
    },
  })

  assert.throws(
    () => {
      c({ d: true })
    },
    { message: 'Registered mode not provided: missingMode' }
  )
})
