<!-- eslint-disable @typescript-eslint/no-unused-vars -->
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
                      <span class="text-muted fw-light">Product</span> Settings
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
                <div class="d-flex justify-content-center align-items-center" v-if="loading">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <form name="" @submit.prevent="handleSubmit" v-else>
                  <div class="row">
                    <div class="col-md-9 col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="d-flex justify-content-center align-items-center" v-if="fetchCategoryList.length <= 1">
                            <div class="spinner-border text-primary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          <div class="card-body" v-else>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Select Category 
                              </label>                                
                                  <SeLect2 v-model="formData.category_id" required :placeholder="'Select Category'" :options="fetchCategoryList" class="w-100 my-select" @change="myChangeEvent" @select="mySelectEvent"  :multiple="false"/>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Name 
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Name" v-model="formData.name" required>
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Slug / Url
                              </label>
                              <div class="col-sm-12">
                                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Slug" v-model="formData.slug" required>
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Short Description
                              </label>
                              <div class="col-sm-12">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Description" v-model="formData.short_description"></textarea>
                              </div>
                            </div>               
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Description
                              </label>
                              <div class="col-sm-12">
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
                                >Images:
                              </label>
                              <div class="col-sm-12">
                                <!-- <img :src="fileUrl + formData.images" alt="" class="w-100"> -->
                                  <!-- <input type="file" class="form-control" id="basic-icon-default-fullname" placeholder="Name" v-model="formData.name" required> -->
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
import { useStore } from 'vuex';
import axios from '../../../../node_modules/axios/index';
import Footer from "../../FooterView.vue";
import TopBarView from "../../TopBarView.vue";

// Define a new global component called button-counter
export default defineComponent({
components: { Footer, TopBarView},
name: "product-form",
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

       fetchCategoryList: [{
           id: Number,
           text: '',
       }],

       formData: {
         name: '',
         slug: '',
         description: '',
         short_description: '',
         thumb: '',
         images: '',
         price: 0,
         category_id: 0,
         category: {
           id: 0,
           name: '',
         },
         user_id: Number,
         user: {
           id: Number,
           type: '',
           firstname: '',
           lastname: '',
         },
       }
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
    this.fetchCategoryFunc(); // Call the method to fetch category data when the component is created
  },
methods: {   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  async fetchProductById(_paramId?: any) {
    try {
      if (!this.token) {
        throw new Error('Token not found');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (axios as any).get(process.env.VUE_APP_API_URL +`product/${this.paramId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        },
      });
     //  console.log('_category_list', response.data.data.data);
     if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.formData = response.data.data;
     }
   } catch (error) {
     console.error(error);
   }
  },

  async fetchCategoryFunc() {
    try {
      if (!this.token) {
        throw new Error('Token not found');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (axios as any).get(process.env.VUE_APP_API_URL +`category?page=1&size=500`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        },
      });
     //  console.log('_category_list', response.data.data.data);
     if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.fetchCategoryList = response.data.data.data.map((category: { id: any; name: any; }) => ({
            id: category.id,
            text: category.name
        }));      
     }
   } catch (error) {
     console.error(error);
   }
 },

 async selectCategory() {
    const selectedCategory = this.fetchCategoryList.find(category => category.text === this.selectedCategoryName);
    if (selectedCategory) {
      // this.formData.category_id = selectedCategory.id;
    } else {
      // this.formData.category_id = Number;
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myChangeEvent(val: any){ console.log(val); },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mySelectEvent({id, text}: any) { console.log({id, text}) },

  async handleSubmit() {
    try {
      this.loading = true;
      this.submitBtn = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (axios as any).post(process.env.VUE_APP_API_URL + `product`, this.formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      });
      if (response.status === 201) {
        this.formData = {
          name: '',
          slug: '',
          description: '',
          short_description: '',
          thumb: '',
          images: '',
          price: 0,
          category_id: 0,
          category: {
            id: 0,
            name: '',
          },
          user_id: Number,
          user: {
            id: Number,
            type: '',
            firstname: '',
            lastname: '',
          },
        };
        this.submitBtn = false;
        this.loading = false;
        this.successReport = true;
        setTimeout(() => { this.successReport = false; }, 3000);        
      }
    }
    catch (error) {
      console.error(error);
    }
  },
  mounted() { 
    this.fetchCategoryFunc(); 
  },},})
</script>

