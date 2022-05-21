import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delay } from 'rxjs';
import { DbConfig } from 'src/app/models/DbConfig';
import { Movie } from 'src/app/models/Movie';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  dbConfigPath = '';
  moviesPath = '';
  tvSeriesPath = '';
  fileData = {};
  dbConfigJson = new DbConfig({});
  // moviesPath = 'C:\\Users\\vukku\\Documents\\Movies';
  // tvSeriesPath = 'C:\\Users\\vukku\\Documents\\TV Series';
  movies: any[] = [];
  tvSeries: any[] = [];
  constructor(private fileSystem: FileService) { }

  ngOnInit(): void {
    // Fetch dbConfig path from local storage
    this.dbConfigPath = this.fileSystem.getDbConfigFilePath();

    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        this.moviesPath = fileData.moviesPath?fileData.moviesPath:"Movies path not found";
        this.tvSeriesPath = fileData.tvSeriesPath?fileData.tvSeriesPath:"TV Series path not found";
        this.fileData = fileData;
        this.dbConfigJson = new DbConfig(fileData);
      },
      (error) => {
        this.moviesPath = 'ERROR Movies path not found';
        this.tvSeriesPath = 'ERROR TV Series path not found';
      }
    )
  }

  updateDbConfigPath(): void{
    this.fileSystem.updateDbConfigFilePath(this.dbConfigPath);
  }

  updateData(): void {
    console.log("updateData>> "+JSON.stringify(this.dbConfigJson));
    this.dbConfigJson = new DbConfig({
      moviesPath: this.moviesPath,
      tvSeriesPath: this.tvSeriesPath,
      movies: this.dbConfigJson.movies,
      tvSeries: this.dbConfigJson.tvSeries
    });
    this.fileSystem.updateJsonFile(this.dbConfigPath, this.dbConfigJson).then(
      (success)=>{
        console.log("Updated the dbConfig file ", success);
      },
      (failure)=>{
        console.log("Failed to update the dbConfig file ", failure);
      }
    );
  }

  syncData(): void {

    this.fileSystem.parseMedia([ this.moviesPath, this.tvSeriesPath ]).then(
      ([movies, tvSeries])=>{
        console.log("Updated the dbConfig file ", movies);
        this.dbConfigJson = new DbConfig({
          moviesPath: this.moviesPath,
          tvSeriesPath: this.tvSeriesPath,
          movies: movies,
          tvSeries: tvSeries
        });
        this.updateData();
      },
      (failure)=>{
        console.log("Failed to update the dbConfig file ", failure);
      }
    );
  }
}
