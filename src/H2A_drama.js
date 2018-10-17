(() => {
  const _$drama = {
    libraries: [],
    faces: {},
    define: function () {
      window.drama = typeof window.drama === "undefined" ? { ...this } : window.drama;
    },
    write: function (book, pages) {
      if (this.getBook(book).length !== 0) {
        console.error(`The book "${book}" has already been booked.`);
        return;
      }
      this.libraries = [
        ...this.libraries,
        { book, pages }
      ];
    },
    read: function (book, page) {
      const paper = this.getBook(book)[page]
        .split(/[\n|\r]/g)
        .map(v => v.replace(/^.*?(\b.*?)/, "$1"));
      const face = this.faces[paper[0]];
      $gameMessage.setFaceImage(face[0], face[1]);
      $gameMessage.add(`${paper.slice(1).join("\n")}\f`)
    },
    getBook: function (book) {
      return this.libraries.filter(v => v.book === book)[0];
    }
  };
  _$drama.define();
})()
