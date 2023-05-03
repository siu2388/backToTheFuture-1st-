import React, { useState } from "react";
import GuestBookCard from "./GuestBookCard";
import GuestBookEditForm from "./GuestBookEditForm";


function GuestBook({ guestBook, setGuestBooks, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);



  return (
    <>
      {isEditing ? (
        <GuestBookEditForm
          currentGuestBook={guestBook}
          setGuestBooks={setGuestBooks}
          setIsEditing={setIsEditing}
        />
      ) : (
        <GuestBookCard
          guestBook={guestBook}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setGuestBooks = {setGuestBooks}
        />
      )}
    </>
  );
}

export default GuestBook;
