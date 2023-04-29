import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function SkillEditForm({ currentSkill, setSkills, setIsEditing }) {
  const [skillName, setSkillName] = useState(currentSkill.skillName);
  //useState로 description 상태를 생성함.
  const [level, setLevel] = useState("currentSkill.level");
  const [period, setPeriod] = useState("currentSkill.period");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentSkill의 user_id를 user_id 변수에 할당함.
    const user_id = currentSkill.user_id;

    // "skills/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`skills/${currentSkill.id}`, {
      user_id,
      skillName,
      level,
      period,
    });

    // "skilllist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("skilllist", user_id);
    // skills를 response의 data로 세팅함.
    setSkills(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSkillName">
        <Form.Control
          type="text"
          placeholder="기술명"
          value={skillName}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicLevel" className="mt-3">
        <Form.Control
          type="text"
          placeholder="숙련도"
          value={level}
          onChange={(e) => setGrade(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPeriod" className="mt-3">
        <Form.Control
          type="text"
          placeholder="사용 기간"
          value={period}
          onChange={(e) => setDate(e.target.value)}
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

export default SkillEditForm;
