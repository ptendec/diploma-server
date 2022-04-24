const Router = require('express')
const router = new Router()
const jobSeekerExperienceController = require('./../controllers/jobSeekerExperienceController')

router.post('/create', jobSeekerExperienceController.create)
router.delete('/delete', jobSeekerExperienceController.delete)
router.put('/update', jobSeekerExperienceController.update)
router.get('/', jobSeekerExperienceController.getAll)
router.get('/:id', jobSeekerExperienceController.getOne)


module.exports = router
