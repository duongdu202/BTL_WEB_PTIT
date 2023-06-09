import React, { useEffect, useState } from "react";
import axios from "axios";
import control from "../API/control";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const BookForm = () => {
  const [status, setStatus] = useState(true);
  const params = useParams();
  const [view, setView] = useState(true);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publicDate, setPublicDate] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (params) {
      const getBook = async () => {
        try {
          const response = await control.get("/getbook", {
            params: {
              id: params.id,
            },
          });
          setStatus(false);
          setView(false);

          setFile(response.data.image);
          setTitle(response.data.title);
          setAuthor(response.data.author);
          setDescription(response.data.description);
          setPublicDate(response.data.publicdate);
          setPageNumber(response.data.pagenumb);
          setCategory(response.data.category);
        } catch (err) {
          console.error(err);
        }
      };
      getBook();
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState({});

  const [imagePath, setImagePath] = useState("");

  const checkAuthorTitle = async () => {
    try {
      const response = await control.get("check/title/author", {
        params: {
          title: title,
          author: author,
        },
      });
      if (response.data) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    const msg = {};
    if (title === "") {
      msg.title = "Tittle is Empty";
    }
    if (author === "") {
      msg.author = "Author is Empty";
    }
    if (
      title.trim() !== "" &&
      author.trim() !== "" &&
      (await checkAuthorTitle())
    ) {
      msg.title = "Author and Title is Existed";
      msg.author = "Author and Title is Existed";
    }
    if (description === "") {
      msg.description = "Description is Empty";
    }
    if (publicDate === "") {
      msg.publicDate = "Date is Empty";
    } else if (isNaN(publicDate) || publicDate <= 0) {
      msg.publicDate = "Date is Invalid";
    }
    if (pageNumber === "") {
      msg.pageNumber = "Page is Empty";
    } else if (isNaN(pageNumber) || pageNumber <= 0) {
      msg.pageNumber = "Page is Invalid";
    }
    if (category === "") {
      msg.category = "Category is Empty";
    }
    if (file === null) {
      msg.file = "Please select file";
    }

    setErr(msg);
    if (Object.keys(msg).length > 0) {
      setLoading(false);
      return;
    }

    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("publicdate", publicDate);
    formData.append("pagenumb", pageNumber);
    formData.append("category", category);

    try {
      if (status) {
        await control.post("add/book", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Save Success");
        setLoading(false);
        setView(false)
        window.location.reload(false)
        console.log("Book data saved successfully");
      } else {
        formData.append("id", params.id);
        if (view) {
          await control.put(
            imagePath ? "update/book" : "update/book/noimage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          alert("Update Success");
          setLoading(false);
          setView(false)
          console.log("Book data updated successfully");
        }
      }
    } catch (error) {
      setLoading(false)
      alert("ERROR")
      console.error("Error saving book data:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              disabled={!view}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p style={{ color: "red", fontStyle: "italic" }}>{err.title}</p>
          </div>
          <div>
            <input
              disabled={!view}
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p style={{ color: "red", fontStyle: "italic" }}>{err.author}</p>
          </div>
        </div>
        <div className="mb-4">
          <textarea
            disabled={!view}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <p style={{ color: "red", fontStyle: "italic" }}>{err.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              disabled={!view}
              type="text"
              placeholder="Public Date"
              value={publicDate}
              onChange={(e) => setPublicDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p style={{ color: "red", fontStyle: "italic" }}>
              {err.publicDate}
            </p>
          </div>
          <div>
            <input
              disabled={!view}
              type="text"
              placeholder="Page Number"
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p style={{ color: "red", fontStyle: "italic" }}>
              {err.pageNumber}
            </p>
          </div>
        </div>
        <div>
          <select
            disabled={!view}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="biography">Biography</option>
            {/* Thêm các tùy chọn khác tại đây */}
          </select>
          <p style={{ color: "red", fontStyle: "italic" }}>{err.category}</p>
        </div>
      </div>
      <div className="w-1/2 p-4 flex flex-col justify-center items-center">
        <input
          disabled={!view}
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            console.log("Image URL:", imageUrl);
            setImagePath(imageUrl);
            setFile(e.target.files[0]);
          }}
          className="mb-4"
        />
        {imagePath && (
          <div className="w-96 h-96">
            <img
              src={imagePath}
              alt="Selected Image"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {!status && (
          <div className="w-96 h-96">
            <img
              src={`data:image/png;base64,${file}`}
              alt="Selected Image"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p style={{ color: "red", fontStyle: "italic" }}>{err.file}</p>
        {status ? (
          <button
            type="submit"
            disabled={loading}
            className={
              "px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 " +
              (loading ? "cursor-not-allowed" : "")
            }
            onClick={(e) => {
              setLoading(true);
              handleSubmit(e);
            }}
          >
            {!loading ? (
              "Save Book"
            ) : (
              <ClipLoader color={"black"} loading={loading} size={15} />
            )}
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={
              "px-4 py-2 mt-4  text-white rounded-md hover:bg-blue-600 " +
              (loading ? "cursor-not-allowed" : "") +
              (view
                ? " bg-red-500 hover:bg-red-600"
                : " bg-blue-500 hover:bg-blue-600")
            }
            onClick={(e) => {
              setView(true);
              if(view){
                handleSubmit(e);
              }
            }}
          >
            {view ? "Save Update" : "Update"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookForm;
