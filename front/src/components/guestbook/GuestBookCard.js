import { Card, Modal, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import "../layout.css";
import { serverUrl } from "../../api";

function GuestBookCard({ guestBook, isEditable, setIsEditing, setGuestBooks }) {
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
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

  const author = users.find((user) => user.id === guestBook.authorId);

  useEffect(() => {
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [guestBook]);
  const lastEditTime = guestBook?.updatedAt
    ? guestBook.updatedAt
    : guestBook.createdAt;

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="component-card">
      <Row>
        <Col md={3}>
          <div>
            <img
              style={{ width: "8rem", height: "8rem", align: "center" }}
              className="mb-3"
              src={`${serverUrl}${
                author?.image?.path || "uploads/profile.jpg"
              }`}
              alt="프로필 이미지"
            />
          </div>
        </Col>
        <Col md={8} style={{ marginTop: "1rem" }}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="author-name">{guestBook?.authorName}</div>
              <div>
                <text className="text-muted">
                  {formatter.format(new Date(lastEditTime))}
                </text>
              </div>
            </div>

            <br />
            <div>
              <text>{guestBook?.content}</text>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "auto",
            }}
          >
            {isEditable && (
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
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GuestBookCard;
