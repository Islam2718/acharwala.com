<template>
  <div class="layout-page">
    <TopBarView />
    <div class="content-wrapper">
      <div>
        <div>
          <div class="flex-grow-1 container-p-y px-4">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h4 class="fw-bold py-3 mb-4">
                  <span class="text-muted fw-light">Premium</span> Ads
                </h4>
              </div>
              <div>
                <!-- Toggle buttons if needed -->
                <!-- <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="listShow"> + Add</button>
                <button class="btn btn-primary mt-2" @click="toggleComponent" v-if="formShow">Back to List</button> -->
              </div>
            </div>
            <div class="">
              <!-- Basic Layout -->
              <div class="">
                <!-- Table -->
                <!-- <div class="" v-if="listShow">
                  <div class="">
                    <div class="text-nowrap">
                      <List />
                    </div>
                  </div>
                </div> -->
                <!-- Form -->
                <!-- <div v-if="formShow">
                  <Form />
                </div> -->
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
// import List from "./Components/List.vue";
// import Form from "./Components/Form.vue";
import Footer from "../FooterView.vue";
import TopBarView from "../TopBarView.vue";
// import router from "../../router";

export default defineComponent({
  components: { Footer, TopBarView },
  name: "PremiumAds",
  data() {
    return {
      listShow: false,
      formShow: true,
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal) {
        console.log('_id900_', newVal);
        // Toggle visibility based on route params if needed
        // this.listShow = !this.listShow;
        // this.formShow = !this.formShow;
      }
    },
  },
  methods: {
    // Toggle component visibility
    // toggleComponent() {
    //   this.listShow = !this.listShow;
    //   this.formShow = !this.formShow;
    //   if(this.$route.params.id){
    //     this.listShow = !this.listShow;
    //     this.formShow = !this.formShow;
    //     router.push({ name: "premium-ads" });
    //   }
    // }
  },
  mounted() {
    // Perform any setup needed when the component is mounted
  },
});
</script>
