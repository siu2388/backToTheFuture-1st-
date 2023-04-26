import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("")
  //useState로 description 상태를 생성함.
  const [authority, setAuthority] = useState("")
  const [registerNum, setRegisterNum] = useState("")
  const [grade, setGrade] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "certificate/create" 엔드포인트로 post요청함.
    await Api.post("certificate/create", {
      user_id: portfolioOwnerId,
      title,
      authority,
      registerNum,
      grade
    });

    // "certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("certificatelist", user_id);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // certificate를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicAuthority" className="mt-3">
        <Form.Control
          type="text"
          placeholder="발급기관"
          value={authority}
          onChange={(e) => setAuthority(e.target.value)}
        />
      </Form.Group>


      <Form.Group controlId="formBasicRegisterNum" className="mt-3">
        <Form.Control
          type="text"
          placeholder="발급번호"
          value={registerNum}
          onChange={(e) => setRegisterNum(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicGrade" className="mt-3">
        <Form.Control
          type="text"
          placeholder="등급"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
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

export default CertificateAddForm;
