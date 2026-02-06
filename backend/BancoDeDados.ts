import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',              
    password: '',              
    database: 'banco'
};


export const pool = mysql.createPool(dbConfig);


export async function testarConexao() {
    try {
        const connection = await pool.getConnection();
        console.log('conectado ao banco de dados');
        connection.release();
        return true;
    } catch (erro) {
        console.error('erro ao conectar no banco:', erro);
        return false;
    }
}

export async function inserirUsuario(email: string, senha: string) {
    const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
    await pool.execute(sql, [email, senha]);
}

export async function inserirPessoa(nome: string, email:string, telefone:string, cargo:string){
    const sql = 'INSERT INTO pessoas (nome,email,telefone,cargo) VALUES (?,?,?,?)';
    await pool.execute(sql, [nome,email,telefone,cargo]);
}

export async function inserirProduto(nome:string, kfu:number, quantidade:number, categoria:string){
    const sql = 'INSERT INTO produtos (nome, kfu, quantidade, categoria) VALUES (?,?,?,?)';
    await pool.execute(sql, [nome, kfu, quantidade, categoria]);
}

export async function editarPessoas(id: number, email:string, nome:string, telefone:string, cargo:string){
    const sql = 'UPDATE pessoas SET email = ?, nome = ?, telefone = ?, cargo = ? WHERE id = ?';
    await pool.execute(sql, [email, nome, telefone, cargo, id]);
}

export async function editarProdutos(id: number, nome: string, kfu:number, quantidade: number, categoria: string){
    const sql = 'UPDATE produtos SET nome = ?, kfu = ?, quantidade = ?, categoria = ? WHERE id = ? ';
    await pool.execute(sql, [nome, kfu, quantidade, categoria, id]);
}

export async function deletarPessoas(id: number){
    const sql = 'DELETE FROM pessoas WHERE id = ?';
    await pool.execute(sql, [id]);
}

export async function deletarProdutos(id: number){
    const sql = 'DELETE FROM produtos WHERE id = ? ';
    await pool.execute(sql,[id]);
}
