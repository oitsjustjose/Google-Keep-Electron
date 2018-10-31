# Gmail for Electron

![icon](https://github.com/oitsjustjose/Google-Keep-Electron/blob/master/icon.png)

This repo includes the sample code for creating a desktop-version of Google Keep.

![screenshot](https://github.com/oitsjustjose/Google-Keep-Electron/blob/master/screenshot.png)

Releases found [here](https://github.com/oitsjustjose/Google-Keep-Electron/releases)

## Building (For release):

You'll need electron packager. Get it using:

`npm install electron-packager -g`

Once done, run any or all of the following:

**Windows**: `electron-packager . "Google Keep" --overwrite --asar=true --platform=win32 --arch=ia32 --icon=icon.ico --prune=true --out=release-builds --version-string.CompanyName=oitsjustjose --version-string.FileDescription="A simple Google Keep electron wrapper" --version-string.ProductName="GoogleKeep"`

**macOS**: `electron-packager . --overwrite --platform=darwin --arch=x64 --icon=./icon.icns --prune=true --out=release-builds`

**Linux**: `electron-packager . "Google Keep" --overwrite --asar=true --platform=linux --arch=x64 --icon=./icon.png --prune=true --out=release-builds`