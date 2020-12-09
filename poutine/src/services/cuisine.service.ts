import { Cheese, Lyrics, Potatoe } from '@shared/core';
import Axios from 'axios';

const { BACKEND_URL = 'http://localhost', API_PREFIX = '' } = process.env;

class CuisineService {
    constructor(private url: string, private prefix: string) {}

    public squeezeCheese(): Promise<Cheese> {
        return Axios.get<Cheese>(`${this.url}/outremona${this.prefix}/cheeses/squeeze`).then((value) => value.data);
    }

    public keepWarm(something: any, temperature: number): Promise<any> {
        return Axios.post(`${this.url}/oldoporto${this.prefix}/keep-warm`, something, { params: { temperature } }).then(
            (value) => value.data
        );
    }

    public potContent(): Promise<any> {
        return Axios.get(`${this.url}/oldoporto${this.prefix}/pot-content`).then((value) => value.data);
    }

    public cutPotatoes(sideLength: number, potatoeNumber: number): Promise<Potatoe[]> {
        return Axios.post(`${this.url}/verduny${this.prefix}/potatoes/cut`, undefined, {
            params: { sideLength, potatoeNumber },
        }).then((value) => value.data);
    }

    public dipPotatoes(potatoes: Potatoe[], duration: number): Promise<Potatoe[]> {
        return Axios.post(`${this.url}/verduny${this.prefix}/potatoes/dip`, potatoes, {
            params: { duration },
        }).then((value) => value.data);
    }

    public boilPotatoes(potatoes: Potatoe[]): Promise<Potatoe[]> {
        return Axios.post(`${this.url}/nordo${this.prefix}/potatoes/boil`, potatoes).then((value) => value.data);
    }

    public fryPotatoes(potatoes: Potatoe[], oil: string): Promise<Potatoe[]> {
        return Axios.post(`${this.url}/bizar${this.prefix}/potatoes/fry`, potatoes, { params: { oil } }).then(
            (value) => value.data
        );
    }

    public fantasticLyrics(): Promise<Lyrics> {
        return Axios.get(`${this.url}/montroyashi${this.prefix}/fantastic-lyrics`).then((value) => value.data);
    }
}

export const cuisineService = new CuisineService(BACKEND_URL, API_PREFIX);
