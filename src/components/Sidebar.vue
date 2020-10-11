<template>
  <div class="sidebar">
    <div class="card-emergency">
      <img src="../assets/Call.svg" alt="" />
      <div class="title">
        <p>National</p>
        <p><b>Emergency</b></p>
        <p>Help Line</p>
      </div>
      <div class="number">
        <p>999</p>
      </div>
    </div>
    <div class="card-donation">
      <div class="donation-wrapper">
        <img src="../assets/Donate.svg" alt="" />
        <div class="donation-text">
          <p class="donation-text-title">Donate to Help</p>
          <p class="donation-text-subtitle">COVID-19 Response Fund</p>
        </div>
      </div>
      <div class="become-wrapper">
        <img src="../assets/Hero.svg" alt="" />
        <div class="become-text">
          <p class="become-text-title">Become Hero</p>
          <p class="become-text-subtitle">Become volunteer to help</p>
        </div>
      </div>
    </div>
    <div class="card-fatality">
      <p class="fatality-title">
        Fatality rate by age range
      </p>
      <div class="fatality-legend">
        <div class="legend">
          <div class="circle-wrapper">
            <div class="circle"></div>
          </div>
          <p>Active Confirmed</p>
        </div>
        <div class="legend">
          <div
            class="circle-wrapper"
            style="border: 1px solid rgba(75, 66, 121, 0.4);"
          >
            <div class="circle" style="background:#574B90"></div>
          </div>
          <p>Death</p>
        </div>
      </div>
      <!-- Graph -->
      <div class="graph-wrapper">
        <apexchart
          type="bar"
          height="500"
          :options="chartOptions"
          :series="chartOptions.series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  created() {
    /** Retrieve fatality rate data */
    fetch(
      "https://covid19-update-api.herokuapp.com/api/v1/fatality-rate/ageGroup"
    )
      .then(response => response.json())
      .then(res => {
        console.log(res);
        let dataLabelsX = [];
        /*let dataSerie1 = [];
        let dataSerie2 = [];*/
        //res.fatality.data.map(d => {
        /* dataSerie1 = [...dataSerie1, d[1]];
          dataSerie2 = [...dataSerie2, d[2]];*/
        //});
        dataLabelsX = this.getStatsByTitle(res.fatality.data);
        this.chartOptions.xaxis.categories = [
          ...this.chartOptions.xaxis.categories,
          dataLabelsX
        ];

        /*this.chartOptions.series[0].data = dataSerie1;
        this.chartOptions.series[1].data = dataSerie2;*/
      })
      .catch(error => alert(error));
  },
  data() {
    return {
      fatalities: [],
      chartOptions: {
        series: [
          {
            data: ["44%", "55%", "41%", "64%", "22%", "43%", "21%"]
          },
          {
            data: [53, 32, 33, 52, 13, 44, 32]
          }
        ],
        chart: {
          type: "bar",
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: false,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            }
          }
        },
        colors: ["#574B90", "#fd4e71"],

        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "right"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: "10px",
            fontFamily: "Poppins",
            fontWeight: "normal",
            colors: ["#4B4279"]
          }
        },
        legend: {
          show: false
        },
        stroke: {
          show: true,
          width: 3,
          colors: ["#fff"]
        },
        xaxis: {
          categories: [
            "0 - 9*",
            "9 - 19",
            "20 - 29",
            "30 - 39",
            "40 - 49",
            "50 - 59",
            "60 - 69",
            "70 - 79",
            "80 - More"
          ]
        }
      }
    };
  },
  methods: {
    getStatsByTitle(stats) {
      let lastTitle = "";
      let powerstats = [];
      for (let key in stats) {
        if (stats[0] === lastTitle) {
          continue;
        }
        powerstats.push(stats[key]);
        lastTitle = stats[key];
      }
      console.log(powerstats);
      return powerstats;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #e7edf6;
  display: flex;
  flex-direction: column;
  flex: 0.3;
  height: 204.8vh;
  width: 100%;
  padding: 20px;
  padding-top: 30px;
  .card-emergency {
    background-color: #fc86b0;
    border-radius: 20px;
    max-height: 145px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      margin-top: 20px;
      padding-left: 15px;
      p {
        font-family: Poppins;
        font-size: 22;
        font-weight: 500;
        color: #fff;
      }
    }
    .number {
      margin-top: 15px;
      padding-left: 15px;

      p {
        font-family: Poppins;
        font-size: 57px;
        font-weight: 900;
        color: #fff;
      }
    }
  }
  .card-donation {
    border-radius: 20px;
    background-color: #fff;
    padding: 30px;
    max-height: 290px;
    margin-top: 20px;
    .donation-wrapper {
      background-color: #edfaff;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
      padding: 15px;
      margin-bottom: 10px;
      margin-top: 10px;
      .donation-text {
        margin-top: 5px;
        margin-left: 8px;
        .donation-text-title {
          font-family: Poppins;
          font-size: 26;
          font-weight: bold;
          color: #3eb1dd;
        }
        .donation-text-subtitle {
          font-family: Poppins;
          font-size: 15px;
          font-weight: 600;
          color: #4b4279;
        }
      }
    }
    .become-wrapper {
      background-color: #f9f7ff;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
      padding: 15px;
      margin-bottom: 10px;
      margin-top: 10px;
      .become-text {
        margin-top: 5px;
        margin-left: 8px;
        .become-text-title {
          font-family: Poppins;
          font-size: 26;
          font-weight: bold;
          color: #7b5af1;
        }
        .become-text-subtitle {
          font-family: Poppins;
          font-size: 15px;
          font-weight: 600;
          color: #4b4279;
        }
      }
    }
  }
  .card-fatality {
    height: 581px;
    padding: 30px;
    background-color: #fff;
    border-radius: 20px;
    margin-top: 20px;
    text-align: center;
    .fatality-title {
      font-family: Poppins;
      font-size: 20px;
      font-weight: 600;
      color: #6b5fa1;
    }
    .fatality-legend {
      margin-top: 25px;
      display: flex;
      flex-direction: row;
      .legend {
        display: flex;
        flex-direction: row;
        margin-right: 10px;
        .circle-wrapper {
          background: #fff;
          border: 1px solid rgba(255, 119, 80, 0.4);
          border-radius: 50%;
          width: 9px;
          height: 9px;
          padding: 3px;
        }
        .circle {
          background-color: #fd4e71;
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        p {
          font-family: Poppins;
          color: rgb(75, 66, 121);
          font-weight: normal;
          font-size: 12px;
          margin-left: 6px;
        }
      }
    }
    .graph-wrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
