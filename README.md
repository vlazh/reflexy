# Reflexy [![npm package](https://img.shields.io/npm/v/reflexy.svg?style=flat-square)](https://www.npmjs.org/package/reflexy)

**Reflexy** is a React components for flexbox layout written in typescript.

With **Reflexy**
* You don't need to worry about the prefixes of different browsers - **Reflexy** use an [autoprefixer](https://github.com/postcss/autoprefixer).
* You don't need to do a concatenation of a lot of css classes:
  ```js
  <div className={classNames(styles['flex'], styles['flex-column'], styles['flex-align-center'], ...)}>
    {children}
  </div>
  ```
  vs
  ```js
  <Flex column alignItems="center" className="custom-class">{children}</Flex>
  ```
* You can replace default output `div` tag:
  ```js
  <Flex tagName="header">{children}</Flex>
  ```
  output:
  ```js
  <header class="...">{children}</header>
  ```
* You can tweak you own react component with flexbox layout (your component must accept className through props):
  ```js
  <Flex
    component={MyComponent}
    column
    alignSelf="center"
    myProp="myPropValue"
    className={styles['my-class']}
  >
    {children}
  </Flex>
  ```
  will be
  ```js
  <MyComponent myProp="myPropValue" className="[reflexy classes] my-class">{children}</MyComponent>
  ```

## Installation

```
yarn add react reflexy
```
or
```
npm install --save react reflexy
```

**Reflexy** has own css files so you need provide loader for css files placed in node_modules folder. With webpack it's maybe css-loader:
```js
{
  test: /\.css$/,
  include: path.join(__dirname, 'node_modules'),
  // or
  include: /reflexy/
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]',
      },
    },
  ],
},
```

## Usage

```js
import { Flex } from 'reflexy';

...

<Flex row justifyContent="center">
  ...
</Flex>
```

## Props

### Flex

Default style is just `display: flex`.

| Prop | Type | Description |
|:---|:---|:---|
| `inline?` | `boolean` | Sets `display` to `inline-flex`.|
| `alignContent?` | `'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'stretch' \| 'initial' \| 'inherit'` | Sets `align-content` to corresponding value. |
| `alignItems?` | `'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline' \| 'initial' \| 'inherit'` | Sets `align-items` to corresponding value. |
| `alignSelf?` | `'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline' \| 'auto' \| 'initial' \| 'inherit'` | Sets `align-self` to corresponding value. |
| `justifyContent?` | `'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'initial' \| 'inherit'` | Sets `justify-content` to corresponding value. |
| `basis?` | `'none' \| 'auto' \| 'fill' \| 'content' \|fit-content' \| 'min-content' \| 'max-content'` | Sets `flex-basis` to corresponding value. |
| `grow?` | `0..24 \| boolean` | Sets `flex-grow` to corresponding value. `true` is equals to `1`, `false` is equals to `0`. |
| `shrink?` | `0..24 \| boolean` | Sets `flex-shrink` to corresponding value. `true` is equals to `1`, `false` is equals to `0`. |
| `row?` | `boolean` | Sets `flow-direction` to `row`. |
| `column?` | `boolean` | Sets `flow-direction` to `column`. Takes a precedence over `row`. |
| `reverse?` | `boolean` | Used with `row` or `col`. Sets `flow-direction` to `column-reverse` or `row-reverse`. |
| `wrap?` | `boolean \| 'reverse'` | Sets `flex-wrap` to `wrap` or `wrap-reverse`. |
| `order?` | `number` | Sets `order` to corresponding value. |
| `hfill?` | `boolean` | Stretch by horizontal. |
| `vfill?` | `boolean` | Stretch by vertical. |
| `fill?` | `'v' \| 'h' \| 'all' \| boolean` | Stretch by v - vertical or h - horizontal or all - both. `true` is equals to `all`. |
| `component?` | `React.ComponentType<any>` | Sets React component as a container. Component must accept className through props. |
| `tagName?` | `string` | Html tag name for output container. Takes a precedence over `component`. |
| `center?` | `boolean` | Sets `justifyContent` and `alignItems` to  `center`. Takes a precedence over `justifyContent` and `alignItems`. |
| `className?` | `string` | CSS class name. |
| `style?` | `React.CSSProperties` | Inline styles. |
| and all other props of html element |

## TODO

If you need more features or you find a bug, please, open an issue or make PR.

## License

[MIT](https://opensource.org/licenses/mit-license.php)
