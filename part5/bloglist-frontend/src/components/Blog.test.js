import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('Only Title and author are displayed by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Foo',
      url: 'www.www.www',
      likes: 99
    }
    const dummy = jest.fn()
    render(<Blog blog={blog} removeBlog={dummy} updateBlog={dummy}/>)
    const element = screen.getByText('Test Blog by Foo')
    expect(element).toBeDefined()
  })
})