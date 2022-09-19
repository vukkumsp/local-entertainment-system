# Local Entertainment System
![NPM Tests](https://github.com/vsaiprakash/local-entertainment-system/actions/workflows/npm-tests-workflow.yml/badge.svg)
![Electron Build](https://github.com/vsaiprakash/local-entertainment-system/actions/workflows/electron-build-workflow.yml/badge.svg)

## Why this project is created ?

LES or Local Entertainment System is inspired from [Emdb](https://www.emdb.eu/) tool. We are trying to make it more cross platform and less complicated.

## Development

Run `npm run electron` for dev app to run locally.

## Distribution

We are using [`electron-package`](https://github.com/electron/electron-packager) library for generating an executable package based on OS & Architecture.
Steps:
1. Install NPM Libraries with `npm install`
2. Generate package with `npx electron-packager . LESv1 --platform=win32 --arch=x64 --electron-version=18.2.0 --out=dist-electron-app`
    - It will generate an executable file along with its support files in ./dist-electron-app folder for windows os
    - You can refer to Electron-Packager Github page README file for understanding the above cmd [here](https://github.com/electron/electron-packager) and also customizing for other Operating Systems & Architectures.

## How to use the App ?

1. Generate package with script `npm run build-dist-app`
2. Create a basic dbConfig.json file somewhere
3. Either copy the generated package to resources location or just run the executable file .exe in the generated folder.
4. Go to Settings page of App
5. Update the dbConfig file path and click 'Update'
6. Update the 'Movies' folder path & 'TV Series' folder path and click 'Update Paths'
7. Finally click 'Sync Folder Data'
8. Now, App should have generated all the resources in dbConfig.json file
9. Go to Movies page or TV Series page and explore.

## Resources & Knowledge

IPC is being used when some features are not available to frontend process. Example: Angular process won't allow accessing local file system apart from its project assets folder. To mitigate this we take help of NodeJs process.

IPC is explained better in [here](https://github.com/marcialwushu/angular-electron/wiki/Using-IPC-in-Angular#a-simple-workaround)

## To Do

- [ ] Electron build is generated executable with whole angular project into it causing too big size of executable files. Need to resolve this.

## Preview / Screenshots with Dummy Data

<img width="948" alt="Screenshot 2022-09-18 134159" src="https://user-images.githubusercontent.com/9028439/190892694-6c236dff-4ece-4413-8922-9d203e1a9c99.png">
<img width="944" alt="Screenshot 2022-09-18 134237" src="https://user-images.githubusercontent.com/9028439/190892709-de4b58d5-6e1a-4ff3-9f0f-6d0d90037dcf.png">
<img width="943" alt="Screenshot 2022-09-18 134259" src="https://user-images.githubusercontent.com/9028439/190892713-5f929f28-4d4b-4430-b8dc-dee0dadbd09b.png">
<img width="960" alt="image" src="https://user-images.githubusercontent.com/9028439/190990778-a27803b5-31e9-45ab-bae5-69f1f8167155.png">


## Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4. & based on [Electron Project](https://github.com/custom-templates/angular-electron-project-v2)
