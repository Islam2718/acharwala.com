<template>
  <div>    
    <div v-if="userData === null">
      <AuthPage/>
    </div>
    <div v-else-if="!$store.state.auth.token && !isAuthenticated">
      <AuthPage />
    </div>
    <div v-else>
      <HomePage/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'; // Import useStore from Vuex

import HomePage from './views/HomePage/HomePageView.vue';
import AuthPage from './views/AuthPage/AuthPageView.vue';
import axios from 'axios';
// import Dashboard from './views/Dashboard/DashboardView.vue';

export default defineComponent({
  name: 'App',
  components: {
    AuthPage,
    // LoginView,
    // CompanyRegistration,
    HomePage,
    // Dashboard
  },
  setup() { 
    const store = useStore(); // Use the Vuex store
    const isAuthenticated =  localStorage.getItem('token');
    const userData = localStorage.getItem('userData'); // Parse the JSON string
    // const storeData = localStorage.getItem('defaultStoreData');
    
    return {
      // login,
      isAuthenticated,
      $store: store,
      userData: userData,
      // storeData: storeData
    };
  },
  mounted() {
    const store = useStore(); // Use the Vuex store
    const userData = store.state.auth.userData || localStorage.getItem('userData');
    // const storeData = store.state.auth.storeData || localStorage.getItem('defaultStoreData');
    console.log('userData_App_view_user', this.isAuthenticated);
    // console.log('userData_App_view_store', storeData);
    // console.log('userData_App_view_', userData);
  }
});
</script>