<div align="center"><img style="height: 10rem" src="./res/logo_transparent.png"></div>
<p align="center">Effortlessly change the web's typography!</p>

# Setup

Fontonic uses `web-ext` for testing and building the extension.

For running the extension locally in a Firefox instance, use the following command:

```sh
npx web-ext run
```

For building the `zip` file for final submission to Firefox Add-On repository, use the build command:

```sh
npx web-ext build
```

Fontonic uses Prettier for code formatting. Thus, it is recommended to have the Prettier VS Code extension installed. Maintain the `tabWidth: 4` as configured in `.prettierrc`.
