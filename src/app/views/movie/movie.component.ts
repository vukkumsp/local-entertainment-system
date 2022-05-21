import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbConfig } from 'src/app/models/DbConfig';
import { Movie } from 'src/app/models/Movie';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  dbConfigPath = '';
  dbConfigJson = new DbConfig({});
  movie: Movie = {
    name: '',
    folderPath: '',
    videoPath: '',
    posterPath: '',
    subs: []
  };

  constructor(
    private fileSystem: FileService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dbConfigPath = this.fileSystem.getDbConfigFilePath();

    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        let selectedName = this.activatedRoute.snapshot.paramMap.get('name')
        this.dbConfigJson = new DbConfig(fileData);
        this.movie = this.dbConfigJson.movies.filter(movie => movie.name === selectedName)[0];
        console.info("Movie Component");
      },
      (error) => {
        console.error("DB Config file not found");
      }
    )
  }

  playMovie(){
    this.fileSystem.playVideo(this.movie.videoPath, this.movie.name).then(
      (response)=>{
        console.log(response);
      },
      (error) => {
        console.error("DB Config file not found");
      }
    );
  }
}
