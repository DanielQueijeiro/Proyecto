const mongoose = require('mongoose')

const empleadoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
});

const Empleado = mongoose.model('Empleados', empleadoSchema);


async function getEmpleadoById(id) {
    const empleado = await Empleado.findById(id);
    return empleado;
}

async function getEmpleados() {
    const empleados = await Empleado.find();
    return empleados;
}

async function postEmpleado(nombre, correo, contrasena) {
    const empleado = await Empleado.create({
        nombre,
        correo,
        contrasena
    });
    await empleado.save();
    return empleado;
}

async function patchEmpleado(id, nombre, correo, contrasena) {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
        id,
        { nombre, correo, contrasena }
    );
    return empleadoActualizado;
}

async function deleteEmpleado(id){
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);
    return empleadoEliminado;
}

async function getEmpleadoByEmail(email) {
    const empleado = await Empleado.findOne({ correo: email });
    return empleado;
}

module.exports = { 
    Empleado,
    postEmpleado,
    getEmpleadoById,
    getEmpleados,
    patchEmpleado,
    deleteEmpleado,
    getEmpleadoByEmail,
};