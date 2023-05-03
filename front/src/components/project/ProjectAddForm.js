import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";  //project를 위한 api 쓰기

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

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projectlist", userId);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="floatingInputCustom">프로젝트명</label>
        <Form.Control
          type="text"
          placeholder="프로젝트명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />



      <label htmlFor="floatingInputCustom">시작 년월</label>
        <Form.Control
          type="text"
          placeholder="예: 2020-02"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />


      <label htmlFor="floatingInputCustom">완료 년월</label>
        <Form.Control
          type="text"
          placeholder="예: 2022-02"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
