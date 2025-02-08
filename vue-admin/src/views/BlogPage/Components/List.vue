<template>
  <div>
    <!-- search form start  -->
    <div class="card mb-4">
      <div class="card-body">    
        <div class="row">
          <div class="input-group">
            <input type="text" class="form-control w-25" placeholder="Enter Search Key !" v-model="searchKey">
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
                <th>Name</th>
                <th>title</th>
                <th>Slug</th>
                <th>Status</th>
                <th v-if="userData?.type === 'SUPERADMIN'">Action</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="(dataItem, index) in fettchDataArray" :key="dataItem.id">
                <td>{{ index + 1 }}</td>
                <td>{{ dataItem.name }}</td>
                <td>{{ dataItem.title }}</td>
                <td>{{ dataItem.slug }}</td>
                <td>{{ dataItem.status }}</td>
                <td v-if="userData?.type == 'SUPERADMIN'">                  
                  <router-link class="me-2 btn btn-sm btn-warning" :to="{ name: 'page-form', params: { id: dataItem.id.toString() } }">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </router-link>
                  <button type="button" class="me-2 btn btn-sm btn-danger" 
                    data-bs-toggle="modal" data-bs-target="#modalCenter"
                    @click="fetchItem(dataItem)"
                  >
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                  </button>
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
          <div class="d-flex justify-content-center align-items-center" >
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="fettchDataArray.length > 0">
        <div class="card mb-4" v-for="dataItem in fettchDataArray" :key="dataItem.id">
          <div class="card-body">
          <!-- <span>{{index+1}}</span><br> -->
          
          <strong class="text-wrap">Name: {{ dataItem }}</strong><br/>          
          <p class="mb-0 text-wrap">Slug: {{ dataItem }}</p> 
          <button type="button" class="me-2 btn btn-sm btn-warning" @click="editItem(dataItem.id.toString())">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </button>
          <!-- <button type="button" class="me-2 btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="deleteclick(dataItem.id, dataItem.user_id)">
            Delete
          </button> -->
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
            <h5 class="text-center mb-0">Please Add Page</h5>
          </div>
        </div>
      </div>      
    </div>
    <!-- pagination start  -->
    <div class="card" v-if="fettchDataArray.length > 0">
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
    <!-- Delete Confirm Modal -->
    <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <h5 class="modal-title text-center" id="modalCenterTitle">Delete Confirmation !</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">  
            <i class="bx bx-bell bx-lg text-danger mb-3 d-inline-block"></i>      
            <p>Are You Sure to Delete ?</p>
            <p><b>{{ deletevalue.name }}</b> Page !</p>
          </div>
          <div class="modal-footer text-center justify-content-center">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button data-bs-dismiss="modal" type="button" class="btn btn-danger" @click = "deleteItem(deletevalue.id)">Confirm</button>
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
// import { DOAMIN_PATH, VUE_APP_API_URL } from "@/api";
interface mappingData {
  id: number,
  name: string,
  title: string,
  description : string,
  thumb: string,
  banner_img: string,  
  slug: string,
  page_template: string,
  tags: string,
  meta_key: string,
  meta_description: string,
  status: number,
}
// interface CustomHeaders {
//   Authorization: string;
//   UserId?: any;
// }
export default defineComponent({
  name: "BlogPageList", // Rename the component to a multi-word name
  data() {
    const store = useStore();
    const token = store.state.auth.token || localStorage.getItem('token');
    let userData = store.state.auth.userData || localStorage.getItem('userData');
    userData = JSON.parse(userData);
    return {    
      searchKey: '',  
      token,
      userData,
      fettchDataArray: ref([] as mappingData[]), // Explicitly define the type as Post[] // Explicitly define the type as Post[]
      deletevalue: {
        id: 0,
        name: "",
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
    async fetchAllData() {
      try {
        this.loading = true;        
        if (!this.token) {
            throw new Error('Token not found');
          }
          // const headers: CustomHeaders = { Authorization: `Bearer ${this.token}` };
          const response = await axios.get(process.env.VUE_APP_API_URL + 'pages',
          {
            // params: {
            //   page: this.currentPage,
            //   size: this.pageSize,
            // }
          });
        
        if (response.status === 200) {
          // console.log('_resp', response.data.data); 
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
        const response = await (axios as any).delete(process.env.VUE_APP_API_URL + 'pages/'+id, {
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
    async searchData() {
      try {
        this.loading = true;
        if (!this.token) {
            throw new Error('Token not found');
          }
          const response = await axios.get(process.env.VUE_APP_API_URL + 'pages',
          {
            params: {
              search_key: this.searchKey,
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
      sendData(id: string) {
        this.$emit('data-emitted', {
          isDataTrueList: this.isDataTrueList,
          id,
        });
      },

    editItem(id: any) {
      // Navigate to the edit route with the ID parameter
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
      // console.log('else id match:', parseInt(match[1]));
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
    // console.log('_UserData_', this.userData);
  },
});
</script>