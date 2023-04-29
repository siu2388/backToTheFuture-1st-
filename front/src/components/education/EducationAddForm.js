import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api"; //Education를 위한 api 쓰기

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolType, setSchoolType] = useState("");
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
      schoolType,
      major,
      status,
      startDate,
      endDate,
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
      <Form.Floating
        className="mb-3"
        onChange={(e) => setSchoolName(e.target.value)}
      >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={schoolName}
          placeholder="예 :00고등학교/00대학교"
        />
        <label htmlFor="floatingInputCustom">학교</label>
      </Form.Floating>

      <Form.Select
        aria-label="Default select example"
        value={schoolType}
        onChange={(e) => setSchoolType(e.target.value)}
      >
        <option>학위</option>
        <option value="학사">학사</option>
        <option value="석사">석사</option>
        <option value="박사">박사</option>
      </Form.Select>

      <Form.Floating
        className="mb-3"
        onChange={(e) => setMajor(e.target.value)}
      >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={major}
          placeholder="예:경영학"
        />
        <label htmlFor="floatingInputCustom">전공</label>
      </Form.Floating>


      <Form.Select
        aria-label="Default select example2"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>상태</option>
        <option value="재학중">재학중</option>
        <option value="휴학">학사</option>
        <option value="수료">석사</option>
        <option value="졸업">졸업</option>
      </Form.Select>

      
      <Form.Floating
        className="mb-3"
        onChange={(e) => setStartDate(e.target.value)}
      >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={startDate}
          placeholder="입학년월 예:2021.03"
        />
        <label htmlFor="floatingInputCustom">입학년월</label>
      </Form.Floating>

      <Form.Floating onChange={(e) => setEndDate(e.target.value)}>
        <Form.Control
          id="floatingPasswordCustom"
          type="text"
          value={endDate}
          placeholder="졸업년월 예:2023.09"
        />
        <label htmlFor="floatingPasswordCustom">졸업년월</label>
      </Form.Floating>

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
