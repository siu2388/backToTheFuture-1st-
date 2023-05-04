import { Card, Modal, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import "../layout.css";

function GuestBookCard({ guestBook, isEditable, setIsEditing, setGuestBooks }) {
  const userState = useContext(UserStateContext);
  const handleDelete = async () => {
    const isReceiver = guestBook.receiverId === userState.user?.id;
    const isAuthor = guestBook.authorId === userState.user?.id;

    if (isReceiver || isAuthor) {
      const deleteUrl = `guestBooks/${guestBook.receiverId}/${
        guestBook.id
      }/remove/${isAuthor ? "author" : "receiver"}`;
      await Api.delete(deleteUrl).then(() => {
        setGuestBooks((prevGuestBooks) =>
          prevGuestBooks.filter(
            (prevGuestBook) => prevGuestBook.id !== guestBook.id
          )
        );
      });
    }
  };

  useEffect(() => {}, [guestBook]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="component-card">
      <Card.Text>
        <Row className="align-items-center">
          <Col className="component-card-col-left">
            <text> {guestBook?.authorName}{" "} </text>
            <text dateFormat="yyyy-MM-dd"> {guestBook?.updatedAt ? guestBook.updatedAt : guestBook.createdAt} </text>
            <br />
            <text>{guestBook?.content}</text>
            <br />
          </Col>
          {isEditable && (
            <Col xs lg="3.2" className="component-card-col-right">
              <>
                <button onClick={handleShow} className="btn-delete">
                  삭제
                </button>

                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                  <Modal.Footer>
                    <button
                      variant="secondary"
                      onClick={handleClose}
                      className="btn-cancel"
                    >
                      취소
                    </button>
                    <button
                      variant="primary"
                      onClick={() => {
                        handleClose();
                        handleDelete();
                      }}
                      className="btn-confirm"
                    >
                      확인
                    </button>
                  </Modal.Footer>
                </Modal>
              </>
            </Col>
          )}
        </Row>
      </Card.Text>
    </Container>
  );
}

export default GuestBookCard;
