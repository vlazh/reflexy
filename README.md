# Reflexy

[![npm package](https://img.shields.io/npm/v/reflexy.svg?style=flat-square)](https://www.npmjs.org/package/reflexy)
[![license](https://img.shields.io/npm/l/reflexy.svg?style=flat-square)](https://www.npmjs.org/package/reflexy)

React component library for flexbox and responsive layouts. Supports paddings, margins, spacing sizes, responsive breakpoints, and styled (MUI) versions.

## Install

```bash
yarn add react reflexy
# or
npm install react reflexy
```

> If you use the styled version, also install `@mui/system`.

## Components

| Component | Import | Description |
|-----------|--------|-------------|
| **[Flex](#flex)** | `reflexy` | Flexbox layout with paddings and margins |
| **[styled/Flex](#styledflex)** | `reflexy/styled` | Styled version powered by [@mui/system](https://mui.com/system/getting-started/) |
| **FlexWithRef** | `reflexy` | `Flex` with forwarded ref |
| **[FlexProvider](#flexprovider)** | `reflexy` | Context provider for Flex defaults |
| **TweakableElementWrapper** | `reflexy` | Wrapper to use any element with `component` prop |
| **[ResponsiveFlex](#responsiveflex)** | `reflexy/responsive` | Flex with responsive breakpoints |
| **[Responsive](#responsive)** | `reflexy/responsive` | Generic container with breakpoint props |
| **[ResponsiveRender](#responsiverender)** | `reflexy/responsive` | Conditional render by breakpoints |
| **useMediaQuery** | `reflexy/responsive` | React hook for media queries |
| **MediaQuery** | `reflexy/responsive` | Static media query utilities |

### Web Components (Lit)

| Element | Import | Description |
|---------|--------|-------------|
| **[`<flex-box>`](#flex-box)** | `reflexy/elements` | Lit custom element with the same flex props as React `Flex` |
| **[`<flex-box-responsive>`](#flex-box-responsive)** | `reflexy/elements` | Responsive version with per-breakpoint classes |
| **[`<flex-responsive-render>`](#flex-responsive-render)** | `reflexy/elements` | Conditional render by viewport breakpoint |

### Webpack Plugin

`styled/StyledReflexyWebpackPlugin` replaces regular `Flex` imports with `styled/Flex` at build time, so you can write `import { Flex } from 'reflexy'` and get the styled version automatically.

## <a id="flex" />Flex

### Usage

```tsx
import { Flex, TweakableElementWrapper } from 'reflexy';

<Flex row justifyContent="center">
  <span>Left</span>
  <span>Right</span>
</Flex>

<Flex column center p>
  <h1>Centered content</h1>
</Flex>

<Flex row component="nav" ml pb>
  <a href="/">Home</a>
  <a href="/about">About</a>
</Flex>

<Flex fill column grow>
  <Flex shrinkByContent>Shrinks to fit content</Flex>
  <Flex grow>Takes remaining space</Flex>
</Flex>

<Flex row component={TweakableElementWrapper} element={<button type="button" />}>
  Click me
</Flex>
```

### Props

Default style is just `display: flex`.

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `flex?` | `boolean` | Sets `display` to `flex`. |
| `inline?` | `boolean` | Sets `display` to `inline-flex`. |
| `row?` | `boolean` | Sets `flex-direction` to `row`. |
| `column?` | `boolean` | Sets `flex-direction` to `column`. Takes precedence over `row`. |
| `reverse?` | `boolean` | Used with `row` or `column`. Sets `flex-direction` to `*-reverse`. |
| `wrap?` | `boolean \| 'nowrap' \| 'wrap' \| 'wrap-reverse'` | Sets `flex-wrap`. `true` = `wrap`, `false` = `nowrap`. |
| `alignContent?` | `'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'stretch'` | Sets `align-content`. |
| `alignItems?` | `'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline'` | Sets `align-items`. |
| `alignSelf?` | `'center' \| 'flex-start' \| 'flex-end' \| 'stretch' \| 'baseline' \| 'auto'` | Sets `align-self`. |
| `justifyContent?` | `'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | Sets `justify-content`. |
| `center?` | `boolean` | Sets `justifyContent` and `alignItems` to `center`. Individual values take precedence. |
| `basis?` | `'auto' \| 'content' \| number` | Sets `flex-basis`. |
| `grow?` | `0..24 \| boolean` | Sets `flex-grow`. `true` = `1`, `false` = `0`. |
| `shrink?` | `0..24 \| boolean` | Sets `flex-shrink`. `true` = `1`, `false` = `0`. |
| `order?` | `number` | Sets `order`. |
| `hfill?` | `boolean \| number` | Stretch horizontally or set width as fraction (0.0–1.0). |
| `vfill?` | `boolean \| number` | Stretch vertically or set height as fraction (0.0–1.0). |
| `fill?` | `boolean` | Stretch both horizontally and vertically. |
| `shrinkByContent?` | `boolean` | Sets `min-width: 0` and `min-height: 0` so flex items can shrink past content size. Default `true`. |
| `shrinkWidth?` | `boolean` | Sets `min-width: 0`. Takes precedence over `shrinkByContent`. |
| `shrinkHeight?` | `boolean` | Sets `min-height: 0`. Takes precedence over `shrinkByContent`. |
| `component?` | `React.ElementType` | Custom component to render. Must accept `className` and `style`. |
| `className?` | `string` | CSS class name. |
| `style?` | `React.CSSProperties` | Inline styles. |

#### Spacing props

| Prop | Description |
| :--- | :---------- |
| `unit?` | Measure unit for spacing. Default: `rem`. |
| `mSize?` / `pSize?` | Size preset: `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'xxl' \| number` |
| `m?` | `margin` (uses `mSize`) |
| `mt?`, `mr?`, `mb?`, `ml?` | Individual margins |
| `mx?`, `my?` | Horizontal / vertical margins |
| `p?` | `padding` (uses `pSize`) |
| `pt?`, `pr?`, `pb?`, `pl?` | Individual paddings |
| `px?`, `py?` | Horizontal / vertical paddings |

All spacing props accept `boolean` (uses size preset) or a specific size value.

### Flex Statics

| Property | Type | Default |
| :--- | :--- | :--- |
| `defaultUnit` | `string` | `'rem'` |
| `defaultSize` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'xxl'` | `'m'` |
| `defaultSizes` | `Record<Size, number>` | `{ xs: 0.25, s: 0.5, m: 1, l: 1.5, xl: 2, xxl: 2.5 }` |

## <a id="flexprovider" />FlexProvider

Provides default spacing values (`unit`, `size`, `sizes`) to all nested `Flex` components via context.

```tsx
import { Flex, FlexProvider } from 'reflexy';

<FlexProvider defaultUnit="px" defaultSize="l" defaultSizes={{ xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 }}>
  <Flex p>16px padding (size "m" = 16)</Flex>
  <Flex p pSize="l">24px padding</Flex>
</FlexProvider>
```

The styled version (`reflexy/styled`) also reads defaults from the MUI theme (`theme.reflexy`).

## <a id="styledflex" />styled/Flex

CSS-in-JS version of `Flex` powered by `@mui/system/styled`. Supports `sx` prop and MUI theme integration.

```tsx
import { Flex } from 'reflexy/styled';

<Flex row center p sx={{ backgroundColor: 'primary.main', borderRadius: 2 }}>
  Styled content
</Flex>
```

No CSS loader setup is needed for the styled version.

## CSS Loader Setup

The regular (non-styled) `Flex` uses its own CSS files, so you need a loader for CSS in `node_modules`. With webpack and [css-loader](https://github.com/webpack-contrib/css-loader):

```js
{
  test: /\.css$/,
  include: /reflexy/,
  use: [
    { loader: 'css-loader', options: { modules: true } },
  ],
}
```

## <a id="mq" />Custom Media Queries

Built-in breakpoints for CSS:

| Name | Value |
| :--- | :---- |
| `--xxs` | `(max-width: 479px)` |
| `--xs` | `(min-width: 480px) and (max-width: 767px)` |
| `--s` | `(min-width: 768px) and (max-width: 991px)` |
| `--m` | `(min-width: 992px) and (max-width: 1279px)` |
| `--l` | `(min-width: 1280px) and (max-width: 1919px)` |
| `--xl` | `(min-width: 1920px) and (max-width: 2559px)` |
| `--xxl` | `(min-width: 2560px)` |

Use with [postcss-custom-media](https://github.com/postcss/postcss-custom-media):

```js
const exportMediaQueries = require('reflexy/responsive/exportMediaQueries');

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

## <a id="responsiveflex" />ResponsiveFlex

`Flex` with responsive breakpoints. Props from `breakpoints` override the default props at the matching viewport size.

```tsx
import { ResponsiveFlex } from 'reflexy/responsive';

<ResponsiveFlex
  row
  justifyContent="space-between"
  breakpoints={{
    s: { column: true, alignItems: 'stretch' },
    xxs: { column: true, center: true },
  }}
>
  <div>Section A</div>
  <div>Section B</div>
</ResponsiveFlex>
```

### Props

All props of [Flex](#flex) plus:

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `merge?` | `boolean \| 'up' \| 'down'` | How to merge breakpoint props. `'down'` (default): merge from largest to current. `'up'`: merge from smallest to current. `false`: exact match only. |
| `breakpoints` | `{ [P in ViewSize]?: FlexProps }` | Props per breakpoint. |

ViewSize keys: `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`.

## <a id="responsive" />Responsive

Generic container that applies different props at different breakpoints — not limited to Flex props.

```tsx
import { Responsive } from 'reflexy/responsive';

<Responsive
  component={MyCard}
  variant="horizontal"
  breakpoints={{
    s: { variant: 'vertical' },
    xxs: { variant: 'compact' },
  }}
/>
```

## <a id="responsiverender" />ResponsiveRender

Conditionally render children based on viewport size.

```tsx
import { ResponsiveRender } from 'reflexy/responsive';

<ResponsiveRender breakpoints={{ xxs: true, xs: true }}>
  <MobileNavigation />
</ResponsiveRender>
```

## Web Components (Lit)

Framework-agnostic [Lit](https://lit.dev/) custom elements with the same flexbox capabilities as the React components. Configurable via CSS custom properties and HTML attributes.

```typescript
import 'reflexy/elements';
```

### <a id="flex-box" />`<flex-box>`

Custom element with the same flex, spacing, gap, overflow, and scrollable props as React `Flex`. All props are reflected as HTML attributes (kebab-case).

```html
<flex-box row justify-content="center" gap p>
  <span>Left</span>
  <span>Right</span>
</flex-box>

<flex-box column center p="l">
  <h1>Centered</h1>
</flex-box>

<flex-box as="nav" row m-size="s" ml pb>
  <a href="/">Home</a>
  <a href="/about">About</a>
</flex-box>
```

Defaults are configurable via CSS custom properties:

```css
flex-box {
  --default-unit: px;
  --default-size: m;
  --default-size-xs: 4;
  --default-size-s: 8;
  --default-size-m: 16;
  --default-size-l: 24;
  --default-size-xl: 32;
  --default-size-xxl: 48;
}
```

### <a id="flex-box-responsive" />`<flex-box-responsive>`

Extends `<flex-box>` with responsive breakpoints for CSS classes. Apply different classes at different viewport sizes.

```html
<flex-box-responsive row class-xxs="compact" class-s="medium" class-l="wide">
  Responsive content
</flex-box-responsive>
```

| Attribute | Description |
|-----------|-------------|
| `merge` | Merge strategy: `true` (default, same as `down`), `false`, `up`, `down` |
| `class-xxs` … `class-xxl` | CSS class to apply at the given breakpoint |

### <a id="flex-responsive-render" />`<flex-responsive-render>`

Conditionally renders its slot content based on the current viewport size.

```html
<flex-responsive-render xxs xs>
  <nav>Mobile navigation</nav>
</flex-responsive-render>
```

| Attribute | Description |
|-----------|-------------|
| `merge` | Merge strategy (same as above) |
| `xxs` … `xxl` | Boolean — show content at this breakpoint |

## License

[MIT](https://opensource.org/licenses/mit-license.php)

## Repository

[https://github.com/vlazh/reflexy](https://github.com/vlazh/reflexy)
