import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let user
  let dummy
  beforeEach( () => {
    blog = {
      title: 'Test Blog',
      author: 'Foo',
      url: 'www.www.www',
      likes: 99,
      user: {
        username: 'Tester',
        name: 'Test'
      }
    }
    user = {
      username: 'Tester',
      name: 'Test'
    }
    dummy = jest.fn()
  })
  test('Only Title and author are displayed by default', () => {
    render(<Blog blog={blog} removeBlog={dummy} updateBlog={dummy} user={user}/>)
    const element = screen.getByText('Test Blog by Foo')
    expect(element).toBeDefined()
  })
  test('Display URL and likes when button clicked', async () => {
    render(<Blog blog={blog} removeBlog={dummy} updateBlog={dummy} user={user}/>)
    const currentUser = userEvent.setup()
    const button = screen.getByText('View')
    await currentUser.click(button)
    const blogLikes = screen.getByText('Likes: 99')
    const blogUrl = screen.getByText('www.www.www')
    expect(blogLikes).toBeDefined()
    expect(blogUrl).toBeDefined()
  })
})