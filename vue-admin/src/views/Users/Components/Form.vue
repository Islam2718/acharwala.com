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
                   >First Name <span class="text-danger">*</span>
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="First Name" v-model="formData.firstname" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Last Name <span class="text-danger">*</span>
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Last Name" v-model="formData.lastname" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Email <span class="text-danger">*</span>
                 </label>
                 <div class="col-sm-12">
                    <input type="email" class="form-control" id="basic-icon-default-fullname" placeholder="Email" v-model="formData.email" required >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Phone
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Phone" v-model="formData.phone" >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >National Id
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="NID" v-model="formData.national_id_no" >
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Address
                 </label>
                 <div class="col-sm-12">
                   <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Address" v-model="formData.address"></textarea>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="col-md-3 col-sm-12">
        <div class="card mb-3">
          <div class="card-body">
            <div class="row mb-3">
              <label
                class="col-sm-12 col-form-label"
                for="basic-icon-default-store"
                >Type
              </label>
              <div class="col-sm-12">
                <!-- <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Phone" v-model="formData.phone" > -->
                  <select name="" class="form-control" id="" v-model="formData.type">
                    <option value="">-- Select Type--</option>
                    <option value="SUPPLIER">Supplier</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>

                  </select>
              </div>
            </div>
            <div class="row mb-3">
              <label
                class="col-sm-12 col-form-label"
                for="basic-icon-default-store"
                >User Scopes
              </label>
              <!-- <div class="col-sm-12">
                <div v-for="(userScope, index) in userScopes" :key="index">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'user-scopes-' + index"
                    :value="userScope"
                    v-model="formData.scopes"
                    :checked="isChecked(userScope)"
                    @change="toggleScope(userScope)"
                  />
                  <label :for="'user-scopes-' + index"> &nbsp; {{ userScope }}</label>
                </div>
              </div> -->
              <div class="col-sm-12">
                <div v-for="(userScope, index) in userScopes" :key="index">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'user-scopes-' + index"
                    :value="userScope"
                    v-model="formData.scopes"
                  />
                  <label :for="'user-scopes-' + index"> &nbsp; {{ userScope }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-if="isNew">
          <div class="card-body">
            <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Password <span class="text-danger">*</span>
                 </label>
                 <div class="col-sm-12">
                    <input type="password" class="form-control" id="basic-icon-default-fullname" placeholder="Password" v-model="formData.password" :required="isNew">
                    <!-- <div v-if="formData.password.length < 8" class="text-danger">Password must be at least 8 characters long</div> -->
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Confirm Password <span class="text-danger">*</span>
                 </label>
                 <div class="col-sm-12">
                    <input type="password" class="form-control" id="basic-icon-default-fullname" placeholder="Confirm Password" v-model="formData.password_confirmation" :required="isNew">
                    <div v-if="formData.password_confirmation !== formData.password" class="text-danger">Passwords do not match</div>
                 </div>
               </div>  
          </div>
        </div>
       </div>
       <div class="col-md-12 col-sm-12">
         <!-- <div class="card">
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
           </div>
         </div> -->
         <div class="row justify-content-end">
            <div class="col-sm-12">
              <button type="submit" class="btn btn-primary mt-3" :disabled="submitBtn">
                <span v-if="!submitBtn">Save</span> 
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                <span class="visually-show" v-if="submitBtn"> Saving ...</span>
              </button>
            </div>
          </div>
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
import { VUE_APP_API_URL } from "@/api";
export default defineComponent({
name: "supplier-form", // Rename the component to a multi-word name
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
       submitBtn: false,
       userScopes:[ 
          'DASHBOARD',
          'USER',
          'CUSTOMER',
          'SALE',
          'STOCK',
          'PRODUCT',
          'FEATURES',
          'BARCODE',
          'PAYMENT',
          'WARRANTY',
          'ORDER',
          'PAYMENT',
          'DUE',
          'STORE'
       ],
       formData: {
        id: Number,
        email: '',
        emailVerifiedAt: '', // ISO 8601 date string
        phone: '',
        firstname: '',
        lastname: '',
        profileImg:  '',// URL or empty string
        national_id_no: '', // empty string or national ID number
        address: '', // empty string or user address
        type: '', // or other possible types
        password: '',
        password_confirmation: '',
        scopes: [],
       },
       isNew: true
   }
 },

watch: {
 '$route.params.id': {
   immediate: true,
   handler(newVal) {
     if (newVal) {
       this.fetchData(newVal);
       this.itemId = newVal;
       this.isNew = false;
     }
     else {
       this.isNew = true;
     }
   },
 },
},

computed: {
  isChecked() {
    return (scope: string) => {
      const scopesArray = String(this.formData.scopes || '').split(','); // Explicitly cast to string
      return scopesArray.includes(scope);
    };
  },
},


methods: {

 async fetchData(id: number) {
   try {
     if (!this.token) {
       throw new Error('Token not found');
     }
     const response = await (axios as any).get(VUE_APP_API_URL + `users/${id}`, {
       headers: {
         Authorization: `Bearer ${this.token}`,
       },
     });
     if (response.status === 200) {
      //  this.formData = response.data;
       const data = response.data.data;
       this.formData = {
        ...data,
        scopes: (data.scopes || '').split(','), // Convert "USER,CUSTOMER" to ["USER", "CUSTOMER"]
      };
     }
   } catch (error) {
     console.error(error);
   }
 },
 async handleSubmit() {
   try {
    const payload = {
      ...this.formData,
      scopes: this.formData.scopes.join(','), // Convert ["USER", "CUSTOMER"] to "USER,CUSTOMER"
    };
     console.log('payload', payload);
     if (this.itemId) {
        this.submitBtn = true;
        const response = await (axios as any).put(
          VUE_APP_API_URL + 'users/' + this.itemId,
          payload,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
        );
        if(response.status == 200) {
          console.log();
          this.successReport = true;
          this.submitBtn = false;
          setTimeout(() => { this.successReport = false; }, 3000);
          setTimeout(() => { this.$router.push('/users'); }, 3000);
        }
     } else {
        this.submitBtn = true;
        const response = await (axios as any).post(VUE_APP_API_URL + 'users', 
          payload,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
        );
        console.log('_supplier_respons_', response.data);
        // if (response.status == 200) {
          this.formData = {
            id: Number,
            email: '',
            emailVerifiedAt: '', // ISO 8601 date string
            phone: '',
            firstname: '',
            lastname: '',
            profileImg:  '',// URL or empty string
            national_id_no: '', // empty string or national ID number
            address: '', // empty string or user address
            type: '', // or other possible types
            password: '',
            password_confirmation: '',
            scopes: [],
          };
          this.successReport = true;
          this.submitBtn = false;
          setTimeout(() => { this.successReport = false; }, 3000);
          setTimeout(() => { this.$router.push('/users'); }, 3000);
        // }      
     }
   } catch (error) {
     this.submitBtn = false;
     console.error(error);
   }
 },

//  addScope(scope: string) {
//   const scopes = String(this.formData.scopes || '').split(','); // Explicitly cast to string
//   if (!scopes.includes(scope)) {
//     this.formData.scopes = scopes.concat(scope).join(','); // Add scope
//   }
// },


// removeScope(scope: string) {
//   const scopes = String(this.formData.scopes || '').split(','); // Explicitly cast to string
//   const filteredScopes = scopes.filter((s) => s !== scope); // Remove scope
//   this.formData.scopes = filteredScopes.join(',');
// },

// editScope(oldScope: string, newScope: string) {
//   const scopes = String(this.formData.scopes || '').split(','); // Explicitly cast to string
//   const index = scopes.indexOf(oldScope);
//   if (index !== -1) {
//     scopes[index] = newScope; // Replace old scope
//     this.formData.scopes = scopes.join(',');
//   }
// },


  // async toggleScope(scope: string) {
  //   // console.log('Current value of scopes:', this.formData.scopes);
  //   // console.log('Type of scopes:', typeof this.formData.scopes);
  //   console.log('scope:', this.formData.scopes);
  //   if (this.isChecked(scope)) {
  //     this.removeScope(scope); // Remove scope(scope);
  //   } else {
  //     this.addScope(scope);
  //   }
  // }

  // loadFormData(response) {
  //     this.formData = {
  //       ...response,
  //       scopes: (response.scopes || '').split(','), // Convert string to array
  //     };
  //   },
  //   saveFormData() {
  //     const payload = {
  //       ...this.formData,
  //       scopes: this.formData.scopes.join(','), // Convert array to string
  //     };
  //     // Send payload to the server
  //     console.log(payload);
  //   },
  // },
},
mounted() {
 // Set isLoading to true when the component is mounted
},
})
</script>