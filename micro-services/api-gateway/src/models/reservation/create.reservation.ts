export class CreateReservationRequest {
    codigo_cliente: number;
    valor: number;
    milhas_utilizadas: number;
    quantidade_poltronas: number;
    codigo_voo: string;
    codigo_aeroporto_origem: string;
    codigo_aeroporto_destino: string;

    constructor(
        codigo_cliente: number,
        valor: number,
        milhas_utilizadas: number,
        quantidade_poltronas: number,
        codigo_voo: string,
        codigo_aeroporto_origem: string,
        codigo_aeroporto_destino: string
    ) {
        this.codigo_cliente = codigo_cliente;
        this.valor = valor;
        this.milhas_utilizadas = milhas_utilizadas;
        this.quantidade_poltronas = quantidade_poltronas;
        this.codigo_voo = codigo_voo;
        this.codigo_aeroporto_origem = codigo_aeroporto_origem;
        this.codigo_aeroporto_destino = codigo_aeroporto_destino;
    }
}
 