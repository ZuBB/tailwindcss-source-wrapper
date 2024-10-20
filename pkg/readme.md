# Tailwind Source Wrapper

## What it this?
A super tiny (less than 3kB) wrapper over tailwind's CLI that allows to have input&output source files in the tailwind config file.

## Motivation
* `scripts` section in `package.json` tend become lengthy and cluttered. I like to have it slim and clean;
* Tailwind supports config file, but for some reason input&output source files have to be passed as params. I feel like these things can be in config file as well;
* There is a [discussion](https://github.com/tailwindlabs/tailwindcss/discussions/5033) about exaclty the same idea at Github. And it does have some supporters.

## How to set up
The next diff should say for itself
```diff
diff --git i/package.json w/package.json
index 6d1fd87..b522015 100644
--- i/package.json
+++ w/package.json
@@ -8,7 +8,7 @@
     "test": "echo \"Error: no test specified\" && exit 1",
     "start": "concurrently 'npm run build:dev' 'npm run live-reload'",
     "build:metadata": "echo \"<!-- Date: $(date -Iseconds), Git: $(git describe --tag --always --dirty='*') -->\n\" > ./wp-content/themes/naszkupon-wp/.build-metadata.php",
-    "build:css-base": "npx tailwindcss -i ./wp-content/themes/naszkupon-wp/input-tw.css -o ./wp-content/themes/naszkupon-wp/styles.v2.css",
+    "build:css-base": "npx tsw",
     "build:dev": "npm run build:metadata && npm run build:css-base -- --watch",
     "build:prod": "npm run build:metadata && npm run build:css-base -- --minify",
     "live-reload": "node --env-file=.env.local node_modules/.bin/browser-sync start --config bs-config.js"
diff --git i/tailwind.config.js w/tailwind.config.js
index 08a68a5..2ebdc71 100644
--- i/tailwind.config.js
+++ w/tailwind.config.js
@@ -1,5 +1,7 @@
 /** @type {import('tailwindcss').Config} */
 module.exports = {
+  input: "./wp-content/themes/naszkupon-wp/input.v2.css",
+  output: "./wp-content/themes/naszkupon-wp/styles.v2.css",
   content: {
     relative: true,
     files: [
```

## Feedback
Have any kind of feedback or contribution - you are welcome.