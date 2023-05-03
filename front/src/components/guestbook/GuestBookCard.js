import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import {useState,useEffect} from 'react';
import * as Api from "../../api";

function GuestBookCard({ guestBook, isEditable, setIsEditing, setGuestBooks }) {
  const handleDelete = async () => {
    await Api.delete("guestBooks", guestBook.id).then(() => {
      setGuestBooks((prevGuestBooks) =>
        prevGuestBooks.filter((prevGuestBook) => prevGuestBook.id !== guestBook.id)
      );
    });
  };

  useEffect(() => {}, [guestBook]);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <text>{guestBook?.authorName}</text>
          <br />
          <text>{guestBook?.content}</text>
          <br />

        </Col>
      </Row>
    </Card.Text>
  );
}

export default GuestBookCard;