const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  console.log(`add`)
  const { judul, penerbit, jumlah_halaman } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const udpatedAt = createdAt;

  const newBook = {
    judul,
    penerbit,
    jumlah_halaman,
    id,
    createdAt,
    udpatedAt,
  };
  books.books.push(newBook);
  const isSuccess = books.books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambah",
      data: {
        nodeId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.reponse({
    status: "fail",
    message: "Buku gagal di tambahkan!",
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => ({
  status: "success get all books",
  data: {
    books,
  },
});

// show detail
const getBookByIdHandler = (request, h) => {
  console.log(`get id`)
  const { id } = request.params;
  const book = books.books.filter((n) => n.id === id)[0];
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

//edit book
const editBookByIdHandler = (request, h) => {
  console.log(`edit`)
  const { id, createAt } = request.params;
  const { judul, penerbit, jumlah_halaman } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.books[index] = {
      ...books[index],
      judul,
      penerbit,
      jumlah_halaman,
      id,
      createAt,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal diperbarui",
  });
  response.code(404);
  return response;
};

//delete book
const deleteBookByIdHandler = (request, h) => {
  console.log(`hapus`)
  const { id } = request.params;
  const index = books.books.findIndex((book) => book.id === id);
  console.log(books.books.findIndex((book) => book.id === id));
  if (index) {
    books.books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus, Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
