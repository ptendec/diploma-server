const Router = require('express')
const router = new Router()
const authMiddleware = require('./../middleware/authMiddleware')

const jobSeekerRouter = require('./jobSeekerRouter')
const companyRouter = require('./companyRouter')
const vacancyRouter = require('./vacancyRouter')
const cvRouter = require('./cvRouter')
const jobSeekerBioRouter = require('./jobSeekerBioRouter')
const jobSeekerExperienceRouter = require('./jobSeekerExperienceRouter')
const responseRouter = require('./responseRouter')

router.use('/company', companyRouter)
router.use('/jobSeeker', jobSeekerRouter)
router.use('/vacancy', vacancyRouter)
router.use('/cv', cvRouter)
router.use('/jobSeekerBio', authMiddleware, jobSeekerBioRouter)
router.use('/jobSeekerExperience', authMiddleware, jobSeekerExperienceRouter)
router.use('/response', authMiddleware, responseRouter)

module.exports = router

