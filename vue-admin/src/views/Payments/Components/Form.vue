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
       <div class="col-md-12 col-sm-12">
         <div class="card">
           <div class="card-body">
             <div class="card-body">
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Supplier Name 
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Name" v-model="formData.supplier_name" required>
                 </div>
               </div>
               <div class="row mb-3">
                 <label
                   class="col-sm-12 col-form-label"
                   for="basic-icon-default-store"
                   >Store Name 
                 </label>
                 <div class="col-sm-12">
                    <input type="text" class="form-control" id="basic-icon-default-fullname" placeholder="Name" v-model="formData.store_name" required>
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
                <span v-if="!submitBtn">Send</span> 
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                <span class="visually-show" v-if="submitBtn"> Sending...</span>
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
       submitBtn: false,
       formData: {
        id: Number,
        supplier_name: "",
        store_name: "",
        phone: "",
        address: "",
        thumb: "",
        user_id: Number,
        store_id: Number
       },
   }
 },

watch: {
 '$route.params.id': {
   immediate: true,
   handler(newVal) {
     if (newVal) {
       this.fetchData(newVal);
       this.itemId = newVal;
     }
   },
 },
},
methods: {

 async fetchData(id: number) {
   try {
     if (!this.token) {
       throw new Error('Token not found');
     }
     const response = await (axios as any).get(DOAMIN_PATH + `suplier/${id}`, {
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
     if (this.itemId) {
        this.submitBtn = true;
        this.formData.store_id = this.storeId; 
        this.formData.user_id = this.userId; 
        const response = await (axios as any).put(
          DOAMIN_PATH + 'suplier/' + this.itemId,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
        );
        if
        (response.status == 204) {
          console.log();
          this.successReport = true;
          this.submitBtn = false;
          setTimeout(() => { this.successReport = false; }, 3000);
        }
     } else {
        this.submitBtn = true;
        this.formData.store_id = this.storeId; 
        this.formData.user_id = this.userId; 
        const response = await (axios as any).post(DOAMIN_PATH + 'suplier', 
        this.formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          }
        );
        console.log('_supplier_respons_', response.data);
        if (response.status == 201) {
          this.formData = {
            id: Number,
            supplier_name: "",
            store_name: "",
            phone: "",
            address: "",
            thumb: "",
            user_id: this.userId,
            store_id: this.storeId,
          };
          this.successReport = true;
          this.submitBtn = false;
          setTimeout(() => { this.successReport = false; }, 3000);
        }      
     }
   } catch (error) {
     this.submitBtn = false;
     console.error(error);
   }
 }
},
mounted() {
 // Set isLoading to true when the component is mounted
 console.log('_user_id_', this.storeId);
},
})
</script>