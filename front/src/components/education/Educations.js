import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import Education from "./Education";
import EducationAddForm from "./EducationAddForm";
import * as Api from "../../api";

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ display: "inline-block", marginRight: "10px" }}>
          학력
        </Card.Title>
        {isEditable && (
          <button
            className="btn-add"
            style={{ display: "inline-block" }}
            onClick={() => setIsAdding(true)}
          >
            +
          </button>
        )}

        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setEducations}
            setIsAdding={setIsAdding}
          />
        )}
        {educations.map((education) => (
          <Education
            key={education.id}
            education={education}
            setEducations={setEducations}
            isEditable={isEditable}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Educations;
