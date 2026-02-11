import {Request, Response} from 'express';


export function fazerLogin(req: Request, res: Response) {
    const {email, senha} = req.body; 

    if (!email || !senha){
        return res.status(400).json({erro: 'Email e senha são obrigatórios'});
    }

    res.json({sucesso: true, usuario: email});
}