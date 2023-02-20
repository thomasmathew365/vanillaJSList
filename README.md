## Vanilla Js List

### Live Demo [link](https://vanilla-js-list.vercel.app/)

This project uses **Vanilla JS** for DOM manipulation to create a list with some interactions. 

### Features
- Add and remove list items upto 100, after which additions are disabled.
- Hover animations on list items and immediately adjacent siblings.
- Modal popup when list item is clicked
- List item resizes to transform into modal
- Animations for resizing and overlay

### Stack
- **Vanilla JS** for interactions and animations
- **Tailwind** for styling
- **Vite** for bundling
- **Yarn** for package management

### Folder Structure
```
- 📂 __project__
   - 📄 [README.md](README.md)
   - 📂 __assets__
     - 📄 [favicon\-16x16.png](assets/favicon-16x16.png)
     - 📄 [favicon\-32x32.png](assets/favicon-32x32.png)
     - 📄 [favicon.ico](assets/favicon.ico)
   - 📂 __dist__
     - 📂 __assets__
       - 📄 [index.916c483a.js](dist/assets/index.916c483a.js)
       - 📄 [index.f10a3152.css](dist/assets/index.f10a3152.css)
     - 📄 [index.html](dist/index.html)
   - 📄 [index.html](index.html)
   - 📄 [node\_modules](node_modules)
   - 📄 [package.json](package.json)
   - 📄 [postcss.config.js](postcss.config.js)
   - 📂 __src__
     - 📄 [componentHTML.js](src/componentHTML.js) 
     - 📄 [handlers.js](src/handlers.js)
     - 📄 [helpers.js](src/helpers.js)
     - 📄 [index.css](src/index.css)
     - 📄 [main.js](src/main.js)
   - 📄 [tailwind.config.js](tailwind.config.js)
   - 📄 [yarn.lock](yarn.lock)
```

### Browsers supported

| Name    | Operating System | Device type |
| ------------- | ------------- | ------------- |
| Chrome  | Windows  | Desktop  |
| Chrome  | Mac OS  | Desktop  |


### Requirements

#### Yarn
```
$ npm install --global yarn
```

### Scripts
#### Run Dev Server
```
$ yarn dev
```
#### Build Production Distributable
```
$ yarn build
```
#### Serve Production Distributable Locally
```
$ yarn serve
```