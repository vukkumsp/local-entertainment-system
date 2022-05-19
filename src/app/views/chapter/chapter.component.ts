import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/models/Chapter';
import { DbConfig } from 'src/app/models/DbConfig';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  dbConfigPath = 'C:\\Users\\vukku\\Documents\\dbConfig.json';
  dbConfigJson = new DbConfig({});
  chapter: Chapter = {
    name: '',
    chapterPath: '',
    posterPath: '',
    episodes: []
  };
  selectedSeries:string|null="";
  selectedChapter:string|null="";

  constructor(
    private fileSystem: FileService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        this.selectedSeries = this.activatedRoute.snapshot.paramMap.get('series');
        this.selectedChapter = this.activatedRoute.snapshot.paramMap.get('chapter');
        this.dbConfigJson = new DbConfig(fileData);
        this.chapter = this.dbConfigJson
                          .tvSeries
                          .filter(series => series.name === this.selectedSeries)[0]
                          .chapters
                          .filter(chapter => chapter.name == this.selectedChapter)[0];
        console.info("Chapter Component");
      },
      (error) => {
        console.error("DB Config file not found");
      }
    )
  }

}
