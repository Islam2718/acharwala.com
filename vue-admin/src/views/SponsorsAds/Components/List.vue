<template>
  <div>
    <!-- search form start  -->
    <div class="card mb-3">
      <div class="card-body">    
        <div class="row">
          <div class="input-group">
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
    <div class="card mb-1 d-none d-md-block">
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
                <!-- <th v-if="fettchDataArray.length && fettchDataArray[0].user?.type != 'USER'">Company</th> -->
                <!-- <th>Company</th> -->
                <th>Name</th>
                <th v-if="userData.type == 'SUPERADMIN'">Type</th>
                <th>Description</th>
                <th v-if="userData.type == 'SUPERADMIN'">Action</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="(dataItem, index) in fettchDataArray" :key="dataItem.id">
                <td>{{ index + 1 }}</td>
                <!-- <td v-if="dataItem.user?.type !='USER'">{{ dataItem }}</td> -->
                <!-- <td>{{ dataItem.company?.name }}</td> -->               
                <td>{{ dataItem.name }}</td>
                <td v-if="userData.type == 'SUPERADMIN'">{{ dataItem.type?.title }}</td>
                <td>{{ dataItem.description }}</td>
                <td v-if="userData.type == 'SUPERADMIN'">
                  <!-- <button type="button" class="me-2 btn btn-sm btn-warning" @click="editItem(dataItem.id.toString())"> -->
                  <router-link class="me-2 btn btn-sm btn-warning" :to="{ name: 'CategoryForm', params: { id: dataItem.id.toString() } }">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </router-link>
                  <!-- <button type="button" class="me-2 btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="deleteclick(dataItem.id, dataItem.user_id)">
                    Delete
                  </button> -->
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
            <h5 class="text-center mb-0">Please Add Some Category</h5>
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
      <div  v-if="fettchDataArray.length > 0">
        <div class="card mb-4" v-for="dataItem in fettchDataArray" :key="dataItem.id">
          <div class="card-body">
          <!-- <span>{{index+1}}</span><br> -->
          
            <strong class="text-wrap"> Name: {{ dataItem.name }}</strong><br/>
            <span class="text-wrap"> Description: {{ dataItem.description }}</span>
            <p v-if="userData.type == 'SUPERADMIN'" class="text-wrap">Type: {{ dataItem.type?.title }}</p>
            <div  v-if="userData.type == 'SUPERADMIN'">
              <!-- <button type="button" class="me-2 btn btn-sm btn-warning" @click="editItem(dataItem.id.toString())">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" /> Edit
              </button> -->
              <router-link class="me-2 btn btn-sm btn-warning" :to="{ name: 'CategoryForm', params: { id: dataItem.id.toString() } }">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </router-link>
              <!-- <button type="button" class="me-2 btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="deleteclick(dataItem.id, dataItem.user_id)">
                Delete
              </button> -->
              <button type="button" class="me-2 btn btn-sm btn-danger" 
                data-bs-toggle="modal" data-bs-target="#modalCenter"
                @click="fetchItem(dataItem)"
              >
                <font-awesome-icon :icon="['fas', 'trash-can']" /> Delete
              </button>
            </div>          
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <div class="card-body">
            <h5 class="text-center mb-0">Please Add Some Category</h5>
          </div>
        </div>
      </div>
    </div>
    <!-- pagination start  -->
    <div class="card" v-if="fettchDataArray.length > 0">
      <div class="card-body d-flex justify-content-around flex-wrap">
        <nav aria-label="Page navigation">
          <ul class="pagination flex-wrap">
            <!-- Previous button -->
            <!-- <li class="page-item" @click="previousPage">
              <a class="page-link"><i class="tf-icon bx bx-chevron-left"></i></a>
            </li> -->

            <!-- Page buttons -->
              <li v-for="(page, index) in paginationData.links" :key="index" class="page-item myPagination m-1" :class="{ active: page.active }">
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
            <!-- <p><b>{{ deletevalue.name }}</b> Page !</p> -->
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
import { DOAMIN_PATH } from "@/api";
interface mappingData {
  id: number,
  name: string,
  description : string,
  thumb: string,
  user_id: string,
  store_id: string,
  type_id: string,
  type: {
    id: number,
    title: string
  },  
  user: {
    id: number,
    type: string,
    firstname: string,
    lastname: string
  }
}
interface CustomHeaders {
  Authorization: string;
  UserId?: any;
  StoreId?: string; // Make StoreId optional as it's conditionally added
  TypeId?: string; // Make TypeId optional as it's conditionally added
}
export default defineComponent({
  name: "SponsorsList", // Rename the component to a multi-word name
  data() {
    const store = useStore();
    const token = store.state.auth.token || localStorage.getItem('token');
    const storeId =  store.state.auth.storeId || localStorage.getItem('storeId');
    const typeId = store.state.auth.typeId || localStorage.getItem('typeId');
    let userData = store.state.auth.userData || localStorage.getItem('userData');
    userData = JSON.parse(userData);
    return {      
      store,
      token,
      storeId,
      typeId,
      userData: userData,
      loading: false,
      fettchDataArray: ref([] as mappingData[]), // Explicitly define the type as Post[] // Explicitly define the type as Post[]
      deletevalue: {
        id: 0,
        name: "",
      },
      isDataTrueList: true,
      id: '',
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
    async fetchAllCategoryData() {
    try {
      this.loading = true;
      const headers: CustomHeaders = { Authorization: `Bearer ${this.token}` };
      if (this.userData.type === "USER") {
        headers.TypeId = this.typeId;
      }

      const response = await axios.get(
        DOAMIN_PATH + 'category',
        {
          params: {
            page: this.currentPage,
            size: this.pageSize
          },
          headers: {...headers },
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
  // Add a method to fetch data when the page size changes
  async fetchData() {
    // Optionally, you can reset the current page to 1 when the page size changes
    // this.currentPage = 1;
    await this.fetchAllCategoryData();
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
    this.fetchAllCategoryData();
  } else if (pageOrLabel) {
    const match = pageOrLabel.match(/page=(\d+)/);
    if (match) {
      console.log('else id match:', parseInt(match[1]));
      this.currentPage = parseInt(match[1]);
    }
  }

  this.fetchAllCategoryData();
},


    // Add methods to navigate to the previous and next pages
    previousPage() {
      if (this.paginationData.current_page > 1) {
        this.currentPage = this.paginationData.current_page - 1;
        this.fetchAllCategoryData();
      }
    },

    nextPage() {
      if (this.paginationData.current_page < this.paginationData.last_page) {
        this.currentPage = this.paginationData.current_page + 1;
        this.fetchAllCategoryData();
      }
    },
     // Delete areas data
    async fetchItem(item: any) {
      this.deletevalue = item;
      console.log("deletevalue", this.deletevalue);
    },
    async deleteItem(id: number) {
      try {
        const response = await (axios as any).delete('https://pos-api.phicsart.com/api/category/'+id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

        if (response.status == 200) {
          console.log('_delete_success', response);
          this.fetchAllCategoryData();
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
    editItem(id: string) {
      // Navigate to the edit route with the ID parameter
      this.$router.push({ params: { id } });
    },
    
  },
  mounted() {
    this.fetchAllCategoryData();
  },

});
</script>
