const dummy = require('../utils/list_helper').dummy

describe('dummy', () => {
  test('returns 1 with empty parameter', () => {
    expect(dummy()).toEqual(1)
  })
  test('returns 1 with parameter', () => {
    expect(dummy([])).toEqual(1)
  })
})