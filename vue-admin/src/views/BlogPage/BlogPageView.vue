<template >

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
                    <span class="text-muted fw-light">Blog Page</span> List
                </h4>
              </div>
              <div>                
                <router-link to="/blog-page/form" class="btn btn-primary mt-2" >+ Add</router-link>
                <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="listShow"> + Add</button>
                <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="formShow">Back to List</button> -->
              </div>
            </div>
            <!-- Basic Layout & Basic with Icons -->
            <div class="">
              <!-- Basic Layout -->
                <div class="">
                    <!-- table  -->
                  <div class="" v-if="listShow">
                    <div class="">
                      <div class="text-nowrap">
                        <List />
                      </div>
                    </div>
                  </div>
                  <!-- form..  -->
                  <div v-if="formShow">
                    <Form />
                  </div>                  
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <!-- / Footer -->

      <div class="content-backdrop fade"></div>
    </div>
    <!-- / Layout wrapper -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import List from "./Components/List.vue";
import Form from "./Components/Form.vue";
import Footer from "../FooterView.vue";
import TopBarView from "../TopBarView.vue";
import router from "@/router";

export default defineComponent({
  components: { List, Form,Footer, TopBarView},
  name: "blog-page-view",
  data() {
    return {
      listShow: true,
      formShow: false,
    };
  },
  watch: {
    '$route.params.id': {
      handler(newVal) {
        this.listShow = !this.listShow;
        this.formShow = !this.formShow;
      },
    },
  },
  methods: {
    toggleComponent() {
      this.listShow = !this.listShow; // Toggles the visibility
      this.formShow = !this.formShow; // Toggles the visibility
      if(this.$route.params.id){
        this.listShow = !this.listShow;
        this.formShow = !this.formShow;
        router.push({ name: "page-view" });
      }
    },
  },

  mounted() {
    // Set isLoading to true when the component is mounted
    //this.showLoadingOverlay();
  },

});
</script>