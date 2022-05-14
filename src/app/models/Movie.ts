import { Sub } from "./Sub";


export class Movie {
    name: string;
    folderPath: string;
    videoPath: string;
    posterPath: string;
    subs: Sub[];

    constructor(
        name: string,
        folderPath: string,
        videoPath: string,
        posterPath: string,
        subs: Sub[]
    ) {
        this.name = name;
        this.folderPath = folderPath;
        this.videoPath = videoPath;
        this.posterPath = posterPath;
        this.subs = subs;
    }
}