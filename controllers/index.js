// Import
import { Album } from "../models/Album.js";
import { AlbumEdit } from "../models/AlbumEdit.js";

let albumEdit = new AlbumEdit();
let album = new Album();

albumEdit.getAlbum();

let arrInput = document.querySelectorAll(
  ".form-group input, .form-group select"
);

// Thêm danh sách Album
document.getElementById("btnThemAlbum").onclick = (e) => {
  e.preventDefault();

  // Duyệt qua các arrayInput
  for (let input of arrInput) {
    const { id, value } = input;
    if (id === "theLoai") {
      let newValueText = getInnerText(value);
      album = { ...album, [id]: newValueText };
    } else {
      album = { ...album, [id]: value };
    }
  }

  let isValid = checkNameExist(album.tenAlbum);

  if (isValid) {
    albumEdit.themAlbum(album);
    hienThiAlbum();
    albumEdit.saveAlbum();
  } else {
    alert("Tên đã tồn tại");
  }

  resetForm();
};

// Hiển thị danh sách Album
window.hienThiAlbum = () => {
  const html = albumEdit.danhSachAlbum.reduce((content, item, index) => {
    return (content += `
    <div class="col-md-4" style="box-sizing: border-box">
      <div class="card mb-4 box-shadow">
        <div
          class="reponsive-img"
          style="background-image: url(${item.linkAnh})"
        ></div>
        <div class="card-body">
          <h3>${item.tenAlbum}</h3>
          <p class="card-text">${item.moTa}</p>
          <p class="card-text">Thể loại: ${item.theLoai}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button
                type="button"
                onclick="xuLySua('${item.tenAlbum}')"
                class="btn btn-success text-white btn-sm btn-outline-secondary mr-2"
              >
                Chỉnh sửa
              </button>
              <button
                type="button"
                onclick="xuLyXoa('${item.tenAlbum}')"
                class="btn btn-danger text-white btn-sm btn-outline-secondary"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
  }, "");
  document.querySelector("#ablum_wrap").innerHTML = html;
};
hienThiAlbum();

// Xóa album
window.xuLyXoa = (tenAlbum) => {
  let cfm = confirm("Bạn có chắc chắn muốn xóa Album này không ?");
  albumEdit.xoaAlbum(tenAlbum);
  albumEdit.saveAlbum();
  hienThiAlbum();
};

// Sửa album
let newAlbum = {};
window.xuLySua = (tenAlbum) => {
  newAlbum = albumEdit.chinhSuaAlbum(tenAlbum, arrInput);
  document.getElementById("btnCapNhatAlbum").disabled = false;
  document.getElementById("btnThemAlbum").disabled = true;
};

// Cập nhật album
window.document.getElementById("btnCapNhatAlbum").onclick = (e) => {
  e.preventDefault();

  let index = albumEdit.danhSachAlbum.findIndex(
    (album) => album.tenAlbum == newAlbum.tenAlbum
  );

  for (let input of arrInput) {
    const { id, value } = input;
    if (id === "theLoai") {
      let newValueText = getInnerText(value);
      albumEdit.danhSachAlbum[index] = {
        ...albumEdit.danhSachAlbum[index],
        [id]: newValueText,
      };
    } else {
      albumEdit.danhSachAlbum[index] = {
        ...albumEdit.danhSachAlbum[index],
        [id]: value,
      };
    }
  }

  albumEdit.saveAlbum();
  hienThiAlbum();

  //reset
  resetForm();
  document.getElementById("btnCapNhatAlbum").disabled = true;
  document.getElementById("btnThemAlbum").disabled = false;
};

// Lấy text trong thể loại Album
const getInnerText = (value) => {
  if (value === "1") {
    return "Album gái xinh";
  } else if (value === "2") {
    return "Album trai đẹp";
  } else {
    return "Album Idol";
  }
};

// Check name exist
const checkNameExist = (key) => {
  let isValid = true;

  if (albumEdit.danhSachAlbum.find((item) => item.tenAlbum === key))
    isValid = false;

  return isValid;
};

// Hàm reset
const resetForm = () => {
  arrInput.forEach((item, index) => {
    const { id, value } = item;
    console.log((document.getElementById(id).value = ""));
    if (id === "theLoai") {
      document.getElementById(id).value = value;
    } else {
      document.getElementById(id).value = "";
    }
  });
};
