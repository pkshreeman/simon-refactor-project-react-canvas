import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

const data = {
  'audio': [
    "",
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  ],
  'switch': false,
  'strict': false,
  'userInput': [],
  'matchMe': [],
  'purple': '#d5aee2',
  'green': '#60ff70',
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
  return ( <div >
    <
    canvas id = "green"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    />
     <
    canvas id = "blue"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    /> <
    br / >
    <
    canvas id = "pink"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    /> <
    canvas id = "purple"
    width = "150"
    height = "150"
    onClick = {
      props.clickon
    }
    />

    <
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
    onClick = "" > Reset < /button> <
    span > {
      props.view
    } < /span> <
    /div>
  )
}

function drawCirclesOn(current) {
  drawcircle("pink", current.pink);
  drawcircle("blue", current.blue);
  drawcircle("green", current.green);
  drawcircle("purple", current.purple);
}

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
      'userInput': [],
      'matchMe': [],
      'purple': '#d5aee2',
      'green': '#60ff70',
      'blue': '#6dd0ff',
      'pink': '#f76ccd',
      'switch': 'OFF',
      'strict': 'NotStrict'
    }
  }



  handleClick(event) {
    let clickedId = event.target.id;

    console.log("The clicked element's id is " + clickedId);

    if (clickedId === 'green' || clickedId === 'blue' || clickedId === 'pink' || clickedId === 'purple') {
      //console.log("Only green, blue, pink, purple should trigger this");
      setTimeout(() => drawcircle(clickedId, clickedId), 100);
      setTimeout(() => drawcircle(clickedId, data[clickedId]), 200);
      data.userInput.push(clickedId);
    }

    else if (clickedId == 'switch') {
    if (this.state.switch === "OFF") {
      this.setState({
        "switch": 'ON',
        "green" : 'green',
        "blue" : 'blue',
        "purple": 'purple',
        "pink": "pink",
      })
      //I have to initate this draw function.
      //I expected React to automatically do that upon state changes?
      drawCirclesOn(this.state);
    } else {
      this.setState({
        "switch": 'OFF',
        'purple': '#d5aee2',
        'green': '#60ff70',
        'blue': '#6dd0ff',
        'pink': '#f76ccd',
      })
      //I have to initate this draw function.
      //I expected React to automatically do that upon state changes?
      drawCirclesOn(this.state);
    };
  }

  else if (clickedId == 'strict') {
  if (this.state.strict == "STRICT") {
    this.setState({
      "strict": 'NotStrict',
      "green": 'black',
    })
  } else {
    this.setState({
      "strict": 'STRICT'
    })
  };
}
  }

  render() {
    return ( <
      Elems
      strict = {this.state.strict}
      power = {this.state.switch}
      clickon = {this.handleClick}
      />
    );
  }

  componentDidMount() {
    drawCirclesOn(this.state);
  }

}

export default CreateCanvas
