<!-- eslint-disable @typescript-eslint/no-explicit-any -->
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
                  <router-link to="/category" class="btn btn-primary mt-2" > Back to List</router-link>
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
                            <!-- <div class="row mb-3">
                              <label
                                class="col-sm-12 col-form-label"
                                for="basic-icon-default-fullname"
                                >Select Parent Category</label
                              >
                              <div class="col-sm-12">
                                <div class="input-group input-group-merge">
                                  <span
                                    id="basic-icon-default-fullname2"
                                    class="input-group-text"
                                    ><i class="bx bx-buildings"></i
                                  ></span>
                                  <select class="form-select" v-model="formData.parent_id">
                                    <option value="">-- Select Parent Category-- </option>
                                    <option v-for="category in fetchCategoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
                                  </select>
                                </div>
                                <ul v-if="suggestions.length" class="form-control suggestions-list">
                                  <li v-for="category in suggestions" :key="category.id"  class="p-2">
                                    {{ category.name }}
                                  </li>
                                </ul >
                              </div>
                            </div> -->
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
                    <div class="col-md-3 col-sm-12">
                      <div class="card mb-4">
                        <div class="card-body text-center">
                          <div class="page-image text-center">
                            <img v-if="formData.thumb"
                                :src=" fileUrl + formData.thumb"
                                alt="n/a"
                                class="slider-setting-img w-50 img-fluid"
                            />
                            <img v-else
                              src="https://phicsart.com/uploads/images/top-page/menu/logo.svg"
                              alt="n/a"
                              class="slider-setting-img img-fluid"  style="width:30%;"
                            />
                            <input type="text" class="form-control" placeholder="Enter Text" v-model="formData.thumb" />
                          </div>
                          <button class="btn btn-primary btn-sm mt-3" type="button" @click="toggleUploadModal"> Select Image </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
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
                <UploadModal v-if="showuploadModal" @selectImage="handleSelectedImage" /> 
            </div>
          </div>
        </div>
       </div>
      <Footer />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex';
import Footer from "../../FooterView.vue";
import TopBarView from "../../TopBarView.vue";
import UploadModal from '@/components/UploadModal.vue';
interface suggestedCategory {
  id: number,
  name: string
}
export default defineComponent({
  name: "category-form",
  components: {
    // CkEditor,
    Footer,
    TopBarView,
    UploadModal
  },
    data() {
      const store = useStore();
      const token = store.state.auth.token || localStorage.getItem('token');
      const userId = store.state.auth.userId || localStorage.getItem('userId');
      return {
          successReport: false,
          selectedImage: null,
          fileUrl: process.env.VUE_APP_FILE_URL,
          itemId: '',
          store,
          token,
          userId,
          searchKey: '',
          showuploadModal: false,
          formData: {
            id: Number,
            parent_id: Number,
            name: '', 
            description:'',
            thumb:'',
            status: Number,
          },
          suggestions: [] as suggestedCategory[],
          submitBtn: false,
          fetchTypeList: [{
           id: Number,
           title: '',           
          }]
      }
    },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchData(newVal);
          // this.itemId = newVal;
        }
      },
    }
  },

  methods: {    
    // async searchCategory() {
    //   try {
    //     if (!this.token) {
    //       throw new Error('Token not found');
    //     }
    //     //this.suggestions = [];
    //     const response = await (axios as any).get(process.env.VUE_APP_API_URL +`category`, {
    //       params: {
    //         'search-key': this.formData.name,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${this.token}`,            
    //         // TypeId: this.formData.type_id ? this.formData.type_id : '',
    //       },
    //     });
    //     // console.log('_type_list', response);
    //     if (response.status === 200) {
    //       this.suggestions = response.data.data.data;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },    
    async fetchData(id: number) {
      try {
        if (!this.token) {
          throw new Error('Token not found');
        }
        const response = await (axios as any).get(process.env.VUE_APP_API_URL + `category/${id}`, {
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
            process.env.VUE_APP_AOU_URL + 'category/' + this.itemId,
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
          console.log('_category_respons_', this.formData);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await (axios as any).post(process.env.VUE_APP_API_URL + 'category', 
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
              parent_id: Number,
              name: '', 
              description: '',
              thumb:'',
              status: Number,
            };
            this.successReport = true;
            this.submitBtn = false;
            setTimeout(() => { this.successReport = false; }, 3000);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCategoryList() {
      try {
        if (!this.token) {
          throw new Error('Token not found');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await (axios as any).get(process.env.VUE_APP_API_URL + 'category', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (response.status === 200) {
          this.fetchCategoryList = response.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    toggleUploadModal() {
      this.showuploadModal = !this.showuploadModal;
    },
    async handleSelectedImage( image: any) {
      // Handle the selected image value
      this.selectedImage = image;
      this.formData.thumb = image;
      this.showuploadModal = !this.showuploadModal;// Close the modal if needed
    },
  },
mounted() {
    // Set isLoading to true when the component is mounted
    // eslint-disable-next-line no-undef
    // this.fetchCategoryList();
  },
})
</script>