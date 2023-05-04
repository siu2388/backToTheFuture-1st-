import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import convertTime from "../ConverTime";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [archive, setArchive] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!title) {
      alert("프로젝트명을 입력해 주세요.");
      return;
    }

    if (!startDate) {
      alert("활동 시작 날짜를 입력해 주세요.");
      return;
    }

    if (!endDate) {
      alert("활동 종료 날짜를 입력해 주세요. 진행 중이라면 오늘 날짜를 입력해 주세요.");
      return;
    }

    if (!description) {
      alert("프로젝트 설명을 작성해 주세요.");
      return;
    }


    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("project/create", {
      userId: portfolioOwnerId,
      title,
      startDate,
      endDate,
      archive,
      description,
    });

    const data = {
      userId,
      title,
      startDate,
      endDate,
      archive,
      description,
    }

    console.log("data: ", data);
    setStartDate(convertTime(startDate));
    data.startDate = convertTime(startDate);
    
    setEndDate(convertTime(endDate));
    data.endDate = convertTime(endDate);

    console.log("data: ", data);

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projectlist", userId);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit} className = "component-card">
      <label htmlFor="floatingInputCustom">프로젝트명</label>
        <Form.Control
          type="text"
          placeholder="프로젝트명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      <label htmlFor="floadtingInputCustom">활동 기간</label>
      <br />
      <label htmlFor="floatingInputCustom">시작 날짜</label>
      <DatePicker
        showIcon
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택해 주세요"
        // selected={new Date(this.state.startDate)}
        selected={startDate}
        onChange={(startDate) => setStartDate(startDate)}
      />


      <label htmlFor="floatingInputCustom">완료 날짜</label>
      <DatePicker
        showIcon
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택해 주세요"
        // selected={new Date(this.state.startDate)}
        selected={endDate}
        onChange={(endDate) => setEndDate(endDate)}
      />


      <label htmlFor="floatingInputCustom">링크</label>
        <Form.Control
          type="text"
          placeholder="결과물 링크"
          value={archive}
          onChange={(e) => setArchive(e.target.value)}
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

export default ProjectAddForm;
