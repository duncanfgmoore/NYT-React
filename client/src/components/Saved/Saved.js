import React from "react";
import "./Saved.css"

const Saved = props => {
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
            <button className="btn btn-danger" onClick={event => props.handleDeleteButton(event, props._id)}> Delete Article</button>
          </div>
        </div>
      </div>
    </div>
  );
  };

export default Saved;