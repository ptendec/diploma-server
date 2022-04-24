const Router = require('express')
const router = new Router()
const jobSeekerController = require('../controllers/jobSeekerController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', jobSeekerController.registration)
router.post('/authorization', jobSeekerController.authorization )
router.post('/logout', authMiddleware, jobSeekerController.logOut)
router.get('/activate/:link', authMiddleware, jobSeekerController.activate)
router.get('/refresh', jobSeekerController.refresh)
router.get('/jobSeekers', authMiddleware, jobSeekerController.jobSeekers)

module.exports = router

