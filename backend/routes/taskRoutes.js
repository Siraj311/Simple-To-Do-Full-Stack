const express = require('express')
const router = express.Router()

const tasksController = require('../controllers/tasksController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(tasksController.getTasks)
  .post(tasksController.createTask)
  .patch(tasksController.completeTask)

module.exports = router