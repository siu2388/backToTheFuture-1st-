import { Card, Container, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../../api";

function CareerCard({ career, isEditable, setIsEditing, setCareers }) {
  const handleDelete = async () => {
    await Api.delete("careerId", career.id).then(() => {
      setCareers((prevCareers) =>
        prevCareers.filter((prevCareer) => prevCareer.id !== career.id)
      );
    });
  };

  useEffect(() => {}, [career]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="component-card">
      <Card.Text>
        <div>
          <div className="component-card-col-left">
            <span>{career?.company}</span>
            <br />
            <span className="text-muted">{career?.department}</span>
            <br />
            <span className="text-muted">{career?.position}</span>
            <br />
            <span className="text-muted">
              {career?.startDate} ~ {career?.endDate}
            </span>
            <br />
            <span className="text-muted">{career?.description}</span>
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

export default CareerCard;
