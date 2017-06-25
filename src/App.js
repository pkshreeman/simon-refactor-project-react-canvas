import React, {
  Component
} from 'react';
import './App.css';


//The foundational Canvas HTML5 drawing command

function drawcircle(id, color) {
  var context = document.getElementById(id).getContext("2d");
  var x = 75;
  var y = 75;

  switch (id) {
    default:
      break;
    //Switch so that I do not have to rewrite entire drawing canvas for each color
    //Also it will incorporate the changing of the colors in a simple function
    case 'purple':
      x = -10;
      y = -10;
      break;

    case 'pink':
      x = 160;
      y = -10;
      break;

    case 'blue':
      x = -10;
      y = 160;
      break;

    case 'green':
      x = 160;
      y = 160;
      break;
  }
  context.clearRect(0,0,150,150);

  //https://stackoverflow.com/questions/11773811/redrawing-canvas-in-html5-using-javascript
  //I was hoping clearing React would solve the simuulateous lighting problems...It didn't.
  //SetInteval did...

  context.beginPath();
  context.arc(x, y, 115, 0 * Math.PI, 2 * Math.PI, true);
  context.strokeStyle = color;
  context.lineWidth = 85;
  context.stroke();  //Draw the magic....
}


//The HTML elements to implemented in DOM before the drawing can occur.
const Elems = (props) => {
  return (
<div>
    <div className="simonbox">
  <div className="simonbox2"><
    canvas id = "green"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    /><
    canvas id = "blue"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    /><br / ><
    canvas id = "pink"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    /><
    canvas id = "purple"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    /><
    button id = "switch"
    onClick = {
      props.clickon
    } > {
      props.power
    } < /button> <
    button id = "strict"
    onClick = {
      props.clickon
    } > {
      props.strict
    } < /button> <
    button id = "reset" class="button btn"
    onClick ={props.clickon} > Reset < /button> <
    span > {
      props.view
    } < /span>
    <p>
    Created with HTML5 Canvas and React.js
    <br/>
    by
    <br/>
    <a href="mailto:pkshreeman@gmail.com" >Dr. Paul Shreeman</a>
    </p>
    </div></div>
    </div>
  )
}

function createRandomSelection (current){
  let selected = [];
  for (let i = 0; i < 20; i++){

    //https://css-tricks.com/snippets/javascript/select-random-item-array/
    //let randomcolor = this.state.selector[Math.floor(Math.random()*this.state.selector.length)];
    //console.log(randomcolor);
    //this.setState({matchMe:[...this.state.matchMe, randomcolor]});
    //Exploring different options of selecting random colors.


    let selector = ['green',"blue",'purple',"pink"];
    selected.push(selector[Math.floor(Math.random()*selector.length)]);
  }
  current.setState({matchMe: selected}, function(){demoMatch(current.state)});
}


function drawCirclesOn(current) {
  drawcircle("pink", current.pink);
  drawcircle("blue", current.blue);
  drawcircle("green", current.green);
  drawcircle("purple", current.purple);
}

//Start of logic for Simon
function theLogic(current) {  // current = 'this'
  //console.log("the Logic function is triggered.")
  //console.log('the userInput should have at least one result: '+ current.state.userInput)
  let cycle = current.state.userInput.length;
  let level = current.state.level;
  // Checking if the input matches...
  //else if (cycle === level){
    for (var i = 0; i < cycle; i++) {
      //if you entered a wrong entry....
      console.log('the logic checking loop is activated: ' + i )
      if (current.state.userInput[i] !== current.state.matchMe[i]) {
        console.log("the logic loop is at " + i + ' with no match triggered');
        console.log('the input value was ' + current.state.userInput[i]);
        console.log('the matchMe value was '+ current.state.matchMe[i]);
        if (current.state.strict ==='STRICT') {  //in Strict Mode
          alert("You idiot! Start over!");
          document.getElementById('reset').click()
          return;
        }
        else{   //if not strict, then what?
          alert("Wrong. Please try again.");
          current.setState({userInput: []},()=>{demoMatch(current.state)});

        }
      }
      //All Entries are correct then...
    } //End of for loop of matching inputs
      if (cycle === level){
        console.log("Next Level")
        if (cycle ===20){ //Requirement for FreeCodeCamp to have a 'end' at 20.
          alert("Congratulations! You have won!");
          document.getElementById('switch').click();
        }
    current.setState({userInput: [], level: current.state.level + 1},()=>{demoMatch(current.state)});
    return;
  }
  //else{ alert('Error: The userInput exceeded the level')}
}
//End of Logic for Simon

