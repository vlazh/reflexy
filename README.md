# Reflexy [![npm package](https://img.shields.io/npm/v/reflexy.svg?style=flat-square)](https://www.npmjs.org/package/reflexy)

**Reflexy** is React Components for Flexbox Layout:

- [Flex](#Flex) - flexbox layout.
- [ResponsiveFlex](#ResponsiveFlex) - flexbox layout with breakpoins. **In Beta**
- [Space](#Space) - flexbox layout with paddings and margins support. **In Beta**

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

<Flex row justifyContent="center" componentRef={componentRef}>
  ...
</Flex>
```

### Flex Props

Default style is just `display: flex`.

| Prop              | Type                                                                                                                                              | Description                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `inline?`         | `boolean`                                                                                                                                         | Sets `display` to `inline-flex`.                                                                                          |
| `row?`            | `boolean`                                                                                                                                         | Sets `flow-direction` to `row`.                                                                                           |
| `column?`         | `boolean`                                                                                                                                         | Sets `flow-direction` to `column`. Takes a precedence over `row`.                                                         |
| `reverse?`        | `boolean`                                                                                                                                         | Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse`.                                     |
| `wrap?`           | `boolean \| 'inherit' \| 'initial' \| 'unset' \| 'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                            | Sets `flex-wrap` to corresponding value. Also accepts boolean value: `true` equals to `wrap`, `false` equals to `nowrap`. |
| `alignContent?`   | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'stretch'` | Sets `align-content` to corresponding value.                                                                              |
| `alignItems?`     | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline'`                                          | Sets `align-items` to corresponding value.                                                                                |
| `alignSelf?`      | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline' \| 'auto' \| 'initial' \| 'inherit'`      | Sets `align-self` to corresponding value.                                                                                 |
| `justifyContent?` | `'inherit' \| 'initial' \| 'unset' \| 'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'`              | Sets `justify-content` to corresponding value.                                                                            |
| `center?`         | `boolean`                                                                                                                                         | Sets `justifyContent` and `alignItems` to `center`. Takes a precedence over `justifyContent` and `alignItems`.            |
| `basis?`          | `'inherit' \| 'initial' \| 'unset' \| 'auto' \| 'content'`                                                                                        | Sets `flex-basis` to corresponding value.                                                                                 |
| `grow?`           | `0..24 \| boolean`                                                                                                                                | Sets `flex-grow` to corresponding value. `true` is equals to `1`, `false` is equals to `0`.                               |
| `shrink?`         | `0..24 \| boolean`                                                                                                                                | Sets `flex-shrink` to corresponding value. `true` is equals to `1`, `false` is equals to `0`.                             |
| `order?`          | `number`                                                                                                                                          | Sets `order` to corresponding value.                                                                                      |
| `hfill?`          | `boolean`                                                                                                                                         | Stretch by horizontal.                                                                                                    |
| `vfill?`          | `boolean`                                                                                                                                         | Stretch by vertical.                                                                                                      |
| `fill?`           | `'v' \| 'h' \| 'all' \| boolean`                                                                                                                  | Stretch by v - vertical or h - horizontal or all - both. `true` is equals to `all`.                                       |
| `className?`      | `string`                                                                                                                                          | CSS class name.                                                                                                           |
| `style?`          | `React.CSSProperties`                                                                                                                             | Inline styles.                                                                                                            |
| `component?`      | `React.ReactElement<P & { className?: strin, style?: React.CSSProperties }>`                                                                      | Sets custom react component as a container. Component must accept className and style through props.                      |
| `componentRef?`   | `React.Ref<HTMLDivElement>`                                                                                                                       | Ref for container. Used if `component` is `undefined`.                                                                    |
| html div props    | `React.HTMLAttributes<HTMLDivElement>`                                                                                                            | Used if `component` is `undefined`.                                                                                       |

## [ResponsiveFlex](#ResponsiveFlex)

### Usage

```jsx
import { ResponsiveFlex } from 'reflexy';

// `breakpoints` values will override default values for `row` and `order`.
<ResponsiveFlex
  row
  order={1}
  breakpoints={{
    desktop: { column: true, order: 2 },
    'phone-m': { alignItems: 'center', order: 4 },
  }}
>
  ...
</ResponsiveFlex>;
```

### ResponsiveFlex Props

All props of [Flex](#Flex) and:

| Prop          | Type                                 | Description                     |
| :------------ | :----------------------------------- | :------------------------------ |
| `breakpoints` | `{ [P in Breakpoints]?: FlexProps }` | Sets flex props per breakpoint. |

### Breakpoints

```
phone
phone-s
phone-m
phone-l
tablet
tablet-s
tablet-m
tablet-l
desktop
desktop-s
desktop-m
desktop-l
```

## [Space](#Space)

### Usage

```jsx
import { Space } from 'reflexy';

// mSize and pSize are 's'
<Space.S>...</Space.S>;
// mSize and pSize are 'm'
<Space.M>...</Space.M>;
// mSize and pSize are 'l'
<Space.L>...</Space.L>;

<Space ml pb>
  ...
</Space>;
```

### Space Props

All props of [Flex](#Flex) and:

| Prop     | Type                          | Description                                           |
| :------- | :---------------------------- | :---------------------------------------------------- |
| `mSize?` | `'s' \| 'm' \| 'l' \| number` | Size of `margin`                                      |
| `m?`     | `boolean \| number`           | `margin`                                              |
| `mt?`    | `boolean \| number`           | `margin-top`                                          |
| `mr?`    | `boolean \| number`           | `margin-right`                                        |
| `mb?`    | `boolean \| number`           | `margin-bottom`                                       |
| `ml?`    | `boolean \| number`           | `margin-left`                                         |
| `mx?`    | `boolean \| number`           | `margin` by x axis: `margin-left` & `margin-right`    |
| `my?`    | `boolean \| number`           | `margin` by y axis: `margin-top` & `margin-bottom`    |
| `pSize?` | `'s' \| 'm' \| 'l' \| number` | Size of `padding`                                     |
| `p?`     | `boolean \| number`           | `padding`                                             |
| `pt?`    | `boolean \| number`           | `padding-top`                                         |
| `pr?`    | `boolean \| number`           | `padding-right`                                       |
| `pb?`    | `boolean \| number`           | `padding-bottom`                                      |
| `pl?`    | `boolean \| number`           | `padding-left`                                        |
| `px?`    | `boolean \| number`           | `padding` by x axis: `padding-left` & `padding-right` |
| `py?`    | `boolean \| number`           | `padding` by y axis: `padding-top` & `padding-bottom` |

## License

[MIT](https://opensource.org/licenses/mit-license.php)
