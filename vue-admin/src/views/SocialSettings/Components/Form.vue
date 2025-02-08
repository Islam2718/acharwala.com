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
                      <span class="text-muted fw-light">Social</span> Form
                  </h4>
                </div>
                <div>
                  <router-link to="/social" class="btn btn-primary mt-2" > Back to List</router-link>
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
                    <div class="col-md-12 col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="card-body">                    
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-fullname"
                                >Name</label
                              >
                              <div class="col-sm-12">
                                <div class="input-group input-group-merge">
                                  <span
                                    id="basic-icon-default-fullname2"
                                    class="input-group-text"
                                    ><i class="bx bx-buildings"></i
                                  ></span>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="basic-icon-default-fullname"
                                    placeholder="Name"
                                    v-model="formData.name"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-fullname"
                                >Icon</label
                              >
                              <div class="col-sm-12">
                                <div class="input-group input-group-merge">
                                  <span
                                    id="basic-icon-default-fullname2"
                                    class="input-group-text"
                                    ><i class="bx bx-buildings"></i
                                  ></span>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="basic-icon-default-fullname"
                                    placeholder="Font Awsome Icon"
                                    v-model="formData.icon"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-fullname"
                                >Link Url</label
                              >
                              <div class="col-sm-12">
                                <div class="input-group input-group-merge">
                                  <span
                                    id="basic-icon-default-fullname2"
                                    class="input-group-text"
                                    ><i class="bx bx-buildings"></i
                                  ></span>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="basic-icon-default-fullname"
                                    placeholder="Link Url"
                                    v-model="formData.link_url"
                                    required
                                  />
                                </div>
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
                                <span v-if="!submitBtn">Save</span> 
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                                <span class="visually-show" v-if="submitBtn"> Saving...</span>
                              </button>
                            </div>
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
  name: "SocialForm", // Rename the component to a multi-word name
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
          storeId,
          itemId: '',
          store,
          token,
          userId,
          searchKey: '',
          formData: {
            id: Number,
            name: '', 
            icon:'',
            link_url:'',
            image:'',
            target: "_blank",
            status: Number,
            created_at: null,
            updated_at: null
          },
          submitBtn: false,
                  
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
        const response = await (axios as any).get(VUE_APP_API_URL + `social/${id}`, {
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
            VUE_APP_API_URL + 'social/' + this.itemId,
            this.formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              }
            }
          );
          if
          (response.status == 200) {
            console.log();
            this.successReport = true;
            this.submitBtn = false;
            setTimeout(() => { this.successReport = false; }, 3000);
          }
        } else {
          this.submitBtn = true;
          console.log('_category_respons_', this.formData);
          const response = await (axios as any).post(VUE_APP_API_URL + 'social', 
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
              name: '', 
              icon:'',
              link_url:'',
              image:'',
              target: "_blank",
              status: Number,
              created_at: null,
              updated_at: null
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