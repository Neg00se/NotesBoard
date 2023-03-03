import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const NewNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = new Date();
    const newNote = {
      id: 0,
      title: noteTitle,
      content: noteContent,
      creationDate: datetime,
    };

    try {
      const response = await axiosPrivate.post("/create", newNote);
      console.log(response);
      setNoteTitle("");
      setNoteContent("");
      navigate("/");
    } catch (err) {
      console.log(`Error :${err.message}`);
    }
  };

  return (
    <main className="NewNote">
      <h2>Create Note</h2>
      <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="noteTitle">Title</label>
        <input
          id="noteTitle"
          type="text"
          required
          autoComplete="off"
          onChange={(e) => setNoteTitle(e.target.value)}
          value={noteTitle}
        />
        <label htmlFor="noteContent">Content</label>
        <TextareaAutosize
          id="noteContent"
          className="textarea"
          required
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </main>
  );
};

export default NewNote;
