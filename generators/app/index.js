var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.props = { appName: "appName" };
    this.answers = this.prompt([
      {
        name: "appName",
        message: "Application name",
        type: "input",
        default: this.props.appName
      },
      {
        name: "withParser",
        message: "Include the QML parser ? (allows you to load components from strings or outside sources at runtime)",
        type: "list",
        choices: [{ name: "Yes", value: true }, { name: "No", value: false }],
        default: false
      },
      {
        name: "style",
        message: "QtQuick Style",
        type: "list",
        choices: [
          {
            name: "None",
            value: ""
          },
          {
            name: "Material",
            value: "Material"
          }
	],
        default: ""
      }
    ]);
    return this.answers.then(props => {
      this.props = props;
    });
  }

  installDependencies() {
    const deps = {
      "qmlweb": "^3.1.0",
      "qmlweb-parser": "^0.3.5",
      "gulp": "^4.0.0",
      "gulp-qmlweb": "^0.2.1",
      "gulp-concat": "^2.6.1",
      "gulp-uglify": "^3.0.0",
      "gulp-sourcemaps": "^2.6.4"
    };
    if (this.props.style !== "") {
      const stylePackage = `qmlweb-${this.props.style}`.toLowerCase();
      deps[stylePackage] = "^1.0.0";
    }
    this.addDependencies(deps);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("index.html"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("main.js"),
      this.destinationPath("js/main.js"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("main.qml"),
      this.destinationPath("qml/main.qml"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("resources.qrc"),
      this.destinationPath("resources.qrc"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("gulpfile.js"),
      this.destinationPath("gulpfile.js"),
      this.props
    );
  }
};
