const Router = require('express')
const router = new Router()
const responseController = require('./../controllers/responseController')

router.post('/create', responseController.create)
router.get('/myResponses/:jobSeekerId', responseController.getMyResponses)
router.get('/getInfoAboutVacancy/:vacancyId', responseController.getInfoAboutVacancy)
router.post('/update', responseController.update)
router.delete('/delete', responseController.delete)
router.get('/', responseController.getAll)
router.get('/:id', responseController.getOne)


module.exports = router
