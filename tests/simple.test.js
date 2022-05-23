import test from 'node:test'
import assert from 'node:assert/strict'
import { Clxss } from '../index.js'

test('adds classes', async (t) => {
  await t.test('when no initial class is defined', () => {
    const a = new Clxss()
    a.add('new')
    assert.equal(a.put(), 'new')
  })

  await t.test('when an empty initial class is defined', () => {
    const a = new Clxss('')
    a.add('new')
    assert.equal(a.put(), 'new')
  })

  await t.test('when an initial class is defined', () => {
    const a = new Clxss('old')
    a.add('new')
    assert.equal(a.put(), 'old new')
  })
})

test('adds classes repeatedly', () => {
  const a = new Clxss('one two')
  a.add('three four')

  assert.equal(a.put(), 'one two three four')
})

test('handles errant whitespace', () => {
  const a = new Clxss(' one  two   ')
  a.add('  three four ')

  assert.equal(a.put(), 'one two three four')
})

test('prevents double-added classes', () => {
  const a = new Clxss('one one')
  a.add('one one')

  assert.equal(a.put(), 'one')
})

test('multiple parameters in constructor', () => {
  const a = new Clxss('one', 'two three', 'four')
  assert.equal(a.put(), 'one two three four')
})

test('create from static method', () => {
  const a = Clxss.base('one', 'two').add('three')
  assert.equal(a.put(), 'one two three')
})
