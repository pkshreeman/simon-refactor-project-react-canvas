import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const data = {
 'audio1' : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
 'audio2' : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
 'audio3' : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
 'audio4' : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  'switch': false,
  'strict': false,
  'userInput': [],
  'matchMe':[],
  'purple': '#d5aee2',
  'green':'#60ff70',
  'blue': '#6dd0ff',
  'pink': '#f76ccd',
}
// The plan is to use this json data to set states, so that
//if I change any values in this, the React.js will automatically
//update the DOM.  For example, setting up the colors within the canvas
//hopefully will trigger every time I switch the color, instead of manually
//drawing the canvas.


function drawcircle(id, color) {
  var context = document.getElementById(id).getContext("2d");
  var x = 75;
  var y = 75;

  switch (id) {
    case 'purple':
      x = 0;
      y = 0;
      break;

    case 'pink':
      x = 150;
      y = 0;
      break;

    case 'blue':
      x = 0;
      y = 150;
      break;

    case 'green':
      x = 150;
      y = 150;
      break;
  }
  context.beginPath();
  context.arc(x, y, 115, 0 * Math.PI, 2 * Math.PI, true);
  context.strokeStyle = color;
  context.lineWidth = 85;
  context.stroke();
}

function drawCircles() {
  drawcircle("pink", "pink");
  drawcircle("blue", "blue");
  drawcircle("green", "green");
  drawcircle("purple", "purple");
}

const Elems = (props) => {
  return(
<div>
<canvas id="green"  width="150" height="150" onClick={props.clickon} />
<canvas id="blue"   width="150" height="150" onClick={props.clickon} />
<br />
<canvas id="pink"   width="150" height="150" onClick={props.clickon} />
<canvas id="purple" width="150" height="150" onClick={props.clickon} />

<button id="switch" onClick={drawCirclesOn}> {props.power}</button>
<button id="strict" onClick={strictSwitch}> {props.strict}</button>
<button id="reset" onClick=""> Reset </button>
<span> {props.view} </span>
</div>
)}

function drawCirclesOn() {
  drawcircle("pink", data.pink);
  drawcircle("blue", data.blue);
  drawcircle("green", data.green);
  drawcircle("purple", data.purple);
}

function strictSwitch(){
  if (data.switch) {data.switch = false}
  else{data.switch = true};
  console.log(data.switch);
}

class CreateCanvas extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    let clickedId = event.target.id;
    console.log(clickedId);
    setTimeout(() => drawcircle(clickedId, clickedId), 100);
    setTimeout(()=> drawcircle(clickedId, data[clickedId]), 200);
    data.userInput.push(clickedId);
  }

  render() {
    return (
      <Elems strict="NotStrict" power="OFF" clickon={this.handleClick} />
    );
  }

  componentDidMount() {
    drawCircles();
  }

}

export default CreateCanvas
