import React, { useEffect, useContext, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import GuestBook from "./GuestBook";
import GuestBookAddForm from "./GuestBookAddForm";

import { UserStateContext } from "../../App";

function GuestBooks({ guestBookPageOwnerId }) {
  //useState로 guestBooks 상태를 생성함.
  const [guestBooks, setGuestBooks] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    // "guestBooklist/유저id"로 GET 요청하고, response의 data로 guestBooks를 세팅함.
    Api.get("guestBooklist", guestBookPageOwnerId).then((res) =>
      setGuestBooks(res.data)
    );
  }, [guestBookPageOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ display: "inline-block", marginRight: "10px" }}>
          방명록
        </Card.Title>
        {userState.user && (
          <button
            className="btn-post"
            style={{ display: "inline-block" }}
            onClick={() => setIsAdding(true)}
          >
            글쓰기
          </button>
        )}

        {isAdding && (
          <GuestBookAddForm
            guestBookPageOwnerId={guestBookPageOwnerId}
            setGuestBooks={setGuestBooks}
            setIsAdding={setIsAdding}
          />
        )}

        {guestBooks
          .filter((guestBook) => guestBook.receiverId === guestBookPageOwnerId)
          .map((guestBook) => (
            <GuestBook
              key={guestBook.id}
              guestBook={guestBook}
              setGuestBooks={setGuestBooks}
              isEditable={
                guestBook.receiverId === userState.user?.id ||
                guestBook.authorId === userState.user?.id
              }
            />
          ))}
      </Card.Body>
    </Card>
  );
}

export default GuestBooks;
