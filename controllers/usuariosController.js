const pool = require('../config/db');

const createUsuario = async (req, res) => {
  const { nombre, balance } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *',
      [nombre, balance]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.query;
  const { nombre, balance } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *',
      [nombre, balance, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.query;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
};