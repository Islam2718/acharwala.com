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
                   >First Name 
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="First Name" v-model="formData.firstname">
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Last Name 
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Last Name" v-model="formData.lastname">
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
                   >National Id
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="National Id" v-model="formData.national_id_no" >
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
                   >Gender 
                 </label>
                  <div class="col-sm-12">
                     <div class="form-check form-check-inline">
                       <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" v-model="formData.gender">
                       <label class="form-check-label" for="inlineRadio1">Male</label>
                     </div>
                     <div class="form-check form-check-inline">
                       <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" v-model="formData.gender">
                       <label class="form-check-label" for="inlineRadio2">Female</label>
                     </div>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Date of Birth 
                 </label>
                 <div class="col-sm-12">
                  <input type="date" class="form-control" id="basic-icon-default-fullname" placeholder="Date of Birth" v-model="formData.dob" >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Facebook Id
                 </label>
                 <div class="col-sm-12">
                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Facebook Id" v-model="formData.facebook_id" >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Google Id
                 </label>
                 <div class="col-sm-12">
                  <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Google Id" v-model="formData.google_id" >
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
                    >Profile Image 
                  </label>
                  <div class="col-sm-12">
                      <img :src="fileUrl +'gehaat_1717440139.png'" alt="n/a" class="img-fluid mx-auto" />
                      <input type="file" class="form-control" id="basic-icon-default-thumb" placeholder="profile image">
                      <input type="text" class="form-control d-none" id="basic-icon-default-thumb" v-model="formData.profile_image">
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
   let userId = store.state.auth.userData || localStorage.getItem('userData');
   userId = JSON.parse(userId);
   const storeId = store.state.auth.storeId || localStorage.getItem('storeId');
   return {
       successReport: false,
       fileUrl: process.env.VUE_APP_FILE_URL,
       storeId,
       itemId: '',
       store,
       token,
       userId: userId.id, 
       infoReload: false,
       fetchProductList: [{
           id: Number,
           name: '',
       }],
       formData: {
        id: 1,
        name: "",
        firstname: "",
        lastname: "",
        profile_img: "",
        national_id_no: '',
        email: "",
        phone: '',
        address: '',
        gender: '',
        facebook_id: '',
        google_id: '',
        dob: '',
        copyright: "",
        status: 1,
        profile_image: '',
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
     const response = await (axios as any).get(process.env.VUE_APP_API_URL + `users/${id}`, {
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
          process.env.VUE_APP_API_URL + 'users/' + id,
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