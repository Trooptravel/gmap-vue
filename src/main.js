import {install} from '../packages/gmap-vue/src/main.js';

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
} from '../packages/gmap-vue/src/main.js';

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

console.log('ALL COMPONENTS:',all_components);

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



