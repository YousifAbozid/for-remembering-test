import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Show blog author and title by default', () => {
    // define a mock blog
    const blog = {
        title: 'I Love Programming',
        author: 'Yousif Abozid',
        likes: 12,
        url: 'www.example.com',
        user: {
            name: 'Mego Yoyo',
            id: 'id',
            username: 'megoyoyo'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )

    // component.debug()

    // author and title should be visible
    const details = component.container.querySelector('.short-details')
    expect(details).toHaveTextContent('Yousif Abozid')
    expect(details).toHaveTextContent('I Love Programming')

    // url and likes shouldn't be visible
    expect(details).not.toHaveTextContent('likes 12')
    expect(details).not.toHaveTextContent('www.example.com')
})

test('show url and likes when the show button is clicked', () => {

    const blog = {
        title: 'I Love Programming',
        author: 'Yousif Abozid',
        likes: 12,
        url: 'www.example.com',
        user: {
            name: 'Mego Yoyo',
            id: 'id',
            username: 'megoyoyo'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )

    const viewButton = component.getByText('man')  //.getAllByText('view')  //.getByTestId('full-details-button')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent('12')
    expect(component.container).toHaveTextContent('www.example.com')
})