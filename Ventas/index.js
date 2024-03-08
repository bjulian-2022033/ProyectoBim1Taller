//Ejecutar servicios
import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import { encrypt  } from './utils/validator.js'
import Category from './src/category/category.model.js'
import User from './src/user/user.model.js'


async function categoryDefault () {
    try {
        // Buscar si la categoría 'Others' ya existe
        const categoryExists = await Category.findOne({ nameCategory: 'Others' })

        // Si la categoría ya existe, mostrar un mensaje y salir de la función
        if (categoryExists) {
            console.log('The category already exists in the database')
            return
        }

        // Si la categoría no existe, crear una nueva
        const newCategory = await Category.create({
            nameCategory: 'Others',
            description: 'This category is default'
        })

        // Mostrar un mensaje de éxito
        console.log('Category created successfully:', newCategory)
    } catch (err) {
        // Manejar cualquier error
        console.error('Error creating category:', err)
    }
}


async function createAdminDefault() {
    try {
        const adminExist = await User.findOne({ role: 'ADMIN' });

        if (adminExist) {
            console.log('Admin user already exists in the database');
            return;
        }

        const newAdmin = new User({
            name: 'Josue',
            surname: 'Noj',
            email: 'josueNoj@kinal.edu.gt',
            username: 'josueN',
            password: '87654321',
            phone: '76241551',
            role: 'ADMIN'
        });

        newAdmin.password = await encrypt(newAdmin.password);
        const savedAdmin = await newAdmin.save();
        console.log('Admin user created successfully:', savedAdmin);
    } catch (err) {
        console.error('Error creating admin:', err);
    }
}

initServer()
connect()
categoryDefault()
createAdminDefault()