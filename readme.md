# Vanilla match height

## Features

- Inspired by [MatchHeight](https://github.com/liabru/jquery-match-height)
- Vanilla javascript
- Dependency free
- Row aware
- Will recalculate on browser resize
- Accounts for `margins`, `paddings`, `borders` and `box-sizing`

## Setup

Put the script tags just before `</body>`.

```html
<script src="vanilla-match-height.js"></script>
<script>
  let equalHeight = new VanillaMatchHeight();
  equalHeight.init();
</script>
```

## Usage

Set `data-match-item` on elements that should match. Make sure to add a group name to them.

**It make look like this:**

```text
data-match-item="hello"
```

The matching elements by group will have the same height. The height is set by the tallest element.

### Example

The elements containing `data-match-item="h"` will have the same height, in case they are on the same row. The same thing for `data-match-item="p"`.

```html
<div class="box">
  <h1 data-match-item="h">A really very long heading that will break the line</h1>
  <p data-match-item="p">A really short p tag</p>
  <div class="button">Button</div>
</div>
<div class="box">
  <h1 data-match-item="h">Short h1 tag</h1>
  <p data-match-item="p">Macaroon fruitcake icing lollipop cake wafer. Jelly beans muffin liquorice lollipop toffee bonbon cupcake gummies. Carrot cake danish cotton candy. Danish gummies croissant halvah. Ice cream biscuit sweet roll. Gingerbread tootsie roll chupa chups tart halvah jelly-o powder powder. Pudding biscuit candy canes croissant ice cream pie. Ice cream croissant cotton candy chupa chups candy. Candy canes lollipop cheesecake oat cake powder topping lemon drops. Fruitcake wafer donut chupa chups. Lemon drops jelly beans dragée liquorice danish wafer sweet pie caramels. Lollipop halvah candy jelly chocolate.</p>
</div>
```

## Methods

### Resize

In case you use ajax or want to trigger the resize later you can use the `resize` method.

```js
equalHeight.resize();
```

### Reset

In case you want to reset the heights, you can use the `reset` method.

```js
equalHeight.reset();
```

## License

MIT