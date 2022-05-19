import { Chapter } from "./Chapter";


export class TvSeries {
    name: string;
    folderPath: string;
    posterPath: string;
    chapters: Chapter[];

    constructor(
        name: string,
        folderPath: string,
        posterPath: string,
        chapters: Chapter[]
    ) {
        this.name = name;
        this.folderPath = folderPath;
        this.posterPath = posterPath;
        this.chapters = chapters
    }
}