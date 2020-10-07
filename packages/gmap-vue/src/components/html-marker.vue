<template>
  <div  class="google-map-overlay">
    <div class="custom-marker" ref="custom_marker" :style="z_index">
    <slot name="default"/>
    </div>
  </div>
</template>


<script>
import {mapState,mapActions} from 'vuex';

import MapElementMixin from '../mixins/map-element.js';

export default {
  name:'HTMLMarker',
  mixins: [MapElementMixin],
  props: {
    group:{type:String,default:'none'},
    record_id:{type:String,defualt:'none'},
    bezier:{type:Boolean,default:true},
    lat:{type:Number,required:true},
    lng:{type:Number,required:true},
    delayRepaint: {
      type: Number,
      default: undefined
    },
    hovering:{type:Boolean,default:false},
    marker: {
      type: Object,
      default: undefined
    },
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    },
    alignment: {
      type: String,
      default: "top"
    }
  },
  data () {
    return {
      opacity: 1
    }
  },
  updated() {
  },
  watch: {
    marker (val) {
      this.$mapPromise.then(map => this.$overlay.setPosition())
    },
  },
  provide () {
    const self = this
    this.$mapPromise.then(map => {
      class Overlay extends google.maps.OverlayView {
        constructor (map) {
          super()
          this.setMap(map)
          this.draw = () => this.repaint()
          this.setPosition = () => this.repaint();
          this.div = null;
        }
        repaint () {
            this.div = self.$refs.custom_marker;
          const projection = this.getProjection()
          if (projection && this.div) {
            const posPixel = projection.fromLatLngToDivPixel(self.position);
            let x, y
            x = posPixel.x ; 
            y = posPixel.y ; 
            this.div.style['z-index'] = (self.hovering ? 10000 : 10)
            this.div.style.left = `${x-50}px`;
            this.div.style.top = `${y-100}px`;
          }
        }
        onAdd () {
          this.div =   self.$refs.custom_marker; 
          const panes = this.getPanes()
          let pos = {lat() { return self.lat},lng() { return self.lng}};
          this.pos = pos;
          this.div.style.position = 'absolute'
          this.div.style.zIndex = 50;
          panes.overlayLayer.appendChild(this.div)
          panes.overlayMouseTarget.appendChild(this.div)
        }
        onRemove () {
          self.$slots?.default?.[0]?.elm?.remove?.(); 
        }
      }
      this.$overlay = new Overlay(map)
      this.opacity = 1
    })
  },
  methods: {
    ...mapActions(['set_bezier_coordinates'])
  },
  computed: {
    ...mapState(['active_group','active']),
    z_index() {
      return (this.hovering === true) ? {'z-index':1000} : {'z-index':10};
    },
    is_active() {
      return (this.active[this.group] === this.record_id && this.active_group === this.group);
    },
    lat () {
      return parseFloat(this.marker.lat || this.marker.latitude)
    },
    lng () {
      return parseFloat(this.marker.lng || this.marker.longitude)
    },
    z_index() {
      let group_index = (this.active_group === this.group) ? 100 : 1;
      let item_index  = (this.active[this.group] === this.record_id ) ? 100 : 0;
      return (group_index + item_index)
    },
    position () {
      const self = this
      return {
        lat () {
          return self.lat
        },
        lng () {
          return self.lng
        }
      }
    }
  },
  beforeUnmount() {
    if (this.$overlay) {
      this.$overlay.setMap(null)
      this.$overlay = undefined
    }
  },
  destroyed () {
    if (this.$overlay) {
      this.$overlay.setMap(null)
      this.$overlay = undefined
    }
  }
}
</script>

<style>


div.custom-marker{
  pointer-events: none;
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
  z-index: 1000;
  position: relative;
  display: grid;
  align-items: end;
  justify-content: center;
}

</style>

