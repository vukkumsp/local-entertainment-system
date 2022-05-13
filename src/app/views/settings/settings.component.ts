import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
      },
      (error) => {
        this.moviesPath = 'ERROR Movies path not found';
        this.tvSeriesPath = 'ERROR TV Series path not found';
      }
    )
  }

}
