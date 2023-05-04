import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function SkillEditForm({ currentSkill, setSkills, setIsEditing }) {
  const [skillName, setSkillName] = useState(currentSkill.skillName);
  //useState로 description 상태를 생성함.
  const [level, setLevel] = useState(currentSkill.level);
  const [period, setPeriod] = useState(currentSkill.period);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentSkill의 userId를 userId 변수에 할당함.
    const userId = currentSkill.userId;

    // "skillId/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`skillId/${currentSkill.id}`, {
      userId,
      skillName,
      level,
      period,
    });

    // "skilllist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("skilllist", userId);
    // skills를 response의 data로 세팅함.
    setSkills(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
      <label htmlFor="floatingInputCustom">보유기술</label>
      <Form.Group controlId="formBasicSkillName">
        <Form.Control
          type="text"
          placeholder="예: React"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">숙련도</label>
      <Form.Group controlId="formBasicLevel">
        <Form.Select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">숙련도를 선택해주세요</option>
          <option value="하">하</option>
          <option value="중하">중하</option>
          <option value="중">중</option>
          <option value="중상">중상</option>
          <option value="상">상</option>
        </Form.Select>
      </Form.Group>

      <label htmlFor="floatingInputCustom">사용기간</label>
      <Form.Group controlId="formBasicPeriod">
        <Form.Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="">사용기간을 선택해주세요</option>
          <option value="1년 미만">1년 미만</option>
          <option value="2년 미만">2년 미만</option>
          <option value="3년 미만">3년 미만</option>
          <option value="4년 미만">4년 미만</option>
          <option value="5년 미만">5년 미만</option>
          <option value="5년 이상">5년 이상</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button variant="primary" type="submit" className="btn-confirm">
            확인
          </button>
          <button
            variant="secondary"
            onClick={() => setIsEditing(false)}
            className="btn-cancel"
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default SkillEditForm;
