import { Card,  Modal, Button, Row, Col } from "react-bootstrap";
import {useState} from 'react';
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
  const handleDelete = async () => {
    await Api.delete("educations", education.id).then(() => {
      setEducations((prevEducations) =>
        prevEducations.filter((education) => education.id !== education.id)
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
          <span>{education.schoolName}</span>{' '}
          <span>{education.major}</span>{' '}
          <span>{education.schoolType}</span>{' '}
          <span>{education.status}</span>
          <br />
          <span className="text-muted">{education.startDate}</span> ~ <span className="text-muted4">{education.endDate}</span>
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
              <Button variant="outline-danger" onClick={handleShow} size = "sm" >
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
                    확인
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

export default EducationCard;