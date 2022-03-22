import React from 'react'
import Blogs from '../components/Blogs'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Blogs component', () => {
  let container, handleLike
  const user = {
    id: '123'
  }
  const sample = [{
    title: 'title',
    author: 'author',
    url: 'www.url.com',
    likes: 69,
    id: '234',
    user: {
      id: '123'
    }
  }]
  beforeEach(() => {
    handleLike = jest.fn()
    container = render(
      <Blogs blogs={sample} handleLike={handleLike} user={user}/>
    ).container
  })

  test('author and title shown', () => {
    screen.findByText('title')
    screen.findByText('author')
  })

  test('no url or likes by default', () => {
    const div = container.querySelector('.temp')
    expect(div).toHaveStyle('display: none')
  })

  test('url and likes shown when view button is clicked', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const div = container.querySelector('.temp')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls the eventhandler twice', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    userEvent.dblClick(likeButton)

    //same functionality
    //sexpect(handleLike).toHaveBeenCalledTimes(2)
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})