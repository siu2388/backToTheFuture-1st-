import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CareerEditForm({
  currentCareer,
  setCareers,
  setIsEditing,
}) {
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

      <label htmlFor="floatingInputCustom">회사명</label>
      <Form.Group controlId="formBasicCompany">
        <Form.Control
          type="text"
          placeholder="회사명"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">부서</label>
      <Form.Group controlId="formBasicDepartment">
        <Form.Control
          type="text"
          placeholder="부서"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">직무</label>
      <Form.Group controlId="formBasicPosition">
        <Form.Control
          type="text"
          placeholder="직무"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">근무 기간</label>
      <Form.Group controlId="formBasicStartDate">
        <Form.Control
          type="text"
          placeholder="예: 2020-02"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate">
        <Form.Control
          type="text"
          placeholder="예: 2023-03"
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
