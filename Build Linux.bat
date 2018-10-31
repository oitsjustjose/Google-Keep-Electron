@echo off

electron-packager . "Google Keep" --overwrite --asar=true --platform=linux --arch=x64 --icon=img/icon.png --prune=true --out=release-builds