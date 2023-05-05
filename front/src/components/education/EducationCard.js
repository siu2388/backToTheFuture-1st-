import { Card, Modal, Container } from "react-bootstrap";
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
        <div className="align-items-center">
          <div className="component-card-col-left">
            <span>{education?.schoolName}</span>{" "}
            <span className="text-muted">{education?.major}</span>{" "}
            <span className="text-muted">{education?.schoolType}</span>{" "}
            <span className="text-muted">{education?.status}</span>
            <br />
            <span className="text-muted">
              {education?.startDate} ~ {education?.endDate}
            </span>
            <br />
          </div>
          {isEditable && (
            <div className="component-card-col-right">
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
                    <button onClick={handleClose} className="btn-cancel">
                      취소
                    </button>
                    <button
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
            </div>
          )}
        </div>
      </Card.Text>
    </Container>
  );
}

export default EducationCard;
