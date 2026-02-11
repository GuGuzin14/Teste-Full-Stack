import { Request, Response } from 'express';
import { pool } from '../BancoDeDados';
import {inserirProduto} from '../BancoDeDados';
import {deletarProdutos} from '../BancoDeDados';
import {editarProdutos} from '../BancoDeDados';

export async function criarProduto(req: Request, res: Response){
    const {nome, sku, preco, quantidade, categoria} = req.body;
    if (!nome || !sku || preco === undefined || !quantidade || !categoria){
        return res.status(400).json({error: 'Todos os campos obrigatórios'});
    }
    try{
        await inserirProduto(nome, sku, preco, quantidade, categoria);
        res.status(201).json({message: 'Produto criado com sucesso'});
    }catch(erro){
        console.error("Erro ao criar produto:", erro);
        res.status(500).json({error: 'Erro ao criar produto'});
    }
}

export async function excluirProdutos(req:Request, res: Response){
    const idParam = req.params.id;
    if(typeof idParam !== 'string'){
        return res.status(400).json({error: 'Id deve ser string'});
    }
    const id = parseInt(idParam);
    if(isNaN(id)){
        return res.status(400).json({error: 'id invalido'});
    }
    try{
        await deletarProdutos(id);
        res.json({message: 'Produto deletado com sucesso'});
    }catch(erro){
        console.error('Erro ao deletar produto: ', erro);
        res.status(500).json({error: 'Erro ao deletar produto'});
    }
    
}

export async function atualizarProdutos(req: Request, res:Response){
    const idParam = req.params.id;
    if(typeof idParam !== 'string'){
        return res.status(400).json({error: 'id deve ser string'});
    }
    const id = parseInt(idParam);
    if(isNaN(id)){
        return res.status(400).json({error: 'id invalido'});
    }
    const {nome, sku, preco, quantidade, categoria} = req.body;
    if(!nome || !sku || preco === undefined || !quantidade || !categoria){
        return res.status(400).json({error:' Todos os campos obrigatórios'});
    }
    try{
        await editarProdutos(id, nome, sku, preco, quantidade, categoria);
        res.json({message: 'Produto atualizado com sucesso'});
    }catch(erro){
        console.error('Erro ao atualizar produto: ', erro);
        res.status(500).json({error: 'Produto não atualizado'});
    }
}

export async function listarProdutos(req: Request, res: Response){
    try{
        const [rows] = await pool.query('SELECT * FROM produtos');
        res.json(rows);
    }catch(erro){
        console.error('Erro ao listar produtos: ', erro);
        res.status(500).json({error: 'Erro ao listar produtos'});
    }
}
