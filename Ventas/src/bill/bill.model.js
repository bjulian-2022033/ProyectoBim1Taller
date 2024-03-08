'use strict'

import { Schema, model } from 'mongoose'

const billSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

export default model('bill', billSchema)