export default class Rectangle {
   private scene: Phaser.Scene;

   constructor(scene: Phaser.Scene) {
       this.scene = scene;
   }

   create() {
       const X = this.scene.cameras.main.width / 2;
       const Y = this.scene.cameras.main.height / 2;

       const rectWidth = 100;
       const rectHeight = 100;
       const gap = 200;

       //  two rectangles
       this.scene.add.rectangle(X - rectWidth / 2 - gap / 2, Y, rectWidth, rectHeight, 0x808080);
       this.scene.add.rectangle(X + rectWidth / 2 + gap / 2, Y, rectWidth, rectHeight, 0x808080);
   }
}