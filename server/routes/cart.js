const router = require('express').Router()
const CartController = require('../controllers/cartCon')
const { authentication, authCustomer, authAdmin, authorization} = require('../middlewares/auth')
const TransactionController = require('../controllers/transaction')

router.get('/', authAdmin, CartController.showAll)
router.post('/transaction', TransactionController.create)
router.get('/transaction', TransactionController.showAllUser)
router.get('/transaction/admin', authAdmin, TransactionController.showAllAdmin)
router.put('/transaction/:transactionId', TransactionController.confirm)
router.get('/user', CartController.showAllUserCart)
router.get('/city', CartController.apiCity)
router.get('/ongkir/:cityCode', CartController.ongkir)
router.get('/user/history', CartController.showAllHistoryUserCart)
router.get('/user/pending', CartController.showAllPendingUserCart)
router.put('/confirm/:id', authorization, CartController.finishing) //cartId
router.post('/:id', CartController.create) //itemId
router.put('/:id', authorization, CartController.update) //cartId
router.delete('/:id', authorization, CartController.delete) //cartId

module.exports = router
