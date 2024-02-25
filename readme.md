<div align="center"><img style="height: 10rem" src="./res/logo_transparent.png"></div>

<p align="center">Effortlessly change the web's typography!</p>
<div style="display:flex; justify-content:center;gap:1rem;" align="center"><a href="https://chromewebstore.google.com/detail/fontonic/hnjlnpipbcbgllcjgbcjfgepmeomdcog"><img style="height: 4rem; cursor: pointer;" src="./res/webstore.png"></a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/fontonic-customize-fonts/"><img style="height: 4rem; cursor: pointer;" src="./res/firefoxaddon.png"></a>
</div>
<br>
<div align="center">
<a href="https://www.producthunt.com/posts/fontonic?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fontonic" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=440978&theme=neutral" alt="Fontonic - Customize&#0032;fonts&#0032;of&#0032;any&#0032;website&#0032;with&#0032;any&#0032;fonts&#0032;you&#0032;like&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</div>
<br>
<div style="display:flex; justify-content:center;gap:1rem;" align="center">
<div>

![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/hnjlnpipbcbgllcjgbcjfgepmeomdcog?style=flat&logo=googlechrome&logoColor=%23ffffff&label=web%20store%20users&color=%231f4341)

</div>
<div>

![Mozilla Add-on Users](https://img.shields.io/amo/users/fontonic-customize-fonts?style=flat&logo=firefox&logoColor=%23ffffff&label=add-on%20users&color=%231f4341)

</div>

</div>

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

## Chrome Extension Source

The source for the Chrome extension is hosted at https://github.com/amkhrjee/fontonic
