const router = require('express').Router()
const indexController = require('../controllers/index')
const auth = require('../middlewares/auth')
const dashboardRouter = require('./dashboard')

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', indexController.registerUser)
router.post('/login', indexController.loginUser)

router.use('/dashboard', auth.verifyToken, dashboardRouter)

module.exports = router
