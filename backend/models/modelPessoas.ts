import {pool} from '../BancoDeDados';
interface IPessoas{
    id: number;
    nome: string;
    email:string;
    telefone:string;
    cargo:string;
}

    export class Pessoas implements IPessoas{
        id: number;
        nome: string;
        email: string;
        telefone: string;
        cargo: string;


        constructor(id: number, nome: string, email: string, telefone: string, cargo: string){
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.telefone = telefone;
            this.cargo = cargo;
        }

        static validarEmail(email:string, telefone:string): boolean{
            const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            return reEmail.test(email);
        }

        static validarTelefone(telefone: string): boolean {
            const reTelefone = /^\d{10,15}$/;
            return reTelefone.test(telefone);
        }

        static async emailExiste(email: string): Promise<boolean> {
            const sql = 'SELECT COUNT(*) as total FROM pessoas WHERE email = ?';
            const [resultado]: any = await pool.execute(sql, [email]);
            return resultado[0].total > 0;
        }
    }

        

    

