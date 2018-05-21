import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TRANSITIONS_DURATION = 300; //ms
const STARTING_POSITION = 240; //px

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1,
      boxes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      style: {
        translateX: -240,
        transition: 'all 0.3s ease-in-out'
      }
    };
    this.changeSlide = this.changeSlide.bind(this);
  }

  changeSlide(event) {
    const isLeft = event.currentTarget.getAttribute('arrow') === "LEFT";
    const isRight = event.currentTarget.getAttribute('arrow') === "RIGHT";
    if (isLeft) {
      this.setState(() => ({ style: { translateX: this.state.style.translateX + STARTING_POSITION, transition: `all ${TRANSITIONS_DURATION}ms ease-in-out` } }), () => {
        setTimeout(() => {
          this.setState((prevState) => {
            const boxes = [...prevState.boxes];
            const last = boxes.slice(boxes.length - 4);
            return {
              style: { translateX: this.state.style.translateX - STARTING_POSITION, transition: 'none' },
              boxes: [...last, ...boxes.slice(0, boxes.length - 4)]
            };
          });
        }, TRANSITIONS_DURATION);
      });
    }
    if (isRight) {
      this.setState(() => ({ style: { translateX: this.state.style.translateX - STARTING_POSITION, transition: `all ${TRANSITIONS_DURATION}ms ease-in-out` } }), () => {
        setTimeout(() => {
          this.setState((prevState) => {
            const boxes = [...prevState.boxes];
            const first = boxes.slice(0, 4);
            return { 
              style: { translateX: this.state.style.translateX + STARTING_POSITION, transition: 'none' },
              boxes: [...boxes.slice(4), ...first] 
            };
          });        
        }, TRANSITIONS_DURATION);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="wrapper">
          <span arrow="LEFT" className="controller" onClick={this.changeSlide}>LEFT</span>
          <div className="carousel" style={{ transform: `translateX(${this.state.style.translateX}px)`, transition: this.state.style.transition }}>
            {this.state.boxes.map((box) => {
              return <div key={box} className='box'>{box}</div>
            })}
          </div>
          <span arrow="RIGHT" className="controller" onClick={this.changeSlide}>RIGHT</span>
        </div>
      </div>
    );
  }
}

export default App;
