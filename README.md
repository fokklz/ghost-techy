# Techy

Techy is a Ghost theme based on the default theme Source, the goal of this theme is to provide better support for code snippets and technical content.

## Features

- **Markdown Headers**: Headers are added to each markdown block, displaying the Language and a Copy button.
- **Markdown Annotations**: With comments in the markdown-block, you can add annotations which are then added as a Info button with a tooltip.
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


**Original README.md**
---

# Source

The default theme for [Ghost](http://github.com/tryghost/ghost/). This is the latest development version of Source! If you're just looking to download the latest release, head over to the [releases](https://github.com/TryGhost/Source/releases) page.

&nbsp;

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

This theme has lots of code comments to help explain what's going on just by reading the code. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://ghost.org/docs/themes/) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The parent template file, which includes your global header/footer
- `home.hbs` - The homepage
- `index.hbs` - The main template to generate a list of posts
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive


# Development

Source styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
# create .zip file
yarn zip
```
