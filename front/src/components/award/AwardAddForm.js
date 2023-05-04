import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("date: ", date);

    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("award/create", {
      userId: portfolioOwnerId,
      title,
      grade,
      date,
      description,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", userId);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
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

      <label htmlFor="floatingInputCustom">수상 날짜</label>
      <DatePicker
        showIcon
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택해 주세요"
        // selected={new Date(this.state.startDate)}
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

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <button variant="primary" type="submit" className="btn-confirm">
            확인
          </button>
          <button
            variant="secondary"
            onClick={() => setIsAdding(false)}
            className="btn-cancel"
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
