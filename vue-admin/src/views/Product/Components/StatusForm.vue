<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="layout-page">
    <TopBarView />
      <div class="content-wrapper">
        <!-- <Search /> -->
        <div class="">
          <div>
            <div class="flex-grow-1 container-p-y px-4">
              <div class="d-flex justify-content-between aling-items-center">
                  <div>
                    <h4 class="fw-bold py-3 mb-4">
                        <span class="text-muted fw-light">Product Status</span> Settings
                    </h4>
                  </div>
                  <div>                
                    <router-link to="/product" class="btn btn-primary mt-2" >Back to List</router-link>
                  </div>
              </div>
                <div class="">
                <div v-if="successReport" class="alert alert-success alert-dismissible" role="alert">
                  Successfully
                  <button type="button" class="btn-close"  aria-label="Close"></button>
                </div>                
                    <div class="row">
                      <div class="col-md-9 col-sm-12">
                        <div class="card">
                          <div class="card-body">
                            <h5>Product Info</h5>
                            <hr/>
                            <div class="row mb-3">
                              <p><strong>Category: </strong> {{ formData.category.name }} </p>
                              <p><strong>Name:</strong> {{formData.name}}</p>
                              <p><strong>Slug / Url:</strong> {{formData.slug}}</p>
                              <p><strong>Price:</strong> {{formData.price}}</p>
                              <p><strong>Short Description</strong></p>
                              <div v-html="formData.short_description"></div>
                              <p><strong>Description</strong></p>
                              <div v-html="formData.description"></div>
                            </div>
                          </div>
                        </div>
                        <div class="card mt-3">
                          <div class="card-body">
                            <h5>Images</h5><hr/>
                            <!-- <div class="row mb-3 mx-0">                             
                              <div className="col-2 border me-2 rounded" v-for="(image, index) in formData.images.split(',')" :key="index">
                                <img :src="fileUrl+image" alt="--" className="img-fluid1" :style="{width: '80px', height: '80px', margin: '10px'}"/>
                              </div>
                            </div> -->
                          </div>
                        </div>
                        <!-- <div class="card mt-3">
                          <div class="card-body">
                            <h5>User Info</h5><hr/>
                            <div class="row mb-3">
                              <p>Name: {{formData.user.firstname}} {{formData.user.lastname}}</p>
                              <p>E-mail: {{formData.user.email}}</p>
                              <p>Phone: {{formData.user.phone}}</p>
                              <p>Address: {{formData.user.address}}</p>
                            </div>
                          </div>
                        </div> -->
                      </div>
                      <div class="col-md-3 col-sm-12">
                        <div class="card">
                          <div class="card-body">
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Status 
                              </label>
                              <div class="col-sm-12">
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 0" @click="statusFunc(formData.id, formData.name, 0)"> Pending</button>
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 1"  @click="statusFunc(formData.id, formData.name, 1)"> Approved</button>
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 2"  @click="statusFunc(formData.id, formData.name, 2)"> Rejected</button>
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 3"  @click="statusFunc(formData.id, formData.name, 3)"> Hold</button>
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 4"  @click="statusFunc(formData.id, formData.name, 4)"> Locked</button>
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 5"  @click="statusFunc(formData.id, formData.name, 5)"> Draft</button>
                                  <button class="btn btn-primary btn-block w-100 my-2" type="button"  data-bs-toggle="modal" data-bs-target="#modalCenter" :disabled="formData.status === 6"  @click="statusFunc(formData.id, formData.name, 6)"> Trash</button>
                              </div>
                            </div>
                          </div>
                        </div> 
                        <div class="card mt-3">
                          <div class="card-body">
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Action 
                              </label>
                              <div class="col-sm-12">
                                  <router-link class="btn btn-primary btn-block w-100 my-2" :to="{ name: 'product-form', params: { id: formData.id.toString() } }">
                                    <font-awesome-icon :icon="['fas', 'fa-edit']" />
                                  </router-link>                                  
                                  <button class="btn btn-danger btn-block w-100 my-2" type="button" data-bs-toggle="modal" data-bs-target="#deleteModalCenter"> Parmanently Delete</button>
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                    </div>  
                </div>              
            </div>
          </div>
        </div>
      <!-- modal area status -->
        <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title text-center" id="modalCenterTitle">Status Confirmation !</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">  
                <i class="bx bx-bell bx-lg text-danger mb-3 d-inline-block"></i>      
                <p>Are You Sure to Change Status 
                    <span v-if="modalData.status == 0" class="text-info"> Pending</span>
                    <span v-if="modalData.status == 1" class="text-success"> Approved</span>
                    <span v-if="modalData.status == 2" class="text-danger"> Rejected</span>
                    <span v-if="modalData.status == 3" class="text-warning"> Hold</span>
                    <span v-if="modalData.status == 4" class="text-secondary">  Locked</span>
                    <span v-if="modalData.status == 5" class="text-secondary"> Draft</span>
                    <span v-if="modalData.status == 6" class="text-secondary"> Trash</span>
                  ?</p>
              </div>
              <div class="modal-footer text-center justify-content-center">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button data-bs-dismiss="modal" type="button" class="btn btn-danger" @click = "updateStatus(modalData.id, modalData.name, modalData.status)">Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="deleteModalCenter" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title text-center" id="modalCenterTitle">Confirm?</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">  
                <i class="bx bx-bell bx-lg text-danger mb-3 d-inline-block"></i>      
                <p>Are You Sure to Change Status ?</p>
                <!-- {{ formData }} -->
              </div>
              <div class="modal-footer text-center justify-content-center">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button data-bs-dismiss="modal" type="button" class="btn btn-danger" @click = "deleteProduct(formData)">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      <Footer />
      <!-- / Footer -->
      <div class="content-backdrop fade"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import { VUE_APP_API_URL, VUE_APP_FILE_URL } from "@/api";
