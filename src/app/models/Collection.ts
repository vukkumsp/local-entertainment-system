
/*
        {
            "title":"",
            "movies":[],
            "tvSeries":[],
            "order":[]
        }
 */

import { Movie } from "./Movie";
import { TvSeries } from "./TvSeries";

export class Collection {
    title: string;
    movies: Movie[];
    tvSeries: TvSeries[];
    order: string[];

    constructor(collectionData: any){
        const { title, movies, tvSeries, order } = collectionData;
        this.title = title;
        this.movies = movies;
        this.tvSeries = tvSeries;
        this.order = order;
    }
}