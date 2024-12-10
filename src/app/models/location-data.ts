export class LocationData {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    boundingbox: string[];

    constructor(data: Partial<LocationData> = {}) {
        this.place_id = data.place_id || 0;
        this.licence = data.licence || '';
        this.osm_type = data.osm_type || '';
        this.osm_id = data.osm_id || 0;
        this.lat = data.lat || '';
        this.lon = data.lon || '';
        this.class = data.class || '';
        this.type = data.type || '';
        this.place_rank = data.place_rank || 0;
        this.importance = data.importance || 0;
        this.addresstype = data.addresstype || '';
        this.name = data.name || '';
        this.display_name = data.display_name || '';
        this.boundingbox = data.boundingbox || [];
    }
}
