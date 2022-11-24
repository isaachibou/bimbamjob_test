import React, { useState, useEffect } from 'react';

interface FullName {
	name: string;
    x: int;
    y: int;
    s: char;
    size: int;
    commands: string;
}

const Mower = (props:FullName) =>  {
 const [position, setPosition] = useState([props.x, props.y, props.s]);

  const directions = ["N","E","S","W"];

  useEffect(() => {
    readCommands(props.commands)
  }, []);	

  function changeOrientation(offset, direction) {
  	var length = directions.length
  	var newindex = directions.findIndex(e => e == direction)+offset

  	// control direction array edges
  	if(newindex == -1) { newindex = length-1}
  	if(newindex == length) { newindex = 0 }

  	return directions[newindex]

  }

  function moveForward(pos) {
   
  	var [x,y,s] = pos;

  	// Control Lawn edges from 0 to max size on each coordinates
  	if( !(x!== props.size-1 && x !== 0 &&  y ==! 0 && y !== props.size-1)) {
	  	// Work each case
	  	switch(s) {
		  	case "S": // Down
		  		y=y-1;
		  	break;
		  	case "E": // Right
		  		x+=1;
		  	break;
		  	case "N": // Up
		  		y+=1;
		  	break;
		  	case "W": // Left
		  		x-=1;
		  	break;

	  		default:
	  	}
	}

  	return [x,y]
  	 
  }


  function display(x,y,s) {
  	setTimeout(() => {
  		let id = '#sq'+x+''+y
  		var sq=document.querySelector(String(id))
  		sq.style.backgroundColor = 'rgb(255, 125, 115)';
  		sq.textContent="^"
  		// apply css class for rotation
  		sq.className=s+" square"
  		
  	}, 1000)
 }

  function readCommands(commands) {
  	var pos = [...position]
  	for(let command of commands) {

   		// Change orientation command 
  		switch(command) {
  			case "R": 
  				pos[2] = changeOrientation(1,pos[2]);
  				setPosition([...pos])
  			break;
  			case "L":
  				pos[2] = changeOrientation(-1, pos[2]);
  				setPosition([...pos])
  			break;
	  		case "F":
	  			[pos[0], pos[1]] = moveForward(pos);
	  		break;
  			default:
  		}

  	}
  	setPosition((old) => old.map((el,i) => old[i] = pos[i]))
  	props.update(pos)
  	display(pos[0],pos[1],pos[2])
  }

  return (
  	<div className="mower">
  		<span>{props.name} </span><br/>
    	<span >{position[0]} {position[1]} {position[2]} </span>
    </div>
  );
}

export default Mower