import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "api"; //Education를 위한 api 쓰기

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [schoolName, setschoolName] = useState("");
  //useState로 description 상태를 생성함.
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("education/create", {
      user_id: portfolioOwnerId,
      schoolName,
      major,
      status,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", user_id);
    // educations를 response의 data로 세팅함.
    setEducations(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchoolName">
        <Form.Control
          type="text"
          placeholder="학교이름"
          value={schoolName}
          onChange={(e) => setschoolName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStatus">
        <Form.Check
          inline
          label="재학중"
          name="position"
          type={"radio"}
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="학사졸업"
          name="position"
          type={"radio"}
          id={`inline-radio-2`}
        />
        <Form.Check
          inline
          label="석사졸업"
          name="position"
          type={"radio"}
          id={`inline-radio-3`}
        />
        <Form.Check
          inline
          label="박사졸업"
          name="position"
          type={"radio"}
          id={`inline-radio-4`}
        />
        value={status}
        onChange={(e) => setStatus(e.target.value)}
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

export default EducationAddForm;
