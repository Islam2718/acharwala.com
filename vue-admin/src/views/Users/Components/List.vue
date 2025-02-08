<template>
  <div>
    <!-- search form start  -->
    <div class="card mb-4">
      <div class="card-body">    
        <div class="row">
          <div class="input-group">
            <div class="input-group-prepend">
              <!-- <select class="form-select" aria-label="Default select example">
                    <option selected>Search By-</option>
                    <option value="1">Beximco</option>
                    <option value="2">Pran RFL </option>
                    <option value="3">ACME </option>
              </select>   -->
            </div>
            <!-- <span class="input-group-text" id="basic-addon1">From</span>
            <input type="date" class="form-control" placeholder="Enter Search Key !" v-model="fromDate">
            <span class="input-group-text" id="basic-addon1">To</span>
            <input type="date" class="form-control" placeholder="Enter Search Key !" v-model="toDate"> -->
            <input type="text" class="form-control w-25" placeholder="Enter Search Key !" v-model="searchKey">
            <button type="button" class="btn btn-primary me-1 ms-1" @click="searchData"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
            <button type="button" class="btn btn-default border" @click="searchKey = '', fromDate = '', toDate = '', fetchAllData()"><font-awesome-icon :icon="['fas', 'broom']" /></button>            
          </div>
        </div>
      </div>
    </div>
    <!-- search form end  -->
    <div v-if="successReport" class="alert alert-success alert-dismissible" role="alert">
     Password Reset Successfully
     <button type="button" class="btn-close"  aria-label="Close"></button>
   </div>
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
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="(dataItem, index) in fettchDataArray" :key="dataItem.id" v-show="dataItem.type !== 'SUPERADMIN'">
                <td v-if="dataItem.type !== 'SUPERADMIN'">{{ getRowIndex(index) }}</td>
                <!-- <td v-if="userData?.type=='SUPERADMIN'">{{ dataItem.store?.name }}</td> -->
                <td>{{ dataItem.firstname }} {{ dataItem.lastname }}</td>
                <td>{{ dataItem.phone }}</td>
                <td>{{ dataItem.email }}</td>
                <td>{{ dataItem.type}}</td>
                <td>
                  <!-- view button -->
                  <button type="button" class="me-2 btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#chagnePassModal" @click="changePassItem(dataItem)" v-if="userData?.type=='SUPERADMIN' || userData?.type=='ADMIN'" >Change Password</button>
                  <button type="button" class="me-2 btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#viewMoreModal" @click="viewItem(dataItem)"><i class="fa fa-eye" aria-hidden="true"></i></button>
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
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <h5 class="text-center mb-0">Please Add User</h5>
          </div>
        </div>
      </div> 
    </div>
    <div class="mobile-view d-block d-md-none">
      <div  v-if="fettchDataArray.length > 0">
        <div class="card mb-4" v-for="dataItem in fettchDataArray" :key="dataItem.id">
          <div class="card-body">
          <small> Name: {{ dataItem.firstname }} {{ dataItem.lastname }}</small><br/>
          <small>Phone: {{ dataItem.phone }}</small>
          <p class="text-wrap mb-0">Address: {{ dataItem.address }}</p>
          <p class="text-wrap">Type: {{ dataItem.type }}</p>
          <button type="button" class="me-2 btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#viewMoreModal" @click="viewItem(dataItem)"><i class="fa fa-eye" aria-hidden="true"></i></button>
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
            <h5 class="text-center mb-0 text-wrap">Please Add Supplier</h5>  
          </div>
        </div> 
      </div>
    </div>
    <!-- // table end -->
    <!-- pagination start  -->
    <div class="" v-if="fettchDataArray.length > 0">
      <div class="d-flex justify-content-between flex-wrap">
        <nav aria-label="Page navigation">
          <ul class="pagination mb-0 flex-wrap">
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
      <div class="mt-4 ">
          <span class="p-3 bg-light"> Showing: {{ paginationData.from }} - {{ paginationData.to }} of {{ paginationData.total }}</span>
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
            <p><b>{{ deletevalue.name }}</b> </p>
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
    <!-- modal  -->
    <div class="modal fade" id="viewMoreModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header alert alert-primary">
            <h5 class="modal-title mb-3" id="modalCenterTitle" style="color: #696cff;">User Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <table class="table" style="border-color: transparent;">
                  <tbody>
                    <tr>
                      <th style="width: 20%;">Name</th>
                      <th style="width: 2%;">:</th>
                      <td>{{ viewDataArray.firstname }} {{ viewDataArray.lastname }}</td>
                    </tr>
                    <tr>
                      <th style="width: 20%;">Phone</th>
                      <th style="width: 2%;">:</th>
                      <td>{{ viewDataArray.phone}}</td>
                    </tr>
                    <tr>
                      <th style="width: 20%;">Email</th>
                      <th style="width: 2%;">:</th>
                      <td>{{ viewDataArray.email}}</td>
                    </tr>
                    <tr>
                      <th style="width: 20%;">Address</th>
                      <th style="width: 2%;">:</th>
                      <td>{{ viewDataArray.address }}</td>
                    </tr>
                    <tr>
                      <th style="width: 20%;">Created At</th>
                      <th style="width: 2%;">:</th>
                      <td>{{ formatDateTime(viewDataArray.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- password update modal  -->
    <div class="modal fade" id="chagnePassModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitle">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <form name="" @submit.prevent="changePassword">
              <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <div class="input-group input-group-merge">
                          <input  :type="showPassword.password ? 'text' : 'password'" class="form-control" v-model="passwordDataArray.new_password" placeholder="Enter Password" aria-describedby="password" />
                          <span class="input-group-text cursor-pointer"  @click="showPassword.password = !showPassword.password">
                            <i :class="showPassword.password ? 'bx bx-show' : 'bx bx-hide'"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" id="modalCenterClose">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex'; // Import useStore from Vuex
import { VUE_APP_API_URL } from "@/api";
interface mappingData {
  id: number;
  email: string;
  emailVerifiedAt: string; // ISO 8601 date string
  phone: string;
  firstname: string;
  lastname: string;
  profileImg: string; // URL or empty string
  nationalIdNo: string; // empty string or national ID number
  address: string; // empty string or user address
  type: 'SUPERADMIN' | 'ADMIN' | 'USER'; // or other possible types
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}
export default defineComponent({
  name: "CategoryList", // Rename the component to a multi-word name
  data() {
    const store = useStore();
    const token = store.state.auth.token || localStorage.getItem('token');
    const userDataAray = store.state.auth.userData || localStorage.getItem('userData');
    const userData = JSON.parse(userDataAray);
    return {      
      store,
      token,
      userData,
      searchKey: '',
      fromDate: '',
      toDate: '',
      rowIndex: 0,
      successReport: false,
      fettchDataArray: ref([] as mappingData[]), // Explicitly define the type as Post[] // Explicitly define the type as Post[]
      viewDataArray: {
        id: 0,
        email: "",
        emailVerifiedAt: "",
        phone: "",
        firstname: "",
        lastname: "",
        profileImg: "",
        nationalIdNo: "",
        address: "",
        type: "",
        created_at: "",
        updated_at: "",
      },
      deletevalue: {
        id: 0,
        name: "",
      },
      passwordDataArray: {
        email: "",
        new_password: "",
      },
      showPassword: {
        password: false,
      },
      isDataTrueList: true,
      id: '',
      loading: false,
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
        from: 0,
        to: 0,
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
          const response = await axios.get(VUE_APP_API_URL + 'users',
          {
            params: {
              page: this.currentPage,
              size: this.pageSize,
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

    // Delete areas data
    async fetchItem(item: any) {
      this.deletevalue = item;
      console.log("deletevalue", this.deletevalue);
    },
    async deleteItem(id: number) {
      try {
        const response = await (axios as any).delete(VUE_APP_API_URL + 'users/'+id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
        this.fetchAllData();
        if (response.status == 200) {
          console.log('_delete_success', response);
         
        }
      } catch (error) {
        console.error(error);
      }
    },
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
    async viewItem(data: any) {
      this.viewDataArray = data;
    },
    async changePassItem(data: any) {
      this.passwordDataArray.email = data.email;
    },
    async changePassword() {
      try {
        if (!this.token) {
          throw new Error('Token not found');
        }
        console.log('_passwordDataArray', this.passwordDataArray);
        const response = await (axios as any).post(VUE_APP_API_URL + 'change-password', this.passwordDataArray, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status == 200) {
          console.log('_delete_success', response);
          this.fetchAllData();
          //click the modal close button
          document.getElementById("modalCenterClose")?.click();
          this.successReport = true;
          setTimeout(() => { this.successReport = false; }, 4000);
          this.passwordDataArray = {
            email: "",
            new_password: "",
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    togglePassword(field: string | number) {
      // Use type assertion to tell TypeScript that field is a valid key
      const validField = field as keyof typeof this.showPassword;
      // Update the property directly
      this.showPassword[validField] = !this.showPassword[validField]; 
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
    // pagination function
    async fetchData() {
    // Optionally, you can reset the current page to 1 when the page size changes
    // this.currentPage = 1;
    // await this.fetchAllData();
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

      // this.fetchAllData();
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
          const response = await axios.get(VUE_APP_API_URL + 'users',
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
  },
  computed: {
  getRowIndex() {
    return (index: number) => {
      let rowIndex = 0;
      for (let i = 0; i < this.fettchDataArray.length; i++) {
        if (this.fettchDataArray[i].type !== 'SUPERADMIN') {
          rowIndex++;
        }
        if (i === index) {
          return rowIndex;
        }
      }
    }
  }
},
  mounted() {
    this.fetchAllData();
  },
});
</script>