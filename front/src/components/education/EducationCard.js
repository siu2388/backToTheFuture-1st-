import { Card, Modal, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
  const handleDelete = async () => {
    await Api.delete("educationId", education.id).then(() => {
      setEducations((prevEducations) =>
        prevEducations.filter(
          (prevEducation) => prevEducation.id !== education.id
        )
      );
    });
  };

  useEffect(() => {}, [education]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="component-card">
      <Card.Text>
        <Row className="align-items-center">
          <Col className="component-card-col-left">
            <span>{education?.schoolName}</span> <span>{education?.major}</span>{" "}
            <span>{education?.schoolType}</span>{" "}
            <span>{education?.status}</span>
            <br />
            <span className="text-muted">{education?.startDate}</span> ~{" "}
            <span className="text-muted">{education?.endDate}</span>
          </Col>
          {isEditable && (
            <Col xs lg="3.2" className="component-card-col-right">
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="btn-edit"
              >
                편집
              </button>
              <>
                <button onClick={handleShow} className="btn-delete">
                  삭제
                </button>

                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                  <Modal.Footer>
                    <button
                      variant="secondary"
                      onClick={handleClose}
                      className="btn-cancel"
                    >
                      취소
                    </button>
                    <button
                      variant="primary"
                      onClick={() => {
                        handleClose();
                        handleDelete();
                      }}
                      className="btn-confirm"
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
    </Container>
  );
}

export default EducationCard;
