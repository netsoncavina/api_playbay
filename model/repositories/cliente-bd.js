const db = require("../services/db");

async function insertCliente(cliente) {
  const conn = await db.connect();
  const sql = `INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)`;
  const params = [cliente.nome, cliente.email, cliente.senha];
  try {
    return await conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}

async function selectCliente() {
  const conn = await db.connect();
  const sql = `SELECT * FROM cliente`;
  try {
    const [rows] = await conn.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateCliente(cliente) {
  const conn = await db.connect();
  const sql = `UPDATE cliente SET nome = ?, email = ?, senha = ? WHERE id = ?`;
  const params = [cliente.nome, cliente.email, cliente.senha, cliente.id];
  try {
    await conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}

async function deleteCliente(id) {
  const conn = await db.connect();
  const sql = `DELETE FROM cliente WHERE id = ?`;
  const params = [id];
  try {
    await conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertCliente,
  selectCliente,
  updateCliente,
  deleteCliente,
};
