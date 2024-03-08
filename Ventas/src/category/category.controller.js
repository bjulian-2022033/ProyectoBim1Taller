'use strict'

import { checkUpdate } from '../../utils/validator.js'
import Category from './category.model.js'
import Product from '../product/product.model.js'

export const saveCategory = async(req, res) =>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()

        return res.send({message: 'Category save successfully'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving Category'})
        
    }
}

export const get = async (req, res) =>{
    try {

        let categorys = await Category.find()
        return res.send({ categorys })

        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting category'})
        
    }
}

export const categoryUpdate = async(req, res) => {
    try {

        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have sumbitted some data that cannot be updated or missing data'})
        let updateCategory = await Category.findOneAndUpdate(
            
            { _id: id},
            data,
            { new: true}

            )
            if(!updateCategory) return res.status(401).send({message: 'Category not found and not updated'})
            return res.send({message: 'Update Category', updateCategory})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating category'})
        
    }
}

export const deleteC = async (req, res) => {
    try {
        const idCategory = req.params.id

        // Encontrar la categoría que queremos eliminar
        const categoryToDelete = await Category.findOne({ _id: idCategory })

        // Verificar si la categoría existe
        if (!categoryToDelete) {
            return res.status(404).send({ message: 'Category not found, not deleted' })
        }

        // Encontrar la categoría por defecto
        const categoryDefault = await Category.findOne({ nameCategory: 'Others' })

        // Verificar si se encontró la categoría por defecto
        if (!categoryDefault) {
            return res.status(404).send({ message: 'Default category not found' })
        }

        // Actualizar todos los productos con la categoría que se va a eliminar para que tengan la categoría por defecto
        await Product.updateMany(
            { category: categoryToDelete._id },
            { $set: { category: categoryDefault._id } }
        );

        // Eliminar la categoría
        await categoryToDelete.deleteOne();

        return res.send({ message: 'Deleted category successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting category' });
    }
};

