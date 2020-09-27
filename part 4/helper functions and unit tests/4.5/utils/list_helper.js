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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
