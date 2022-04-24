const Router = require('express')
const router = new Router()
const jobSeekerBioController = require('./../controllers/jobSeekerBioController')

router.post('/create', jobSeekerBioController.create)
router.delete('/delete', jobSeekerBioController.delete)
router.put('/update', jobSeekerBioController.update)
router.get('/', jobSeekerBioController.getAll)
router.get('/:jobSeekerId', jobSeekerBioController.getOne)


module.exports = router
