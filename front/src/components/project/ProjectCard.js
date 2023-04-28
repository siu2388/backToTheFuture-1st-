import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.startDate}</span>
          <br />
          <span className="text-muted">{project.endDate}</span>
          <br />
          <span className="text-muted">{project.archive}</span>
          <br />
          <span className="text-muted">{project.description}</span>
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

export default ProjectCard;
