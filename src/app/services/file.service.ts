import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

// https://github.com/marcialwushu/angular-electron/wiki/Using-IPC-in-Angular#a-simple-workaround
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc!: IpcRenderer; //adding definite assignment property refer: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#:~:text=The%20definite%20assignment%20assertion%20is,TypeScript's%20analyses%20cannot%20detect%20so.

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.once("getFilesResponse", (event, arg) => {
        resolve(arg);
      });
      this.ipc.send("getFiles");
      reject("Error");
    });
  }
}
