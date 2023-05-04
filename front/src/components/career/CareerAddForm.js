import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import convertTime from "../ConverTime";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function CareerAddForm({ portfolioOwnerId, setCareers, setIsAdding }) {
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //에러처리
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
    
    const isValidDate = startDate <= endDate

    if (!isValidDate) {
      alert("시작 날짜가 종료 날짜와 같거나 종료 날짜보다 늦을 수 없습니다.")
      return;
    }

    const userId = portfolioOwnerId;

    await Api.post("career/create", {
      userId: portfolioOwnerId,
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

    setStartDate(convertTime(startDate));
    data.startDate = convertTime(startDate);

    setEndDate(convertTime(endDate));
    data.endDate = convertTime(endDate);

    const res = await Api.get("careerlist", userId);
    setCareers(res.data);
    setIsAdding(false);
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
      <Form.Group controlId="formBasicPositionm">
        <Form.Control
          type="text"
          placeholder="직무"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <>
        <label htmlFor="floatingInputCustom">시작 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          selected={startDate}
          onChange={(startDate) => setStartDate(startDate)}
        />
        <label htmlFor="floatingInputCustom">종료 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          showMonthDropdown
          showYearDropdown
          selected={endDate}
          onChange={(endDate) => setEndDate(endDate)}
        />
      </>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

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

export default CareerAddForm;
