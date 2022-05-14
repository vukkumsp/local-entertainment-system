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

  async updateJsonFile(filePath: String, jsonData: any) {
    return new Promise<any>((resolve, reject) => {
      this.es.getIpcR().once("updateJsonFileResponse", (event, path, data) => {
        // const data = JSON.parse(Buffer.from(arg).toString('utf8'))
        console.log("updateJsonFileResponse: ", path, data);
        
        resolve({path, data});
      });
      console.log("getFile path: ", filePath);
      this.es.getIpcR().send("updateJsonFile", filePath, jsonData);
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

  async getFilesInDir(dirPath: String) { //"C:\\Users\\vukku\\Documents"
    return new Promise<string[]>((resolve, reject) => {
      this.es.getIpcR().once("getFilesInDirResponse", (event, files) => {
        console.log("Directory used: ", dirPath);
        console.log("Response: ", files);
        resolve(files);
      });
      console.log("Sending getFilesInDir to channel");
      this.es.getIpcR().send("getFilesInDir", dirPath);
    });
  }
}
