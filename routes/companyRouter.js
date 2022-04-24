const Router = require('express')
const router = new Router()
const companyController = require('../controllers/companyController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', companyController.registration)
router.post('/authorization', companyController.authorization )
router.post('/logout', authMiddleware, companyController.logOut)
router.get('/activate/:link', authMiddleware, companyController.activate)
router.get('/refresh', companyController.refresh)
router.get('/companies', authMiddleware, companyController.companies)

module.exports = router

