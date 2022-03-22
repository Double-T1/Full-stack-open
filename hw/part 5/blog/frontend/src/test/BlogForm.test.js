import React from 'react'
import BlogForm from '../components/BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('BlogForm component', () => {
  test('updates parent state and calls on submit', async () => {
    const handleCreate = jest.fn()

    render(<BlogForm handleCreate={handleCreate}/>)

    const title = screen.getByPlaceholderText('type the title')
    const author = screen.getByPlaceholderText('type the author')
    const url = screen.getByPlaceholderText('type the url')
    userEvent.type(title,'blog title')
    userEvent.type(author,'blog author')
    userEvent.type(url,'blog url')

    const createButton = screen.getByText('create')
    userEvent.click(createButton)

    expect(handleCreate).toHaveBeenCalledTimes(1)
    expect(handleCreate.mock.calls[0][0].title).toBe('blog title')
    expect(handleCreate.mock.calls[0][0].author).toBe('blog author')
    expect(handleCreate.mock.calls[0][0].url).toBe('blog url')
  })
})