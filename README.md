# Reflexy [![npm package](https://img.shields.io/npm/v/reflexy.svg?style=flat-square)](https://www.npmjs.org/package/reflexy)

**Reflexy** is React Components for Flexbox Layout:

- [Flex](#Flex) - flexbox layout with paddings and margins support.
- [ResponsiveFlex](#ResponsiveFlex) - Like Flex but with breakpoins.

and [custom media queries](#mq):

| Name    | Value                                         |
| :------ | :-------------------------------------------- |
| `--xxs` | `(max-width: 479px)`                          |
| `--xs`  | `(min-width: 480px) and (max-width: 767px)`   |
| `--s`   | `(min-width: 768px) and (max-width: 991px)`   |
| `--m`   | `(min-width: 992px) and (max-width: 1279px)`  |
| `--l`   | `(min-width: 1280px) and (max-width: 1919px)` |
| `--xl`  | `(min-width: 1920px) and (max-width: 2559px)` |
| `--xxl` | `(min-width: 2560px)`                         |

Custom media queries can be used with [postcss-custom-media](https://github.com/postcss/postcss-custom-media#importfrom).
Example of configuration with [preset-env](https://preset-env.cssdb.org/):

```js
const { exportMediaQueries } = require('reflexy/mediaQueries');

module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'custom-media-queries': {
          importFrom: [{ customMedia: exportMediaQueries() }],
        },
      },
    },
  },
};
```

## Installation

```sh
yarn add react reflexy
# or
npm install --save react reflexy
```

**Reflexy** has own css files so you need provide loader for css files placed in node_modules folder. With webpack it's maybe [css-loader](https://github.com/webpack-contrib/css-loader):

```js
{
  test: /\.css$/,
  include: path.join(__dirname, 'node_modules'),
  // or
  include: /reflexy/,
  use: [
    // ...
    { loader: 'css-loader', options: { modules: true } }, // enabled css-modules is necessary
    // ...
  ],
},
```

## [Flex](#Flex)

### Usage

```jsx
import { Flex } from 'reflexy';

<Flex row justifyContent="center">
  ...
</Flex>

<Flex row justifyContent="center" component={<button />}>
  ...
</Flex>

<Flex row justifyContent="center" component="button" onClick={...}>
  ...
</Flex>

<Flex row justifyContent="center" componentRef={componentRef}>
  ...
</Flex>

<Flex row justifyContent="center" component={CustomComponent} componentProp1={...} componentProp2={...}>
  ...
</Flex>

<Flex ml pb>
  ...
</Flex>;

// mSize and pSize are 's'
<Flex.S>...</Flex.S>;
// mSize and pSize are 'm'
<Flex.M>...</Flex.M>;
// mSize and pSize are 'l'
<Flex.L>...</Flex.L>;
```

### Props

Default style is just `display: flex`.

| Prop              | Type                                                                                                                                              | Description                                                                                                                                                                                                                                         |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inline?`         | `boolean`                                                                                                                                         | Sets `display` to `inline-flex`.                                                                                                                                                                                                                    |
| `row?`            | `boolean`                                                                                                                                         | Sets `flow-direction` to `row`.                                                                                                                                                                                                                     |
| `column?`         | `boolean`                                                                                                                                         | Sets `flow-direction` to `column`. Takes a precedence over `row`.                                                                                                                                                                                   |
| `reverse?`        | `boolean`                                                                                                                                         | Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse`.                                                                                                                                                               |
| `wrap?`           | `boolean \| 'inherit' \| 'initial' \| 'unset' \| 'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                            | Sets `flex-wrap` to corresponding value. Also accepts boolean value: `true` equals to `wrap`, `false` equals to `nowrap`.                                                                                                                           |
| `alignContent?`   | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'stretch'` | Sets `align-content` to corresponding value.                                                                                                                                                                                                        |
| `alignItems?`     | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline'`                                          | Sets `align-items` to corresponding value.                                                                                                                                                                                                          |
| `alignSelf?`      | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline' \| 'auto' \| 'initial' \| 'inherit'`      | Sets `align-self` to corresponding value.                                                                                                                                                                                                           |
| `justifyContent?` | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'`              | Sets `justify-content` to corresponding value.                                                                                                                                                                                                      |
| `center?`         | `boolean`                                                                                                                                         | Sets `justifyContent` and `alignItems` to `center`. `justifyContent` and `alignItems` take a precedence over `center`.                                                                                                                              |
| `basis?`          | `'inherit' \| 'initial' \| 'unset' \| 'auto' \| 'content' \| 'number'`                                                                            | Sets `flex-basis` to corresponding value.                                                                                                                                                                                                           |
| `grow?`           | `0..24 \| boolean`                                                                                                                                | Sets `flex-grow` to corresponding value. `true` is equals to `1`, `false` is equals to `0`.                                                                                                                                                         |
| `shrink?`         | `0..24 \| boolean`                                                                                                                                | Sets `flex-shrink` to corresponding value. `true` is equals to `1`, `false` is equals to `0`.                                                                                                                                                       |
| `order?`          | `number`                                                                                                                                          | Sets `order` to corresponding value.                                                                                                                                                                                                                |
| `hfill?`          | `boolean \| number in range 0.0 to 1.0 inclusive`                                                                                                 | Stretch by horizontal or sets width in percentage (numbers in range 0.0 to 1.0 inclusive).                                                                                                                                                          |
| `vfill?`          | `boolean \| number in range 0.0 to 1.0 inclusive`                                                                                                 | Stretch by vertical or sets height in percentage (numbers in range 0.0 to 1.0 inclusive).                                                                                                                                                           |
| `fill?`           | `boolean`                                                                                                                                         | Stretch by vertical and horizontal.                                                                                                                                                                                                                 |
| `widthByFlex?`    | `boolean`                                                                                                                                         | Sets `min-width: 0`. By default, a flex item cannot be smaller than the size of its content. The initial setting on flex items is min-width: auto. One way to enable flex items to shrink past their content is to set a flex item to min-width: 0. |
| `className?`      | `string`                                                                                                                                          | CSS class name.                                                                                                                                                                                                                                     |
| `style?`          | `React.CSSProperties`                                                                                                                             | Inline styles.                                                                                                                                                                                                                                      |
| `component?`      | `React.ReactElement<P> | React.ElementType<P>`                                                                                                    | Sets custom react component as a container. Component must accept className and style through props.                                                                                                                                                |
| `componentRef?`   | `React.Ref`                                                                                                                                       | Uses when `component` is `React.ElementType` and `component` provides `ref`.                                                                                                                                                                        |
| `unit?`           | `string`                                                                                                                                          | Measure unit of space                                                                                                                                                                                                                               |
| `mSize?`          | `'s' \| 'm' \| 'l' \| number`                                                                                                                     | Size of `margin`                                                                                                                                                                                                                                    |
| `m?`              | `boolean \| number`                                                                                                                               | `margin`. Scaling value.                                                                                                                                                                                                                            |
| `mt?`             | `boolean \| number`                                                                                                                               | `margin-top`                                                                                                                                                                                                                                        |
| `mr?`             | `boolean \| number`                                                                                                                               | `margin-right`                                                                                                                                                                                                                                      |
| `mb?`             | `boolean \| number`                                                                                                                               | `margin-bottom`                                                                                                                                                                                                                                     |
| `ml?`             | `boolean \| number`                                                                                                                               | `margin-left`                                                                                                                                                                                                                                       |
| `mx?`             | `boolean \| number`                                                                                                                               | `margin` by x axis: `margin-left` & `margin-right`                                                                                                                                                                                                  |
| `my?`             | `boolean \| number`                                                                                                                               | `margin` by y axis: `margin-top` & `margin-bottom`                                                                                                                                                                                                  |
| `pSize?`          | `'s' \| 'm' \| 'l' \| number`                                                                                                                     | Size of `padding`                                                                                                                                                                                                                                   |
| `p?`              | `boolean \| number`                                                                                                                               | `padding`. Scaling value.                                                                                                                                                                                                                           |
| `pt?`             | `boolean \| number`                                                                                                                               | `padding-top`                                                                                                                                                                                                                                       |
| `pr?`             | `boolean \| number`                                                                                                                               | `padding-right`                                                                                                                                                                                                                                     |
| `pb?`             | `boolean \| number`                                                                                                                               | `padding-bottom`                                                                                                                                                                                                                                    |
| `pl?`             | `boolean \| number`                                                                                                                               | `padding-left`                                                                                                                                                                                                                                      |
| `px?`             | `boolean \| number`                                                                                                                               | `padding` by x axis: `padding-left` & `padding-right`                                                                                                                                                                                               |
| `py?`             | `boolean \| number`                                                                                                                               | `padding` by y axis: `padding-top` & `padding-bottom`                                                                                                                                                                                               |

### Flex Statics

| Prop           | Type                                | Description                                           |
| :------------- | :---------------------------------- | :---------------------------------------------------- |
| `S`            | `Flex`                              | Flex component with `mSize` and `pSize` equal to `s`. |
| `M`            | `Flex`                              | Flex component with `mSize` and `pSize` equal to `m`. |
| `L`            | `Flex`                              | Flex component with `mSize` and `pSize` equal to `l`. |
| `defaultSizes` | `Record<'s' \| 'm' \| 'l', number>` | Space sizes. Default: `{ s: 0.5, m: 1, l: 2 }`.       |
| `defaultUnit`  | `string`                            | Measure unit of space. Default: `rem`.                |

## [ResponsiveFlex](#ResponsiveFlex)

### Usage

```jsx
import { ResponsiveFlex } from 'reflexy';

// `breakpoints` values will override default values for `row` and `order`.
<ResponsiveFlex
  row
  order={1}
  breakpoints={{
    l: { column: true, order: 2 },
    xxs: { alignItems: 'center', order: 4 },
  }}
>
  ...
</ResponsiveFlex>;
```

### Props

All props of [Flex](#Flex) and:

| Prop                 | Type                                 | Description                                                                                              |
| :------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `strictBreakpoints?` | `boolean`                            | `true` - don't merge breakpoints props up to current size and use breakpoint props of current size only. |
| `breakpoints`        | `{ [P in ViewSize]?: AllFlexProps }` | Props per breakpoint.                                                                                    |

### ViewSize

Same as [Custom media queries](#mq) but names without prefix `--`.

## License

[MIT](https://opensource.org/licenses/mit-license.php)
