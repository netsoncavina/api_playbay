const seguranca = require("../../model/components/seguranca");
const clienteBanco = require("../../model/repositories/cliente-bd");
module.exports = function (app) {
  app.post("/cliente", async (req, res) => {
    mensagem = {};
    try {
      const cliente = {
        nome: req.body.nome,
        email: req.body.email,
        senha: seguranca.ocultarSenha(req.body.senha),
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      await clienteBanco.insertCliente(cliente);
      mensagem = { tipo: "sucesso", texto: "Cliente cadastrado" };
    } catch (error) {
      mensagem = { tipo: "erro", texto: "Erro no cadastrado" };
    } finally {
      const clientes = await clienteBanco.selectCliente();
      res.render("cliente/index", {
        title: "Cadastro",
        mensagem,
        clientes,
      });
    }
  });

  app.get("/cliente", async (req, res) => {
    const clientes = await clienteBanco.selectCliente();
    res.render("cliente/index", {
      title: "Cadastro",
      mensagem: null,
      clientes,
    });
  });

  // Delete function
  app.post("/cliente/:id", async (req, res) => {
    mensagem = {};
    try {
      await clienteBanco.deleteCliente(req.params.id);
      mensagem = { tipo: "sucesso", texto: "Cliente deletado" };
    } catch (error) {
      mensagem = { tipo: "erro", texto: "Erro no deletado" };
    } finally {
      const clientes = await clienteBanco.selectCliente();
      res.render("cliente/index", {
        title: "Cadastro",
        mensagem,
        clientes,
      });
    }
  });
};
