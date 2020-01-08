import React, { Component } from 'react';
import './App.css';
// import './pmd2.css';
import './pmd3.css';
import './mhclg.css';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {date: '',longitude: '',latitude: '',time: '7:30' };  
  this.handleTimeChange = this.handleTimeChange.bind(this);
  this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
  this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
  this.handleTimeChange = this.handleTimeChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.success = this.success.bind(this);
  this.sendNewTime = this.sendNewTime.bind(this);
}

componentDidMount() {
  this.getLocation()
  this.getDate()
}

handleDateChange(event) {
  this.setState({date: event.target.value});
}

handleLongitudeChange(event) {
  this.setState({longitude: event.target.value});
}

handleLatitudeChange(event) {
  this.setState({latitude: event.target.value});
}

handleTimeChange(event) {
  this.setState({time: event.target.value});
}

handleSubmit(event) {
  event.preventDefault();
  this.sendNewTime()
}

getDate() {
 this.setState({date: new Date()});
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
  this.setState({latitude: crd.latitude});
  this.setState({longitude: crd.longitude});
}

fetchTimes () {
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

sendNewTime () {
  fetch("http://127.0.0.1:4000/times/add?date=" + this.state.date + "&longitude=" + this.state.longitude + "&latitude=" + this.state.latitude + "&time=" + this.state.time, {
    mode: 'cors',
})
  .then(data => {
    console.log(data)
  })
}

render () {

  return (
    <div className="App">
      <main>
      <header className="Masthead">
          <div className="logoMHCLG Logo">
            <a href="/">
              <h2>Time tracker</h2>
            </a>
          </div>
            <label className="menu-icon"><span className="navicon"></span></label>
              <ul className="Menu">
                <li><a href="#submit" id="submit_tab">Submit</a></li>
                <li><a href="#time" id="time_tab">Time</a></li>
                <li><a href="#locations" id="locations_tab">Locations</a></li>
              </ul>
      </header>
        <div className="Columns page-width space-below">
          <div id="#submit" className="Column">
          <form onSubmit={this.handleSubmit}>
              <label>
                Date:
                <input type="text" defaultValue={this.state.date} onChange={this.handleDateChange} />
              </label><br />
              <label>
                Latitude:
                <input type="text" defaultValue={this.state.latitude} onChange={this.handleLatitudeChange} />
              </label><br />
              <label>
                Longitude:
                <input type="text" defaultValue={this.state.longitude} onChange={this.handleLongitudeChange} />
              </label><br />
              <label>
                Time worked:
                <input type="text" defaultValue={this.state.time} onChange={this.handleTimeChange} />
              </label><br />
            <input type="submit" value="Submit" />
          </form>
          </div>
          <div className="Column">
          </div>
        </div>
      </main>
      <div id="demo"></div>
      
    </div>
  );
}
}
export default App;
