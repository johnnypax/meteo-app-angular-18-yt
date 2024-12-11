export class Preferito {
    nome: string;
    lat: string;
    lon: string;

    constructor(data: Partial<Preferito>){
        this.nome = data.nome || "";
        this.lat = data.lat || "";
        this.lon = data.lon || "";
    }
}
