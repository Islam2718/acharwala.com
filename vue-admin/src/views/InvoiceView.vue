<template>
   <div class="layout-page">
    <TopBarView />
    <div class="content-wrapper">
      <!-- <Search /> -->
      <!-- Content -->
      <div>
        <div>
          <div class="flex-grow-1 container-p-y px-4">
            <div class="d-flex justify-content-between aling-items-center">
              <div>
                <h4 class="fw-bold py-3 mb-4 ps-2">
                    <span class="text-muted fw-light">Invoice </span>View
                </h4>
              </div>
            </div>
            <!-- Basic Layout & Basic with Icons -->
            <div class="">
              <!-- Basic Layout -->
                <div class="">
                    <!-- table  -->
                  <div>
                    <div class="">
                      <div class="text-nowrap">
                        <div class="row">
                          <div class="">
                            <div class=" py-3">
                              <div class="d-flex justify-content-center align-items-center" v-if="loading">
                                <div class="spinner-border text-primary" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>
                              </div>
                              <div class="row invoice-preview" v-else>
                                <!-- Invoice -->
                                <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4">
                                  <div class="card invoice-preview-card" id="invoice-container">
                                    <div class="card-body">
                                      <div class="d-flex justify-content-between flex-xl-row flex-md-column flex-sm-row flex-column p-sm-3 p-0">
                                        <div>
                                          <h4 class="text-wrap">Invoice No:  {{ orderData.invoice_no }}</h4>
                                          <div class="mb-2">
                                            <span class="me-1">Date:</span>
                                            <span class="fw-medium">{{ orderData.created_at }}</span>
                                          </div>
                                        </div>
                                        <div class="mb-xl-0 mb-4">
                                          <div class="d-flex svg-illustration mb-2 gap-2">
                                            <!-- <span class="app-brand-logo demo">
                                              <img src="https://phicsart.com/uploads/images/top-page/menu/logo.svg" alt="" class="img-fluid">
                                            </span>
                                            <span class="app-brand-text demo menu-text fw-bolder ms-2 text-uppercase">POS</span> -->
                                            <span class="app-brand-text demo menu-text fw-bolder text-uppercase">{{ storeData.name }}</span>
                                          </div>
                                          <p class="mb-1">Address: {{ orderData?.store?.address }}</p>
                                          <p class="mb-0">Phone: {{ orderData?.store?.phone }}</p>
                                        </div>                                        
                                      </div>
                                    </div>
                                    <hr class="my-0">
                                    <div class="card-body">
                                      <div class="row p-sm-3 p-0">
                                        <div class="col-xl-12 col-md-12 col-sm-7 col-12">
                                          <h6 class="pb-0"> <strong> Customer: </strong></h6>
                                          <table>
                                            <tbody>
                                              <tr v-if="orderData?.customer?.name">
                                                <td class="pe-3">Name: </td>
                                                <td>{{orderData?.customer?.name}}</td>
                                              </tr>
                                              <tr v-if="orderData?.customer_type">
                                                <td class="pe-3">Type: </td>
                                                <td>{{ orderData?.customer_type }}</td>
                                              </tr>
                                              <tr v-if="orderData?.customer?.phone">
                                                <td class="pe-3">Phone:</td>
                                                <td>{{ orderData?.customer?.phone }}</td>
                                              </tr>
                                              <tr v-if="orderData?.customer?.address">
                                                <td class="pe-3">Address:</td>
                                                <td>{{ orderData?.customer?.address }}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                    <div class=" d-none d-md-block">
                                      <div class="table-responsive mx-4">
                                        <table class="table table-bordered m-0 text-center">
                                          <thead>
                                            <tr>
                                              <th>Id</th>
                                              <th>Name</th>
                                              <th>Qty X Price </th>
                                              <!-- <th>Quantity</th> -->
                                              <th>Total</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="(dataItem, index) in orderData.order_items" :key="index">
                                              <td>{{ index + 1 }}</td>
                                              <td>{{ dataItem?.product_name }}</td>                
                                              <td>{{ dataItem.quantity }} x {{ dataItem.sell_price }}</td>
                                              <!-- <td></td> -->
                                              <td>{{ dataItem.total }}</td>
                                            </tr>
                                          </tbody>
                                          <tfoot> 
                                            <tr>
                                              <th colspan="3" class="text-end">Total =</th>
                                              <th>{{ orderData.total }}</th>
                                            </tr>
                                            <tr>
                                              <th colspan="3" class="text-end">Discount = </th>
                                              <th>{{ (orderData.total - orderData.sub_total).toFixed(2) }} </th>
                                            </tr>
                                            <tr v-if="orderData.due < 0">
                                              <th colspan="3" class="text-end">Due =</th>
                                              <th>{{ orderData.due }}</th>
                                            </tr>
                                            <tr>
                                              <th colspan="3" class="text-end">Sub Total =</th>
                                              <th>{{ orderData.sub_total }}</th>
                                            </tr>
                                          
                                          </tfoot>
                                        </table>
                                      </div>
                                    </div>
                                    
                                    <div class="mobile-view d-block d-md-none">
                                      <div class="mb-4" >
                                        <div class="card-body">
                                        <h6> <strong>  Order Details: </strong></h6>
                                          <div v-for="(dataItem, index) in orderData.order_items" :key="index">
                                              <!-- <span>{{index+1}}</span><br> -->
                                              <strong> Sl: {{ index + 1  }}</strong><br/>
                                              <p class="mb-0"> <strong> Name: {{ dataItem?.product_name }}</strong></p> 
                                              <p class="mb-0">Qty X Price: {{ dataItem.quantity }} x {{ dataItem.sell_price }}</p>
                                              <p class="mb-0">Total: {{ dataItem.total }}</p>  
                                              <hr>
                                          </div>   
                                          <div>
                                            <p class="mb-0 text-end"> Total: <strong>{{ orderData.total }}</strong> </p>
                                            <p class="mb-0 text-end"> Discount: {{(orderData.total - orderData.sub_total).toFixed(2) }} </p>
                                            <p class="mb-0 text-end"> Sub Total: <strong>{{ orderData.sub_total }}</strong></p>
                                          </div>                                                                         
                                        </div>
                                      </div>
                                    </div>
                                    <div class="card-body">
                                      <div class="row">
                                        <div class="col-12">
                                          <!-- <span class="fw-medium">Note:</span> -->
                                          <span class="text-wrap">Design & Developed by <strong>PhicsArt</strong>! &nbsp;<img src="https://phicsart.com/uploads/images/top-page/menu/logo.svg" alt="" class="img-fluid " style="max-width: 13px;"> </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-sm-3 d-none" >
                                  <!-- ... your 57mm size content here ... -->
                                  <div id="invoice-container-57mm" >
                                    <div class="card invoice-preview-card">
                                      <div class="card-body m-0">
                                        <div class="">
                                          <div class="mb-xl-0 ">
                                            <div class="d-flex svg-illustration mb-2 gap-2">
                                              <!-- <span class="app-brand-logo demo">
                                                <img src="https://phicsart.com/uploads/images/top-page/menu/logo.svg" alt="" class="img-fluid">
                                              </span>
                                              <span class="app-brand-text demo menu-text fw-bolder ms-2 text-uppercase">POS</span> -->
                                              <span class="app-brand-text demo menu-text fw-bolder text-uppercase">{{ storeData.name }}</span>
                                            </div>
                                            <p class="mb-0">Address: {{ orderData?.store?.address }}</p>
                                            <p class="mb-0">Phone: {{ orderData?.store?.phone }}</p>
                                          </div>
                                          <div>
                                            <h4 class="text-wrap m-0">Invoice No:  {{ orderData.invoice_no }}</h4>
                                            <div class="mb-2">
                                              <span class="me-1">Date:</span>
                                              <span class="fw-medium">{{ orderData.created_at }}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <hr class="my-0">
                                      <div class="card-body">
                                        <h6 class="pb-0"> <strong> Customer: </strong></h6>
                                          <table class="table">
                                            <tbody>
                                              <tr>
                                                <td class="pe-3">Name: </td>
                                                <td>{{orderData?.customer?.name}}</td>
                                              </tr>
                                              <tr>
                                                <td class="pe-3">Type: </td>
                                                <td>{{ orderData?.customer_type }}</td>
                                              </tr>
                                              <tr>
                                                <td class="pe-3">Phone:</td>
                                                <td>{{ orderData?.customer?.phone }}</td>
                                              </tr>
                                              <tr>
                                                <td class="pe-3">Address:</td>
                                                <td>{{ orderData?.customer?.address }}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                      </div>
                                      <div class="">
                                        <table class="table text-center">
                                          <thead>
                                            <tr>
                                              <th>Id</th>
                                              <th>Name</th>
                                              <th>Qty </th>
                                              <th>Price </th>
                                              <!-- <th>Quantity</th> -->
                                              <th>Total</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="(dataItem, index) in orderData.order_items" :key="index">
                                              <td>{{ index + 1}}</td>
                                              <td>{{ dataItem?.product_name }}</td>                
                                              <td>{{ dataItem.quantity }} </td>
                                              <td>{{ dataItem.sell_price }}</td>
                                              <!-- <td></td> -->
                                              <td>{{ dataItem.total }}</td>
                                            </tr>
                                          </tbody>
                                          <tfoot> 
                                            <tr>
                                              <th colspan="4" class="text-end">Total =</th>
                                              <th>{{ orderData.total }}</th>
                                            </tr>
                                            <tr>
                                              <th colspan="4" class="text-end">Discount = </th>
                                              <th>{{ orderData.discount }}</th>
                                            </tr>
                                            <tr>
                                              <th colspan="4" class="text-end">Sub Total =</th>
                                              <th>{{ orderData.sub_total }}</th>
                                            </tr>
                                          
                                          </tfoot>
                                        </table>
                                      </div>
                                      <div class="card-body">
                                        <div class="row">
                                          <div class="col-12">
                                            <!-- <span class="fw-medium">Note:</span> -->
                                            <span class="text-wrap">Design & Developed by <strong>PhicsArt</strong>! &nbsp;<img src="https://phicsart.com/uploads/images/top-page/menu/logo.svg" alt="" class="img-fluid " style="max-width: 13px;"> </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                   
                                  </div> 
                                </div>
                                <div class="col-sm-4 d-none">
                                  <!-- ... your 80mm size content here ... -->
                                  <div id="invoice-container-80mm" >
                                    <div class="card">
                                      <div class="card-body m-0">
                                        <div class="">
                                          <div class="mb-xl-0 ">
                                            <div class="d-flex svg-illustration mb-2 gap-2">
                                              <!-- <span class="app-brand-logo demo">
                                                <img src="https://phicsart.com/uploads/images/top-page/menu/logo.svg" alt="" class="img-fluid">
                                              </span>
                                              <span class="app-brand-text demo menu-text fw-bolder ms-2 text-uppercase">POS</span> -->
                                              <span class="app-brand-text demo menu-text fw-bolder text-uppercase">{{ storeData.name }}</span>
                                            </div>
                                            <p class="mb-0">Address: {{ orderData?.store?.address }}</p>
                                            <p class="mb-0">Phone: {{ orderData?.store?.phone }}</p>
                                          </div>
                                          <div>
                                            <h4 class="text-wrap m-0">Invoice No:  {{ orderData.invoice_no }}</h4>
                                            <div class="mb-2">
                                              <span class="me-1">Date:</span>
                                              <span class="fw-medium">{{ orderData.created_at }}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <hr class="my-0">
                                      <div class="card-body">
                                        <h6 class="pb-0"> <strong> Customer: </strong></h6>
                                          <table class="table">
                                            <tbody>
                                              <tr>
                                                <td class="pe-3">Name: </td>
                                                <td>{{orderData?.customer?.name}}</td>
                                              </tr>
                                              <tr>
                                                <td class="pe-3">Type: </td>
                                                <td>{{ orderData?.customer_type }}</td>
                                              </tr>
                                              <tr>
                                                <td class="pe-3">Phone:</td>
                                                <td>{{ orderData?.customer?.phone }}</td>
                                              </tr>
                                              <tr>
                                                <td class="pe-3">Address:</td>
                                                <td>{{ orderData?.customer?.address }}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                      </div>
                                      <div class="">
                                        <table class="table text-center">
                                          <thead>
                                            <tr>
                                              <th>Id</th>
                                              <th>Name</th>
                                              <th>Qty </th>
                                              <th>Price </th>
                                              <!-- <th>Quantity</th> -->
                                              <th>Total</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="(dataItem, index) in orderData.order_items" :key="index">
                                              <td>{{ index + 1}}</td>
                                              <td>{{ dataItem?.product_name }}</td>                
                                              <td>{{ dataItem.quantity }} </td>
                                              <td>{{ dataItem.sell_price }}</td>
                                              <!-- <td></td> -->
                                              <td>{{ dataItem.total }}</td>
                                            </tr>
                                          </tbody>
                                          <tfoot> 
                                            <tr>
                                              <th colspan="4" class="text-end">Total =</th>
                                              <th>{{ orderData.total }}</th>
                                            </tr>
                                            <tr>
                                              <th colspan="4" class="text-end">Discount = </th>
                                              <th>{{ orderData.discount }}</th>
                                            </tr>
                                            <tr>
                                              <th colspan="4" class="text-end">Sub Total =</th>
                                              <th>{{ orderData.sub_total }}</th>
                                            </tr>
                                          
                                          </tfoot>
                                        </table>
                                      </div>
                                      <div class="card-body">
                                        <div class="row">
                                          <div class="col-12">
                                            <!-- <span class="fw-medium">Note:</span> -->
                                            <span class="text-wrap">Design & Developed by <strong>PhicsArt</strong>! &nbsp;<img src="https://phicsart.com/uploads/images/top-page/menu/logo.svg" alt="" class="img-fluid " style="max-width: 13px;"> </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  </div> 
                                </div>
                                <!-- /Invoice -->
                                <!-- Invoice Actions  -->
                                <div class="col-xl-3 col-md-4 col-12 invoice-actions">
                                  <div class="card mb-3">
                                    <div class="card-body">
                                      <button class="btn btn-primary d-grid w-100 mb-3" data-bs-toggle="offcanvas" data-bs-target="#sendInvoiceOffcanvas" @click="printInvoice('print')">
                                        <span class="d-flex align-items-center justify-content-center text-nowrap"><i class="bx bx-printer"></i> &nbsp; Print A4</span>
                                      </button>
                                      <button class="btn btn-default border d-grid w-100 mb-3" data-bs-toggle="offcanvas" data-bs-target="#sendInvoiceOffcanvas" @click="printInvoice('80mm')">
                                        <span class="d-flex align-items-center justify-content-center text-nowrap"><i class="bx bx-printer"></i> &nbsp; Print 80MM</span>
                                      </button>
                                      <button class="btn btn-default border d-grid w-100 mb-3" data-bs-toggle="offcanvas" data-bs-target="#sendInvoiceOffcanvas" @click="printInvoice('57mm')">
                                        <span class="d-flex align-items-center justify-content-center text-nowrap"><i class="bx bx-printer"></i> &nbsp; Print 57MM</span>
                                      </button>
                                      <button class="btn btn-label-secondary btn-default border d-grid w-100 mb-3" @click="downloadInvoice(orderData)">
                                        <span class="d-flex align-items-center justify-content-center text-nowrap"><i class="bx bx-download"></i> &nbsp; PDF Download</span>
                                      </button>
                                      <button class="btn btn-label-secondary border d-grid w-100 mb-3">
                                        <span class="d-flex align-items-center justify-content-center text-nowrap"><i class="bx bx-paper-plane bx-xs me-1"></i>Send Mail</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <!-- /Invoice Actions -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- form..  -->                 
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <!-- / Footer -->

      <div class="content-backdrop fade"></div>
    </div>
    <!-- / Layout wrapper -->
  </div>
  <div class="">
   <!-- Basic Layout & Basic with Icons -->
     <!-- Order invoice -->
 </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// import CkEditor from "../../../components/Ckeditor.vue";
