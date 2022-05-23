import assert from 'node:assert/strict'
import test from 'node:test'
import { classModes } from '../index.js'

test('creates classes from simple class-modes', () => {
  const c = classModes({ base: 'a b' })
  assert.equal(c(), 'a b')
})

test('creates classes from multiple string-only class-modes', () => {
  const c = classModes({ base: 'a', default: 'b', anything: 'c' })
  assert.equal(c(), 'a b c')
})
