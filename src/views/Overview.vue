<template>
  <div class="overview">
    <p class="overview-title">Overview</p>
    <div class="card-overview">
      <div class="card-container">
        <p class="card-title">
          Why social distancing is <b class="important">important?</b>
        </p>

        <p class="card-text">
          This infographic explains how to minimise the spread of COVID-19. It
          describes personal protective, environmental and social distancing
          measures.
        </p>
      </div>
      <img src="../assets/Illustration.svg" alt="" srcset="" />
      <span class="icon-close">
        <i class="fas fa-times"></i>
      </span>
    </div>
    <div class="search-wrapper">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Bangladesh" />
      </div>
      <div class="select-box">
        <select>
          <option>Select State</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="French">French</option>
        </select>
      </div>
      <div class="select-box">
        <select>
          <option>Select Area</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="French">French</option>
        </select>
      </div>
    </div>
    <div class="map-wrapper">
      <div class="cases-wrapper">
        <div class="timeline">
          <div class="total-wrapper">
            <p class="total-text">Total Case</p>
            <p class="total-number">{{ numberSplitDigits(totalCase) }}</p>
          </div>
        </div>
        <div class="cases-data">
          <div class="cases">
            <div class="cases-number">
              <p>{{ numberSplitDigits(recover) }}</p>
              <p class="cases-text">Recover</p>
            </div>
            <div class="cases-number">
              <p>{{ numberSplitDigits(critical) }}</p>
              <p class="cases-text">Critical and Serious</p>
            </div>
            <div class="cases-number">
              <p>{{ numberSplitDigits(active) }}</p>
              <p class="cases-text">Active Confirmed</p>
            </div>
            <div class="cases-number">
              <p>{{ numberSplitDigits(deaths) }}</p>
              <p class="cases-text">Death</p>
            </div>
          </div>
          <div class="progress"></div>
          <div class="cases-state">
            <div class="states">
              <div class="circle-wrapper">
                <div class="circle" style="background: #FD79A8;"></div>
              </div>
              <p>Active Confirmed</p>
            </div>
            <div class="states">
              <div class="circle-wrapper">
                <div class="circle"></div>
              </div>
              <p>Critical and Serious</p>
            </div>
            <div class="states">
              <div class="circle-wrapper">
                <div class="circle" style="background: #55EFC4;"></div>
              </div>
              <p>Recovered</p>
            </div>
            <div class="states">
              <div class="circle-wrapper">
                <div class="circle" style="background:#574B90"></div>
              </div>
              <p>Death</p>
            </div>
          </div>
        </div>
      </div>
      <!-- MapBox -->
      <div id="mapContainer" class="basemap"></div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYnJpY2V2aWduYWwiLCJhIjoiY2syYTlqY2F0MGw1bTNtcGUza2c4OWdnZyJ9.IXoN76srzhVVYbSW_sEJng";

