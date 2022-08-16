import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel='show...'>
        <div className='testDiv'>
          Toggleable Content
        </div>
      </Toggleable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('Toggleable Content')
  })

  test('at start the children are not displayed', async () => {
    const div =  container.querySelector('.toggle')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    const div = container.querySelector('.toggle')
    expect(div).not.toHaveStyle('display: none')
  })


})