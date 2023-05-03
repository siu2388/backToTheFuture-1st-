import { Card, Row, Col, Modal } from "react-bootstrap";
import {useState, useEffect} from 'react';
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  const handleDelete = async () => {
    await Api.delete("projectId", project.id).then(() => {
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
          <span>{project?.title}</span>
          <br />
          <span>{project?.startDate}</span>
          <br />
          <span>{project?.endDate}</span>
          <br />
          <span>{project?.archive}</span>
          <br />
          <span>{project?.description}</span>
        </Col>
        {isEditable && (
          <Col xs lg="3" style={{ display: "flex", alignItems: "center" }}>
            <button
              variant="outline-info"
              onClick={() => setIsEditing((prev) => !prev)}
              className="btn-edit"
            >
              편집
            </button>

            <>
              <button variant="outline-danger" onClick = {handleShow} className="btn-delete">             
                삭제
              </button>

              <Modal show={show} onHide={handleClose} animation = {false}>
                <Modal.Header closebutton>
                  <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                <Modal.Footer>
                  <button variant="secondary" onClick={handleClose} className="btn-cancel"> 
                    취소
                  </button>
                  <button
                    variant="primary"
                    onClick = {() => {
                      handleClose();
                      handleDelete();
                    }}
                    className = "btn-confirm"
                  >
                    확인
                  </button>
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
