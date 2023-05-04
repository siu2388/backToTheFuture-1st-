import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentAward.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentAward.description);
  const [grade, setGrade] = useState(currentAward.grade);
  const [date, setDate] = useState(currentAward.date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 userId를 userId 변수에 할당함.
    const userId = currentAward.userId;

    // "awardId/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`awardId/${currentAward.id}`, {
      userId,
      title,
      grade,
      date,
      description,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("awardlist", userId);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="floatingInputCustom">수상내역</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        value={title}
        placeholder="수상내역"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="floatingInputCustom">상</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        placeholder="예: 금상"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />

      <label htmlFor="floatingInputCustom">수상년월</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        placeholder="예 : 20230101"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label htmlFor="floatingInputCustom">상세내역</label>
      <Form.Control
        type="text"
        placeholder="상세내역"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

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

export default AwardEditForm;
