import React, { Component } from 'react';
import swal from 'sweetalert';
import mapboxgl from 'mapbox-gl';
import './App.css';
import './pmd3.css';
import './mhclg.css';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {date: '',longitude: '',latitude: '',time: '7:30',lng: -2.588855,lat: 51.432877,zoom: 10,lunch: "0:30", timing: "7:00", finishTime: "" };  
  this.handleTimeChange = this.handleTimeChange.bind(this);
  this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
  this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
  this.handleDateChange = this.handleDateChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.locationSuccess = this.locationSuccess.bind(this);
  this.locationError = this.locationError.bind(this);
  this.sendNewTime = this.sendNewTime.bind(this);
  this.handleTimingChange = this.handleTimingChange.bind(this);
  this.handleLunchChange = this.handleLunchChange.bind(this);
  this.timeCalc = this.timeCalc.bind(this);
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

timeToMins(time) {
  var b = time.split(':');
  return b[0]*60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
timeFromMins(mins) {
  function z(n){return (n<10? '0':'') + n;}
  var h = (mins/60 |0) % 24;
  var m = mins % 60;
  return z(h) + ':' + z(m);
}

// Add two times in hh:mm format
addTimes(t0, t1) {
  return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1) + 450);
}

timeCalc(event) {
  event.preventDefault();
  let finishTime = "Work until about " + this.addTimes(this.state.timing, this.state.lunch)
  this.setState({finishTime: finishTime});
  
}

handleTimingChange(event) {
  this.setState({timing: event.target.value});
}

handleLunchChange(event) {
  this.setState({lunch: event.target.value});
}

getDate() {
 this.setState({date: new Date()});
}

locationSuccess(position) {
  let crd = position.coords;
  this.setState({latitude: crd.latitude});
  this.setState({longitude: crd.longitude});
  this.showMap()
}

locationError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

showMap () {
  const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/rob11pfc/ck7lwm2ow098g1imyp6xkss42',
    center: [this.state.longitude, this.state.latitude],
    zoom: this.state.zoom
  });

  let currentLng = this.state.longitude
  let currentLat = this.state.latitude

  map.on('load', function() {
    map.loadImage(
      'https://upload.wikimedia.org/wikipedia/commons/3/34/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_House_%E2%80%93_Offices_%E2%80%93_Classic.png',
      function(error, image) {

      if (error) throw error;
      map.addImage('home', image);
      map.addSource('point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [currentLng, currentLat]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-2.588855, 51.432877]
            }
          }]
        }
      });
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
          'icon-image': 'home',
          'icon-size': 1
        }
      });
    });
  });
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
    swal("Submitted")
  })
}

render () {

  return (
    <div className="App">
      <main>
      <header className="Masthead">
          <div className="logoMHCLG Logo">
            <a href="/">
              <h2>Time tracking tools</h2>
            </a>
          </div>
            <label className="menu-icon"><span className="navicon"></span></label>
              <ul className="Menu">
                <li><a href="#submit" id="submit_tab">Submit</a></li>
                <li><a href="#timeCalc" id="time_tab">Time Calc</a></li>
                <li><a href="#locations" id="locations_tab">Locations</a></li>
              </ul>
      </header>
        <div className="Columns page-width space-below">
        <div className="Column">
            <div ref={el => this.mapContainer = el} />
          </div>
          <div id="submit" className="Column">
          <form onSubmit={this.handleSubmit}>
              <label>
                Date:
                <input style={{marginLeft:100,marginBottom:5}} type="text" defaultValue={this.state.date} onChange={this.handleDateChange} />
              </label><br />
              <label>
                Latitude:
                <input style={{marginLeft:74,marginBottom:5}} type="text" defaultValue={this.state.latitude} onChange={this.handleLatitudeChange} />
              </label><br />
              <label>
                Longitude:
                <input style={{marginLeft:59,marginBottom:5}} type="text" defaultValue={this.state.longitude} onChange={this.handleLongitudeChange} />
              </label><br />
              <label>
                Time worked:
                <input style={{marginLeft:36,marginBottom:10}} type="text" defaultValue={this.state.time} onChange={this.handleTimeChange} />
              </label><br />
            <input style={{marginLeft:100,marginBottom:10}} type="submit" value="Submit" />
          </form>
          {/* <button onClick={this.getLocation}>Manually get location</button> */}
          </div>

        </div>
        <div className="Columns page-width space-below">
          <div id="time" className="Column"style={{height:50}}>
          </div>
        </div>
        {/* <div className="Columns page-width space-below">
          <div id="locations" className="Column" style={{height:50}}>
          </div>
        </div> */}
      
      <div className="Columns page-width space-below" id="timeCalc">
      <div className="Column">
        <h2>Working day calculator</h2>
      <form onSubmit={this.timeCalc}>
              <label>
                Date:
                <input style={{marginLeft:122,marginBottom:5}} type="text" defaultValue="07:00" onChange={this.handleTimingChange}/>
              </label><br />
              <label>
                Lunch (minutes)
                <input style={{marginLeft:36,marginBottom:10}} type="text" defaultValue="0:30" onChange={this.handleLunchChange}/>
              </label><br />
            <input style={{marginLeft:100,marginBottom:10}} type="submit" value="Submit" />
          </form>
          </div>
          <div className="Column">
                <h4>{this.state.finishTime}</h4>
          </div>  
        </div>
        </main>
    </div>
  );
}
}
export default App;
