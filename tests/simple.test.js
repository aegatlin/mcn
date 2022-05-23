import assert from 'node:assert/strict'
import test from 'node:test'
import { classes } from '../index.js'

test('creates classes from simple class-modes', () => {
  const c = classes({base: 'a b'})
  assert.equal(c(), 'a b')
})

test('creates classes from multiple string-only class-modes', () => {
  const c = classes({base: 'a', default: 'b', anything: 'c'})
  assert.equal(c(), 'a b c')
})