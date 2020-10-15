const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes , 0)
}

const favoriteBlog = (blogs) => {
    const biggest = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return biggest
}

// you can read lodash documentation from here: https://lodash.com/docs
const mostBlogs = (blogs) => {
    const authorWithMostBlogs = _
      .chain(blogs)
      .countBy('author')
      .map((blogs, author) => ({ author, blogs }))
      .sortBy('blogs')
      .last()
      .value()
    // console.log(authorWithMostBlogs)
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    const authorWithMostLikes = _
      .chain(blogs)
      .groupBy('author')
      .map((obj, key) => ({ 'author': key, 'likes': _.sumBy(obj, 'likes') }))
      .sortBy('likes')
      .last()
      .value()
    // console.log(authorWithMostLikes)
    return authorWithMostLikes
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
