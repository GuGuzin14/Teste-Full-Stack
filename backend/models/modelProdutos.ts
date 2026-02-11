interface IProdutos {
    id: number;
    nome: string;
    sku: number;
    preco: number;
    quantidade: number;
    categoria: string;
}

export class Produtos implements IProdutos {
    id: number;
    nome: string;
    sku: number;
    preco: number;
    quantidade: number;
    categoria: string;

    constructor(id: number, nome: string, sku:number, preco: number, quantidade: number, categoria: string){
        this.id = id;
        this.nome = nome;
        this.sku = sku;
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria = categoria;
    }
}