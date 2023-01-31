import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '../App'
import store from '../store'

describe('App component', () => {
  it('Renders Page', async () => {
    render(
      <Provider store={store}><App /></Provider>
    )
    const appHeader = screen.getByText('Anecdotes')
    expect(appHeader).toBeDefined()
  })
})