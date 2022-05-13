import { Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'local-entertainment-system';

  constructor(private file: FileService){

  }
  ngOnInit(): void {
    console.log("Console Logging")
    // this.file.getFiles().then(
    //   (success) => {
    //     console.log("Success: ", success);
    //   },
    //   (failure) => {
    //     console.log("Failure: ", failure);
    //   });
    this.file.getData().then(
      (success) => {
        console.log("Success: ", success);
      },
      (failure) => {
        console.log("Failure: ", failure);
      });
  }


}
