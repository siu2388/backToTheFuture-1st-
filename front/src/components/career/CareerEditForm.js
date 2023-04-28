import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CareerEditForm({ currentCareer, setCareers, setIsEditing }) {
  //useState로 title 상태를 생성함. company,department, position, description, startDate,endDate,
  const [company, setCompany] = useState(currentCareer.company);
  const [department, setDepartment] = useState(currentCareer.department);
  const [position, setPosition] = useState(currentCareer.position);
  const [description, setDescription] = useState(currentCareer.description);
  const [startDate, setStartDate] = useState(currentCareer.StartDate);
  const [endDate, setEndDate] = useState(currentCareer.EndDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const user_id = currentCareer.user_id;

    // "projects/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`careers/${currentCareer.id}`, {
      user_id,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("careerlist", user_id);
    // projects를 response의 data로 세팅함.
    setCareers(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
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
        placeholder="직무 설명"
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

export default CareerEditForm;
