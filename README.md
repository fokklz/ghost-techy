# Techy

**Original**: [Source](https://github.com/TryGhost/Source)

Techy is a Ghost theme based on the default theme Source, the goal of this theme is to provide better support for code snippets and technical content.

## Features

- **Markdown Headers**: Headers are added to each markdown block, displaying the Language and a Copy button.
- **Markdown Annotations**: With comments in the markdown-block, you can add annotations which are then added as a Info button with a tooltip.
- **Markdown Notices**: Notices styling with neat icons.
- **Post Table of Contents**: Using `tocbot` to inject a table of contents into the post.
- **Tree Structure**: Uses `treeify` to create a tree structure to display how files are related to each other.

## Usage

### Markdown Headers

There is nothing needed to be done, the headers are added automatically to each markdown block. That contains a `code` tag.

### Markdown Annotations

To add an annotation to a line inside a markdown block, you can use the following syntax:

#### Option 1

You can use `<br>` if you want to add a new line. But multi-line support is not very great on this one.

```markdown
var x = 10; #:: This is a variable declaration
```
`This is a variable declaration` will be the content of the info tooltip. 

#### Option 2

This syntax allows for multi-line annotations. without using `<br>`. Just write on multiple lines as you would normally do.

```markdown
var x = 10; #::1

#1?? This is a variable declaration
```
`This is a variable declaration` will be the content of the info tooltip.

### Markdown Notices

```markdown
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

The icons and colors are similar to the ones from github.

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.


### Post Table of Contents

Nothing needed, will be injected into each post automatically.
If there is a post you would like to not have a table of contents, you can go to its code injection and add the following to the `header` section:

```html
<style>
    .gh-sidebar{
        display: none;
    }
</style>
```

### Tree Structure

Treeify needs a Object representation of the tree structure.
You can just add a `HTML` block and add the following code:

```html
<pre class="tree">
folder: {
  config.yml: null
},
info.log: null
</pre>
```
The content of the `pre` tag will be parsed and displayed as a tree structure.
There will automatically be added quotes around the keys and values. You can of course also use a proper JSON object.

## Development

Source styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/techy.zip`, which you can then upload to your site.

```bash
# create .zip file
yarn zip
```

## Credits

This theme is based on the default theme for Ghost called Source. I try to minimize the changes to the original theme and files as much as possible so when Source gets updated, it should be easy to merge the changes.

If you like it, please consider [Supporting the original theme](https://opencollective.com/ghost).