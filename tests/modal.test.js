import test from 'node:test'
import assert from 'node:assert/strict'
import { Clxss } from '../index.js'

test('boolean', async (t) => {
  await t.test('without default', () => {
    const actual = new Clxss()
    actual.modes({
      someBool: {
        true: 'soTrue',
        false: 'soFalse',
      },
    })

    assert.equal(actual.put({ someBool: true }), 'soTrue')
    assert.equal(actual.put({ someBool: false }), 'soFalse')
    assert.equal(actual.put(), '')
  })

  await t.test('with default', () => {
    const actual = new Clxss()
    actual.modes({
      someBool: {
        default: 'soDefault',
        true: 'soTrue',
        false: 'soFalse',
      },
    })

    assert.equal(actual.put({ someBool: true }), 'soTrue')
    assert.equal(actual.put({ someBool: false }), 'soFalse')
    assert.equal(actual.put(), 'soDefault')
    assert.equal(actual.put({}), 'soDefault')
  })

  await t.test('with modes as a constructor parameter', () => {
    const actual = Clxss.base('asdf', 'blah').modes({
      someBool: {
        true: 'soTrue',
        false: 'soFalse',
      },
    })
    assert.equal(actual.put({ someBool: true }), 'asdf blah soTrue')
    assert.equal(actual.put({ someBool: false }), 'asdf blah soFalse')
  })
})
