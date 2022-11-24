import React, { useState, useEffect } from 'react';
import Square from './Square'
import Mower from './Mower'


const Lawn = (props) =>  {
  const [lawn, setLawn] = useState(Array(parseInt(props.size)).fill(null))
  const [positions, setPositions]=useState([""])

  const updatePositions = pos => {
    var temp = positions;
    temp.push(pos);
    setPositions(pos) 
  }
  return (
    <div>
      
       
    <h3>Pelouse taille {props.size}</h3>
    
         
            <div className="game">
              { props.mowers && props.mowers.map((mower, index) => (
                <Mower key={"mower_"+index} update={updatePositions} name={"tondeuse_"+index} commands={mower.order} x={parseInt(mower.initial[0])} y={parseInt(mower.initial[0])} s={mower.initial[2]} size={props.size}/>
              ))}  
            </div>
          
            { lawn.map((s,i) => 
            <div key={"r"+i} className="board-row">
              {lawn.map((sq,index) => 
                <Square key={index} id={'sq'+i+''+index} />
              )}
            </div>
            )}
          
    </div>
  );
}
export default Lawn