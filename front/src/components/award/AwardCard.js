import { Card, Button, Row, Col } from "react-bootstrap";

function AwardCard({ award, isEditable, setIsEditing }) {
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
          <Col xs lg="1">
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
