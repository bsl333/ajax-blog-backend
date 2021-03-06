const model = require('../model/blog-post')

const getAllBlogs = (req, res, next) => {
  const limit = req.query.limit
  const result = model.getAllBlogs(limit)

  res.json({ data: result })
}

const create = (req, res, next) => {
  const result = model.create(req.body)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const update = (req, res, next) => {
  const { id } = req.params
  const result = model.update(id, req.body)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({data: result})
  }
}

const destroy = (req, res, next) => {
  const { id } = req.params
  const result = model.destroy(id)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.status(204).json(result)
  }
}



module.exports = {
  getAllBlogs,
  create,
  update,
  destroy
}