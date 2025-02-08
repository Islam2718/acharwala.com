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
                      <span class="text-muted fw-light">Category</span> Form
                  </h4>
                </div>
                <div>
                  <router-link to="/category_setting" class="btn btn-primary mt-2" > Back to List</router-link>
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
                                >Select Type</label
                              >
                              <div class="col-sm-12">
                                <div class="input-group input-group-merge">
                                  <span
                                    id="basic-icon-default-fullname2"
                                    class="input-group-text"
                                    ><i class="bx bx-buildings"></i
                                  ></span>                     
                                  <select class="form-select" v-model="formData.type_id">
                                    <option value="">-- Select Type-- </option>
                                    <option v-for="type in fetchTypeList" :key="type.id" :value="type.id">{{ type.title }}</option>
                                  </select>
                                </div>
                              </div>
                            </div>                  
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-fullname"
                                >Category Name</label
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
                                    @input="searchCategory"
                                  />
                                </div>
                                <!-- Display suggestions -->
                                <ul v-if="suggestions.length" class="form-control suggestions-list">
                                  <li v-for="category in suggestions" :key="category.id"  class="p-2">
                                    {{ category.name }}
                                  </li>
                                </ul >
                              </div>
                            </div>
                            <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-store"
                                >Category Description
                              </label>
                              <div class="col-sm-12">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" v-model="formData.description" placeholder="Description"></textarea>
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
import { DOAMIN_PATH } from "@/api";
import Footer from "../../FooterView.vue";
import TopBarView from "../../TopBarView.vue";
interface suggestedCategory {
  id: number,
  name: string
}
export default defineComponent({
  name: "SponsorsForm", // Rename the component to a multi-word name
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
            description:'',
            thumb:'',
            type_id: '',
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
    async fetchTypeFunc() {
      try {
        if (!this.token) {
          throw new Error('Token not found');
        }
        const response = await (axios as any).get(DOAMIN_PATH +`type`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            storeId: this.storeId,
          },
        });
        console.log('_type_list', response);
        if (response.status === 200) {
          this.fetchTypeList = response.data.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },    
    async searchCategory() {
      try {
        if (!this.token) {
          throw new Error('Token not found');
        }
        //this.suggestions = [];
        const response = await (axios as any).get(DOAMIN_PATH +`category`, {
          params: {
            'search-key': this.formData.name,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,            
            TypeId: this.formData.type_id ? this.formData.type_id : '',
          },
        });
        console.log('_type_list', response);
        if (response.status === 200) {
          this.suggestions = response.data.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },    
    async fetchData(id: number) {
      try {
        if (!this.token) {
          throw new Error('Token not found');
        }
        const response = await (axios as any).get(DOAMIN_PATH + `category/${id}`, {
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
            DOAMIN_PATH + 'category/' + this.itemId,
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
            this.suggestions = [];
            setTimeout(() => { this.successReport = false; }, 3000);
          }
        } else {
          this.submitBtn = true;
          this.formData.store_id = this.storeId;
          this.formData.user_id = this.userId;
          console.log('_category_respons_', this.formData);
          const response = await (axios as any).post('https://pos-api.phicsart.com/api/category', 
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
              description: '',
              thumb:'',
              type_id: '',
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
    this.fetchTypeFunc();
  },
})
</script>