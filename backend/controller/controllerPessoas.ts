import { Request, Response } from "express";
import { pool } from "../BancoDeDados";
import {inserirPessoa} from '../BancoDeDados';
import {deletarPessoas} from '../BancoDeDados';
import {editarPessoas} from '../BancoDeDados';
import {Pessoas} from '../models/modelPessoas';

export async function criarPessoa(req: Request, res: Response){
    const {nome, email, telefone, cargo} = req.body;
    if (!nome || !email || !telefone || !cargo){
        return res.status(400).json({error: 'Todos os campos são obrigatórios'});
    }

    if (await Pessoas.emailExiste(email)) {
        return res.status(409).json({error: 'Email já cadastrado'});
    }

    try{
        await inserirPessoa(nome, email, telefone, cargo);
        res.status(201).json({message: 'Pessoa criada com sucesso'});
    }catch(erro){
        console.error("Erro ao criar pessoa:", erro);
        res.status(500).json({error: 'Erro ao criar pessoa'});
    }
}
export async function excluirPessoas(req: Request, res: Response){
    const idParam = req.params.id;
    if (typeof idParam !== 'string'){
        return res.status(400).json({error: 'ID deve ser uma string'});
    }
    const id = parseInt(idParam);;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }else if(id <= 0){
        return res.status(400).json({ error: 'ID deve ser um número positivo' });
    }
    try{
        await deletarPessoas(id);
        res.json({message: 'Pessoa deletada com sucesso'});
    }catch(erro){
        console.error('Erro ao deletar pessoa:', erro);
        res.status(500).json({error: 'Erro ao deletar pessoa'});
    }
}

export async function atualizarPessoas(req: Request, res: Response){
    const idParam = req.params.id;
    if (typeof idParam !== 'string'){
        return res.status(400).json({error: 'id deve ser uma string'});
    }
    const id = parseInt(idParam);
    if (isNaN(id)){
        return res.status(400).json({error: 'id invalido'});
    }
    const {email, nome, telefone, cargo} = req.body;
    if (!email || !nome || !telefone || !cargo){
        return res.status(400).json({error: 'Todos os campos são obrogatorios'});
    }
    try{
        await editarPessoas(id, email, nome, telefone, cargo);
        res.json({message: 'Pessoa atualizada com sucesso'});
    }catch(erro){
        console.error('Erro ao atualizar pessoa:', erro);
        res.status(500).json({error: 'Erro ao atualizar pessoa'});
    }
}

export async function listarPessoas(req:Request, res: Response){
    try{
        const [pessoas]: any = await pool.query('SELECT * FROM pessoas');
        res.json(pessoas);
    }catch(erro)
    {        console.error('Erro ao listar pessoas:', erro);
        res.status(500).json({ error: 'Erro ao listar pessoas' });
    }

    
}
