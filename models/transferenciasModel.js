const pool = require('../config/db');

const getTransferencias = async () => {
    const res = await pool.query('SELECT * FROM transferencias');
    return res.rows;
};

const createTransferencia = async (emisor, receptor, monto) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const emisorRes = await client.query('SELECT balance FROM usuarios WHERE id = $1', [emisor]);
        const receptorRes = await client.query('SELECT balance FROM usuarios WHERE id = $1', [receptor]);

        if (emisorRes.rows[0].balance < monto) {
            throw new Error('Saldo insuficiente');
        }

        await client.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisor]);
        await client.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2', [monto, receptor]);
        await client.query('INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())', [emisor, receptor, monto]);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = { getTransferencias, createTransferencia };
