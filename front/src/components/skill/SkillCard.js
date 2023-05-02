import { Card, Modal, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../../api";

function SkillCard({ skill, isEditable, setIsEditing, setSkills }) {
  const handleDelete = async () => {
    await Api.delete("skills", skill.id).then(() => {
      setSkills((prevSkills) =>
        prevSkills.filter((prevSkill) => prevSkill.id !== skill.id)
      );
    });
  };

  useEffect(() => {}, [skill]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{skill?.skillName}</span>
          <br />
          <span className="text-muted">{skill?.level}</span>
          <br />
          <span className="text-muted">{skill?.period}</span>
        </Col>

        {isEditable && (
          <Col xs lg="3" style = {{marginRight: "10px"}}>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="btn-edit"
            >
              편집
            </button>
            <>
              <button onClick={handleShow} className  = "btn-delete">
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
                    className="btn-confirm"
                    onClick={() => {
                      handleClose();
                      handleDelete();
                    }}
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

export default SkillCard;
