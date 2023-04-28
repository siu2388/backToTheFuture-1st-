import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api"


function AwardCard({ award, isEditable, setIsEditing, setAwards }) {
  const handleDelete = async () => {
    await Api.delete("awards", award.id).then(() => {
      setAwards((prevAwards) => 
      prevAwards.filter((award) => award.id !== award.id)
      );
    });
  }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.grade}</span>
          <br />
          <span className="text-muted">{award.date}</span>
          <br />
          <span className="text-muted">{award.description}</span>
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
            <Button
              variant="outline-danger"
              size="sm"
              // 함수 기능 넣기
              onClick = {() => {
                handleDelete();
                alert("삭제합니다");
              }}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
