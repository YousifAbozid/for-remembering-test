import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Submit new blog calls the onSubmit with the right parameters', () => {

    const mockOnCreateBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={mockOnCreateBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'new title' }
    })

    fireEvent.change(author, {
        target: { value: 'new author' }
    })

    fireEvent.change(url, {
        target: { value: 'new url' }
    })

    fireEvent.submit(form)

    expect(mockOnCreateBlog.mock.calls).toHaveLength(1)
    expect(mockOnCreateBlog.mock.calls[0][0]).toEqual({
        title: 'new title',
        author: 'new author',
        url: 'new url'
    })
})