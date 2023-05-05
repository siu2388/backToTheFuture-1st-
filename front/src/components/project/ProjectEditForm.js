import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import convertTime from "../ConvertTime";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [startDate, setStartDate] = useState(
    new Date(currentProject.startDate)
  );
  const [endDate, setEndDate] = useState(new Date(currentProject.endDate));
  const [archive, setArchive] = useState(currentProject.archive);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //에러처리
    if (!title) {
      alert("프로젝트명을 입력해 주세요.");
      return;
    }

    if (!startDate) {
      alert("활동 시작 날짜를 입력해 주세요.");
      return;
    }

    if (!endDate) {
      alert(
        "활동 종료 날짜를 입력해 주세요. 진행 중이라면 오늘 날짜를 입력해 주세요."
      );
      return;
    }

    if (!description) {
      alert("프로젝트 설명을 작성해 주세요.");
      return;
    }

    const isValidDate = startDate < endDate;

    if (!isValidDate) {
      alert("시작 날짜가 종료 날짜와 같거나 종료 날짜보다 늦을 수 없습니다.");
      return;
    }

    const userId = currentProject.userId;
    await Api.put(`projectId/${currentProject.id}`, {
      userId,
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
    };

   
    setStartDate(convertTime(startDate));
    data.startDate = convertTime(startDate);

    setEndDate(convertTime(endDate));
    data.endDate = convertTime(endDate);



    const res = await Api.get("projectlist", userId);
    setProjects(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
      <label htmlFor="floatingInputCustom">프로젝트명</label>
      <Form.Control
        type="text"
        placeholder="프로젝트명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="floatingInputCustom">시작 날짜</label>
      <DatePicker
        showIcon
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택해 주세요"
        selected={startDate}
        onChange={(startDate) => setStartDate(startDate)}
      />

      <label htmlFor="floatingInputCustom">완료 날짜</label>
      <DatePicker
        showIcon
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택해 주세요"
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button type="submit" className="btn-confirm">
            확인
          </button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
