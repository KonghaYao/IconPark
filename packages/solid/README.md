# IconPark Icons

> Solid-js version fork from React Icons for IconPark
>
> I'm KonghaYao, make IconPark be running with Solid-js😍

## Introduction

### Features

-   Provide more than 2000 icons
-   Provide 4 themes:
    -   outline
    -   filled
    -   two-tone
    -   multi-color

### More

Please visit [IconPark Website](http://iconpark.bytedance.com)

-   Copy SVG
-   Copy React Icon component
-   Copy Vue Icon component
-   Download PNG
-   Download SVG

## Getting Started

### Install

```
npm install icon-park-solid --save
```

### Include Component

Import an icon from `icon-park-solid`at the top of a component and then use it in the render function:

```
import {Home} from 'icon-park-solid';

// examples
<Home/>
<Home theme="filled"/>
```

### Style Sheet

Import the icon style:

```typescript
import "icon-park-solid/es/styles.css";
```

### Global Config

You can use `IconProvider` in `icon-park-solid` to set the default config globally:

```typescript jsx
import { IconProvider, DEFAULT_ICON_CONFIGS } from "icon-park-solid";
import { Home } from "icon-park-solid";

const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "icon" };

function App() {
    return (
        <IconProvider value={IconConfig}>
            <Home />
            <Home theme="filled" />
        </IconProvider>
    );
}
```

### Import on Demand

> KonghaYao: You don't need this, If you are using Vite, it will shake the bundle

You can use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) to import icons on demand.

Set config like this:

```json
{
    "plugins": [
        [
            "import",
            {
                "libraryName": "icon-park-solid",
                "libraryDirectory": "es/icons",
                "camel2DashComponentName": false
            }
        ]
    ]
}
```

### Icon Component

> It will bundle a huge js package!

We recommend loading icons on demand, because this can greatly reduce the volume of compiled code。
However, in some scenarios similar to remote loading menus, direct reference to all icons can reduce the development cost.

Usage:

```tsx
import Icon, { IconType } from "icon-park-solid/es/all";

export function Demo(props: { type: IconType }) {
    const { type } = props;

    return (
        <>
            <Icon type={type} theme="filled" />
            <Icon type="AddText" theme="filled" />
            <Icon type="add-text" />
        </>
    );
}
```

You can do this when you are not sure whether the `type` property is legal:

```tsx
import Icon, { ALL_ICON_KEYS, IconType } from "icon-park-solid/es/all";

export function Demo(props: { type: IconType }) {
    const { type } = props;

    if (ALL_ICON_KEYS.indexOf(type) < 0) {
        return <span>Not Exists</span>;
    }

    return (
        <>
            <Icon type={type} theme="filled" />
            <Icon type="People" theme="filled" />
            <Icon type="Switch" />
        </>
    );
}
```

### Embed IconPark in your project

If you need to use additional information such as icon name, author, category, label and creation time, you can use the `icons.json` file located in the root directory of each NPM.

## Props

| prop           | description                             | type                                                             | default        | note |
| -------------- | --------------------------------------- | ---------------------------------------------------------------- | -------------- | ---- |
| theme          | Theme of the icons.                     | 'outline' &#124; 'filled' &#124; 'two-tone' &#124; 'multi-color' | 'outline'      |
| size           | The width/height of the icon            | number &#124; string                                             | '1em'          |
| spin           | Rotate icon with animation              | boolean                                                          | false          |
| fill           | Colors of theme                         | string &#124; string[]                                           | 'currentColor' |
| strokeLinecap  | the stroke-linecap prop of svg element  | 'butt' &#124; 'round' &#124; 'square'                            | 'round'        |
| strokeLinejoin | the stroke-linejoin prop of svg element | 'miter' &#124; 'round' &#124; 'bevel'                            | 'round'        |
| strokeWidth    | the stroke-width prop of svg element    | number                                                           | 4              |

**Other props**

You can use all props which are defined in `HTMLAttributes<HTMLSpanElement>>`, such as:

-   className
-   style
-   onClick
-   ...
