const { series, watch, src, dest, parallel } = require("gulp");
const pump = require("pump");

// gulp plugins and utils
const livereload = require("gulp-livereload");
const postcss = require("gulp-postcss");
const zip = require("gulp-zip");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const beeper = require("beeper");
const fs = require("fs");

// postcss plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const easyimport = require("postcss-easy-import");

const excpectedFiles = 8;
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
packageJson.version = fs.readFileSync("./VERSION", "utf8").trim();
fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2) + "\n");

function serve(done) {
  livereload.listen();
  done();
}

const handleError = (done) => {
  return function (err) {
    if (err) {
      beeper();
    }
    return done(err);
  };
};

function hbs(done) {
  pump([src(["*.hbs", "partials/**/*.hbs"]), livereload()], handleError(done));
}

function css(done) {
  pump(
    [
      src("assets/css/screen.css", { sourcemaps: true }),
      postcss([easyimport, autoprefixer(), cssnano()]),
      dest("assets/built/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

function js(done) {
  pump(
    [
      src(
        [
          // pull in lib files first so our own code can depend on it
          "assets/js/lib/*.js",
          "assets/js/*.js",
        ],
        { sourcemaps: true }
      ),
      concat("source.js"),
      uglify(),
      dest("assets/built/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

function css_techy(done) {
  pump(
    [
      src(
        [
          "node_modules/tippy.js/dist/tippy.css",
          "node_modules/tocbot/dist/tocbot.css",
          "assets/custom-techy/css/*.css",
        ],
        { sourcemaps: true }
      ),
      concat("techy.css"),
      postcss([easyimport, autoprefixer(), cssnano()]),
      dest("assets/built/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

function js_techy(done) {
  pump(
    [
      src(
        [
          // markdown headers
          "node_modules/clipboard/dist/clipboard.min.js",
          // markdown annotations
          "node_modules/marked/marked.min.js",
          "node_modules/@popperjs/core/dist/umd/popper.min.js",
          "node_modules/tippy.js/dist/tippy-bundle.umd.min.js",
          // post toc
          "node_modules/tocbot/dist/tocbot.min.js",
          // treeify
          "node_modules/treeify/treeify.js",
          // custom js added by techy
          "assets/custom-techy/js/*.js",
        ],
        { sourcemaps: true }
      ),
      concat("techy.js"),
      uglify(),
      dest("assets/built/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

function zipper(done) {
  const filename = require("./package.json").name + ".zip";
  pump(
    [
      src([
        "**",
        "!node_modules",
        "!node_modules/**",
        "!test-env",
        "!test-env/**",
        "!dist",
        "!dist/**",
        "!yarn-error.log",
        "!yarn.lock",
        "!gulpfile.js",
      ]),
      zip(filename),
      dest("dist/"),
    ],
    handleError(done)
  );
}

const cssWatcher = () => watch("assets/css/**", css);
const jsWatcher = () => watch("assets/js/**", js);
const hbsWatcher = () => watch(["*.hbs", "partials/**/*.hbs"], hbs);
const watcher = parallel(cssWatcher, jsWatcher, hbsWatcher);
const build = series(css, js);

const css_techyWatcher = () => watch("assets/custom-techy/css/**", css_techy);
const js_techyWatcher = () => watch("assets/custom-techy/js/**", js_techy);
const techyWatcher = parallel(watcher, css_techyWatcher, js_techyWatcher);
const techyBuild = series(build, css_techy, js_techy);

exports.build = techyBuild;
exports.zip = series(techyBuild, zipper);
exports.default = series(techyBuild, serve, techyWatcher);
