import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Note from "./Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const axiosPrivate = useAxiosPrivate();

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
      } catch (error) {
        console.log(error);
      }
    };

    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <main>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </main>
  );
};

export default Home;
