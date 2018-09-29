import React from "react";
import "./Results.css";

const Results = props => {
  const date = props.date && props.date.slice(0, 10);
  return (
    <div className="col-md-4 cards">
      <div>
        <div className="card-box">
          <div className="card-title">
            <h2 href={props.url} id={props._id}>
              {props.title}
            </h2>
            <p>{date}</p>
          </div>
          <div className="card-link">
          <button className="btn btn-warning" onClick={event => props.handleSaveButton(event, props._id)}> Save Article</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
