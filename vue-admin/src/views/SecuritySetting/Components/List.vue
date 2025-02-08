<template>
  <div>
    <!-- search form start  -->
    <div class="card mb-4">
      <div class="card-body">    
        <div class="row">
          <div class="input-group">
            <div class="input-group-prepend">
              <select class="form-select" aria-label="Default select example">
                    <option selected>Search By-</option>
                    <option value="1">Category</option>
                    <option value="2">Product Name </option>
              </select>  
            </div>
            <input type="text" class="form-control w-25" placeholder="Enter Search Key !">
            <!-- <div class="input-group"> -->
                <span class="input-group-text" id="basic-addon1">From</span>
                <input type="date" class="form-control" placeholder="Enter Search Key !">
                <span class="input-group-text" id="basic-addon1">To</span>
                <input type="date" class="form-control" placeholder="Enter Search Key !">
            <!-- </div> -->
            <button type="button" class="btn btn-primary me-1 ms-1">Search</button>
            <button type="button" class="btn btn-default border">Clear</button>            
          </div>
        </div>
      </div>
    </div>
    <!-- search form end  -->
    <!-- table start  -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-center align-items-center" v-if="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <table class="table card-table" v-else>
          <thead>
            <tr>
              <th>Id</th>
              <!-- <th v-if="userData?.type=='SUPERADMIN'">Company</th> -->
              <th>Invoice No</th>
              <th>Due</th>
              <th>Paid</th>
              <th>Profit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <tr v-for="(dataItem, index) in fettchDataArray" :key="dataItem.id">
              <td>{{ index + 1 }}</td>
              <!-- <td v-if="userData?.type=='SUPERADMIN'">{{ dataItem.store?.name }}</td> -->
              <td>{{ dataItem.type }}</td>
              <td>{{ dataItem.quantity }}</td>
              <td>{{ dataItem.store?.name }}</td>
              <td>{{ dataItem.user?.firstname }} {{ dataItem.user?.lastname }} - {{ dataItem.user?.type }}</td>
              <td>
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
      </div> 
    </div>
    <!-- // table end -->
    <!-- pagination start  -->
    <div class="card">
      <div class="card-body d-flex justify-content-center">
        <nav aria-label="Page navigation">
            <ul class="pagination mb-0">
              <li class="page-item first">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left"></i></a>
              </li>
              <li class="page-item prev">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevron-left"></i></a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="javascript:void(0);">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0);">2</a>
              </li>
              <li class="page-item ">
                <a class="page-link" href="javascript:void(0);">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0);">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0);">5</a>
              </li>
              <li class="page-item next">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevron-right"></i></a>
              </li>
              <li class="page-item last">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right"></i></a>
              </li>
            </ul>
          </nav>
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
import { DOAMIN_PATH } from "@/api";
interface mappingData {
  id: 1,
  type: "",
  quantity: "",
  product_id: "",
  user_id: "",
  store_id: "",
  supplier_id: '',
  store: {
    id: number,
    name: string
  },
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
    const userData = store.state.auth.userData || localStorage.getItem('userData');
    const storeId = store.state.auth.storeId || localStorage.getItem('storeId');

    return {      
      store,
      token,
      userData,
      storeId,
      fettchDataArray: ref([] as mappingData[]), // Explicitly define the type as Post[] // Explicitly define the type as Post[]
      deletevalue: {
        id: 0,
        name: "",
      },
      isDataTrueList: true,
      id: '',
      loading: false
    };
  },
  methods: {
    async fetchComnpanyData() {
      try { 
        this.loading = true;
        if (!this.token) {
            throw new Error('Token not found');
          }
          const response = await axios.get(DOAMIN_PATH + '',
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              CompanyId: this.storeId
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

    // Delete areas data
    async fetchItem(item: any) {
      this.deletevalue = item;
      console.log("deletevalue", this.deletevalue);
    },
    async deleteItem(id: number) {
      try {
        const response = await (axios as any).delete(DOAMIN_PATH + 'stock/'+id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

        if (response.status == 200) {
          console.log('_delete_success', response);
          this.fetchComnpanyData();
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
      // Navigate to the edit route with the ID parameter
      this.$router.push({ params: { id } });
    },
  },
  mounted() {
    this.fetchComnpanyData();
  },
});
</script>