# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

# Gin Rummy Score App

## Table of Contents

- [Description](#description)
- [Installation Instructions](#installation-instructions)
- [Usage and Screenshots](#usage-and-screenshots)
- [Technologies Used](#technologies-used)
- [Dependencies and Credits](#dependencies-and-credits)
- [Project Structure](#project-structure)

## Description

Write a paragraph or two describing the project here.

## Installation Instructions

1. Fork this repo
1. In your copy of the repo click the green **Code** button and copy the URL
1. In your IDE `cd YOUR_DIRECTORY_FOR_THIS_APP`
1. `git clone COPIED_URL`
1. Run the following in your terminal
    - ``` bash
      npm init -y
      npm install
      ```
1. If you don't have an Expo account [sign up](https://expo.dev/signup) for one
1. In your IDE run `eas login`
1. Run `npx expo start`
   - If there are [issues](https://docs.expo.dev/get-started/start-developing/#having-problems) run `npx expo start --tunnel` instead
   - `^` + `c` will end the process 
1. Scan the QR code on your Android phone
1. After making updates to ./src/queries.ts you'll want to run this to recompile the TypeScript files
   - ``` bash
     npx tsc
     ```
<!--
## Usage and Screenshots

<img src="./public/screenshot.png" alt="screenshot" style="height: 50vh; width: auto;">

Here's a brief description of how to use the app.

- [Link to live preview](https://groundedwanderer.dev/)
- [Link to backend repo](https://github.com/aRav3n/odin-book-backend)

### Features
- Feature one
- Feature two
-->
## Technologies Used

- <a href="https://expo.dev"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg" style="height: 2rem; width: auto; vertical-align: middle;"> Expo </a>
- <a href="https://reactnative.dev/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" style="height: 2rem; width: auto;"> React Native</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" style="height: 2rem; width: auto;"> JavaScript</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" style="height: 2rem; width: auto;"> CSS</a>
- <a href="https://www.typescriptlang.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" style="height: 2rem; width: auto;"/> TypeScript</a>
- <a href="https://jestjs.io/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" style="height: 2rem; width: auto;"/> Jest</a>

### Development Tools

- <a href="https://code.visualstudio.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" style="height: 24px; width: auto;"/> VS Code</a>
- <a href="https://www.npmjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" style="height: 24px; width: auto;"/> NPM</a>
- <a href="https://git-scm.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" style="height: 24px; width: auto;"/> Git</a>

### Hosting

- <a href="https://github.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" style="height: 24px; width: auto;"/> Github</a>


## Dependencies and Credits
<!--
### Package Dependencies

- [packageName](https://www.npmjs.com/package/packageName)
-->
### Other Credits

- [Devicion](https://devicon.dev/)
- [Skillicons](https://skillicons.dev/)


## Project Structure

```bash
├──controllers/            # Controller files
├──db/                     # Compiled queries.js
├──generated/              # Generated Prisma files
├──prisma/                 # Prisma models and migrations
├──public/                 # Locally hosted images and icons
├──routes/                 # Router files
├──src/                    # Source files
    ├── controllers/       # Request handlers
    └── server.ts
└──test/                   # Test files
```