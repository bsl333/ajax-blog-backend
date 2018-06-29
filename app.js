const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const blogRoutes = require('./scripts/routes/blog-post')
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/blog-post', blogRoutes)

app.use((req, res, next) => {
  next({ status: 404, message: 'Route not found - 404' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err })
})

app.listen(port, () => console.log(`running on port ${port}`))