const pool = require('../config/db');

const createTransferencia = async (req, res) => {
    const { emisor, receptor, monto } = req.body;
    try {
        await pool.query('BEGIN');

        const emisorResult = await pool.query(
            'UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2 RETURNING *',
            [monto, emisor]
        );
        if (emisorResult.rows.length === 0) {
            throw new Error('Emisor no encontrado');
        }

        const receptorResult = await pool.query(
            'UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2 RETURNING *',
            [monto, receptor]
        );
        if (receptorResult.rows.length === 0) {
            throw new Error('Receptor no encontrado');
        }

        const transferResult = await pool.query(
            `INSERT INTO transferencias (emisor, receptor, monto, fecha)
       VALUES ((SELECT id FROM usuarios WHERE nombre = $1), 
               (SELECT id FROM usuarios WHERE nombre = $2), 
               $3, 
               NOW()) 
       RETURNING *`,
            [emisor, receptor, monto]
        );

        await pool.query('COMMIT');

        res.status(201).json(transferResult.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
};

const getTransferencias = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT t.id, 
             e.nombre AS emisor, 
             r.nombre AS receptor, 
             t.monto, 
             t.fecha 
      FROM transferencias t
      JOIN usuarios e ON t.emisor = e.id
      JOIN usuarios r ON t.receptor = r.id
    `);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTransferencia,
    getTransferencias,
};
