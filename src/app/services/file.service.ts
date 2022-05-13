import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ElectronService } from './electron/electron.service';

// https://github.com/marcialwushu/angular-electron/wiki/Using-IPC-in-Angular#a-simple-workaround
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private es: ElectronService) { }

  async getFile(filePath: String) {
    return new Promise<any>((resolve, reject) => {
      this.es.getIpcR().once("getFileResponse", (event, arg) => {
        const data = JSON.parse(Buffer.from(arg).toString('utf8'))
        console.log("getFile: ", data);
        
        resolve(data);
      });
      console.log("getFile path: ", filePath);
      this.es.getIpcR().send("getFile", filePath);
    });
  }

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
