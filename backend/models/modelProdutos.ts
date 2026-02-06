interface IProdutos {
    id: number;
    nome: string;
    kfu: number;
    quantidade: number;
    categoria: string;
}

export class Produtos implements IProdutos {
    id: number;
    nome: string;
    kfu: number;
    quantidade: number;
    categoria: string;

    constructor(id: number, nome: string, kfu:number, quantidade: number, categoria: string){
        this.id = id;
        this.nome = nome;
        this.kfu = kfu;
        this.quantidade = quantidade;
        this.categoria = categoria;
    }
}