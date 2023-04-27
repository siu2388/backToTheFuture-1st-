import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api"; //Education를 위한 api 쓰기

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
 
  const [schoolName, setschoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("education/create", {
      user_id: portfolioOwnerId,
      schoolName,
      degree,
      major,
      status,
      startDate,
      endDate
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

      <Form.Select aria-label="Default select example" onChange={(e) => setDegree(e.target.value)}>
        <option>Open this select menu</option>
        <option value="1">중학교</option>
        <option value="2">고등학교</option>
        <option value="3">대학교</option>
        <option value="4">대학원</option>
      </Form.Select>

      <Form.Group controlId="formBasicMajor" className="mt-3" style={{ display: "flex", alignItems: "center" }}>
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Select aria-label="Default select example2" onChange={(e) => setStatus(e.target.value)}>
        <option>Open this select menu</option>
        <option value="1">재학중</option>
        <option value="2">학사</option>
        <option value="3">석사</option>
        <option value="4">박사</option>
        <option value="5">졸업</option>
      </Form.Select>

      <Form.Label>재학 기간</Form.Label>
      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <Form.Control
          type="number"
          placeholder="입학날짜"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate" className="mt-3">
        <Form.Control
          type="number"
          placeholder="졸업날짜"
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

export default EducationAddForm;
