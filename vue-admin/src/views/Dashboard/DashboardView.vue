<template>
    <!-- Layout container -->
    <div class="layout-page">
    <!-- Navbar -->
    <Topbar />
    <!-- / Navbar -->
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="px-4 flex-grow-1 container-p-y">
        <div class="row">
          <div class="col-md-8">
            <div class="card mb-4">
              <div class="d-flex align-items-end row">
                <div class="col-sm-7">
                  <div class="card-body">
                    <h5 class="card-title text-warning">:)</h5>
                    <h5 class="card-title ">
                      <span class="text-primary"> {{userData.firstname}} {{userData.lastname}} </span>                       
                    </h5>
                    <p class="mb-0">{{userData.email}}</p>
                    <p class="mb-0"> {{userData.phone}}</p>
                    <p class="mb-0">{{ userData.address }}</p>
                    <!-- <a
                      href="javascript:;"
                      class="btn btn-sm btn-outline-primary mt-2"
                      >Free Plan</a> -->
                  </div>
                </div>
                <div class="col-sm-5 text-center text-sm-left">
                  <div class="card-body pb-0 px-0 px-md-4">
                    <img
                      src="/assets/img/illustrations/man-with-laptop-light.png"
                      height="140"
                      alt="View Badge User"
                      data-app-dark-img="illustrations/man-with-laptop-dark.png"
                      data-app-light-img="illustrations/man-with-laptop-light.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- number status -->
          <div class="col-md-4">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-center align-items-center" v-if="loading">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    <div v-else>
                      <small class="text-success fw-semibold">Category :) 16</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-center align-items-center" v-if="loading">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    <div v-else>
                      <small class="text-success fw-semibold">Product :) 1547</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="card mb-4">
              <div class="row bordered g-0">
                <div class="col-md-12">
                  <h5 class="card-header m-0 me-2 pb-3">Uploaded Products</h5> 
                  <div id="incomeChart" class="px-2"> 
                    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
                  </div>    
                </div>                
              </div>
            </div>
            <div class="card mb-4">
              <div class="row row-bordered g-0">
                <div class="col-md-12">
                  <h5 class="card-header m-0 me-2 pb-3">Product Visits</h5>
                  <div id="incomeChart">
                    <apexchart type="line" height="350" :options="chartOptions2" :series="series2"></apexchart>
                  </div>    
                </div>                
              </div>
            </div>          
        </div>        
      </div>
      <Footer />
    </div>
  </div>
</template>
<script lang="ts">
// import Vue from 'vue';
import { defineComponent } from 'vue';
import Topbar from '../TopBarView.vue';
import Footer from '../FooterView.vue';
import { useStore } from 'vuex';
import axios from '../../../node_modules/axios/index';

import VueApexCharts from 'vue3-apexcharts';
export default defineComponent({
  name: 'DashboardVue',
  components: {Topbar, Footer, apexchart: VueApexCharts},
  data() {
    const store = useStore();
    const token = store.state.auth.token || localStorage.getItem('token');
    const userData = store.state.auth.userData || localStorage.getItem('userData');
    // const storeId = store.state.auth.storeId || localStorage.getItem('storeId');
    const userId = store.state.auth.userId || localStorage.getItem('userId');
    return {
      token,
      userData: JSON.parse(userData),
      // storeId,
      userId,
      isActiveMenu: false,
      loading: false,
      series: [{
        name: 'Uploaded',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, 
      {
        name: 'Expired',
        data: [11, 32, 45, 32, 34, 52, 41]
      },
      {
        name: 'Live',
        data: [13, 35, 50, 60, 30, 37, 45]
      },
      {
        name: 'Rejected',
        data: [13, 35, 50, 60, 30, 37, 45]
      },
    ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        toolbar: {
          show: true, // Hide the toolbar, including the menu icon
        },
      },
      fettchDataArray: {
        package_info: null,
        total_category: null,
        total_product: null,
        alertProductList: null,
        totalOrderCount: null,
        totalSaleCountSum: null,
        totalPaymentCountSum: null,
        totalDueCountSum: null
      },
      series2: [{
            name: 'Uploaded',
            type: 'column',
            data: [2, 5, 4, 2.5, 7, 1.5, 8.3, 5.8]
          }, {
            name: 'Approved',
            type: 'column',
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
          }, {
            name: 'Rejected',
            type: 'line',
            data: [20, 29, 37, 36, 44, 45, 50, 58]
          },{
            name: 'Premium Ads',
            type: 'line',
            data: [20, 29, 37, 36, 44, 45, 50, 58]
          }],
      chartOptions2: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: '',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "Income (thousand crores)",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "Operating Cashflow (thousand crores)",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "Revenue (thousand crores)",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft',
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    };
  },
  methods: {
    // Method to toggle between login and registration forms
    async fatchDashboardData() {
      try { 
        this.loading = true;
        if (!this.token) {
            throw new Error('Token not found');
          }
          const response = await axios.get(process.env.VUE_APP_API_URL + 'report-dashboard',
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              // StoreId: this.storeId,
              UserType: this.userData.type,
            }
          }
          );
        if (response.status === 200) {
          this.fettchDataArray = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    toggleClass() {
      this.isActiveMenu = !this.isActiveMenu;
      const html = document.querySelector("html");
      if (html) {
        html.classList.toggle("layout-menu-expanded", this.isActiveMenu);
      }
    },
  },
  mounted() {
    this.fatchDashboardData();
    console.log('__userdata__', this.userData.type);
    // apex chart
  }
});
</script>
<style scoped>
.dashboard {
  text-align: center;
}
.apexcharts-canvas + .apexcharts-toolbar {
  display: none !important;
}
</style>

