import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

// user_id,skillName,level,period
function SkillAddForm({ portfolioOwnerId, setSkills, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [skillName, setSkillName] = useState("");
  //useState로 description 상태를 생성함.
  const [level, setLevel] = useState("");
  const [period, setPeriod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "skill/create" 엔드포인트로 post요청함.
    await Api.post("skill/create", {
      user_id: portfolioOwnerId,
      skillName,
      level,
      period,
    });

    // "skilllist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("skilllist", user_id);
    // skills를 response의 data로 세팅함.
    setSkills(res.data);
    // skill를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSkillName">
        <Form.Control
          type="text"
          placeholder="기술명"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicLevel" className="mt-3">
        <Form.Control
          type="text"
          placeholder="숙련도"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPeriod" className="mt-3">
        <Form.Control
          type="text"
          placeholder="사용 기간"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
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

export default SkillAddForm;
