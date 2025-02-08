<!-- NotFound.vue -->
<template >
    <div class="layout-page">
      <TopBarView />
      <div class="content-wrapper">
      
        <div class="flex-grow-1 container-p-y px-4">
              <div>
                <h4 class="fw-bold py-3 mb-4">
                    <span class="text-muted fw-light"> </span><h1 class="mb-2 text-center">404</h1>
                </h4>
                <p class="text-center">Sorry, the page you are looking for does not exist.</p>
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
  import TopBarView from './TopBarView.vue';
  import Footer from './FooterView.vue';
  export default defineComponent({
  components: { Footer, TopBarView},
  name: "not-found",
    // You can add component-specific logic here
  });
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  </style>
  