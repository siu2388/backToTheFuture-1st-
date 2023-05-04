import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) {
  const [title, setTitle] = useState(currentCertificate.title);
  const [authority, setAuthority] = useState(currentCertificate.authority);
  const [registerNum, setRegisterNum] = useState(
    currentCertificate.registerNum
  );
  const [grade, setGrade] = useState(currentCertificate.grade);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //에러처리
    if (!title) {
      alert("자격증명을 입력해주세요.");
      return;
    }
    if (!authority) {
      alert("발급기관을 입력해주세요.");
      return;
    }
    if (!registerNum) {
      alert("발급번호를 입력해주세요.");
      return;
    }
    if (!grade) {
      alert("등급/점수를 입력해주세요.");
      return;
    }

    const userId = currentCertificate.userId;

    await Api.put(`certificateId/${currentCertificate.id}`, {
      userId,
      title,
      authority,
      registerNum,
      grade,
    });

    const res = await Api.get("certificatelist", userId);
    setCertificates(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
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
          <button type="submit" className="btn-confirm">
            확인
          </button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
