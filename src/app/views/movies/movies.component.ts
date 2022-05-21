import { Component, OnInit } from '@angular/core';
import { DbConfig } from 'src/app/models/DbConfig';
import { Movie } from 'src/app/models/Movie';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  dbConfigPath = '';
  dbConfigJson = new DbConfig({});
  movies: Movie[] = [];

  constructor(private fileSystem: FileService) { }

  ngOnInit(): void {
    this.dbConfigPath = this.fileSystem.getDbConfigFilePath();
    
    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        this.dbConfigJson = new DbConfig(fileData);
        this.movies = this.dbConfigJson.movies;
        console.info("Movies Component");
      },
      (error) => {
        console.error("DB Config file not found");
      }
    );
  }

}
