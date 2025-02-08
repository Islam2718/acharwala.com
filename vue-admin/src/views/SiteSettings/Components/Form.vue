<template>
  <div class="">
   <!-- Basic Layout & Basic with Icons -->
   <div v-if="successReport" class="alert alert-success alert-dismissible" role="alert">
     Successfully
     <button type="button" class="btn-close"  aria-label="Close"></button>
   </div>
   <form name="" @submit.prevent="handleSubmit">
     <div class="row">
       <!-- Basic Layout -->
       <div class="col-md-9 col-sm-12">
         <div class="card">
           <div class="card-body">
             <div class="card-body">
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
                   >Title 
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Title" v-model="formData.title">
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
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Phone" v-model="formData.phone" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Web Url
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Web Url" v-model="formData.web_url" >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Address 
                 </label>
                 <div class="col-sm-12">
                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Address" v-model="formData.address" >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Map 
                 </label>
                 <div class="col-sm-12">
                    <textarea type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Map" v-model="formData.map_html" ></textarea>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Description 
                 </label>
                 <div class="col-sm-12">
                    <textarea type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Address" v-model="formData.description" ></textarea>
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
                    >Lofo 
                  </label>
                  <div class="col-sm-12">
                      <img :src="fileUrl +'gehaat_1717440139.png'" alt="n/a" class="img-fluid mx-auto" />
                      <input type="file" class="form-control" id="basic-icon-default-thumb" placeholder="Logo">
                      <input type="text" class="form-control d-none" id="basic-icon-default-thumb" v-model="formData.logo">
                  </div>
                </div>
                <div class="row mb-3">
                  <label
                    class="col-sm-12 col-form-label"
                    for="basic-icon-default-store"
                    >Icon 
                  </label>
                  <div class="col-sm-12">
                      <img :src="fileUrl +'gehaat_1717440139.png'" alt="n/a" class="img-fluid mx-auto" />
                      <input type="file" class="form-control" id="basic-icon-default-thumb" placeholder="icon">
                      <input type="text" class="form-control d-none" id="basic-icon-default-thumb" v-model="formData.icon">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 mt-4">
          <button type="submit" class="btn btn-primary justify-content-center" :disabled="submitBtn">
            <span v-if="!submitBtn">Save Changes</span> 
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
            <span class="visually-show" v-if="submitBtn"> Saving....</span>
          </button>
        </div>
     </div>
   </form>
 </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// import CkEditor from "../../../components/Ckeditor.vue";
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex'; // Import useStore from Vuex
import { DOAMIN_PATH } from "@/api";

export default defineComponent({
name: "CategoryForm", // Rename the component to a multi-word name
 data() {
   const store = useStore();
   const token = store.state.auth.token || localStorage.getItem('token');
   const userId = store.state.auth.userId || localStorage.getItem('userId');
   const storeId = store.state.auth.storeId || localStorage.getItem('storeId');
   return {
       successReport: false,
       fileUrl: process.env.VUE_APP_FILE_URL,
       storeId,
       itemId: '',
       store,
       token,
       userId, 
       infoReload: false,
       fetchProductList: [{
           id: Number,
           name: '',
       }],
       formData: {
        id: 1,
        name: "",
        title: "",
        description: "",
        logo: "",
        icon: '',
        email: "",
        phone: '',
        address: '',
        web_url: '',
        map_html: '',
        copyright: "",
        status: 1,
      },
       submitBtn: false,
   }
 },

watch: {
 '$route.params.id': {
   immediate: true,
   handler(newVal) {
     if (newVal) {
       this.fetchData();
       this.itemId = newVal;
     }
   },
 },
},
methods: {
 async fetchData() {
   try {
     if (!this.token) {
       throw new Error('Token not found');
     }
     const id = this.userId;
    //  const response = await (axios as any).get(process.env.VUE_APP_API_URL + `siteinfo/${id}`, {
     const response = await (axios as any).get(process.env.VUE_APP_API_URL + `siteinfo`, {
       headers: {
         Authorization: `Bearer ${this.token}`,
       },
     });
     if (response.status === 200) {
       this.formData = response.data.data;
     }
   } catch (error) {
     console.error(error);
   }
 },
 async handleSubmit() {
   try {
    this.submitBtn = true;
     if (!this.token) {
       throw new Error('Token not found');
     }
       const id = this.userId;
      console.log('_form_data', this.formData);
       const response = await (axios as any).put(
          process.env.VUE_APP_API_URL + 'siteinfo/' + this.formData.id,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
        );
       console.log('_response_', response);
       this.submitBtn = false;
         this.successReport = true;
         setTimeout(() => { this.successReport = false; }, 3000);
       
     
   } catch (error) {
     console.error(error);
     this.submitBtn = false;
   }
 }
},
mounted() {
 // Set isLoading to true when the component is mounted
 this.fetchData();
},
})
</script>