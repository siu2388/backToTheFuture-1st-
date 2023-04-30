import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("award/create", {
      user_id: portfolioOwnerId,
      title,
      grade,
      date,
      description,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", user_id);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
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

export default AwardAddForm;
