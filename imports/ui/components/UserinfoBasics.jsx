import React from 'react';
 
const UserinfoBasics = ({username, profileBasics}) => {
  return (
    <div className="userinfo-basics">
    	<div className="userinfo-basics-username">{username}</div>
    	<div className="userinfo-basics-asl">
    		<span className="userinfo-basics-asl-age">{profileBasics.age}</span>
    		<span className="userinfo-basics-asl-spacer">•</span>
    		<span className="userinfo-basics-asl-location">{profileBasics.location}</span>
    	</div>
    </div>
  );
}

export default UserinfoBasics;