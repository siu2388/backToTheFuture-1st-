import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import convertTime from "../ConverTime";

function CareerEditForm({ currentCareer, setCareers, setIsEditing }) {
  //useState로 title 상태를 생성함. company,department, position, description, startDate,endDate,
  const [company, setCompany] = useState(currentCareer.company);
  const [department, setDepartment] = useState(currentCareer.department);
  const [position, setPosition] = useState(currentCareer.position);
  const [description, setDescription] = useState(currentCareer.description);
  const [startDate, setStartDate] = useState(new Date(currentCareer.startDate));
  const [endDate, setEndDate] = useState(new Date(currentCareer.endDate));

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!company) {
      alert("회사명을 입력해 주세요.");
      return;
    }

    if (!department) {
      alert("부서명을 입력해 주세요.");
      return;
    }

    if (!position) {
      alert("직무를 입력해 주세요.");
      return;
    }

    if (!description) {
      alert("직무 설명을 작성해 주세요.");
      return;
    }

    if (!startDate) {
      alert("근무 시작 날짜를 입력해 주세요.");
      return;
    }

    if (!endDate) {
      alert(
        "근무 종료 날짜를 입력해 주세요. 재직 중이라면 오늘 날짜를 입력해 주세요."
      );
      return;
    }

    // currentProject의 userId를 userId 변수에 할당함.
    const userId = currentCareer.userId;

    // "projectId/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`careerId/${currentCareer.id}`, {
      userId,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    });

    const data = {
      startDate,
      endDate,
      company,
      userId,
      department,
      position,
      description,
    };

    console.log("data: ", data);
    setStartDate(convertTime(startDate));
    data.startDate = convertTime(startDate);

    setEndDate(convertTime(endDate));
    data.endDate = convertTime(endDate);

    console.log("data: ", data);

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("careerlist", userId);
    // projects를 response의 data로 세팅함.
    setCareers(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
      <label htmlFor="floatingInputCustom">회사명</label>
      <Form.Group controlId="formBasicCompany">
        <Form.Control
          type="text"
          placeholder="회사명"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">부서</label>
      <Form.Group controlId="formBasicDepartment">
        <Form.Control
          type="text"
          placeholder="부서"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">직무</label>
      <Form.Group controlId="formBasicPosition">
        <Form.Control
          type="text"
          placeholder="직무"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">근무 기간</label>
      <br />
      <>
        <label htmlFor="floatingInputCustom">시작 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          // selected={new Date(this.state.startDate)}
          selected={startDate}
          onChange={(startDate) => setStartDate(startDate)}
        />
        <label htmlFor="floatingInputCustom">종료 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          // selected={new Date(this.state.startDate)}
          selected={endDate}
          onChange={(endDate) => setEndDate(endDate)}
        />
      </>

      <label htmlFor="floatingInputCustom">직무설명</label>
      <Form.Group controlId="formBasicDescription">
        <Form.Control
          type="text"
          placeholder="직무 설명을 작성해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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

export default CareerEditForm;
