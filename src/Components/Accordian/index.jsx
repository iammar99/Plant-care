import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import awais from '../../Assets/awais.jpg'; // Import photo for Ammar
import ammar from '../../Assets/ammar.jpg'; // Import photo for Awais Mehboob
import wahab from '../../Assets/wahab.jpg'; // Import photo for Abdul Wahab
import '../../SCSS/Components/_accordian.scss';
export default function TeamAccordion() {
  const teamMembers = [
    {
      name: "Ammar",
      role: "AI Specialist",
      description:
        "Ammar specializes in Ai Integration and leads the team with cutting-edge technology.",
      photo: ammar, // Use the imported image
    },
    {
      name: "Sheikh Awais",
      role: "Frontend Developer",
      description:
        "Sheikh works as a Frontend Developer, ensuring PlantCare AI delivers a seamless user experience.",
      photo: awais, // Use the imported image
    },
    {
      name: "Abdul Wahab",
      role: "UI/UX Designer and Developer",
      description:
        "Abdul Wahab focuses on creating intuitive and beautiful designs for PlantCare AI.",
      photo: wahab, // Use the imported image
    },
  ];
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Meet Our Team</h1>
      <div className="accordion" id="teamAccordion">
        {teamMembers.map((member, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={member.photo}
                    alt={`${member.name} photo`}
                    className="img-thumbnail rounded-circle me-3"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div>
                    <h5>{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#teamAccordion"
            >
              <div className="accordion-body">{member.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
