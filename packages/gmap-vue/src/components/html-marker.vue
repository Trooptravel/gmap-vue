<template>
  <div  class="google-map-overlay">
    <div class="custom-marker" ref="custom_marker" :style="z_index">
    <slot />
    </div>
  </div>
</template>


<script>

import {mapState,mapActions} from 'vuex';

import MapElementMixin from '../mixins/map-element.js';


export default {
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
//          const div = self.$el; // self.$slots.default[0];
 
            this.div = self.$refs.custom_marker;
              
          // const div =  self.$refs.custom_marker; //self.$slots.default[0].elm; // self.$refs.map_overlay;
          // let before = new Date().getTime();
          const projection = this.getProjection()
          // let after = new Date().getTime();
          if (projection && this.div) {
            const posPixel = projection.fromLatLngToDivPixel(self.position);
            let x, y
            x = posPixel.x ; // - (div.offsetWidth / 2)
            y = posPixel.y ; // - div.offsetHeight;
            this.div.style['z-index'] = (self.hovering ? 10000 : 10)
            this.div.style.left = `${x-50}px`;
            this.div.style.top = `${y-100}px`;
          }
        }
        onAdd () {
          // const div = self.$el
          this.div =   self.$refs.custom_marker; //default[0].elm; // self.$refs.map_overlay; //
          const panes = this.getPanes()
          let pos = {lat() { return self.lat},lng() { return self.lng}};
          this.pos = pos;
          this.div.style.position = 'absolute'
          // div.style.display = 'inline-block'
          this.div.style.zIndex = 50;
          // this.div = self.$slots.default[0].elm;
          panes.overlayLayer.appendChild(this.div)
          panes.overlayMouseTarget.appendChild(this.div)
        }
        onRemove () {
          self.$slots?.default?.[0]?.elm?.remove?.(); // self.$refs.map_overlay.remove();
          //self.$el.remove()
        }
      }
      this.$overlay = new Overlay(map)
      // if (this.delayRepaint) {
      //   setTimeout(() => {
      //     this.$overlay.repaint()
      //     this.opacity = 1
      //   }, this.delayRepaint)
      // } else {
      this.opacity = 1
      // }
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

div.google-map-overlay-marker{
  /* border:1px dotted red; */
  min-width: 0px;
  max-width: 0px;
  min-height: 0px;
  max-height: 0px;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: show;
  transform-origin: 50% 50%;
  pointer-events: none;
  /* top:400px;
  left:400px; */
  /* z-index: -1; */
  /* transform-origin: center center;
  display: grid;
  align-items: center;
  justify-content: center;
  /* top:0px; */
  /* background: red; */
}

div.google-map-overlay-marker{
/* div.google-map-overlay-center{ */
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
  /* border:1px dotted red; */
  position: relative;
  display: grid;
  /* left:-100px; */
  /* top:-100px; */
  transform-origin: 50% 50%;
  pointer-events: none;
}

div.custom-marker{
  pointer-events: none;
}

</style>

