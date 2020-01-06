import React, { Component } from 'react';
import './App.css';
import './pmd3.css';
import './mhclg.css';

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
      </header>
      <main>
        <div className="Columns">
          <div className="column">
            <a className="button maquette-styled theme-mhclg icon-button CartButton" href="/" onClick={this.fetch}>Test</a>
          </div>
        </div>
      </main>
      <div id="demo"></div>
      
    </div>
  );
}
}
export default App;
