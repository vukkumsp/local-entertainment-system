
export class Chapter {
    name: string;
    chapterPath: string;
    posterPath: string;
    episodes: string[];

    constructor(
        name: string,
        chapterPath: string,
        posterPath: string,
        episodes: string[]
    ) {
        this.name = name;
        this.chapterPath = chapterPath;
        this.posterPath = posterPath;
        this.episodes = episodes;
    }
}