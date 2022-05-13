import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

/*
  Inspired from https://kevinkulp.com/simple-data-storage-for-an-angular-electron-application/
*/
@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  private ipcRenderer!: IpcRenderer;//adding definite assignment property refer: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#:~:text=The%20definite%20assignment%20assertion%20is,TypeScript's%20analyses%20cannot%20detect%20so.

  constructor() {
    // Only available if running in electron
    if (this.isElectron()) {
      // this.ipcRenderer = (window).require('electron').ipcRenderer;
      if ((<any>window).require) {
        try {
          this.ipcRenderer = (<any>window).require('electron').ipcRenderer
        } catch (error) {
          throw error
        }
      } else {
        console.warn('Could not load electron ipc')
      }
    }
  }

  private isElectron(): boolean {
    return !!((window) && (window).process && (window).process.type);
  }

  public getIpcR(): IpcRenderer {
    return this.ipcRenderer;
  }
}
