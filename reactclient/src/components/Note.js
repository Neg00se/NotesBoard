import React from "react";
import { Link } from "react-router-dom";

const Note = ({ note }) => {
  return (
    <Link to={`note/${note.id}`}>
      <div className="note">
        <h2 className="title">{note.title}</h2>
        <hr />
        <p className="content">
          {note.content.length <= 70
            ? note.content
            : `${note.content.slice(0, 70)}...`}
        </p>
      </div>
    </Link>
  );
};

export default Note;
