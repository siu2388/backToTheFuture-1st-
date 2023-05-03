import React, { useState, useContext } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function GuestBookAddForm({ guestBookPageOwner, setGuestBooks, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [content, setContent] = useState("");
  const userState = useContext(UserStateContext);
  //useState로 description 상태를 생성함.
  const [authorId, setAuthorId] = useState(userState.user?.id);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // guestBookPageOwnerId를 user_id 변수에 할당함.
    const receiverId = guestBookPageOwner.id;
 

    // "guestBook/create" 엔드포인트로 post요청함.
    await Api.post("guestBook/create", {
      receiverId: guestBookPageOwner.id,
      authorId: userState.user.id,
      content,
    });

    // "guestBooklist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("guestBooklist", receiverId);
    // guestBooks를 response의 data로 세팅함.
    setGuestBooks(res.data);
    // guestBook를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
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