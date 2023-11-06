const db = require("../services/db");

async function insertProduto(produto) {
  const conn = await db.connect();
  const sql = `INSERT INTO produto (nome, preco, imagem) VALUES (?, ?, ?)`;
  const params = [produto.nome, produto.preco, produto.imagem];
  try {
    await conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}

async function selectProduto() {
  const conn = await db.connect();
  const sql = `SELECT * FROM produto`;
  try {
    const [rows] = await conn.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProduto(produto) {
  const conn = await db.connect();
  const sql = `UPDATE produto SET nome = ?, preco = ?, imagem = ? WHERE id = ?`;
  const params = [produto.nome, produto.preco, produto.imagem, produto.id];
  try {
    await conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}

async function deleteProduto(id) {
  const conn = await db.connect();
  const sql = `DELETE FROM produto WHERE id = ?`;
  const params = [id];
  try {
    await conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertProduto,
  selectProduto,
  updateProduto,
  deleteProduto,
};