import axios from '../../node_modules/axios/index';
import { useStore } from 'vuex'; // Import useStore from Vuex
import { DOAMIN_PATH } from '@/api';
import Footer from './FooterView.vue';
import TopBarView from './TopBarView.vue';
import * as html2pdf from 'html2pdf.js';

export default defineComponent({
name: "invoice-view", // Rename the component to a multi-word name
components: { Footer, TopBarView},
 data() {
   const store = useStore();
   const token = store.state.auth.token || localStorage.getItem('token');
   const userId = store.state.auth.userId || localStorage.getItem('userId');
   const storeId = store.state.auth.storeId || localStorage.getItem('storeId');
   const storeData = store.state.auth.defaultStoreData || localStorage.getItem('defaultStoreData');
   const baseURL = process.env.VUE_APP_BASE_URL;
  const apiUrl = process.env.VUE_APP_API_URL;
  const fileUrl = process.env.VUE_APP_FILE_URL;
   return {
        baseURL,
        apiUrl,
        fileUrl,
       successReport: false,
       storeId,
       itemId: '',
        store,
        token,
        userId, 
        storeData: JSON.parse(storeData),
        orderData: {
          id: 0,
          customer_id: '',
          user_id: '',
          store_id: '',
          invoice_no: "",
          customer_type: "",
          total: 0,
          discount: 0,
          due: 0,
          sub_total: 0,
          payment: "",
          created_at: "",
          customer_phone: "",
          customer_name: "",
          customer_address: "",
          customer: {
            id: null,
            name: '',
            phone: "",
            address: "",
            thumb: '',
            nid_no: '',
            date_of_birth: '',
          },
          order_items: [
            {
              id: null,
              buy_price: Number,
              sell_price: Number,
              quantity: Number,
              discount: Number,
              total: Number,
              order_id: Number,
              product_id: Number,
              product_name: "",
              customer_id: Number,
              user_id: Number,
              store_id: Number,
            }
          ],
          store: {
            id: 0,
            name: "",
            email: null,
            phone: "",
            address: '',
            logo: '',
          },
        },
        loading: false,
   }
 },

watch: {
 '$route.params.id': {
   immediate: true,
   handler(newVal) {
     if (newVal) {
       this.fetchData(newVal);
       this.itemId = newVal;
     }
   },
 },
},
methods: {
  async fetchData(id: number) {
      try {
        this.loading = true;
        if (!this.token) {
          throw new Error('Token not found');
        }
        const response = await (axios as any).get(DOAMIN_PATH + `order/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,  
            //UserId: this.userId,
            StoreId: this.storeId,
          },
        });
        if (response.status === 200) {
          const orderData = response.data.data;
  
          // Format numerical properties to two decimal places
          orderData.total = parseFloat(orderData.total).toFixed(2);
          orderData.payment = parseFloat(orderData.payment).toFixed(2);
          orderData.discount = parseFloat(orderData.discount).toFixed(2);
          orderData.sub_total = parseFloat(orderData.sub_total).toFixed(2);
          this.orderData = orderData;          
          const date = new Date(this.orderData.created_at);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        // Assign the formatted date to the data property
          this.orderData.created_at = formattedDate,
          this.orderData.order_items = response.data.data.order_items.map((product: { sell_price: string; total: string; }) => ({
            ...product,
            sell_price: parseFloat(product.sell_price).toFixed(2),
            total: parseFloat(product.total).toFixed(2),
          }));
          this.loading = false;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async downloadInvoice(invoice: any) {
    const element = document.getElementById('invoice-container');
    const invoiceNumber = invoice.invoice_no;

    // Generate the PDF content using html2pdf
    const pdfBlob = await html2pdf(element).output('blob');

    // Create a Blob URL for the PDF content
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;

    // Set the download attribute with the desired filename
    downloadLink.download = `${invoiceNumber}.pdf`;

    // Append the download link to the document
    document.body.appendChild(downloadLink);

    // Trigger a click event on the download link to start the download
    downloadLink.click();

    // Wait for a short delay before removing the download link
    setTimeout(() => {
      // Remove the download link from the document
      document.body.removeChild(downloadLink);
    }, 100); // Adjust the delay as needed
  },

    async printInvoice(paperSize: string) {

      // Choose the template based on the selected paper size
      if (paperSize === '57mm') {       
        const element57mm = document.getElementById('invoice-container-57mm');
          if (element57mm) {
          // Create a new window and copy the content of the element
          const printWindow = window.open('');
          if (printWindow) {
            // printWindow.document.write('<html><head><link rel="icon" href="https://phicsart.com/uploads/images/top-page/menu/logo.svg"> <link rel="icon" type="image/x-icon" href="./assets/img/favicon/favicon.ico" /> <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/fonts/boxicons.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/core.css" class="template-customizer-core-css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/theme-default.css" class="template-customizer-theme-css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/css/demo.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/apex-charts/apex-charts.css" /> <title>Print</title></head><body>');
            // printWindow.document.write(element.innerHTML);
            // printWindow.document.write('</body></html>');
            // printWindow.document.close();

            // // Add a load event listener to ensure the content is fully loaded before printing
            // printWindow.onload = () => {
            //   printWindow.print();
            //   printWindow.onafterprint = () => {
            //     printWindow.close();
            //   };
            // };
            printWindow.document.write('<html><head><link rel="icon" href="https://phicsart.com/uploads/images/top-page/menu/logo.svg"> <link rel="icon" type="image/x-icon" href="./assets/img/favicon/favicon.ico" /> <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/fonts/boxicons.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/core.css" class="template-customizer-core-css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/theme-default.css" class="template-customizer-theme-css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/css/demo.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/apex-charts/apex-charts.css" /><title>Print</title>');
            // Add CSS styles for print media
            printWindow.document.write(`
              <style>
                @media print {
                  body {
                    margin: 20px; /* Reset margin for print */
                    font-size: 10px !important; /* Adjust the font size as needed */
                    width: 57mm; /* Ensure the content fits within the paper size */
                  }

                  /* Add more print styles here based on the paper size */
                  @page {
                    size: 80mm; /* Set the paper size */
                    margin: 20px; /* Set margins as needed */
                  }

                  /* Add other print styles specific to your design */
                  /* Example: */
                  #${element57mm} {
                    width: 80mm; /* Ensure the content fits within the paper size */
                    font-size: 8px; /* Adjust the font size as needed */
                  }
                  #invoice-container-80mm p, h4{
                    font-size: 10px;
                  }
                  #invoice-container-80mm h4{
                  margin-bottom: 0;
                  padding: 0;
                  }
                  .card {
                      background-clip: padding-box;
                      box-shadow: none;
                  }
                  .card-body{
                  margin: 0;
                  padding: 0;
                  }
                  .card-body h6{
                  margin: 0;
                  padding: 0;
                  font-size: 10px;
                  }
                  .table > thead{
                    border-style: hidden;
                    color: black;
                  }
                  .table:not(.table-dark) th{
                    color: black;
                  }
                  .table > tr > td{
                    border-style: unset;
                    border-width: 0;
                    font-size: 10px;
                    font-weight: 1000;
                    color: black;
                    border-bottom-width: 0px;
                  }
                  .table > :not(caption) > * > *{
                    border-style: hidden;
                    border-bottom-width: 0px;
                  }
                  .table > :not(caption) > * > *{
                    padding: 5px 0;
                    font-size: 10px;
                    color: black;
                  }
                }
              </style>
            `);

            // Copy the content of the element
            printWindow.document.write('</head><body>');
            printWindow.document.write(element57mm.innerHTML);
            printWindow.document.write('</body></html>');

            printWindow.document.close();

            // Add a load event listener to ensure the content is fully loaded before printing
            printWindow.onload = () => {
              printWindow.print();
              printWindow.onafterprint = () => {
                printWindow.close();
              };
            };
          }
          }
      } 
      else if (paperSize === '80mm') {
        const element80mm = document.getElementById('invoice-container-80mm');
          if (element80mm) {
          // Create a new window and copy the content of the element
          const printWindow = window.open('');
          if (printWindow) {
            // printWindow.document.write('<html><head><link rel="icon" href="https://phicsart.com/uploads/images/top-page/menu/logo.svg"> <link rel="icon" type="image/x-icon" href="./assets/img/favicon/favicon.ico" /> <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/fonts/boxicons.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/core.css" class="template-customizer-core-css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/theme-default.css" class="template-customizer-theme-css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/css/demo.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/apex-charts/apex-charts.css" /> <title>Print</title></head><body>');
            // printWindow.document.write(element.innerHTML);
            // printWindow.document.write('</body></html>');
            // printWindow.document.close();

            // // Add a load event listener to ensure the content is fully loaded before printing
            // printWindow.onload = () => {
            //   printWindow.print();
              
            //   printWindow.onafterprint = () => {
            //     printWindow.close();
            //   };
            // };
            printWindow.document.write('<html><head><link rel="icon" href="https://phicsart.com/uploads/images/top-page/menu/logo.svg"> <link rel="icon" type="image/x-icon" href="./assets/img/favicon/favicon.ico" /> <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/fonts/boxicons.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/core.css" class="template-customizer-core-css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/theme-default.css" class="template-customizer-theme-css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/css/demo.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/apex-charts/apex-charts.css" /><title>Print</title>');
            // Add CSS styles for print media
            printWindow.document.write(`
              <style>
                @media print {
                  body {
                    margin: 20px; /* Reset margin for print */
                    font-size: 10px !important; /* Adjust the font size as needed */
                    width: 80mm; /* Ensure the content fits within the paper size */
                  }

                  /* Add more print styles here based on the paper size */
                  @page {
                    size: 80mm; /* Set the paper size */
                    margin: 20px; /* Set margins as needed */
                  }

                  /* Add other print styles specific to your design */
                  /* Example: */
                  #${element80mm} {
                    width: 80mm; /* Ensure the content fits within the paper size */
                    font-size: 8px; /* Adjust the font size as needed */
                  }
                  #invoice-container-80mm p, h4{
                    font-size: 10px;
                  }
                  #invoice-container-80mm h4{
                  margin-bottom: 0;
                  padding: 0;
                  }
                  .card {
                      background-clip: padding-box;
                      box-shadow: none;
                  }
                  .card-body{
                  margin: 0;
                  padding: 0;
                  }
                  .card-body h6{
                  margin: 0;
                  padding: 0;
                  font-size: 10px;
                  }
                  .table > thead{
                    border-style: hidden;
                    color: black;
                  }
                  .table:not(.table-dark) th{
                    color: black;
                  }
                  .table > tr > td{
                    border-style: unset;
                    border-width: 0;
                    font-size: 10px;
                    font-weight: 1000;
                    color: black;
                    border-bottom-width: 0px;
                  }
                  .table > :not(caption) > * > *{
                    border-style: hidden;
                    border-bottom-width: 0px;
                  }
                  .table > :not(caption) > * > *{
                    padding: 5px 0;
                    font-size: 10px;
                    color: black;
                  }
                }
              </style>
            `);

            // Copy the content of the element
            printWindow.document.write('</head><body>');
            printWindow.document.write(element80mm.innerHTML);
            printWindow.document.write('</body></html>');

            printWindow.document.close();

            // Add a load event listener to ensure the content is fully loaded before printing
            printWindow.onload = () => {
              printWindow.print();
              printWindow.onafterprint = () => {
                printWindow.close();
              };
            };
          }
          }
      }
       else {
         // Default to A4 size
        let elementA4 = document.getElementById('invoice-container');
       if(elementA4){
          const printWindow = window.open('');
          if (printWindow) {
            printWindow.document.write('<html><head><link rel="icon" href="https://phicsart.com/uploads/images/top-page/menu/logo.svg"> <link rel="icon" type="image/x-icon" href="./assets/img/favicon/favicon.ico" /> <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/fonts/boxicons.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/core.css" class="template-customizer-core-css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/css/theme-default.css" class="template-customizer-theme-css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/css/demo.css" /><link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" /> <link rel="stylesheet" href="https://pos.phicsart.com/assets/vendor/libs/apex-charts/apex-charts.css" /><title>Print</title>');
            // Add CSS styles for print media
            printWindow.document.write(`
              <style>
                @media print {
                  body {
                    margin: 20px; /* Reset margin for print */
                    font-size: 10px !important; /* Adjust the font size as needed */
                   /* width: A4;  Ensure the content fits within the paper size */
                   background-color: white !important;
                  }

                  /* Add more print styles here based on the paper size */
                  @page {
                     /*size: 80mm; Set the paper size */
                    /* margin: 20px; Set margins as needed */
                  }

                  /* Add other print styles specific to your design */
                  /* Example: */
                  #${elementA4} {
                    /* width: 80mm; Ensure the content fits within the paper size */
                     /* font-size: 8px;Adjust the font size as needed */
                  }
                }
              </style>
            `);

            // Copy the content of the element
            printWindow.document.write('</head><body>');
            printWindow.document.write(elementA4.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            // Add a load event listener to ensure the content is fully loaded before printing
            printWindow.onload = () => {
              printWindow.print();
              
              printWindow.onafterprint = () => {
                printWindow.close();
              };
            };
          }
       }        
      }

      // ... rest of your code remains unchanged ...
    }
},
mounted() {
 // Set isLoading to true when the component is mounted
//  console.log('_user_id_', this.storeData);
//  console.log('Base URL:', this.baseURL);
//   console.log('API URL:', this.apiUrl);
//   console.log('File URL:', this.fileUrl);
console.log(typeof this.orderData.total);
  },
})
</script>