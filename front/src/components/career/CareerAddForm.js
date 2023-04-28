import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CareerAddForm({ portfolioOwnerId, setCareers, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [company, setCompany] = useState();
  const [department, setDepartment] = useState();
  const [position, setPosition] = useState();
  const [description, setDescription] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "career/create" 엔드포인트로 post요청함.
    await Api.post("career/create", {
      user_id: portfolioOwnerId,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    });

    // "careerlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("careerlist", user_id);
    // careers를 response의 data로 세팅함.
    setCareers(res.data);
    // career를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicCompany">
        <Form.Control
          type="text"
          placeholder="회사 이름"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDepartment" className="mt-3">
        <Form.Control
          type="text"
          placeholder="부서"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Form.Group>


      <Form.Group controlId="formBasicPosition" className="mt-3">
        <Form.Control
          type="text"
          placeholder="직급"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="직무설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Label>근무 기간</Form.Label>
      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <Form.Control
          type="text"
          placeholder="근무 시작 날짜"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate" className="mt-3">
        <Form.Control
          type="text"
          placeholder="근무 종료 날짜"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>

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

export default CareerAddForm;
