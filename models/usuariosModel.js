const pool = require('../config/db');

const getUsuarios = async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
};

const createUsuario = async (nombre, balance) => {
    await pool.query('INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)', [nombre, balance]);
};

const updateUsuario = async (id, nombre, balance) => {
    await pool.query('UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3', [nombre, balance, id]);
};

const deleteUsuario = async (id) => {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };