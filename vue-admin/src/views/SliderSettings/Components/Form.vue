<template>
    <div class="layout-page">
      <TopBarView />
    <div class="content-wrapper">
        <!-- <Search /> -->
        <div>
          <div>
            <div class="flex-grow-1 container-p-y px-4">
              <div class="d-flex justify-content-between aling-items-center">
                <div>
                  <h4 class="fw-bold py-3 mb-4">
                      <span class="text-muted fw-light">Slider</span> Form
                  </h4>
                </div>
                <div>
                  <router-link to="/slider" class="btn btn-primary mt-2" > Back to List</router-link>
                  <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="listShow">+ Add</button> -->
                  <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="formShow">Back to List</button> -->
                </div>
              </div>
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
                                for="basic-icon-default-fullname"
                                >Title</label
                              >
                              <div class="col-sm-12">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="basic-icon-default-fullname"
                                  placeholder="Title"
                                  v-model="formData.title"
                                  required
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-fullname"
                                >Link </label
                              >
                              <div class="col-sm-12">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="basic-icon-default-fullname"
                                  placeholder="Link"
                                  v-model="formData.link_url"
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Description
                              </label>
                              <div class="col-sm-12">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" v-model="formData.description" placeholder="Description"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <!-- <div class="page-image">
                            <img
                              src="https://www.imageeditexpert.com/uploads/images/about/about.png"
                              alt="n/a"
                              class="slider-setting-img img-fluid"
                            />
                          </div>
                          <div class="mb-3">
                            <label for="formFile" class="form-label">Image Choose</label>
                            <input class="form-control" type="file" id="formFile" />
                          </div> -->
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
                    <div class="row justify-content-end">
                      <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary mt-3" :disabled="submitBtn">
                          <span v-if="!submitBtn">Save</span> 
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                          <span class="visually-show" v-if="submitBtn"> Saving...</span>
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
      <!-- / Footer -->
    </div>
    <!-- / Layout wrapper -->

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// import CkEditor from "../../../components/Ckeditor.vue";
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex'; // Import useStore from Vuex
import { DOAMIN_PATH, VUE_APP_API_URL } from "@/api";
import Footer from "../../FooterView.vue";
import TopBarView from "../../TopBarView.vue";
interface suggestedCategory {
  id: number,
  name: string
}
export default defineComponent({
  name: "slider-category-form", // Rename the component to a multi-word name
  components: {
    // CkEditor,
    Footer,
    TopBarView
  },
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
          searchKey: '',
          formData: {
            id: Number,
            title: '', 
            description:'',
            thumb:'',
            link_url: '',
            status: Number,
            user_id: Number,
            store_id: Number
          },
          suggestions: [] as suggestedCategory[],
          submitBtn: false,
          fetchTypeList: [{
           id: Number,
           title: '',
       }],          
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
        const response = await (axios as any).get(VUE_APP_API_URL + `slider/${id}`, {
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
          const response = await (axios as any).put(
            VUE_APP_API_URL + 'slider/' + this.itemId,
            this.formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              }
            }
          );
          this.successReport = true;
            this.submitBtn = false;
            this.suggestions = [];
            setTimeout(() => { this.successReport = false; }, 3000);
          if
          (response.status == 204) {
            console.log();
            this.successReport = true;
            this.submitBtn = false;
            this.suggestions = [];
            setTimeout(() => { this.successReport = false; }, 3000);
          }
        } else {
          this.submitBtn = true;
          this.formData.store_id = this.storeId;
          this.formData.user_id = this.userId;
          console.log('_category_respons_', this.formData);
          const response = await (axios as any).post( VUE_APP_API_URL + 'slider', 
          this.formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              }
            }
          );
          if (response.status == 201) {
            this.formData = {
              id: Number,
              title: '', 
              description: '',
              thumb:'',
              link_url: '',
              status: Number,
              user_id: this.userId,
              store_id: this.storeId,
            };
            this.successReport = true;
            this.submitBtn = false;
            setTimeout(() => { this.successReport = false; }, 3000);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
mounted() {
    // Set isLoading to true when the component is mounted
  },
})
</script>