const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de pagamento Street-Drill funcionando!");
});

// Rota para simular um pagamento
app.post("/process-payment", (req, res) => {
    const { amount, nomeCliente, endereco, email, cart } = req.body;

    // Log para verificar os dados recebidos
    console.log('Dados recebidos no backend:', req.body);

    // Verifica se todos os campos obrigatórios estão presentes
    if (!amount || !nomeCliente || !endereco || !email || !cart || cart.length === 0) {
        console.log("Erro: Campos obrigatórios estão ausentes ou inválidos.");
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Log para verificar os itens do carrinho
    console.log("Itens no carrinho:", cart);

    // Simulação de pagamento
    if (amount <= 0) {
        console.log("Erro: Valor de pagamento inválido.");
        return res.status(400).json({ error: "Valor inválido para o pagamento." });
    }

    // Simulação de aprovação de pagamento
    const paymentId = `PAY-${Math.floor(Math.random() * 1000000)}`;

    // Log indicando que o pagamento foi simulado
    console.log('Pagamento simulado: Aprovado', paymentId);

    return res.status(200).json({
        message: "Pagamento processado com sucesso!",
        paymentId: paymentId,
        amount: amount,
        status: "Aprovado",  // Alterado para "Aprovado"
        transactionId: paymentId,
        nomeCliente,
        endereco,
        email,
        cart
    });
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`API de pagamento Street-Drill rodando em http://localhost:${port}`);
});