export default {
  name: "Overview",
  created() {
    /** Retrieve totalCase data */
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        this.totalCase = data.todayCases;
        this.recover = data.recovered;
        this.deaths = data.deaths;
        this.critical = data.critical;
        this.active = data.active;
      })
      .catch(error => alert(error));
  },
  filters: {},
  data() {
    return {
      totalCase: null,
      recover: null,
      deaths: null,
      critical: null,
      active: null,
      accessToken: MAPBOX_TOKEN
    };
  },
  mounted() {
    // Get accessToken to MapBox
    mapboxgl.accessToken = this.accessToken;
    // Get current geolocation with mapbox and add a marker to it !
    navigator.geolocation.getCurrentPosition(location => {
      const map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [location.coords.longitude, location.coords.latitude],
        zoom: 12
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      new mapboxgl.Marker()
        .setLngLat([location.coords.longitude, location.coords.latitude])
        .addTo(map);
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      map.addControl(geolocate, "top-right");
    });
  },
  computed: {},
  methods: {
    numberSplitDigits: function(num) {
      return num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
};
</script>

<style lang="scss" scoped>
.overview {
  display: flex;
  flex-direction: column;
  flex: 0.7;
  background-color: #f9fcff;
  height: 200vh;
  max-height: 100%;
  width: 100%;
  padding: 40px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  .search-wrapper {
    display: flex;
    flex-direction: row;
    .search-box {
      display: flex;
      color: #817c9b;
      background-color: #fff;
      padding: 10px;
      border-radius: 24px;
      max-height: 40px;
      max-width: 240px;
      box-shadow: 0 2px 4px rgba(136, 136, 136, 0.4);
      margin-right: 10px;
      i {
        padding-right: 15px;
      }
      input {
        background: transparent;
        outline-width: 0;
        color: #261d56;
        border: none;
        font-weight: 500;

        &::placeholder {
          font-family: Poppins;
          font-size: 14px;
          color: #261d56;
        }
      }
    }
    .select-box {
      display: flex;
      color: #817c9b;
      background-color: #fff;
      padding: 10px;
      border-radius: 24px;
      max-height: 40px;
      max-width: 155px;
      box-shadow: 0 2px 4px rgba(136, 136, 136, 0.4);
      margin-left: 20px;
      select {
        cursor: pointer;
        outline-width: 0;
        border: none;
        width: 100%;
        color: #817c9b;
        font-weight: 500;
        font-family: Poppins;
        font-size: 14px;
      }
    }
  }
  .map-wrapper {
    background-color: #fff;
    margin-top: 30px;
    border-radius: 30px;
    padding-top: 90px;
    font-family: Poppins;
    box-shadow: 0 2px 4px rgba(136, 136, 136, 0.4);
    position: relative;
    height: 90vh;
    #mapContainer {
      width: 100%;
      height: 55vh;
      position: absolute;
    }
    .cases-wrapper {
      max-width: 697.5px;
      margin-left: auto;
      margin-right: auto;
    }
    .cases-data {
      display: flex;
      flex-direction: column;
      .cases {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 25px;
        font-family: Poppins;
        font-size: 15px;
        color: #4b4279;
        font-weight: 700;
        text-align: center;
        .cases-number {
          display: flex;
          flex-direction: column;
        }
        .cases-text {
          font-size: 12px;
          color: #817c9b;
          font-weight: normal;
        }
      }
      .progress {
        margin-top: 10px;
        height: 10px;
        width: 100%;
        border-radius: 11px;
        background: linear-gradient(
          to right,
          #55efc4 20%,
          #d63031 20%,
          #fd79a8 80%,
          #574b90 50%
        );
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
      .cases-state {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 16px;
        max-width: 550px;
        margin-bottom: 80px;
        margin-left: 50px;
        .states {
          display: flex;
          flex-direction: row;
          p {
            margin-top: 0px;
            margin-left: 8px;
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
      .circle-wrapper {
        background: #fff;
        border: 1px solid rgba(255, 119, 80, 0.4);
        border-radius: 50%;
        width: 9px;
        height: 9px;
        padding: 3px;
      }
      .circle {
        background-color: #d63031;
        width: 9px;
        height: 9px;
        border-radius: 50%;
      }
    }
    .total-wrapper {
      background-color: #fff0f5;
      border-radius: 12px;
      border: 3px dashed #fd79a8;
      padding-top: 10px;
      width: 214px;
      height: 84px;
      text-align: center;
      box-shadow: 4px rgba(253, 121, 168, 1);
      margin: auto;
      padding-top: 25px;
      .total-text {
        font-size: 16px;
        font-weight: 600;
        color: #4b4279;
      }
      .total-number {
        font-size: 26px;
        font-weight: bold;
        color: #df0a56;
      }
    }
  }
  .overview-title {
    font-family: Poppins;
    font-size: 27px;
    color: #261d56;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .card-overview {
    border-radius: 20px;
    margin-bottom: 80px;
    background-color: #ffffff;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 60px;
    padding-right: 60px;
    display: flex;
    flex-direction: row;
    position: relative;
    -webkit-box-shadow: -6px 0px 0px 0px rgba(253, 121, 168, 1);
    -moz-box-shadow: -6px 0px 0px 0px rgba(253, 121, 168, 1);
    box-shadow: -6px 0px 0px 0px rgba(253, 121, 168, 1);
    img {
      margin-top: -70px;
    }
    .icon-close {
      position: absolute;
      cursor: pointer;
      top: -15px;
      right: -15px;
      padding-top: 1px;
      font-size: 24px;
      color: #ffbdbd;
      text-align: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 2px 18px rgba(136, 136, 136, 0.4);
      i {
        font-weight: bold;
        margin-top: 3px;
      }
    }
    .card-container {
      display: flex;
      flex-direction: column;
      .card-title {
        font-family: Poppins;
        font-size: 24px;
        color: #261d56;
        font-weight: 700;
        margin-bottom: 18px;
      }
      .important {
        color: #e02020;
      }
      .card-text {
        max-width: 435px;
        font-family: Poppins;
        font-size: 16px;
        color: #261d56;
        font-weight: 400;
        margin-bottom: 10px;
      }
    }
  }
}
</style>