import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

function drawcircle(id, color) {
  var context = document.getElementById(id).getContext("2d");
  var x = 75;
  var y = 75;

  switch (id) {
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
  context.beginPath();
  context.arc(x, y, 115, 0 * Math.PI, 2 * Math.PI, true);
  context.strokeStyle = color;
  context.lineWidth = 85;
  context.stroke();
}

const Elems = (props) => {
  return ( <div ><
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
    button id = "reset"
    onClick ={props.clickon} > Reset < /button> <
    span > {
      props.view
    } < /span> <
    /div>
  )
}
function createRandomSelection (current){
  let selected = [];
  for (let i = 0; i < 20; i++){
    //https://css-tricks.com/snippets/javascript/select-random-item-array/
    //let randomcolor = this.state.selector[Math.floor(Math.random()*this.state.selector.length)];
    //console.log(randomcolor);
    //this.setState({matchMe:[...this.state.matchMe, randomcolor]});
    let selector = ['green',"blue",'purple',"pink"];

    selected.push(selector[Math.floor(Math.random()*selector.length)]);
    console.log("selected")
  //  return selected;

  }
  current.setState({matchMe: selected});
}


function drawCirclesOn(current) {
  drawcircle("pink", current.pink);
  drawcircle("blue", current.blue);
  drawcircle("green", current.green);
  drawcircle("purple", current.purple);
}
//Start of logic for Simon
function theLogic(current){
  console.log("theLogic function is triggered.")
  // 20 times the game is over //
  if (current.userInput.length == 20){
    alert("Congratulations! You have won!");
    document.getElementById('switch').click();
  }
  else{
    console.log("This is current userInput: " + current.userInput);
    console.log("This is matchMe array: " + current.matchMe);
    console.log("The Length of userInput is "+ current.userInput.length)

    for(let i = 0; i < current.userInput.length; i++){
      if (current.userInput[i] != current.matchMe[i]){
      console.log("the loop is at " + i);
      alert("You idiot!");
      if(current.strict == 'STRICT'){
      document.getElementById('reset').click()}
      }
    }
  }
  // If strict, reset

  //can you return a 'setState'?
}
//End of Logic for Simon
class CreateCanvas extends React.Component {
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
      'strict': 'NotStrict'
    }
  }

  //Captures all the clicking activities within the React Component
  handleClick(event) {
    let clickedId = event.target.id;

    //console.log("The clicked element's id is " + clickedId);


    if (clickedId === 'green' || clickedId === 'blue' || clickedId === 'pink' || clickedId === 'purple') {
      //console.log("Only green, blue, pink, purple should trigger this");
      if(this.state.switch == 'ON'){
      setTimeout(() => drawcircle(clickedId, clickedId), 50);
      setTimeout(() => drawcircle(clickedId, this.state[clickedId]), 300);
      //https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
      this.setState({userInput:[...this.state.userInput, clickedId]});
      //console.log(this.state.userInput)
    }
  }


    else if (clickedId == 'switch') {
    if (this.state.switch === "OFF") {
      this.setState({
        "switch": 'ON',
        'purple': '#d5aee2',
        'green': '#60ff70',
        'blue': '#6dd0ff',
        'pink': '#ffeaf6',
      })
      createRandomSelection(this);

    } else {
      this.setState({
        "switch": 'OFF',
        "green" : 'green',
        "blue" : 'blue',
        "purple": 'purple',
        "pink": "pink",
      })
      https://stackoverflow.com/questions/6367339/trigger-a-button-click-from-a-non-button-element
      document.getElementById('reset').click();
      };
  }

  else if (clickedId == 'strict') {
  if (this.state.strict == "STRICT") {
    this.setState({
      "strict": 'NotStrict',
    })
  } else {
    this.setState({
      "strict": 'STRICT'
    })
  };
}

else if (clickedId =='reset'){
  this.setState({
    "strict": 'NotStrict',
    "matchMe": [],
    "userInput": []
  })
}
  }

  render() {
    return ( <
      Elems
      strict = {this.state.strict}
      power = {this.state.switch}
      clickon = {this.handleClick}
      view={this.state.matchMe.length}
      />
    );
  }

  componentDidMount() {
    drawCirclesOn(this.state);
  }

componentDidUpdate(){
  drawCirclesOn(this.state);
  theLogic(this.state);
}
}


export default CreateCanvas
