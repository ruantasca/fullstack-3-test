import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from '../db.js';
import { jwtDecode } from "jwt-decode"

const registrarUsuario = async (req, res) => {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body;
    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const usuarioExistente = await User.findOne({ where: { email: email } });
    if (usuarioExistente) {
        return res.status(400).send('Usuário já existe.');
    }

    const senhaCriptografada = bcrypt.hashSync(senha, 10);
    await User.create({ nome, sobrenome, email, senha: senhaCriptografada, dataNascimento });

    res.status(201).send('Usuário registrado com sucesso!');
};

const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const usuarioExistente = await User.findOne({ where: { email: email } });
    if (!usuarioExistente) {
        return res.status(404).send('Usuário não encontrado.');
    }

    const senhaValida = bcrypt.compareSync(senha, usuarioExistente.senha);
    if (!senhaValida) {
        return res.status(401).send('Senha inválida.');
    }

    const token = jwt.sign(
        {
            "nome_completo": `${usuarioExistente.nome} ${usuarioExistente.sobrenome}`,
            "email": usuarioExistente.email,
            "status": usuarioExistente.status
        },
        "chaveSecretaJWT",
        { expiresIn: "5m" }
    );
    res.status(200).json({
        tokenJWT: token,
        userData: usuarioExistente
    });
};

const trocarSenha = async (req, res) => {
    const { email, novaSenha } = req.body;

    if (!email || !novaSenha) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        const usuarioExistente = await User.findOne({ where: { email } });
        if (!usuarioExistente) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const senhaCriptografada = bcrypt.hashSync(novaSenha, 10);
        await usuarioExistente.update({ senha: senhaCriptografada });

        res.status(200).send('Senha atualizada com sucesso.');
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};



export { registrarUsuario, autenticarUsuario, trocarSenha };
