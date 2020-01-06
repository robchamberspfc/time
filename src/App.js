import React, { Component } from 'react';
import './App.css';

class App extends Component {

componentDidMount() {
  this.getLocation()
  this.getDate()
}

getDate() {
 console.log (new Date())
}

getLocation() {
  if (navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(this.success))
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

success(position) {
  let crd = position.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}



  fetch () {
    console.log("here")
    fetch("http://127.0.0.1:4000/times", {
      mode: 'cors',
  })
    .then(data => {
      console.log(data)
      return data.json()})
    .then(json => {
      console.log(json)
    })
  
  }

render () {

  return (
    <div className="App">
      <header className="test">
        <button onClick={this.fetch}>Test</button>
        <div id="demo"></div>
      </header>
    </div>
  );
}
}
export default App;
