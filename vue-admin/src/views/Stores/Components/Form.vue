<template>
  <div class="layout-page">
    <TopBarView />
      <div class="content-wrapper">
        <!-- <Search /> -->
        <!-- Content -->
      <div class="">
        <div>
          <div class="flex-grow-1 container-p-y px-4">
            <div class="d-flex justify-content-between aling-items-center">
                <div>
                  <h4 class="fw-bold py-3 mb-4">
                      <span class="text-muted fw-light">Store</span> Settings
                  </h4>
                </div>
                <div>                
                  <router-link to="/stores" class="btn btn-primary mt-2" >Back to List</router-link>
                  <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="listShow"> + Add</button>
                  <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="formShow">Back to List</button> -->
                </div>
            </div>
              <div class="">
              <!-- Basic Layout & Basic with Icons -->
              <div v-if="successReport" class="alert alert-success alert-dismissible" role="alert">
                Successfully
                <button type="button" class="btn-close"  aria-label="Close"></button>
              </div>
                <div class="d-flex justify-content-center align-items-center" v-if="loading">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <!-- <span>{{formData}}</span> -->
                <form name="" @submit.prevent="handleSubmit">
                  <div class="row">
                    <!-- Basic Layout -->
                    <div class="col-md-9 col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <!-- <div class="d-flex justify-content-center align-items-center" v-if="fetchPageList.length <= 1">
                            <div class="spinner-border text-primary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div> -->
                          <div class="card-body">   
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Store Name 
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Name" v-model="formData.name" required>
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Email
                              </label>
                              <div class="col-sm-12">
                                  <input type="email" class="form-control" id="basic-icon-default-fullname" placeholder="Email" v-model="formData.email">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Phone
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Phone" v-model="formData.phone">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Address
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Address" v-model="formData.address">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >City
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="City" v-model="formData.city">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >State
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="State" v-model="formData.state">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Country
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Country" v-model="formData.country">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Postal Code
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Postal Code" v-model="formData.postcode">
                              </div>
                            </div>              
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Description
                              </label>
                              <div class="col-sm-12">
                                <!-- textarea with ckeditr  -->
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="8" placeholder="Description" v-model="formData.description"></textarea>
                              </div>
                            </div>                                                                    
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="card-body">                            
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Thumb 
                              </label>
                              <div class="col-sm-12">
                                  <img :src="fileUrl +'gehaat_1717440139.png'" alt="n/a" class="img-fluid mx-auto" />
                                  <input type="file" class="form-control" id="basic-icon-default-thumb" placeholder="thumb">
                                  <input type="text" class="form-control d-none" id="basic-icon-default-thumb" v-model="formData.thumb">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                      <div class="col-sm-12">
                          <button type="submit" class="btn btn-primary mt-3" :disabled="submitBtn">
                            <span v-if="!submitBtn">Save</span> 
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                            <span class="visually-show" v-if="submitBtn"> Saving ....</span>
                          </button>
                        </div>         
                    </div>     
                  </div>
                </form>
              </div>              
          </div>
        </div>
      </div>
      <Footer />
      <div class="content-backdrop fade"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CkEditor from "../../../components/Ckeditor.vue";
import { useStore } from 'vuex'; 
import axios from '../../../../node_modules/axios/index';
import Footer from "../../FooterView.vue";
import TopBarView from "../../TopBarView.vue";

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { Footer, TopBarView, CkEditor },
  name: "store-form",

 data() {
   const store = useStore();
   const token = store.state.auth.token || localStorage.getItem('token');
   const userId = store.state.auth.userId || localStorage.getItem('userId');
   return {
    fileUrl: process.env.VUE_APP_FILE_URL,
    myValue: '',
    selectedType: null,
    selectedCategory: null,
    successReport: false,
    pageId: '',
    token,
    userId, 
    loading: false,
    submitBtn: false,
    selectedCategoryName: '',
    searchQuery: '',

    formData: {
      id: 0,
      name: "",
      description: "",
      thumb: "",
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
      latitude: '',
      longitude: '',
      is_default: 0,
      status: 0,
      short_order: '',
      user_id: 0,
    }
   }
 },
watch: {
 '$route.params.id': {
   immediate: true,
   handler(parameterVal) {
     if (parameterVal) {
       this.pageId = parameterVal;
     }
   },
 },
},
created() {
    this.fetchPageFunc(); 
  },
methods: {    
  async handleSubmit() {
    try {
      this.loading = true;
      this.submitBtn = true;
      if(this.pageId) {
        const response = await (axios as any).put(process.env.VUE_APP_API_URL + `stores/${this.pageId}`, this.formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        if (response.status === 200) {
          this.submitBtn = false;
          this.loading = false;
          this.successReport = true;
          setTimeout(() => { this.successReport = false; }, 3000);
        }
      }else{
        const response = await (axios as any).post(process.env.VUE_APP_API_URL + `stores`, this.formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        if (response.status === 201) {
          this.formData = {
              id: 0,
              name: "",
              description: "",
              thumb: "",
              email: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              country: '',
              postcode: '',
              latitude: '',
              longitude: '',
              is_default: 0,
              status: 0,
              short_order: '',
              user_id: 0,
          };
          this.submitBtn = false;
          this.loading = false;
          this.successReport = true;
          setTimeout(() => { this.successReport = false; }, 3000);        
        }
      }
    }catch (error) {
      this.submitBtn = false;
      this.loading = false;
      console.error(error);
    }
  },

async fetchPageFunc() {
  try {
    this.loading = true;
    const response = await axios.get(process.env.VUE_APP_API_URL + `stores/${this.pageId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    });
    if (response.status === 200) {
      this.formData = response.data.data;
      this.loading = false;
    }
  }
  catch (error) {
    console.error(error);
    this.loading = false;
  }
},

mounted() { 
  // this.fetchPageFunc(); 
},},})
</script>


<style>
.my-select .select2{
  padding: 0.2375rem 0.475rem;
  font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.53;
    color: #697a8d;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d9dee3;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
}
.select2-container--default .select2-selection--single{
  border: none !important;
}
</style>


