import React, { useState, useEffect } from 'react';
import './App.css';
import Lawn from "./components/Lawn"
import Mower from "./components/Mower"

function App() {
  const [commands, setCommands] = useState()
  const [mowers, setMowers] = useState(null)
  const [size, setSize] = useState(0)

  useEffect(() => {     
    var s = String(commands).split(/\r?\n/)[0];
    if(parseInt(s)) {
      setSize(s)
    }

    //console.log(commands.indexOf(/\r?\n/))
     
  },[commands])


  function logcommands(e) {
    var fr=new FileReader();
      fr.onload=function(){
          document.getElementById('displaycommands')
                  .textContent=fr.result;
          
          setSize(String(fr.result).split(/\r?\n/)[0])
          var commands = String(fr.result).match(/[0-9]{2} [A-Z]\r?\n[A-Z]+/gmi)
          console.log(commands)

          let tempmowers =[]
          for(let command of commands) {
              console.log(command)
              var initial = String(command.split(/\n/)[0]).replace(/\s/g, "")
              var order = String(command.split(/\n/)[1])
              let item={};
              item.initial = [...initial]
              item.order = order
              tempmowers.push(item)
          }
          setMowers(tempmowers)
          console.log(tempmowers) 
      }
      
      fr.readAsText(...e.target.files);  
  }


  return (
    <div className="App">
      <div>
        <h1> Tondeuses BimBamJob </h1>
        <input id="commands" type="file" onChange={e=> { logcommands(e) }}/>
        <textarea id="displaycommands" rows="5" cols="30" value={commands}/>
      </div>
      <div className="game">
         <Lawn key={size} size={parseInt(size)} mowers={mowers} /> 
      </div>
    </div>
  );
}

export default App;
