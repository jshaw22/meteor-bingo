import React, {PropTypes } from 'react';

const UserinfoDetails = (props) => {
  const user = props.user;
  return (
    <div className="details-section">
      <span className="icon fa fa-id-card-o mr-2"/><div className="details-title">Profile Details <span onClick={props.editDetailsClick} className="edit-title">Edit</span></div>
      <div className="details-section-filled">
        <div className="details-block"><span className="fa fa-user-o" /><div className="details-element">{user.myGender}</div></div>
        <div className="details-block"><span className="fa fa-venus-mars" /><div className="details-element">Looking for: {user.matchGender}</div></div>
        <div className="details-block"><span className="fa fa-scissors"/><div className="details-element">Sterilized: {user.sterilized}</div></div>
        <div className="details-block"><span className="fa fa-globe"/><div className="details-element">Ethnicity: {user.ethnicity.join(', ')}</div></div>
        <div className="details-block"><span className="fa fa-building-o"/><div className="details-element">Religion: {user.religion}</div></div>
        <div className="details-block"><span className="fa fa-heart"/><div className="details-element">Relationship status: {user.relationshipStatus}</div></div>
        <div className="details-block"><span className="fa fa-balance-scale"/><div className="details-element">Body Type: {user.bodyType}</div></div>
        <div className="details-block"><span className="fa fa-level-up"/><div className="details-element">Height: {user.height}</div></div>
        <div className="details-block"><span className="fa fa-cutlery"/><div className="details-element">Diet: {user.diet}</div></div>
        <div className="details-block"><span className="fa fa-graduation-cap"/><div className="details-element">Education: {user.diet}</div></div>
        <div className="details-block"><span className="fa fa-flask"/><div className="details-element">Drugs: {user.drugs}</div></div>
        <div className="details-block"><span className="fa fa-glass"/><div className="details-element">Drinking: {user.drink}</div></div>
      </div>
    </div>
  );
}

export default UserinfoDetails;