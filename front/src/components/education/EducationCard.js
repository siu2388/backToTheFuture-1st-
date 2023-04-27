import { Card, Button, Row, Col } from "react-bootstrap";

function EducationCard({ education, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.schoolName}</span>
          <span>{education.degree}</span>
          <span className="text-muted">{education.major}</span>
          <span className="text-muted2">{education.status}</span>
          <br />
          <span className="text-muted3">{education.startDate}</span> ~ <span className="text-muted4">{education.endDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="3" style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="me-1"
            >편집</Button>
            <Button 
            variant="outline-danger"
            size="sm"
            // 함수 기능 넣기 
            >삭제</Button>            
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;