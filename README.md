<h1 align="center">🎭 <br> stageset</h1>
<h3 align="center">Trigger actions when elements enter or exit the browser stage / viewport.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/stageset" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/stageset.svg">
  </a>
  <a href="https://github.com/TimoBechtel/stageset/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/TimoBechtel/stageset" />
  </a>
</p>
<p align="center">
  ·
  <a href="https://github.com/TimoBechtel/stageset#readme">Homepage</a>
  ·
  <a href="https://timobechtel.github.io/stageset">View Demo</a>
  ·
  <a href="https://github.com/TimoBechtel/stageset/issues">Report Bug / Request Feature</a>
  ·
</p>

> **stage set** - all of the scenery and props used on stage to create a particular scene

Manage props entering or leaving a scene.

## Table of Contents

- [Installation](#Install)
- [Usage](#usage)
- [Test](#run-tests)
- [Contact](#contact)
- [Contributing](#Contributing)
- [License](#license)

## Install

### NPM:

```sh
npm install stageset
```

### CDN:

```html
<script src="https://unpkg.com/stageset/dist/index.umd.js"></script>
```

## Usage

### When using modules:

```javascript
import { onStage } from 'stageset';
```

### Use it like this:

```javascript
onStage('.scroll-fade').toggle('fade-in');
```

### ✨ <a href="https://timobechtel.github.io/stageset">View Demo</a>

```typescript
/**
 * Give it an element or list of elements to get an api object
 * that allows you to trigger actions when an object is scolled into or out of view.
 * @param actors single HTMLElement, Array or query selector string
 * @param options default IntersectionObserver options
 * @example onView('.my-class').toggle('visible')M
 */
function onStage(
  actors: HTMLElement | HTMLElement[] | string,
  options?: IntersectionObserverOptions
): OnViewAPI;

/**
 * Chainable actions when scrolled into or out of view
 */
interface OnViewAPI {
  /**
   * Add class when scrolled into/out of view
   * @param className
   */
  addClass(className: string): OnViewAPI;

  /**
   * Remove class when scrolled into/out of view
   * @param className
   */
  removeClass(className: string): OnViewAPI;

  /**
   * Toggles a class name when scrolled into/out of view
   * @param className
   */
  toggle(className: string): OnViewAPI;

  /**
   * What to do when scrolled into/out of view
   * @param fun callback function
   */
  do(fun: (element: HTMLElement) => void): OnViewAPI;

  /**
   * Stop observing
   */
  end(): OnViewAPI;

  /**
   * Actions to do when scrolled out of view
   * Same api as when scrolled into view
   */
  else: OnViewAPI;
}
```

### More examples

```javascript
// toggle between visible and hidden
onStage('#my-element').toggle('visible').else.toggle('hidden');

// add text when element is visible, only called once
onStage(document.getElementById('my-element')).do(
  (e) => (e.innerHTML += '=> now visible')
);

// add class when elements enter the stage for the first time
onStage('.my-classes').addClass('slide-in');
```

Also check out the [example](https://github.com/TimoBechtel/stageset/blob/master/example/index.html) file.

## Run tests

```sh
npm run test
```

## Contact

👤 **Timo Bechtel**

- Website: https://timobechtel.com
- Twitter: [@TimoBechtel](https://twitter.com/TimoBechtel)
- GitHub: [@TimoBechtel](https://github.com/TimoBechtel)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />

1. Check [issues](https://github.com/TimoBechtel/stageset/issues)
1. Fork the Project
1. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
1. Test your changes `npm run test`
1. Commit your Changes (`git commit -m 'feat: add amazingFeature'`)
1. Push to the Branch (`git push origin feat/AmazingFeature`)
1. Open a Pull Request

### Commit messages

This project uses semantic-release for automated release versions. So commits in this project follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines. I recommend using [commitizen](https://github.com/commitizen/cz-cli) for automated commit messages.

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Distributed under the [MIT](https://github.com/TimoBechtel/stageset/blob/master/LICENSE) License.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
