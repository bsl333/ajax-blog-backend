const routes = require('express').Router()
const ctrl = require('../controller/blog-post')

routes.get('/', ctrl.getAllBlogs)
routes.post('/', ctrl.create)
routes.put('/:id', ctrl.update)

module.exports = routes