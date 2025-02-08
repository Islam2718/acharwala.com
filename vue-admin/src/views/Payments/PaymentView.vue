<template >
  <div class="layout-page">
    <TopBarView />
    <div class="content-wrapper">
      <!-- <Search /> -->
      <!-- Content -->
      <div>
        <div>
          <div class="flex-grow-1 container-p-y px-4">
            <div class="d-flex justify-content-between aling-items-center">
              <div>
                <h4 class="fw-bold py-3 mb-4">
                    <span class="text-muted fw-light">Payments </span>Info
                </h4>
              </div>
              <div>
                <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="listShow"> + Add</button> -->
                <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="formShow">Back to List</button> -->
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
import { defineComponent, ref } from "vue";
// import ThemMenu from "../components/Navbar.vue";
// import Search from "../components/Search.vue";
import List from "./Components/List.vue";
import Form from "./Components/Form.vue";
import Footer from "../FooterView.vue";
import TopBarView from "../TopBarView.vue";
import router from "@/router";

export default defineComponent({
  components: { List, Form,Footer, TopBarView},
  name: "payment-view",
  data() {
    return {
      listShow: true,
      formShow: false,
    };
  },
  watch: {
    '$route.params.id': {
      // immediate: true,
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
        router.push({ name: "supplier-view" });
      }
    },
  },

  mounted() {
    // Set isLoading to true when the component is mounted
    //this.showLoadingOverlay();
  },

});
</script>