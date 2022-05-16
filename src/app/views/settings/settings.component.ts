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
  dbConfigPath = 'C:\\Users\\vukku\\Documents\\dbConfig.json';
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
    //go through specified movies folder
    this.fileSystem.getFilesInDir(this.moviesPath).then(
      (moviesList)=>{
        console.log("Movies fetched: ", moviesList);

        this.movies = [];
        // for(let i = 0; i < moviesList.length; ++i){
        //   this.fileSystem.getFilesInDir(this.moviesPath+"\\"+moviesList[i]).then(
        //     (movieFolderContent)=>{
        //       console.log("Name: ", moviesList[i]," - ",movieFolderContent);
        //       //find & add movie name to name
        //       //find & add video file to videoPath
        //       //find & add srt file to srtPath
        //       //find & add poster file to posterPath
        //       //find & add folder path
        //     }
        //   );
        //   await delay(5000);
        // }

        for(let i = 0; i < moviesList.length; ++i){
          this.movies[i] = new Movie(moviesList[i], this.moviesPath+"\\"+moviesList[i], 
                                                  '', '', []);
        }

        //update dbConfig.json
        this.dbConfigJson = new DbConfig({
          moviesPath: this.dbConfigJson.moviesPath,
          tvSeriesPath: this.dbConfigJson.tvSeriesPath,
          movies: this.movies,
          tvSeries: this.tvSeries
        });

        //update the dbConfig.json with the data
        this.updateData();
      },
      (failure)=>{

      }
    );
    

  }
}
