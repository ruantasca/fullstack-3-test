import { User } from '../db.js';

const listarUsuarios = async (req, res) => {
    const todosUsuarios = await User.findAll();
    res.send(todosUsuarios);
};

const listarUsuarioPorEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.send('Por favor, forneça o email do usuário.');
        return;
    }

    const usuario = await User.findOne({ where: { email } });
    res.send(usuario);
};

const excluirUsuario = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.send('Por favor, forneça o email do usuário que deseja excluir.');
        return;
    }

    const usuarioExcluido = await User.destroy({ where: { email } });
    if (usuarioExcluido) {
        res.send("Usuário excluído com sucesso.");
    } else {
        res.send("Usuário não encontrado.");
    }
};
    const trocarsenha = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        res.send("Usuário não encontrado.")
        return
    }

    const senhaCriptografada = bcryptjs.hashSync(senha, 10);

    user.senha = senhaCriptografada;
    await user.save();
    res.send('Senha atualizada com sucesso.')
}

const fotinha = async(req, res) => {
    const { email, newfoto } = req.body
    const user = await User.findOne({where: {email: email}})

    if(!user){
        res.status(404).send("O usuario nao foi encontrado.")
        return
    }
    User.update({ foto: newfoto },
        {where: {email: email}} 
    )
    res.status(200).send("Usuario editado com sucesso")
}

export { listarUsuarios, listarUsuarioPorEmail, excluirUsuario, trocarsenha, fotinha };
