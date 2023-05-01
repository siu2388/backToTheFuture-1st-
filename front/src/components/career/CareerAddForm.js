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

    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;

    // "career/create" 엔드포인트로 post요청함.
    await Api.post("career/create", {
      userId: portfolioOwnerId,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    });

    // "careerlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("careerlist", userId);
    // careers를 response의 data로 세팅함.
    setCareers(res.data);
    // career를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
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
      <Form.Group controlId="formBasicPositionm">
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

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
