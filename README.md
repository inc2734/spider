# Spider

## Get started

### Install
```
$ npm install --save-dev @inc2734/spider
```

### JavaScript
```
import Spider from '@inc2734/spider';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const spiders = new Spider('.spider-container');
  },
  false
);
```

or

```
<script type="text/javascript" src="node_modules/@inc2734/spider/dist/js/spider.js"></script>
<script>
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const spiders = new Spider('.spider-container');
  },
  false
);
</script>
```

or

```
<script src="https://cdn.jsdelivr.net/npm/@inc2734/spider/dist/js/spider.js"></script>
<script>
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const spiders = new Spider('.spider-container');
  },
  false
);
</script>
```

### CSS
```
@import 'node_modules/@inc2734/spider/src/css/spider';
```

or

```
<link rel="stylesheet" href="node_modules/@inc2734/spider/dist/css/spider.css">
```

or

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@inc2734/spider/dist/css/spider.css">
```

### HTML
```
<div class="spider-container">
  <div class="spider">
    <div class="spider__canvas">
      <div class="spider__slide" data-id="0">
        <img class="spider__figure" src="img/blue.jpg" alt="">
      </div>
      <div class="spider__slide" data-id="1">
        <img class="spider__figure" src="img/green.jpg" alt="">
      </div>
      <div class="spider__slide" data-id="2">
        <img class="spider__figure" src="img/orange.jpg" alt="">
      </div>
      <div class="spider__slide" data-id="3">
        <img class="spider__figure" src="img/pink.jpg" alt="">
      </div>
      <div class="spider__slide" data-id="4">
        <img class="spider__figure" src="img/purple.jpg" alt="">
      </div>
      <div class="spider__slide" data-id="5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu
        </p>
      </div>
    </div>

    <button class="spider__arrow" data-direction="prev">Prev</button>
    <button class="spider__arrow" data-direction="next">Next</button>
  </div>

  <div class="spider__dots">
    <button class="spider__dot" data-id="0">0</button>
    <button class="spider__dot" data-id="1">1</button>
    <button class="spider__dot" data-id="2">2</button>
    <button class="spider__dot" data-id="3">3</button>
    <button class="spider__dot" data-id="4">4</button>
    <button class="spider__dot" data-id="5">5</button>
  </div>
</div>
```

## Demo
- https://inc2734.github.io/spider/

## Support browsers

Modern browsers and IE11
