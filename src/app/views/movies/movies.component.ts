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
  dbConfigPath = 'C:\\Users\\vukku\\Documents\\dbConfig.json';
  dbConfigJson = new DbConfig({});
  moviesJson: Movie[] = [];

  constructor(private fileSystem: FileService) { }

  ngOnInit(): void {
    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        this.dbConfigJson = new DbConfig(fileData);
        this.moviesJson = this.dbConfigJson.movies;
      },
      (error) => {
        console.error("DB Config file not found");
      }
    );
  }

}
