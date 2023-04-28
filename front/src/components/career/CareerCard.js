import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";


function CareerCard({ career, isEditable, setIsEditing, setCareers }) {
  const handleDelete = async () => {
    await Api.delete("careers", career.id).then(() => {
      setCareers((prevCareers) =>
        prevCareers.filter((career) => career.id !== career.id)
      );
    });
  };

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{career.company}</span>
          <br />
          <span className="text-muted">{career.department}</span>
          <br />
          <span className="text-muted">{career.position}</span>
          <br />
          <span className="text-muted">{career.description}</span>
          <br />
          <span className="text-muted">{career.startDate}</span>
          <br />
          <span className="text-muted">{career.endDate}</span>
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

export default CareerCard;
