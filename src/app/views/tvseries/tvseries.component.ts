import { Component, OnInit } from '@angular/core';
import { DbConfig } from 'src/app/models/DbConfig';
import { TvSeries } from 'src/app/models/TvSeries';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-tvseries',
  templateUrl: './tvseries.component.html',
  styleUrls: ['./tvseries.component.css']
})
export class TvseriesComponent implements OnInit {
  dbConfigPath = 'C:\\Users\\vukku\\Documents\\dbConfig.json';
  dbConfigJson = new DbConfig({});
  tvseries: TvSeries[] = [];

  constructor(private fileSystem: FileService) { }

  ngOnInit(): void {
    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        this.dbConfigJson = new DbConfig(fileData);
        this.tvseries = this.dbConfigJson.tvSeries;
        console.info("TV Series Component");
      },
      (error) => {
        console.error("DB Config file not found");
      }
    );
  }

}
