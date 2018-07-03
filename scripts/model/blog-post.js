const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const blogs = require('../../data/blog-post-data.json')
blogs.forEach(blog => {
  blog.id = blog.id || uuid()
});

const getAllBlogs = (limit) => {
  return limit ? blogs.slice(0, limit) : blogs
}

const create = ({ title, description, tags, date }) => {
  const errors = []
  let response
  if (!title) {
    errors.push(`Missing title from body of request`)
  }
  if (!description) {
    errors.push(`Missing Description from body of request`)
  }
  // if (!tags && !tags.length) {
  //   errors.push(`missing at least one tag/category in body of request`)
  // }
  if (!errors.length) {
    const blog = {
      id: uuid(),
      title,
      description,
      tags,
      date
    }
    blogs.push(blog)
    updateJsonFile()

    response = blog
  }

  response = errors.length ? { errors } : response
  return response
}

const update = (id, { title, description, tags }) => {
  const errors = []

  let response
  if (!id) {
    errors.push(`missing id`)
  }
  if (!title) {
    errors.push(`Missing title from body of request`)
  }
  if (!description) {
    errors.push(`Missing Description from body of request`)
  }

  if (!errors.length) {
    const blog = blogs.find(blog => blog.id === id)
    if (blog) {
      blog.title = title || blog.title
      blog.description = description || blog.description
      blog.tags = tags || blog.tags
      updateJsonFile()
      response = blog
    } else {
      errors.push(`Invalid Request - id is not valid`)
    }
  }
  response = errors.length ? { errors } : response
  return response
}

const destroy = (id) => {
  const errors = []
  let response

  const blogIdx = blogs.findIndex(blog => blog.id === id)
  if (blogIdx > -1) {
    response = blogs.splice(blogIdx, 1)
    updateJsonFile()
  } else {
    errors.push(`Blog with ${id} not found`)
  }

  return errors.length ? { errors } : response
}


const updateJsonFile = () => {
  const filePath = path.join(__dirname, '..', '..', 'data', 'blog-post-data.json')
  fs.writeFileSync(filePath, JSON.stringify(blogs))
}

module.exports = {
  getAllBlogs,
  create,
  update,
  destroy
}