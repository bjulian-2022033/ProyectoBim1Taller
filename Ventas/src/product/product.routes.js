'use strict'

import { Router } from 'express'
import {
    outofStock,
    search,
    deleteP,
    productUpdate,
    saveProduct,
    getProducts,
    getProductsByCategory,
    getTopSellingProducts
} from '../product/product.controller.js'
import { validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveProduct', saveProduct)
api.put('/productUpdate/:id', productUpdate)
api.delete('/deleteP/:id', deleteP)

//FUNCIONALES
api.get('/getProductsByCategory/:id',getProductsByCategory)
api.get('/getProducts', [validateJwt], getProducts)
api.get('/outofStock', outofStock)
api.get('/getTopSellingProducts', getTopSellingProducts)
//


api.get('/search',search)


export default api