import express from 'express'
import routes from './routes'
import { swaggerUi, swaggerSpec } from './swagger'

const app = express()
const port = 3001

app.use(express.json())

app.use('/api', routes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log(`Swagger docs at http://localhost:${port}/docs`)
});