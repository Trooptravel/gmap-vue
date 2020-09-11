import {install} from './src/main.js';

// export GmapVue;

import {loadGmapApi,
  HeatmapLayer,
  KmlLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Cluster,
  Rectangle,
  DrawingManager,
  InfoWindow,
  Map,
  PlaceInput,
  MapElementMixin,
  MapElementFactory,
  Autocomplete,
  MountableMixin,
  StreetViewPanorama,
} from './src/main.js';

const all_components = {
  loadGmapApi,
  HeatmapLayer,
  KmlLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Cluster,
  Rectangle,
  DrawingManager,
  InfoWindow,
  Map,
  PlaceInput,
  MapElementMixin,
  MapElementFactory,
  Autocomplete,
  MountableMixin,
  StreetViewPanorama,
};

console.log('ALL IN INDEX COMPONENTS:',all_components);

export {
  loadGmapApi,
  HeatmapLayer,
  KmlLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Cluster,
  Rectangle,
  DrawingManager,
  InfoWindow,
  Map,
  PlaceInput,
  MapElementMixin,
  MapElementFactory,
  Autocomplete,
  MountableMixin,
  StreetViewPanorama,
};


export default install;



