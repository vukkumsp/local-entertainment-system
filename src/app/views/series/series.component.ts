import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbConfig } from 'src/app/models/DbConfig';
import { TvSeries } from 'src/app/models/TvSeries';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  dbConfigPath = 'C:\\Users\\vukku\\Documents\\dbConfig.json';
  dbConfigJson = new DbConfig({});
  series: TvSeries = {
    name: '',
    folderPath: '',
    posterPath: '',
    chapters: []
  };

  constructor(
    private fileSystem: FileService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.fileSystem.getFile(this.dbConfigPath).then(
      (fileData)=>{
        let selectedName = this.activatedRoute.snapshot.paramMap.get('name')
        this.dbConfigJson = new DbConfig(fileData);
        this.series = this.dbConfigJson.tvSeries.filter(series => series.name === selectedName)[0];
        console.info("Series Component");
      },
      (error) => {
        console.error("DB Config file not found");
      }
    )
  }

}
