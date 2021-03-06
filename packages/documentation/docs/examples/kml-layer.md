## Live example

<eg-base>
  <eg-kml-layer />
</eg-base>

## Source code

```html
<body>
  <div id="root">
    <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <google-kml-layer v-for="l in kmlLayers" :url="l.url" :clickable="true"></google-kml-layer>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc'
      },
      // Demonstrating how we can customize the name of the components
      installComponents: false,
    });

    document.addEventListener('DOMContentLoaded', function () {
      Vue.component('google-map', GmapVue.Map);
      Vue.component('google-kml-layer', GmapVue.KmlLayer);

      new Vue({
        el: '#root',
        data: {
          center: {
            lat: -19.257753,
            lng: 146.823688
          },
          kmlLayers: [{
            url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml'
          }]
        },
      });
    });
  </script>
</body>
```
