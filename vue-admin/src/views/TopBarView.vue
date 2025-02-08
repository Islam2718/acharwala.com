<template>
    <div>
        <nav class="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme " id="layout-navbar">
          <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none" >
            <a class="nav-item nav-link px-0 me-xl-4 theme-responsive-menu" onclick="toggleSidebar()" >
              <i class="bx bx-menu bx-sm"></i>
            </a>
          </div>
          <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse" >
            <ul class="navbar-nav flex-row align-items-center ms-auto">
              <li class="nav-item lh-1 me-3">
                <router-link to="/setting" class="github-button d-none d-md-inline-block">
                  {{ (userData as unknown as Array<{ id: number; firstname: string }>[0]).firstname }} {{ (userData as unknown as Array<{ id: number; lastname: string }>[0]).lastname }}
                </router-link>
              </li>
              <!-- User -->
              <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" >
                  <div class="avatar avatar-online">              
                    <img
                      :src="'https://storage.grameen-ehaat.com/user.png'"
                      alt="n/a"
                      class="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img
                            src="https://storage.grameen-ehaat.com/user.png"
                            alt="n/a"
                            class="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-semibold d-block"> {{ (userData as unknown as Array<{ id: number; firstname: string }>[0]).firstname }} {{ (userData as unknown as Array<{ id: number; lastname: string }>[0]).lastname }}</span>
                        <small class="text-muted">{{ (userData as unknown as Array<{ id: number; email: string }>[0]).email }}</small><br>
                        <small class="text-muted">{{ (userData as unknown as Array<{ id: number; name: string }>[0]).name }}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <router-link to="/setting" class="dropdown-item" href="#">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/securitysettings" class="dropdown-item" href="#">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Security Settings</span>
                  </router-link>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <button class="dropdown-item" type="submit" @click="logout">
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </button>
                </li>
              </ul>
              </li>
            </ul>
          </div>
        </nav>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from '../../node_modules/axios/index';
import { useStore } from 'vuex';
import { DOAMIN_PATH, VUE_APP_API_URL } from "@/api";

let userData = ref([]);
let userId = ref([]);

export default defineComponent({
  name: 'TopBar',
  components: {},
  data() {
    // const storeInstance = useStore();
    return {};
  },
  methods: {},
  mounted() {
    // Set isLoading to true when the component is mounted
  },
  async created() {
    // show the loading overlay
  },

  setup() {
    let storeInstance = useStore();
    const isToggled = ref(false);
    const toggleClass = () => {
      isToggled.value = !isToggled.value;
      const html = document.querySelector('html');
      if (html) {
        html.classList.toggle('layout-menu-expanded', isToggled.value);
      }
    };

    // Function to show the modal
    const getUserInfo = async () => {
      userData.value = storeInstance.state.auth.userData || localStorage.getItem('userData');
      const userlocalStorage = localStorage.getItem('userData');
      const parsedUser = userlocalStorage ? JSON.parse(userlocalStorage) || storeInstance.state.auth.userData : null;
      userData.value = parsedUser;
      userId = storeInstance.state.auth.userId || localStorage.getItem('userId');
      // const localStorageData = localStorage.getItem('defaultStoreData'); 
      // const parsedData = localStorageData ? JSON.parse(localStorageData) : null || storeInstance.state.auth.defaultStoreData;      
    };

    const logout = async () => {
      try {
        const store = useStore();
        const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token not found');
            }
        // Call the logout API    
          const response = await axios.post(VUE_APP_API_URL  + 'logout',
          {},  
          {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }            
          );

        if (response.status === 200) {
          // router.push('/');
          window.location.reload();
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userData');
        } else {
          console.error('Logout failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    onMounted(async () => {
      await getUserInfo(); // Retrieve site info
    });

    return {
      isToggled,
      getUserInfo,
      toggleClass,
      logout,
      userData,
      userId,
    };
  },
});
</script>

<style scoped>
  .dashboard { text-align: center; }
</style>