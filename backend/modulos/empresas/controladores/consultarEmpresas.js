const Empresa = require('../../../modelos/empresas/empresas.modelo');

exports.getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.getEmpresas();
        if (!empresas || empresas.length === 0) {
            return res.status(404).json({
                error: 'No se encontraron empresas',
            });
        }
        return res.status(200).json(empresas);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al consultar las empresas',
        });
    }
};

exports.getEmpresasById = async (req, res) => {
    try {
        const { id } = req.params;
        const empresa = await Empresa.getEmpresaById(id);
        if (!empresa) {
            return res.status(404).json({
                error: 'Empresa no encontrada',
            });
        }
        return res.status(200).json(empresa);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al consultar la empresa',
        });
    }
}