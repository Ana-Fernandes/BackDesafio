const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Rota para atualizar os detalhes de um usuário existente
app.put('/users/:id', async (req, res) => {
    try {
        const [rowsUpdated, [updatedUser]] = await db.User.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Rota para excluir um usuário existente
app.delete('/users/:id', async (req, res) => {
    try {
        const rowsDeleted = await db.User.destroy({
            where: { id: req.params.id }
        });
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
});

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
