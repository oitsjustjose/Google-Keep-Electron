# Google Keep (Electron)

This repo includes the sample code for creating a desktop-version of a web application (Google Keep, in this case). 

## To use:

1. Install node.js
2. Open a Terminal / Command Prompt
3. CD into this directory
4. Type `npm install`
5. Go Dog Go!!

## Developing:

Developing for Electron is basically just web-development. `index.html` is the "main" class for Electron, do everything based on this. See `main.js` for more refinements you can make!

## Building (For release):

You'll need electron packager. Get it using:

`npm install electron-packager -g`

See the .bat files - they're useful but need modification to suit your needs. On a Mac / Linux, you can refer to them and just type them yourself. The `release-builds` folder contains the finalized builds when you're done.
