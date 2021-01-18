export class AlbumEdit {
  danhSachAlbum = [];

  themAlbum(albums) {
    this.danhSachAlbum.push(albums);
  }

  xoaAlbum(tenAlbum) {
    let index = this.danhSachAlbum.findIndex(
      (album) => album.tenAlbum === tenAlbum
    );
    if (index !== -1) {
      this.danhSachAlbum.splice(index, 1);
    }
  }

  chinhSuaAlbum(tenAlbum, arrInput) {
    let chinhSuaAlbum = this.danhSachAlbum.find(
      (item) => (item.tenAlbum = tenAlbum)
    );

    if (chinhSuaAlbum.theLoai === "Album gái xinh") {
      chinhSuaAlbum.theLoai = "1";
    } else if (chinhSuaAlbum.theLoai === "Album trai đẹp") {
      chinhSuaAlbum.theLoai = "2";
    } else {
      chinhSuaAlbum.theLoai = "3";
    }

    for (let input of arrInput) {
      const { id } = input;
      document.getElementById(id).value = chinhSuaAlbum[id];
    }

    return chinhSuaAlbum;
  }

  saveAlbum() {
    let sAlbum = JSON.stringify(this.danhSachAlbum);
    localStorage.setItem("album", sAlbum);
  }

  getAlbum() {
    if (localStorage.getItem("album")) {
      let album = JSON.parse(localStorage.getItem("album"));
      this.danhSachAlbum = album;
    } else {
      this.danhSachAlbum = [];
    }
  }
}
