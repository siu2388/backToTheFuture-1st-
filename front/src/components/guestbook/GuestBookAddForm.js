import React, { useState, useContext } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import "../layout.css";

function GuestBookAddForm({
  guestBookPageOwnerId,
  setGuestBooks,
  setIsAdding,
}) {
  const [content, setContent] = useState("");
  const userState = useContext(UserStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const receiverId = guestBookPageOwnerId;

    await Api.post(`guestBooks/${receiverId}`, {
      receiverId: guestBookPageOwnerId,
      authorId: userState.user.id,
      authorName: userState.user.name,
      content,
    });

    const res = await Api.get("guestBooklist", receiverId);
    setGuestBooks(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="floatingInputCustom">발자국 남기기</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        value={content}
        placeholder="하고 싶은 말을 남겨 보세요."
        onChange={(e) => setContent(e.target.value)}
        style={{ fontFamily: "NanumBarunGothic" }}
      />

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default GuestBookAddForm;