//Setting up sequence of light function seperately
function demoLight(current,i){
setTimeout(() => drawcircle(current.matchMe[i],current.matchMe[i]), 500);
setTimeout(()=> {console.log('timeout .5 sec' )}, 500);
setTimeout(() => drawcircle(current.matchMe[i], current[current.matchMe[i]]), 800);
setTimeout(()=> {'timeout part 2 0.5 sec'}, 500);
}
//demo function
function demoMatch(current){ //enter this.state as current
  console.log('demo on the level of '+ current.level)
  //for( let i = 0 ; i < current.level; i++){
  let i = 0;
    let intervalHandler = setInterval( function() {
      //https://stackoverflow.com/questions/21465280/how-to-control-for-loop-exection-in-javascript-what-should-this-javascript-code
        demoLight(current,i)
        if( i === current.level - 1 ) {
             clearInterval( intervalHandler );
             return;
        }
        i++;
    }, 1000 );
}

// Start of React Component
class CreateCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      'audio': [
        "",
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
      ],
      'demo':false,
      'userInput': [],
      'matchMe': [],
      "green" : 'green',
      "blue" : 'blue',
      "purple": 'purple',
      "pink": "pink",
      'switch': 'OFF',
      'strict': 'NotStrict',
      'level' : 0,
    }
  }

  //Captures all the clicking activities within the React Component
  handleClick(event) {
      let clickedId = event.target.id;

      if (clickedId === 'switch') {
        if (this.state.switch === "OFF") {
          this.setState({
            "switch": 'ON',
            'purple': '#d5aee2',
            'green': '#60ff70',
            'blue': '#6dd0ff',
            'pink': '#ffeaf6',
            'level': 1,
          },
          createRandomSelection(this))

        } else {
        //  https: //stackoverflow.com/questions/6367339/trigger-a-button-click-from-a-non-button-element
            document.getElementById('reset').click();
            this.setState({
              "switch": 'OFF',
              "green": 'green',
              "blue": 'blue',
              "purple": 'purple',
              "pink": "pink",
            });
        };
      }

      //console.log("The clicked element's id is " + clickedId);


      if (clickedId === 'green' || clickedId === 'blue' || clickedId === 'pink' || clickedId === 'purple') {
        //console.log("Only green, blue, pink, purple should trigger this");
        if (this.state.switch === 'ON') {
          setTimeout(() => {drawcircle(clickedId, clickedId)}, 50);
          setTimeout(() => {drawcircle(clickedId, this.state[clickedId])}, 300);
          //https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
          setTimeout(()=> {
            this.setState({
            userInput: [...this.state.userInput, clickedId]
          }, ()=>{theLogic(this)})
        },350)
        }
      }


if (clickedId === 'strict') {
  if (this.state.switch === 'ON') {
  if (this.state.strict === "STRICT") {
    this.setState({
      "strict": 'NotStrict',
    })
  } else {
    this.setState({
      "strict": 'STRICT'
    })
  };
}}

else if (clickedId ==='reset'){
  if (this.state.switch === 'ON') {
  this.setState({
    "strict": 'NotStrict',
    "matchMe": [],
    "userInput": [],
    "level":1,
  })
  createRandomSelection(this)
}
}
  }

  render() {
    return ( <
      Elems
      strict = {this.state.strict}
      power = {this.state.switch}
      clickon = {this.handleClick}
      view={this.state.level}
      />
    );
  }

  componentDidMount() {
    drawCirclesOn(this.state);
  }

componentDidUpdate(){
  drawCirclesOn(this.state);

}
}


export default CreateCanvas
