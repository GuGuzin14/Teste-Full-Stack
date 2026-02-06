
import {pool} from '../BancoDeDados';
interface IUsuario {
    email: string;
    senha: string;
}


export class Usuario implements IUsuario {
    email: string;
    senha: string;

   
    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha;
    }

        static validarEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static async emailExiste(email: string): Promise<boolean>{
        const sql = 'SELECT COUNT(*) as total FROM usuarios WHERE email = ?';
        const [resultado]: any = await pool.execute(sql, [email]);
        return resultado[0].total > 0;
    }
}
