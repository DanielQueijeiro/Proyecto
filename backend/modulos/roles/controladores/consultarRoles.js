const Roles = require('../../../modelos/roles/roles.modelo.js');

const consultarRoles = async (req, res) => {
  try {
    const roles = await Roles.getRoles();
    res.json(roles);
  } catch (error) {
    console.error("Error al consultar roles:", error);
    res.status(500).json({ error: "Error al consultar roles" });
  }
};

module.exports = consultarRoles;
