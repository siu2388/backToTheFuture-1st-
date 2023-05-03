import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import Education from './Education';
import EducationAddForm from './EducationAddForm';
import * as Api from "../../api";

function Educations({ portfolioOwnerId, isEditable }) {
  //useState로 Educations 상태를 생성함.
  const [educations, setEducations] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "Educationlist/유저id"로 GET 요청하고, response의 data로 Educations를 세팅함.
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title style = {{display: "inline-block", marginRight: "10px"}}>학력</Card.Title>
        {isEditable && (
            <button className = "btn-add" style = {{ display: "inline-block" }} onClick={() => setIsAdding(true)}>+</button>
        )}
        {educations.map((education) => (
          <Education
            key={education.id}
            education={education}
            setEducations={setEducations}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setEducations}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Educations;
