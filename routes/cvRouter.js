const Router = require('express')
const router = new Router()
const cvController = require('./../controllers/cvController')
const authMiddleware = require('./../middleware/authMiddleware')

router.post('/create', authMiddleware, cvController.create)
router.delete('/delete', authMiddleware, cvController.delete)
router.put('/update', authMiddleware, cvController.update)
router.get('/', authMiddleware, cvController.getAll)
router.get('/download/:cv', cvController.download)
router.get('/:jobSeekerId', authMiddleware, cvController.getOne)


module.exports = router
