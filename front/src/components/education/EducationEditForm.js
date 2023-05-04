import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import convertTime from "../ConverTime";

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [schoolName, setSchoolName] = useState(currentEducation.schoolName);
  const [schoolType, setSchoolType] = useState(currentEducation.schoolType);
  const [major, setMajor] = useState(currentEducation.major);
  const [status, setStatus] = useState(currentEducation.status);
  const [startDate, setStartDate] = useState(
    new Date(currentEducation.startDate)
  );
  const [endDate, setEndDate] = useState(new Date(currentEducation.endDate));

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentEducation의 userId를 userId 변수에 할당함.
    const userId = currentEducation.userId;

    // "educationId/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`educationId/${currentEducation.id}`, {
      userId,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    });

    const data = {
      userId,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    };

    console.log("data: ", data);
    setStartDate(convertTime(startDate));
    data.startDate = convertTime(startDate);

    setEndDate(convertTime(endDate));
    data.endDate = convertTime(endDate);

    console.log("data: ", data);

    // "educationlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("educationlist", userId);
    // Educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
      <label htmlFor="floatingInputCustom">학교</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        value={schoolName}
        placeholder="예 :00고등학교/00대학교"
        onChange={(e) => setSchoolName(e.target.value)}
      />

      <label htmlFor="floatingInputCustom">학위</label>
      <Form.Select
        aria-label="Default select example"
        value={schoolType}
        onChange={(e) => setSchoolType(e.target.value)}
      >
        <option value="">학위를 선택해주세요</option>
        <option value="학사">학사</option>
        <option value="석사">석사</option>
        <option value="박사">박사</option>
      </Form.Select>

      <label htmlFor="floatingInputCustom">전공</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        value={major}
        placeholder="예:경영학"
        onChange={(e) => setMajor(e.target.value)}
      />

      <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">재학여부를 선택해주세요</option>
        <option value="재학중">재학중</option>
        <option value="휴학">휴학</option>
        <option value="수료">수료</option>
        <option value="졸업">졸업</option>
      </Form.Select>

      <>

        <label htmlFor="floatingInputCustom">입학 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          // selected={new Date(this.state.startDate)}
          selected={startDate}
          onChange={(startDate) => setStartDate(startDate)}
        />
        <label htmlFor="floatingInputCustom">졸업 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          // selected={new Date(this.state.startDate)}
          selected={endDate}
          onChange={(endDate) => setEndDate(endDate)}
        />
      </>

      <Form.Group as={Row} className="mt-3 text-center">
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

export default EducationEditForm;
