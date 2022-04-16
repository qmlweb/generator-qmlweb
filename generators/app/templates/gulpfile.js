const gulp = require("gulp");
const concat = require("gulp-concat");
const qrc = require("gulp-qmlweb");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const qrcSource = ["resources.qrc"];
const output = "./dist/";
const qmlSources = [
  "qml/**/*.qml",
  "qml/**/*.js",
  "qml/**/qmldir"
];
const jsSources = [
  "js/**/*.js"
];
const qmlwebDependencies = [
  "node_modules/qmlweb/lib/qmlweb.js"
];
<% if (withParser) { %>qmlwebDependencies.push("node_modules/qmlweb-parser/lib/qmlweb.parser.js");<% } %>
<% if (style === "Material") { %>qmlwebDependencies.push("node_modules/qmlweb-material/dist/controls2.material.js");<% } %>

gulp.task("rcc", function() {
  return gulp.src(qrcSource)
    .pipe(qrc())
    .pipe(gulp.dest(output));
});

gulp.task("build-application", gulp.series("rcc", function() {
  return gulp.src(jsSources)
    .pipe(sourcemaps.init())
    .pipe(concat("application.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(output));
});

gulp.task("build", gulp.series("build-application", function() {
  return gulp.src(qmlwebDependencies.concat([
    `${output}/qrc.js`,
    `${output}/application.js`
  ]))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat("application.bundle.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(output));
});

gulp.task("watch", function() {
  const sources = qmlSources
    .concat([qrcSource])
    .concat(jsSources);
  return gulp.watch(sources, gulp.series("build"));
});
