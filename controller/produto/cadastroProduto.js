const produtoBanco = require("../../model/repositories/produto-bd");
module.exports = function (app) {
  app.post("/produto", async (req, res) => {
    mensagem = {};
    try {
      const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
      };
      await produtoBanco.insertProduto(produto);
      mensagem = { tipo: "sucesso", texto: "Produto cadastrado" };
    } catch (error) {
      console.log(error);
      mensagem = { tipo: "erro", texto: "Erro no Produto cadastrado" };
    } finally {
      const produtos = await produtoBanco.selectProduto();
      res.render("produto/index", {
        title: "CadastroProduto",
        mensagem,
        produtos,
      });
    }
  });

  app.get("/produto", async (req, res) => {
    const produtos = await produtoBanco.selectProduto();
    produtos.forEach((produto) => {
      if (produto.imagem) {
        produto.imagem = Buffer.from(produto.imagem).toString("base64");
      }
    });

    res.render("produto/index", {
      title: "CadastroProduto",
      mensagem: null,
      produtos,
    });
  });

  app.post("/produto/:id", async (req, res) => {
    mensagem = {};
    try {
      await produtoBanco.deleteProduto(req.params.id);
      mensagem = { tipo: "sucesso", texto: "Produto deletado" };
    } catch (error) {
      console.log(error);
      mensagem = { tipo: "erro", texto: "Erro no Produto deletado" };
    } finally {
      const produtos = await produtoBanco.selectProduto();
      res.render("produto/index", {
        title: "CadastroProduto",
        mensagem,
        produtos,
      });
    }
  });
};
