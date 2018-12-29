const { src, dest, watch, series, parallel } = require("gulp")
const sass = require("gulp-sass")
const webpack = require("webpack-stream")
const path = require("path")
const cleanCSS = require("gulp-clean-css")

sass.compiler = require("node-sass")

// Compile sass
const compileSass = (cb) => {
    src("./sass/main.sass")
        .pipe(sass({
            includePaths: ["node_modules"]
        }).on("error", sass.logError))
        .pipe(dest("public"))
    return cb()
}

// Transpile js
const transpileJs = (cb) => {
    return src("./client/*.js")
        .pipe(webpack( {
            mode: "production",
            entry: "./client/main.js",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        }
                    }
                ]
            },
            output: {
                path: path.resolve(__dirname, "public"),
                filename: "bundle.js"
            }
        }))
        .pipe(dest("public"))
}

// Minify CSS
const minifyCss = (cb) => {
    return src("public/*.css")
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(dest("public"))
}

// Watch sass
const watchSass = (cb) => {
    watch(["sass/*.sass", "sass/*.css"], (cb)=>{
        src("./sass/main.sass")
            .pipe(sass({
                includePaths: ["node_modules"]
            }).on("error", sass.logError))
            .pipe(dest("public"))
        return cb()
    })
}

// Watch js
const watchJs = (cb) => {
    return src("./client/*.js")
        .pipe(webpack( {
            mode: "development",
            watch: true,
            entry: "./client/main.js",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        }
                    }
                ]
            },
            output: {
                path: path.resolve(__dirname, "public"),
                filename: "bundle.js"
            }
        }))
        .pipe(dest("public"))
}

// Production build task
exports.build = series(compileSass, transpileJs, minifyCss)

// Default watch task
exports.default = parallel(watchSass, watchJs)