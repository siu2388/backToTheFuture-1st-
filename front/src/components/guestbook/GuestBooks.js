import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../api';
import GuestBook from "./GuestBook";
import GuestBookAddForm from "./GuestBookAddForm";


function GuestBooks({ guestBookPageOwnerId, isEditable }) {
  //useState로 guestBooks 상태를 생성함.
  const [guestBooks, setGuestBooks] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "guestBooklist/유저id"로 GET 요청하고, response의 data로 guestBooks를 세팅함.
    Api.get("guestBooklist", guestBookPageOwnerId).then((res) => setGuestBooks(res.data));
  }, [guestBookPageOwnerId]);


  return (
    <Card>
      <Card.Body>
        <Card.Title>방명록</Card.Title>
        {guestBooks
        .filter((guestBook) => guestBook.receiverId === guestBookPageOwnerId)
        .map((guestBook) => (
          <GuestBook
            key={guestBook.authorId}
            guestBook={guestBook}
            setGuestBooks={setGuestBooks}
            isEditable={isEditable}

          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <GuestBookAddForm
            guestBookPageOwnerId={guestBookPageOwnerId}
            setGuestBooks={setGuestBooks}
            setIsAdding={setIsAdding}
            
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default GuestBooks;
