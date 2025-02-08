<template>
  <div>
    <!-- search form start  -->
    <div class="card mb-4">
      <div class="card-body">    
        <div class="row">
          <div class="input-group">
            <div class="input-group-prepend">
              <select name="category" id="" class="form-select" v-model="category_id">
                <option value="">Select Category</option>
                <option :value="category.id" v-for="category in categoryData" :key="category.id">{{ category.name }}</option>
              </select>
            </div>
            <input type="text" class="form-control w-25" placeholder="Enter Search Key !" v-model="searchKey">
            <!-- <div class="input-group"> -->
                <!-- <span class="input-group-text" id="basic-addon1">From</span>
                <input type="date" class="form-control" placeholder="Enter Search Key !">
                <span class="input-group-text" id="basic-addon1">To</span>
                <input type="date" class="form-control" placeholder="Enter Search Key !"> -->
            <!-- </div> -->
            <button type="button" class="btn btn-primary me-1 ms-1" @click="searchData"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
            <button type="button" class="btn btn-default border" @click="searchKey = '', fetchAllData()"><font-awesome-icon :icon="['fas', 'broom']" /></button>               
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
        <div class="table-responsive" v-else>
          <table class="table card-table text-center" v-if="fettchDataArray.length > 0">
            <thead>
              <tr>
                <th>Id</th>
                <th class="text-start mx-0">Category &mdash; Product Name </th>
                <th>Status</th>
                <th v-if="userData?.type === 'SUPERADMIN'">Action</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="(dataItem, index) in fettchDataArray" :key="dataItem.id">
                <td>{{ index + 1 }}</td>
                <td className="text-start px-0">
                  <i>{{ dataItem.category.name }}</i> &mdash;
                  {{ dataItem.name }}  
                </td>
                <td>{{ dataItem.status }}</td>
                <td v-if="userData?.type == 'SUPERADMIN'">
                  <router-link class="me-2 btn btn-sm btn-info" :to="{ name: 'status-form', params: { id: dataItem.id.toString() } }">
                    <font-awesome-icon :icon="['fas', 'fa-eye']" />
                  </router-link>
                  <router-link class="me-2 btn btn-sm btn-primary" :to="{ name: 'product-form', params: { id: dataItem.id.toString() } }">
                    <font-awesome-icon :icon="['fas', 'fa-edit']" />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <h5 class="text-center mb-0">Please Add Some Product</h5>
          </div>
        </div>
      </div>
    </div>
    <!-- // table end -->
    <div class="mobile-view d-block d-md-none">
      <div class=" card" v-if="loading">
        <div class="card-body">
          <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="fettchDataArray.length > 0">
        <div class="card mb-4" v-for="dataItem in fettchDataArray" :key="dataItem.id">
          <div class="card-body">
          <strong class="text-wrap"> Product Name: {{ dataItem.name }}</strong><br/>
          <p class="mb-0 text-wrap">Category / Generic: {{ dataItem.category.name }}</p>
          <button type="button" class="me-2 btn btn-sm btn-warning" @click="editItem(dataItem.id.toString())">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </button>
          <button type="button" class="me-2 btn btn-sm btn-danger" 
            data-bs-toggle="modal" data-bs-target="#modalCenter"
            @click="fetchItem(dataItem)"
          >
            <font-awesome-icon :icon="['fas', 'trash-can']" />
          </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <div class="card-body">
            <h5 class="text-center mb-0">Please Add Some Product</h5>
          </div>
        </div>
      </div>      
    </div>
    <!-- pagination start  -->
    <div class="card"  v-if="fettchDataArray.length > 0">
      <div class="card-body d-flex justify-content-around flex-wrap">
        <nav aria-label="Page navigation">
          <ul class="pagination flex-wrap">
              <li v-for="(page, index) in paginationData.links" :key="index" class="page-item myPagination m-1" :class="{ active: page.active }">
                <button class="page-link" @click="goToPage(Number(page.label))" v-html="page.label"></button>
              </li>
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
                <option value="500">500</option>
              </select>
            </div>
          </div>
        </div>
      </div> 
    </div>
    <!-- // pagination end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex'; // Import useStore from Vuex
interface mappingData {
  id: number,
  name: string,
  slug: string,
  description : string,
  short_description : string,
  thumb: string,
  images: string,
  price: number,
  // sell_price: number,
  // alert_quantity: number,
  web_url: string,
  status: number,

  category_id : number,  
  category: {
    id: number,
    name: "",
  }
  user_id: number,
  user: {
    id: number,
    type: string,
    firstname: string,
    lastname: string
  },
}
interface CustomHeaders {
  Authorization: string;
  UserId?: any;
  StoreId?: string;
  TypeId?: string;
}
interface categoryData {
  id: number,
  name: string,
  description : string,
  thumb: string,
  user_id: string,
  user: {
    id: number,
    type: string,
    firstname: string,
    lastname: string
  }
}
export default defineComponent({
  name: "CategoryList", // Rename the component to a multi-word name
  data() {
    const store = useStore();
    const token = store.state.auth.token || localStorage.getItem('token');
    let userData = store.state.auth.userData || localStorage.getItem('userData');
    userData = JSON.parse(userData);
    return {      
      // store,
      token,
      userData,
      searchKey: '',
      category_id: '',
      // storeId,
      // typeId,
      fettchDataArray: ref([] as mappingData[]), 
      categoryData: ref([] as categoryData[]), 
      deletevalue: {
        id: 0,
        name: "",
      },
      isDataTrueList: true,
      id: '',
      loading: true, 
      pageSize: 10,
      currentPage: 1,
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
    async fetchAllData() {
      try {
        this.loading = true;        
        if (!this.token) {
            throw new Error('Token not found');
          }

          const headers: CustomHeaders = { Authorization: `Bearer ${this.token}` };
          const response = await axios.get(process.env.VUE_APP_API_URL + 'product',
          {
            params: {
              page: this.currentPage,
              size: this.pageSize,
            },
            headers: {
              ...headers,
            }
          }
          );
        if (response.status === 200) {
          this.fettchDataArray = response.data.data.data;
          this.paginationData = response.data.data;
          this.loading = false;
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
        const response = await (axios as any).delete(process.env.VUE_APP_API_URL + 'product/'+id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

        if (response.status == 200) {
          this.fetchAllData();
        }
      } catch (error) {
        console.error(error);
      }
    },
      sendData(id: string) {
        this.$emit('data-emitted', {
          isDataTrueList: this.isDataTrueList,
          id,
        });
      },

    editItem(id: any) {
      this.$router.push({ params: { id } });
    },
    async fetchData() {
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
    async searchData() {
      try {
        this.loading = true;
        if (!this.token) {
            throw new Error('Token not found');
          }
          const response = await axios.get(process.env.VUE_APP_API_URL + 'product',
          {
            params: {
              "search-key": this.searchKey,
              category: this.category_id,
              // from_date: this.fromDate,
              // to_date: this.toDate,
            },
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
          );
        if (response.status === 200) {
          this.fettchDataArray = response.data.data.data;
          this.paginationData = response.data.data;
          this.loading = false; 
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async fetchCategory() {
      try {
        this.loading = true;
        if (!this.token) {
            throw new Error('Token not found');
          }
          const response = await axios.get(process.env.VUE_APP_API_URL + 'category',
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
          );
        if (response.status === 200) {
          this.categoryData = response.data.data.data;
          this.loading = false; 
        }
        } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchAllData();
    this.fetchCategory();
  },
});
</script>