import { Movie } from "./Movie";
import { TvSeries } from "./TvSeries";

export class DbConfig {
    moviesPath: string;
    tvSeriesPath: string;
    movies: Movie[];
    tvSeries: TvSeries[];

    // constructor(
    //     moviesPath: string,
    //     tvSeriesPath: string,
    //     movies: Movie[],
    //     tvSeries: TvSeries[]
    // ) {
    //     this.moviesPath = moviesPath;
    //     this.tvSeriesPath = tvSeriesPath;
    //     this.movies = movies;
    //     this.tvSeries = tvSeries;
    // }

    constructor(
        dbConfig: any
    ) {
        const { moviesPath, tvSeriesPath, movies, tvSeries } = dbConfig;
        this.moviesPath = moviesPath;
        this.tvSeriesPath = tvSeriesPath;
        this.movies = movies;
        this.tvSeries = tvSeries;
    }
}