import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '../../store/ducks/modal';

// eslint-disable-next-line import/no-unresolved
import './style.css';

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -21.975923,
      longitude: -46.780686,
      zoom: 15,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    // eslint-disable-next-line react/prop-types
    const { showModal } = this.props;

    // console.log(e.lngLat);

    await showModal({ latitude, longitude });
  };

  render() {
    const { viewport: viewportState } = this.state;
    // eslint-disable-next-line react/prop-types
    const { users } = this.props;
    return (
      <MapGL
        {...viewportState}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1Ijoiam9hb3BlZHJvMTk5OSIsImEiOiJjanZlZXhjb3cwMTY4NDRwOHR4c3Jnb2FuIn0.bLgUw0vqIL97Gt_YF_bXpA"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {users.data.map(user => (
          <Marker
            latitude={user.cordinates.latitude}
            longitude={user.cordinates.longitude}
            key={user.id}
          >
            <img
              className="avatar"
              alt={`${user.name} Avatar`}
              src={user.avatar}
            />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
