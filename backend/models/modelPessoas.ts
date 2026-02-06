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

    }

