// apexcharts.d.ts

declare module 'vue-apexcharts' {
    import Vue from 'vue';
  
    export default class VueApexCharts extends Vue {
      // Define your prop types here
      options: object;
      series: Array<object>;
      type?: string;
      width?: string | number;
    }
  }
  