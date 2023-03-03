import React, { useState, useEffect, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Note from "./Note";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import axios from "axios";

const Home = () => {
  const { notes, setNotes } = useContext(DataContext);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get("/get-all", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setNotes(response.data);
      } catch (err) {
        console.error(err);
        if (!axios.isCancel(err)) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <main className="noteGrid">
      <Link to="/note">
        <div className="addNote">
          <h2>Add Note</h2>
        </div>
      </Link>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </main>
  );
};

export default Home;
