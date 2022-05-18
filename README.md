# Local Entertainment System

## Why this project is created ?

LES or Local Entertainment System is inspired from [Emdb](https://www.emdb.eu/) tool. We are trying to make it more cross platform and less complicated.

## Development

Run `npm run electron` for a dev app.

## Resources & Knowledge

IPC is being used when some features are not available to frontend process. Example: Angular process won't allow accessing local file system apart from its project assets folder. To mitigate this we take help of NodeJs process.

IPC is explained better in [here](https://github.com/marcialwushu/angular-electron/wiki/Using-IPC-in-Angular#a-simple-workaround)

## Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4. & based on [Electron Project](https://github.com/custom-templates/angular-electron-project-v2)
