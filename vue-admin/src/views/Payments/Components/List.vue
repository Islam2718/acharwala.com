<template>
  <div>
    <!-- search form start  -->
    <div class="card mb-4">
      <div class="card-body">    
        <div class="row">
          <div class="input-group">
            <!-- <div class="input-group-prepend">
              <select class="form-select" aria-label="Default select example">
                    <option selected>Search By-</option>
                    <option value="1">Beximco</option>
                    <option value="2">Pran RFL </option>
                    <option value="3">ACME </option>
              </select>  
            </div> -->
            <input type="text" class="form-control w-25" placeholder="Enter Search Key !">
            <!-- <span class="input-group-text" id="basic-addon1">From</span>
            <input type="date" class="form-control" placeholder="Enter Search Key !">
            <span class="input-group-text" id="basic-addon1">To</span>
            <input type="date" class="form-control" placeholder="Enter Search Key !"> -->
            <button type="button" class="btn btn-primary me-1 ms-1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
            <button type="button" class="btn btn-default border"><font-awesome-icon :icon="['fas', 'broom']" /></button>            
          </div>
        </div>
      </div>
    </div>
    <!-- search form end  -->
    <!-- table start  -->
    <div class="card mb-4 d-none d-md-block">
      <div class="card-body">
        <div class="d-flex justify-content-center align-items-center" v-if="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="table-responsive text-nowrap" v-else>
          <table class="table card-table" v-if="fettchDataArray.length > 0">
            <thead>
              <tr>
                <th>Id</th>
                <!-- <th v-if="userData?.type=='SUPERADMIN'">Company</th> -->
                <th>Payment Type</th>
                <th>Bill</th>
                <th>Payment</th>
                <th>Due</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="(dataItem, index) in fettchDataArray" :key="dataItem.id">
                <td>{{ index + 1 }}</td>
                <!-- <td v-if="userData?.type=='SUPERADMIN'">{{ dataItem.store?.name }}</td> -->
                <td>{{ dataItem.payment_type }}</td>
                <td>{{ dataItem.bill_total }}</td>
                <td>{{ dataItem.payment }}</td>
                <td>{{ dataItem.due }}</td>
                <td>{{ formatDateTime (dataItem.created_at) }}</td>
                <td>
                  <!-- <button type="button" class="me-2 btn btn-sm btn-warning" @click="editItem(dataItem.id.toString())">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </button> -->
                  <!-- <button type="button" class="me-2 btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="deleteclick(dataItem.id, dataItem.user_id)">
                    Delete
                  </button> -->
                  <button type="button" class="me-2 btn btn-sm btn-primary" 
                    data-bs-toggle="modal" data-bs-target="#modalCenter"
                    @click="fetchItem(dataItem)"
                  >
                  <font-awesome-icon :icon="['fas', 'fa-eye']" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <h5 class="text-center mb-0">Please Sale Some Product First</h5>
          </div>
        </div>
      </div> 
    </div>
    <div class="mobile-view d-block d-md-none">
      <div  v-if="fettchDataArray.length > 0">
        <div class="card mb-4" v-for="dataItem in fettchDataArray" :key="dataItem.id">
          <div class="card-body">
          <strong>Type: {{ dataItem.payment_type }}</strong><br/>
          <span class="text-wrap">Total Bill: {{ dataItem.bill_total }}</span><br/>
          <span class="text-wrap">Payment: {{ dataItem.payment }}</span><br/>
          <span class="text-wrap">Due: {{ dataItem.due }}</span><br/>
          <p>Date: {{ formatDateTime (dataItem.created_at) }}</p>
          <button type="button" class="me-2 btn btn-sm btn-primary" 
            data-bs-toggle="modal" data-bs-target="#modalCenter"
            @click="fetchItem(dataItem)"
          >
          <font-awesome-icon :icon="['fas', 'fa-eye']" />
          </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <div class="card-body">
            <h5 class="text-center mb-0 text-wrap">Please Sale Some Product First</h5>  
          </div>
        </div> 
      </div>
    </div>
    <!-- // table end -->
    <!-- pagination start  -->
    <div class="card" v-if="fettchDataArray.length > 0">
      <div class="card-body d-flex justify-content-around flex-wrap">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <!-- Previous button -->
            <!-- <li class="page-item" @click="previousPage">
              <a class="page-link"><i class="tf-icon bx bx-chevron-left"></i></a>
            </li> -->

            <!-- Page buttons -->
              <li v-for="(page, index) in paginationData.links" :key="index" class="page-item myPagination" :class="{ active: page.active }">
                <button class="page-link" @click="goToPage(Number(page.label))" v-html="page.label"></button>
              </li>
            <!-- Next button -->
            <!-- <li class="page-item" @click="nextPage">
              <a class="page-link"><i class="tf-icon bx bx-chevron-right"></i></a>
            </li> -->
          </ul>
        </nav>
        <div class="row">
          <div class="col-12">
            <div class="input-group ">
              <label class="input-group-text" for="inputGroupSelect01">Size</label>
              <select class="form-select" id="inputGroupSelect01" v-model="pageSize" @change="fetchData">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      </div> 
    </div>
    <!-- // pagination end -->
    <!-- Delete Confirm Modal -->
    <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <h5 class="modal-title text-center" id="modalCenterTitle">Payment Type: {{ deletevalue.payment_type }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="mb-4">
            <div class="card-body"> 
              <span class="text-wrap">Total Bill: {{ deletevalue.bill_total }}</span><br/>
              <span class="text-wrap">Payment: {{ deletevalue.payment }}</span><br/>
              <span class="text-wrap">Due: {{ deletevalue.due }}</span><br/>
              <p>Date: {{ formatDateTime (deletevalue.created_at) }}</p>
              <strong>Customer Info: </strong> <br>
               <p class="mb-0" v-if="deletevalue.customer?.name">Name: {{ deletevalue.customer?.name }}</p>
               <p class="mb-0"  v-if="deletevalue.customer?.phone">Phone: {{ deletevalue.customer?.phone }}</p>
               <p class="mb-0" v-if="deletevalue.customer_type">Customer Type: {{ deletevalue.customer_type }}</p>
               <p class="mb-0" v-if="deletevalue.customer?.email">Email: {{ deletevalue.customer?.email }}</p>
               <p class="mb-0"  v-if="deletevalue.customer?.address ">Address: {{ deletevalue.customer?.address }}</p>
               <p class="" v-if="deletevalue.customer?.nid_no">Nid No: {{ deletevalue.customer?.nid_no }}</p> <br>
              <p class="mb-0"> <strong> Order Info: </strong></p> 
               <p class="mb-0" v-if="deletevalue.customer?.name" data-bs-dismiss="modal">Invoice Number: <router-link :to="`/invoice/${deletevalue.order?.id}`" class="text-decoration-none text-primary">{{ deletevalue.order?.invoice_no }}</router-link> </p>
               <p class="mb-0"  v-if="deletevalue.order?.total">Discount: {{ (parseFloat(deletevalue.order?.total)?.toFixed(2) - parseFloat(deletevalue.order?.sub_total)?.toFixed(2)).toFixed(2) }} </p>
            </div>
          </div>          
          <div class="modal-footer text-center justify-content-center">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Close
            </button>            
          </div>
        </div>
      </div>
    </div>
    <!-- modal end  -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex'; // Import useStore from Vuex
import { DOAMIN_PATH } from "@/api";
interface FettchData {
  id: number;
  payment_type: string;
  payment_method: string;
  customer_type: string;
  bill_total: number;
  payment: number;
  due: number;
  order_id: number;
  customer_id: number;
  status: string;
  user_id: number;
  store_id: number;
  created_at: string;
  store: any;
  user: any;
}

export default defineComponent({
  name: "CategoryList", // Rename the component to a multi-word name
  data() {
    const store = useStore();
    const token = store.state.auth.token || localStorage.getItem('token');
    const userData = store.state.auth.userData || localStorage.getItem('userData');
    const storeId = store.state.auth.storeId || localStorage.getItem('storeId');
    return {      
      store,
      token,
      userData,
      storeId,
      fettchDataArray: [] as FettchData[], // Explicitly define the type as Post[] // Explicitly define the type as Post[]
      // fettchDataArray:[{
      //   id: 0,
      //   payment_type: '',
      //   payment_method: '',
      //   customer_type: '',
      //   bill_total: 0,
      //   payment: 0,
      //   due: 0,
      //   order_id: 0,
      //   customer_id: 0,
      //   status: '',
      //   user_id: 0,
      //   store_id: 0,
      //   created_at: '',
      //   store: {
      //     id: 0,
      //     name: ''
      //   },
      //   user: {
      //     id: 0,
      //     type: '',
      //     firstname: '',
      //     lastname: ''
      //   }
      // }], // Explicitly define the type as Post[] // Explicitly define the type as Post[]
      deletevalue: {
        id: 0,
        payment_type: '',
        payment_method: '',
        customer_type: '',
        bill_total: Number,
        payment: Number,
        due: Number,
        order_id: Number,
        customer_id: Number,
        status: '',
        user_id: Number,
        store_id: Number,
        created_at: '',
        user: {
            id: Number,
            name: "",
            email: "",
            email_verified_at: "",
            phone: Number,
            firstname: '',
            lastname: '',
            profile_img: null,
            type: '',
            facebook_id: null,
            google_id: null,
            created_at: '',
            updated_at: ''
        },
        store: {
            id: Number,
            store_id: Number,
            name: '',
            email: '',
            phone: 123456789,
            address: '',
            logo: '',
            cover_img: '',
            is_default: Number,
            user_id: Number,
            created_at: '',
            updated_at: '',
        },
        customer: {
            id: Number,
            name: '',
            email: '',
            phone: '',
            address: '',
            nid_no: "",
            date_of_birth: "",
        },
        order: {
            id: Number,
            invoice_no: '',
            customer_type: '',
            total: Number,
            discount: Number,
            sub_total: Number,
            payment: Number,
            customer_id: Number,
            user_id: Number,
            store_id: Number,
            created_at: '',
            updated_at: ''
        }
      },
      isDataTrueList: true,
      id: '',
      loading: true,
      pageSize: 10, // set a default value
      currentPage: 1, // set a default value
      paginationData: {
        links: [
          {
            label: '',
            url: '',
            active: '',
          }
        ],
        prev_page: 0,
        next_page: 0,
        total: 0,
        per_page: 0,
        current_page: 0,
        last_page: 0,

      }, // Object to store pagination data      
    };
  },
  methods: {
    formatDateTime(isoString: string | number | Date) {
      const date = new Date(isoString);

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // timeZoneName: 'short',
      };

      return date.toLocaleString(undefined, options);
    },
    async fetchAllData() {
      try {
        this.loading = true;
        if (!this.token) {
            throw new Error('Token not found');
          }
          const response = await axios.get(DOAMIN_PATH + 'payment',
          {
            params: {
              page: this.currentPage,
              size: this.pageSize,
            },
            headers: {
              Authorization: `Bearer ${this.token}`,
              StoreId: this.storeId
            }
          }
          );
        if (response.status === 200) {
          const fettchDataArray = response.data.data.data;
          this.paginationData = response.data.data;
          this.loading = false;
          this.fettchDataArray = fettchDataArray;
          // const date = new Date(fettchDataArray.created_at);
          // const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        // Assign the formatted date to the data property
          // fettchDataArray.created_at = formattedDate;
          // this.fettchDataArray = fettchDataArray.map((item: any) => {
          //   const date = new Date(item.created_at);
          //   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")} GMT`;
          //   return {
          //     ...item,
          //     created_at: formattedDate
          //   };
          // });
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    

    // Delete areas data
    async fetchItem(item: any) {
      this.deletevalue = item;
      console.log("deletevalue", this.deletevalue);
    },
    async deleteItem(id: number) {
      try {
        const response = await (axios as any).delete(DOAMIN_PATH + 'payment/'+id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

        if (response.status == 200) {
          console.log('_delete_success', response);
          this.fetchAllData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    // sendData(id: string) {
    //   this.$emit('data-emitted', {
    //     isDataTrueList: this.isDataTrueList,
    //     id,
    //   });
    // },

    editItem(id: any) {
      // Navigate to the edit route with the ID parameter
      this.$router.push({ params: { id } });
    },
    // pagination function
    async fetchData() {
    // Optionally, you can reset the current page to 1 when the page size changes
    // this.currentPage = 1;
    await this.fetchAllData();
    },
    goToPage(pageOrLabel: string | number | null) {
      
      if (pageOrLabel === "Next »" || pageOrLabel === "&laquo; Previous") {
        console.log('Skipping Next/Previous');
        return;
      }
      if (typeof pageOrLabel === 'number') {
        console.log('Setting currentPage  :', pageOrLabel);
        this.currentPage = pageOrLabel;
        console.log('curentPage:', this.currentPage);
        this.fetchAllData();
      } else if (pageOrLabel) {
        const match = pageOrLabel.match(/page=(\d+)/);
        if (match) {
          console.log('else id match:', parseInt(match[1]));
          this.currentPage = parseInt(match[1]);
        }
      }
      this.fetchAllData();
    },
    // Add methods to navigate to the previous and next pages
    previousPage() {
      if (this.paginationData.current_page > 1) {
        this.currentPage = this.paginationData.current_page - 1;
        this.fetchAllData();
      }
    },

    nextPage() {
      if (this.paginationData.current_page < this.paginationData.last_page) {
        this.currentPage = this.paginationData.current_page + 1;
        this.fetchAllData();
      }
    },
  },
  mounted() {
    this.fetchAllData();
  },
});
</script>