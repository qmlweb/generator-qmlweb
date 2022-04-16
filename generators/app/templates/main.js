function main() {
  const engine = new QmlWeb.QMLEngine(document.body);

  // Sets an icon theme
  //QmlWeb.QIcon.setThemeName("icon-theme");
  <% if (style !== "") { %>
  QmlWeb.setStyle("<%= style %>");
  <% } %>

  engine.loadFile("qrc://qml/main.qml");
  engine.start(); 
}

document.addEventListener("load", main);
