import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import convertTime from "../ConvertTime";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);
  const [grade, setGrade] = useState(currentAward.grade);
  const [date, setDate] = useState(new Date(currentAward.date));
  const [today, setToday] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //에러처리
    if (!title) {
      alert("상 이름을 입력해 주세요.");
      return;
    }
    if (!date) {
      alert("수상 날짜를 입력해 주세요.");
      return;
    }
    const isValidToday = date < today;

    if (!isValidToday) {
      alert("오늘 날짜를 기준으로 미래 날짜는 선택이 불가능합니다. ");
      return;
    }


    const userId = currentAward.userId;

    await Api.put(`awardId/${currentAward.id}`, {
      userId,
      title,
      grade,
      date,
      description,
    });

    const data = {
      userId,
      title,
      grade,
      date,
      description,
    };

    setDate(convertTime(date));
    data.date = convertTime(date);

    setToday(convertTime(new Date()));

    const res = await Api.get("awardlist", userId);
    setAwards(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
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
      <DatePicker
        dateFormat="yyyy-MM-dd"
        showIcon
        placeholderText="날짜를 선택해 주세요"
        selected={date}
        onChange={(date) => setDate(date)}
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
