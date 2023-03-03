import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import TextareaAutosize from "react-textarea-autosize";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditNote = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const { notes, setNotes } = useContext(DataContext);
  const { id } = useParams();
  const note = notes.find((note) => note.id.toString() === id);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (note) {
      setEditTitle(note.title);
      setEditContent(note.content);
    }
  }, []);

  const hadleEdit = async (id) => {
    const datetime = new Date();
    const updatedNote = {
      id,
      title: editTitle,
      content: editContent,
      creationDate: datetime,
    };
    try {
      const response = await axiosPrivate.put("/update", updatedNote);
      console.log(response);
      setEditTitle("");
      setEditContent("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="EditPage">
      {editContent && (
        <>
          <h2>Edit Note</h2>
          <form className="editForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="noteTitle">Title:</label>
            <input
              id="noteTitle"
              autoComplete="off"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="noteContent">Content:</label>
            <TextareaAutosize
              className="textarea"
              id="noteContent"
              required
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button onClick={() => hadleEdit(note.id)}>Submit</button>
          </form>
        </>
      )}
    </main>
  );
};

export default EditNote;
