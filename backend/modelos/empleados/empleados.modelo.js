const mongoose = require('mongoose')
const { Empresa } = require('../empresas/empresas.modelo')

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

async function getEmpleadosLibres() {
    const empleados = await Empleado.find();
    const empresas = await Empresa.find({}, 'empleados');
    const asignados = new Set();
    empresas.forEach((e) => {
        e.empleados.forEach((id) => asignados.add(id.toString()));
    });
    return empleados.filter((e) => !asignados.has(e._id.toString()));
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

async function patchEmpleado(id, datosActualizados) {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
        id,
        datosActualizados
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
    getEmpleadosLibres,
    patchEmpleado,
    deleteEmpleado,
    getEmpleadoByEmail,
};