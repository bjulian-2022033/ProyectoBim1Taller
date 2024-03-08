'use strict'

import { Router } from 'express'
import {  saveCart } from './cart.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

//import { saveProduct } from '../product/product.controller.js'

const api = Router()

api.post('/saveCart', [validateJwt], saveCart)

export default api