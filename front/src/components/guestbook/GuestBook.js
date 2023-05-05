import React from "react";
import GuestBookCard from "./GuestBookCard";
import "../layout.css";

function GuestBook({ guestBook, setGuestBooks, isEditable }) {
  return (
    <>
      <GuestBookCard
        guestBook={guestBook}
        isEditable={isEditable}
        setGuestBooks={setGuestBooks}
      />
    </>
  );
}

export default GuestBook;
