const Router = require('express')
const router = new Router()
const vacancyController = require('./../controllers/vacancyController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, vacancyController.create)
router.delete('/delete', authMiddleware, vacancyController.delete)
router.get('/getAllCompanies/:companyId', authMiddleware, vacancyController.getAllCompanies)
router.get('/', vacancyController.getAll)
router.get('/:id', authMiddleware, vacancyController.getOne)


module.exports = router
