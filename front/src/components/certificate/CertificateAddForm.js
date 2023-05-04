import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  const [authority, setAuthority] = useState("");
  const [registerNum, setRegisterNum] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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

    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;

    // "certificate/create" 엔드포인트로 post요청함.
    await Api.post("certificate/create", {
      userId: portfolioOwnerId,
      title,
      authority,
      registerNum,
      grade,
    });

    // "certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("certificatelist", userId);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // certificate를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
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

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <button type="submit" className="btn-confirm">
            확인
          </button>
          <button className="btn-cancel" onClick={() => setIsAdding(false)}>
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
