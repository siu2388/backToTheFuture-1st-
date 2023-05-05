import React, { useState } from "react";
import CareerCard from "./CareerCard";
import CareerEditForm from "./CareerEditForm";

function Career({ career, setCareers, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CareerEditForm
          currentCareer={career}
          setCareers={setCareers}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CareerCard
          career={career}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCareers={setCareers}
        />
      )}
    </>
  );
}

export default Career;
