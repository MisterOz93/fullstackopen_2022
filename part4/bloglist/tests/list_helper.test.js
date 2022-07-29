const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes

describe('dummy', () => {
  test('returns 1 with empty parameter', () => {
    expect(dummy()).toEqual(1)
  })
  test('returns 1 with parameter', () => {
    expect(dummy([])).toEqual(1)
  })
})

describe('totalLikes', () => {
  test('of empty list is 0', () => {
    expect(totalLikes([])).toEqual(0)
  })
  test('of a single blog equals its likes', () => {
    const singleBlog = {
      title: 'foo',
      author: 'bar',
      url: 'w/e',
      likes: 42
    }
    expect(totalLikes([singleBlog])).toEqual(42)
  })
  test('of several blogs to equal total likes', () => {
    const multipleBlogs = [
      {
        title: 'foo',
        author: 'bar',
        url: 'w/e',
        likes: 42
      },
      {
        title: 'foo',
        author: 'bar',
        url: 'w/e',
        likes: 20
      },
      {
        title: 'foo',
        author: 'bar',
        url: 'w/e',
        likes: 1
      }
    ]
    expect(totalLikes(multipleBlogs)).toEqual(63)
  })
})