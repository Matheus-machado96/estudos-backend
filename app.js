const express = require('express');
const app = express();
const porta = 3000;

// Nosso "Banco de Dados" temporário
let saldo = 1000.00;
let historico = [];  //começa com lista vazia
// Rota para ver o saldo
app.get('/saldo', (req, res) => {
    res.send(`Seu saldo atual é: R$ ${saldo}`);
});

// Rota para depositar (Exemplo: localhost:3000/depositar?valor=100)
app.get('/depositar', (req, res) => {
    const valor = parseFloat(req.query.valor);
    
    if (!valor || valor <= 0) {
        return res.send("Erro: Informe um valor válido para depósito.");
    }
    
    historico.push(`Depósito de r$ ${valor.toFixed(2)}) em ${new Date().toLocaleString()}`)

    saldo += valor;
    res.send(`Depósito de R$ ${valor} realizado! Novo saldo: R$ ${saldo}`);
});

// 4. Rota de Saque (Ex: /saque?valor=50)
app.get('/saque', (req, res) => {
    const valor = parseFloat(req.query.valor);
    if (!valor || valor <= 0) {
        return res.send("Erro: Digite um valor válido para saque.");
    }
    if (valor > saldo) {
        return res.send("Saldo insuficiente para esta operação!");
    }

    historico.push(`Saque de r$ ${valor.toFixed(2)} em ${new Date().toLocaleString()} `)

    saldo -= valor;
    res.send(`Saque de R$ ${valor} realizado! Novo saldo: R$ ${saldo.toFixed(2)}`);
});

// 5 Rota de de extrato

app.get('/extrato', (req,res) =>{
    if (historico.length === 0){
        return res.send("Nenhuma movimentação realizada ainda.");
    }
    // O join('<br>) pula uma linha entre cada item da lista no navegador
    res.send(`<h2>Extrato Bancário</h2> ${historico.join('<br>')}`);
});

app.listen(porta, () => {
    console.log(`🚀 Servidor do Banco rodando em http://localhost:${porta}`);
    console.log(`Teste o saldo em: http://localhost:${porta}/saldo`);
});