import { useStore } from 'vuex'; 
import axios from '../../../../node_modules/axios/index';
import Footer from "../../FooterView.vue";
import TopBarView from "../../TopBarView.vue";

export default defineComponent({
components: { Footer, TopBarView},
name: "status-form",
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
       paramId: '',
       token,
       userId, 
       loading: false,
       submitBtn: false,
       selectedCategoryName: '',
       searchQuery: '',

       formData: {
         id: Number,
         parent_id: Number,
         name: '',
         slug:'',
         description:'',
         short_description:'',
         thumb:'',
         images: '',
         status: 0,
         price: '',
         number: '',
         quantity: 0,
         category: {
           id: Number,
           name: ''
         },
         user: {
           id: Number,
           firstname: '',
           lastname: '',
           email: '',
           phone: '',
           address: ''
         }
       },
       modalData: {
         id: Number,
         name: '',
         status: 0,
       },
       stringArray: []
   }
 },
watch: {
 '$route.params.id': {
   immediate: true,
   handler(paramId) {
     if (paramId) {
       this.paramId = paramId;
       this.fetchProductById(paramId);
     }
   },
 },
},
created() {
    // this.fetchCategoryFunc();
  },
methods: {   
  async fetchProductById(id: NumberConstructor) {
    try {
      if (!this.token) {
        throw new Error('Token not found');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (axios as any).get(`${process.env.VUE_APP_API_URL}product/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      if (response.status === 200) {
        console.log('fetchProductById', response.data);
        this.formData = response.data.data;        
      }
    } catch (error) {
      console.error(error);
    }
  },
  
  async statusFunc(id: NumberConstructor, title: string, status: number) {
    this.modalData.id = id;
    this.modalData.name = title;
    this.modalData.status = status;
  },
  
  // update status function
  async updateStatus(id: NumberConstructor, title: string, status: number) {
    try {
      if (!this.token) {
        throw new Error('Token not found');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (axios as any).put(`${process.env.VUE_APP_API_URL}product/${id}`, {
        name: title,
        status: status
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      if (response.status === 200) {
        this.successReport = true;
        this.formData.status = response.data.data.status;
        setTimeout(() => { this.successReport = false; }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  },
  myChangeEvent(val: any){ console.log(val); },
  mySelectEvent({id, text}: any) { console.log({id, text}) },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteProduct(productObj: {
    images: string;
  }){
    const imagesArray = productObj.images.split(',');
    console.log(imagesArray);
    // imagesArray.map((image: string) => {
    //   axios.delete(process.env.VUE_APP_FILE_URL+image, {
    //     headers: {
    //       Authorization: `Bearer ${this.token}`,
    //     },
    //   })
    // });

    try {
      const response = await (axios as any).delete(`${process.env.VUE_APP_API_URL}product/${this.paramId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log('_delete_success', response.status);
      if (response.status == 200) {
        this.successReport = true;
        setTimeout(() => { this.successReport = false; }, 3000);
        this.$router.push('/product');
      }
    }
    catch (error) {
      console.error(error);
    }
  },

  mounted() { 
    // this.fetchCategoryFunc(); 
  },},})
</script>


