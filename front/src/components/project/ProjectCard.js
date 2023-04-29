import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import {useState, useEffect } from 'react';
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  const handleDelete = async () => {
    await Api.delete("projects", project.id).then(() => {
      setProjects((prevProjects) =>
        prevProjects.filter((prevProject) => prevProject.id !== project.id)
      );
    });
  };

  useEffect(() => {}, [project]);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.startDate}</span>
          <br />
          <span className="text-muted">{project.endDate}</span>
          <br />
          <span className="text-muted">{project.archive}</span>
          <br />
          <span className="text-muted">{project.description}</span>
        </Col>
        {isEditable && (
          <Col xs lg="3" style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="me-1"
            >
              편집
            </Button>

            <>
              <Button variant="outline-danger" onClick={handleShow} size="sm">
                삭제
              </Button>

              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    취소
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClose();
                      handleDelete();
                    }}
                  >
                    변경 내용 저장
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
