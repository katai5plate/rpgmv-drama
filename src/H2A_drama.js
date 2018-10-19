/*:
 * @plugindesc Scenario message management plug-in for RPG Maker MV
 * @author Had2Apps
 *
 * @help 
 * https://github.com/katai5plate/rpgmv-drama/blob/master/README.md
 *
 */

(() => {
  const _drama = {
    libraries: [],
    faces: {},
    define: function () {
      window.drama = typeof window.drama === "undefined" ? { ...this } : window.drama;
    },
    chara: function (items) {
      this.faces = { ...this.faces, ...items };
    },
    write: function (book, pages) {
      if (this.getBook(book).length !== 0) {
        console.error(`The "${book}" book has already been booked.`);
        return;
      }
      this.libraries = [
        ...this.libraries,
        { book, pages }
      ];
    },
    read: function (book, page, slice = []) {
      const paper = this.getBook(book).pages[page].slice(...slice);
      paper.forEach((message) => {
        const mes = message
          .split(/[\n|\r]/g)
          .map(v => v.replace(/^.*?(\S.*?)/, "$1"));
        const face = this.faces[mes[0].replace("> ","")] || ["", 0];
        $gameMessage.setFaceImage(face[0], face[1]);
        $gameMessage.add(`${mes.slice(1).join("\n")}\f`)
      })
    },
    getBook: function (book) {
      return this.libraries.filter(v => v.book === book)[0] || [];
    }
  };
  _drama.define();
})()
