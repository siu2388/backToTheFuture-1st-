import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentAward.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentAward.description);
  const [grade, setGrade] = useState(currentAward.grade);
  const [date, setDate] = useState(currentAward.date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentAward.user_id;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`awards/${currentAward.id}`, {
      user_id,
      title,
      grade,
      date,
      description,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("awardlist", user_id);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      
      <label htmlFor="floatingInputCustom">수상내역</label>
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={title}
          placeholder="수상내역"
          onChange={(e) => setTitle(e.target.value)}
        />


      
      <label htmlFor="floatingInputCustom">상</label>
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="예: 금상"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />


      <label htmlFor="floatingInputCustom">수상년월</label>       
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="예 : 2020-02"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />


      <label htmlFor="floatingInputCustom">상세내역</label>    
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
