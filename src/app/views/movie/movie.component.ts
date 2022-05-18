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
  dbConfigPath = 'C:\\Users\\vukku\\Documents\\dbConfig.json';
  dbConfigJson = new DbConfig({});
  movieJson: Movie = {
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
    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        let selectedName = this.activatedRoute.snapshot.paramMap.get('name')
        this.dbConfigJson = new DbConfig(fileData);
        this.movieJson = this.dbConfigJson.movies.filter(movie => movie.name === selectedName)[0];
      },
      (error) => {
        console.error("DB Config file not found");
      }
    )
  }

  playMovie(){
    this.fileSystem.playVideo(this.movieJson.videoPath, this.movieJson.name).then(
      (response)=>{
        console.log(response);
      },
      (error) => {
        console.error("DB Config file not found");
      }
    );
  }
}
