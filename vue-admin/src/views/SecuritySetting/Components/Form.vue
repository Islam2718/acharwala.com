<template>
  <div class="">
   <!-- Basic Layout & Basic with Icons -->
   <div v-if="successReport" class="alert alert-success alert-dismissible" role="alert">
     Successfully
     <button type="button" class="btn-close"  aria-label="Close"></button>
   </div>
   <!-- <form name="" @submit.prevent="handleSubmit">
     <div class="row">
       <div class="col-md-8 col-sm-12">
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
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Name" v-model="formData.type" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Email 
                 </label>
                 <div class="col-sm-12">
                    <input type="Email" class="form-control" id="basic-icon-default-fullname" placeholder="Email" v-model="formData.type" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Phone 
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Phone" v-model="formData.type" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Address
                 </label>
                 <div class="col-sm-12">
                  <textarea name="" id="" class="form-control" rows="10" v-model="formData.type" placeholder="Address"></textarea>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div> -->
       <!-- <div class="col-md-4 col-sm-12">
         <div class="card">
           <div class="card-body">
             <div class="page-image">
               <img
                 src="https://www.imageeditexpert.com/uploads/images/about/about.png"
                 alt="n/a"
                 class="slider-setting-img img-fluid"
               />
             </div>
             <div class="mb-3">
               <label for="formFile" class="form-label">Image Choose</label>
               <input class="form-control" type="file" id="formFile" />
             </div>
             <div class="row justify-content-end">
               <div class="col-sm-12">
                 <button type="submit" class="btn btn-primary">Send</button>
               </div>
             </div>
           </div>
         </div>
       </div> -->
       <!-- <button type="submit" class="btn btn-primary">Save</button>
     </div>
   </form> -->
  <form id="formAuthentication" class="mb-3" @submit.prevent="setPassword">
   <div class="card">
     <div class="card-body">
        <div v-if="actionReport" class="alert alert-success alert-dismissible" role="alert">
          Password Changed Sccessfully !
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>  
        <div v-if="badactionReport" class="alert alert-warning alert-dismissible" role="alert">
          Old Password Not Match !
          <button type="button" class="btn-close" data-bs-dismiss="alert"  aria-label="Close"></button>
        </div>  
        <div class="mb-3 form-password-toggle">
          <label for="email" class="form-label">Enter Your Old Password</label>
          <div class="input-group input-group-merge">
            <input :type="showPassword.old ? 'text' : 'password'" class="form-control" v-model="oldPasswordForm.password" placeholder="Enter Old password" aria-describedby="password" />
            <span class="input-group-text cursor-pointer" @click="togglePassword('old')">
              <i :class="showPassword.old ? 'bx bx-show' : 'bx bx-hide'"></i>
            </span>
          </div>
        </div>
        <div class="mb-3 form-password-toggle">
          <label for="email" class="form-label">New Password</label>
          <div class="input-group input-group-merge">
            <input :type="showPassword.new ? 'text' : 'password'" class="form-control" v-model="setPasswordForm.new_password" placeholder="Enter New password" aria-describedby="password" />
            <span class="input-group-text cursor-pointer" @click="togglePassword('new')">
              <i :class="showPassword.new ? 'bx bx-show' : 'bx bx-hide'"></i>
            </span>
          </div>
        </div>
        <div class="mb-3 form-password-toggle">
          <label for="email" class="form-label">Confirm Password</label>
          <div class="input-group input-group-merge">
            <input :type="showPassword.confirm ? 'text' : 'password'" id="password" class="form-control" v-model="setPasswordForm.confirm_password" placeholder="Confirm New password" />
            <span class="input-group-text cursor-pointer" @click="togglePassword('confirm')">
              <i :class="showPassword.confirm ? 'bx bx-show' : 'bx bx-hide'"></i>
            </span>
          </div>
        </div> 
    </div>
   </div>
    <div class="mb-3 mt-3">
      <button type="submit" class="btn btn-primary justify-content-center" :disabled="submitBtn">
        <span v-if="!submitBtn">Change Password</span> 
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
        <span class="visually-show" v-if="submitBtn"> Changing....</span>
      </button>
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
       storeId,
       itemId: '',
       store,
       token,
       userId, 
       actionReport: false,
        badactionReport: false,
        message: '',
        setPasswordForm: {
          email: '',
          new_password: '',
          confirm_password: '',
        },
        oldPasswordForm: {
          email: '',
          password: '',
        },

        showPassword: {
            old: false,
            new: false,
            confirm: false,
        },
        submitBtn: false,
        userData: {
          email: '',
          name: '',
          phone: '',
        }
   }
 },

methods: {
 async setPassword () {
      this.userData = JSON.parse(localStorage.getItem('userData') || '{}') || this.store.state.auth.userData;
      this.oldPasswordForm.email = this.userData.email;
      this.setPasswordForm.email = this.userData.email;
      console.log(this.oldPasswordForm, this.setPasswordForm);
      try {
        this.submitBtn = true;
        // show the loading ove
        const loginResponse = await axios.post(DOAMIN_PATH + 'login', this.oldPasswordForm);
        if (loginResponse.status === 200) {
          // set token into local storage and cookies
          const gettoken = loginResponse.data.token;
          const token = gettoken;
          if (!token) {
            throw new Error('Token not found');
          }
          this.store.commit('auth/SET_TOKEN', token);
          token && localStorage.setItem('token', token);
          console.log('login', loginResponse.data);	
          const response = await axios.post(DOAMIN_PATH + 'change-password', this.setPasswordForm);
          if (response.status == 200) {
            this.actionReport = true;
            this.message = response.data.message;
            this.oldPasswordForm.password = '';
            this.setPasswordForm.new_password = '';
            this.setPasswordForm.confirm_password = '';
            setTimeout(() => { 
              this.actionReport = false; 
              // window.location.reload();
            }, 2500);    
            this.submitBtn = false;
            console.log('_setPassword', response.data);
            console.log('_new_token', localStorage.getItem('token'));
          }
        }
      }
      catch (error) {
        this.badactionReport = true;
        this.submitBtn = false;
        setTimeout(() => {
          this.badactionReport = false;
        }, 3000);
        console.error(error);
      }

  },
    async togglePassword(field: string | number) {
      // Use type assertion to tell TypeScript that field is a valid key
      const validField = field as keyof typeof this.showPassword;
      // Update the property directly
      this.showPassword[validField] = !this.showPassword[validField];
    },
},
mounted() {
 // Set isLoading to true when the component is mounted
 
},
})
</script>