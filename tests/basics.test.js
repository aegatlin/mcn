import assert from 'node:assert/strict'
import test from 'node:test'
import { scn } from '../index.js'

test('creates classes from a simple base', () => {
  const c = scn({ base: 'a b' })
  assert.equal(c(), 'a b')
})

test('creates classes from multiple string-only class-modes', () => {
  const c = scn({ base: 'a', default: 'b', anything: 'c' })
  assert.equal(c(), 'a b c')
})

test('creates components with exceedingly minimal styles', () => {
  const c = scn({
    disabled: {
      false: 'f',
    },
  })

  assert.equal(c({ disabled: false }), 'f')
  assert.equal(c({ disabled: true }), '')
})

test('creates components with functionally-defined classes', () => {
  const a = scn({ default: 'a', disabled: { true: 'at', false: 'af' } })
  const b = scn({ a, base: 'b', disabled: { true: 'bt', false: 'bf' } })
  assert.equal(b({ disabled: true }), 'a at b bt')
  assert.equal(b({ disabled: false }), 'a af b bf')
})

test('creates classes with just a string as input', () => {
  const c = scn('a b')
  assert.equal(c(), 'a b')
})

test('remove duplicate classes', () => {
  const a = scn({ base: 'a', disabled: { true: 't a', false: 'a' } })
  assert.equal(a({ disabled: false }), 'a')
  assert.equal(a({ disabled: true }), 'a t')

  const b = scn('a a')
  assert.equal(b(), 'a')
})

test('throws error when registered mode is not provided', () => {
  const c = scn({
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

  assert.throws(
    () => {
      c({})
    },
    { message: 'Registered mode not provided: disabled' }
  )
})

test('throws error when just one of many registered modes are not provided', () => {
  const c = scn({
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

test('combines "with" objects together', () => {
  const withShadow = {
    disabled: {
      true: 'wsdt',
      false: 'wsdf',
    },
  }

  const c = scn(withShadow, {
    base: 'b',
    disabled: {
      true: 'bdt',
      false: 'bdf',
    },
  })

  assert.equals(c({ disabled: true }), 'b bdt wsdt')
  assert.equals(c({ disabled: false }), 'b bdf wsdf')
})
