import mapboxgl from 'mapbox-gl';

class Map extends Component {

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
}