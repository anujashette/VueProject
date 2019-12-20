<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="flexible">
      <md-app-toolbar class="md-large md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row md-toolbar-offset">
          <span class="md-display-1">My Movies</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item @click="menuVisible = !menuVisible"  onclick="actor">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Movies</span>
          </md-list-item>

          <md-list-item @click="menuVisible = !menuVisible"  onclick="alert('test')">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Actor</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Producer</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content v-if="isMovie === true">
        <md-table v-model="info" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Movies</h1>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>
              {{
              item.id
              }}
            </md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">
              {{
              item.name
              }}
            </md-table-cell>
            <md-table-cell md-label="Plot" md-sort-by="email">
              {{
              item.yearOfRelease
              }}
            </md-table-cell>
            <md-table-cell md-label="Year Of Release" md-sort-by="yearOfRelease">
              {{
              item.yearOfRelease
              }}
            </md-table-cell>
            <md-table-cell md-label="Producer" md-sort-by="producer">
              {{
              item.producer.name
              }}
            </md-table-cell>
            <md-table-cell md-label="Actors" md-sort-by="actor">
              {{
              item.actor
              }}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-app-content>
      <!-- <md-app-content>
        anuua
      </md-app-content>
      <md-app-content v-if="isProducer">shette</md-app-content> -->
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(green, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200),
    // The accent or secondary color
      theme: dark // This can be dark or light
  )
);

@import "~vue-material/dist/theme/all";
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}

.md-app-toolbar {
  height: 196px;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
import { HTTP } from "../services/http-comman";
export default {
  name: "Flexible",
  data: () => ({
    sending: false,
    menuVisible: false,
    info: ["anuja"],
    isMovie: true,
    isActor: false,
    isProducer: false
  }),
  created() {
    HTTP.get(`movie`).then(response => {
      this.info = response.data.data;
    });
  },

  // method: {
  //   movieClick: function(value) {
  //           this.sending = true;

  //     alert("movie click", value);
  //     // log('movie click');
  //     this.isMovie = true;
  //     this.menuVisible = true;
  //   },

  //   actorClick: function() {
  //     this.isActor = true;
  //   },

  //   producerClick: function() {
  //     this.isProducer = true;
  //   }
  // }
};
</script>
