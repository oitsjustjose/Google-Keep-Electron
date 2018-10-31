@echo off

electron-packager . --overwrite --platform=darwin --arch=x64 --icon=img/icon.icns --prune=true --out=release-builds