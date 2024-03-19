/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { useState, useEffect } from 'react';
const MapComponent = (props) => {
  const [viewport, setViewport] = useState({
    latitude: parseFloat(props.latitude),
    longitude: parseFloat(props.longitude),
    zoom: 8
  });

  const [address, setAddress] = useState('');

  useEffect(() => {
    setViewport({
      latitude: parseFloat(props.latitude),
      longitude: parseFloat(props.longitude),
      zoom: 8
    });
  }, [props.latitude, props.longitude]);

  useEffect(() => {
    // Fetch address from OpenCage API
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${viewport.latitude}+${viewport.longitude}&key=86d3c35c4f1d44319c1e09704efd4046`)
      .then(response => setAddress(response.data.results[0].formatted))
      .catch(error => console.error(error));
  }, [viewport]);

  return (
      <div>
        <Map height={300} width={500} center={[viewport.latitude, viewport.longitude]} defaultZoom={13}>
          <Marker anchor={[viewport.latitude, viewport.longitude]} payload={1}/>
        </Map>
        <p>{address}</p>
      </div>
  );
}

export default MapComponent;
