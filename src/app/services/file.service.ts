import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ElectronService } from './electron/electron.service';

// https://github.com/marcialwushu/angular-electron/wiki/Using-IPC-in-Angular#a-simple-workaround
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private es: ElectronService) { }

  async getData() {
    return new Promise<string[]>((resolve, reject) => {
      this.es.getIpcR().once("getDataResponse", (event, arg) => {
        console.log("Response: ", arg);
        resolve(arg);
      });
      console.log("Sending getData to channel");
      this.es.getIpcR().send("getData", "request");
    });
  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this.es.getIpcR().once("getFilesResponse", (event, arg) => {
        console.log("Directory used: ", __dirname);
        console.log("Response: ", arg);
        resolve(arg);
      });
      console.log("Sending getFiles to channel");
      this.es.getIpcR().send("getFiles");
    });
  }
}
