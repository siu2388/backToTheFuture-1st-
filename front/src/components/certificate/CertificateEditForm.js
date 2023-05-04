import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  const [authority, setAuthority] = useState(currentCertificate.authority);
  const [registerNum, setRegisterNum] = useState(
    currentCertificate.registerNum
  );
  const [grade, setGrade] = useState(currentCertificate.grade);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 userId를 userId 변수에 할당함.
    const userId = currentCertificate.userId;

    // "projectId/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificateId/${currentCertificate.id}`, {
      userId,
      title,
      authority,
      registerNum,
      grade,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", userId);
    // projects를 response의 data로 세팅함.
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className = "component-card">
      <label htmlFor="floatingInputCustom">자격증명</label>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">발급기관</label>
      <Form.Group controlId="formBasicAuthority">
        <Form.Control
          type="text"
          placeholder="발급기관"
          value={authority}
          onChange={(e) => setAuthority(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">발급번호</label>
      <Form.Group controlId="formBasicRegisterNum">
        <Form.Control
          type="text"
          placeholder="발급번호"
          value={registerNum}
          onChange={(e) => setRegisterNum(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">등급/점수</label>
      <Form.Group controlId="formBasicGrade">
        <Form.Control
          type="text"
          placeholder="예: 1급/990"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
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

export default CertificateEditForm;
