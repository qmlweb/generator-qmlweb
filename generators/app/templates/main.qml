import QtQuick 2.15
import QtQuick.Controls 2.15

ApplicationWindow {
  StackView {
    anchors.fill: parent
    initialItem: Text {
      anchors.centerIn: parent
      text: "Hello world !"
    }
  }
}
