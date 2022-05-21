import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ElectronService } from './electron/electron.service';

// https://github.com/marcialwushu/angular-electron/wiki/Using-IPC-in-Angular#a-simple-workaround
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private es: ElectronService) { }

  getDbConfigFilePath(): string {
    return localStorage.getItem("dbConfigPath")??"C:\\Users\\vukku\\Documents\\dbConfig.json";
  }

  updateDbConfigFilePath(newPath: string): void {
    localStorage.setItem("dbConfigPath", newPath);
  }

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

  async parseMedia(mediaFolders: any) {
    return new Promise<string[]>((resolve, reject) => {
      this.es.getIpcR().once("parseMediaResponse", (event, mediaData) => {
        resolve(mediaData);
      });
      console.log("Sending parseMovies to channel");
      this.es.getIpcR().send("parseMedia", mediaFolders);
    });
  }

  async playVideo(videoPath: string, fileName: string) {
    return new Promise<string[]>((resolve, reject) => {
      this.es.getIpcR().once("playVideoResponse", (event, response) => {
        resolve(response);
      });
      console.log("Sending playVideo to channel");
      this.es.getIpcR().send("playVideo", videoPath, fileName, "VLC");
    });
  }
}
