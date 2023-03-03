import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from "date-fns";

const NotePage = () => {
  const { id } = useParams();
  const { notes, setNotes } = useContext(DataContext);
  const note = notes.find((note) => note.id.toString() === id);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const datetime = format(new Date(note.creationDate), "d.M.yyyy HH:mm:ss");

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/delete/${id}`);
      const notesList = notes.filter((note) => note.id !== id);
      setNotes(notesList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NotePage">
      <div className="details">
        <button onClick={() => navigate("/")}>back</button>
        {note && (
          <>
            <h2>{note.title}</h2>
            <p>{datetime}</p>
            <p>{note.content}</p>
            <div className="buttons">
              <button
                onClick={() => handleDelete(note.id)}
                className="deleteButton"
              >
                Delete
              </button>
              <Link className="editLink" to={`/note/edit/${id}`}>
                <button className="editButton">Edit</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default NotePage;
