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
  }


}
