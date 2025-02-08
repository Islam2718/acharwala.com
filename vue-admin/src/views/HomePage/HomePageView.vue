<template>
    <!-- Layout wrapper --> 
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <aside
          id="layout-menu"
          class="layout-menu menu-vertical menu bg-menu-theme"
        >
          <div class="app-brand demo text-center">
            <router-link to="" class="app-brand-link">
              <span class="app-brand-text demo text-center text-body fw-bold text-uppercase mb-3"> 
                <img src="img/logo.png" alt="n/a" class=" mx-auto" style="width: 100px;">                
              </span>
              <span class="app-brand-text demo menu-text fw-bolder ms-2 text-uppercase">
                <img src="assets/img/logo.png" alt=""></span>
            </router-link>
          </div>
          <div class="menu-inner-shadow"></div>
          <ul class="menu-inner py-1">
            <li
              v-for="menu in menus"
              :key="menu.id"
              class="menu-item"
              :class="{ active: isActive(menu) }"
            >
              <router-link
                class="menu-link"
                :to="menu.path"
                @click="toggle(menu)"
              >
                {{ menu.title }}
                <span v-if="menu.subItems" :class="{ arrow: true }"></span>
              </router-link>
              <ul v-if="menu.subItems && menu.show" class="menu-sub open">
                <li
                  v-for="subItem in menu.subItems"
                  :key="subItem.id"
                  class="menu-item"
                  :class="{ active: isActive(subItem) }"
                >
                  <router-link
                    class="menu-link"
                    :class="{ active: isActive(subItem) }"
                    :to="subItem.path"
                    >{{ subItem.title }}</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="menu-item">
              <span class="menu-link cursor-pointer" @click="logout">
                Log Out
              </span>
            </li>
          </ul>
        </aside>
        <router-view />
        <!-- / Layout page -->
      </div>
      <!-- Overlay -->
      <!-- <div class="layout-overlay layout-menu-toggle" @click="toggleClass"></div> -->
      <div class="layout-overlay layout-menu-toggle" onclick="toggleSidebar()"></div>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { useStore } from 'vuex';
  import axios from '../../../node_modules/axios/index';
  interface Menu {
    id: number;
    title: string;
    path: string;
    show: boolean;
    subItems?: Menu[];
  }
  
  export default defineComponent({
    name: "HomePageView",
    data() {
      const store = useStore();
      const token = store.state.auth.token || localStorage.getItem('token');
      let userData = store.state.auth.userData || localStorage.getItem('userData');
      userData = JSON.parse(userData);
      return {
        store,
        token,
        userData: userData,
        menus: [
          {
            id: 1,
            title: "Dashboard",
            icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
            path: "/",
            show: false,
          },
          {
            id: 2,
            title: "Category",
            icon: "user-secret",
            path: "/category",
            show: false,
          },          
          {
            id: 3,
            title: "Produtcs",
            icon: "user-secret",
            path: "/product",
            show: false,
          },
          {
            id: 4,
            title: "Page",
            icon: "user-secret",
            path: "/page",
            show: false,
          },
          {
            id: 41,
            title: "Blog",
            icon: "user-secret",
            listtitle: "Admin Area",
            path: "#0",
            show: false,
            subItems: [
              {
                id: 121,
                title: "Page",
                icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
                path: "/blog-page",
                show: false,
              },
              {
                id: 122,
                title: "Post",
                icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
                path: "/blog-post",
                show: false,
              },
              {
                id: 123,
                title: "Category",
                icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
                path: "/blog-category",
                show: false,
              },
            ],
          },
          {
            id: 4,
            title: "Store",
            icon: "user-secret",
            path: "/stores",
            show: false,
          },
          {
            id: 4,
            title: "Slider",
            icon: "user-secret",
            path: "/slider",
            show: false,
          },
          {
            id: 5,
            title: "Premium Ads||",
            icon: "user-secret",
            path: "/premium-ads",
            show: false,
          },
          {
            id: 5,
            title: "Sponsors Ads||",
            icon: "user-secret",
            path: "/sponsors-ads",
            show: false,
          },
          // {
          //   id: 6,
          //   title: "Payments",
          //   icon: "user-secret",
          //   path: "/payments",
          //   show: false,
          // },
          {
            id: 7,
            title: "Slider Settings||",
            icon: "user-secret",
            path: "/slider-settings",
            show: false,
          },
          {
            id: 9,
            title: "GC App Links||",
            icon: "user-secret",
            path: "/gc-app-links",
            show: false,
          },
          {
            id: 10,
            title: "Social Settings",
            icon: "user-secret",
            path: "/social",
            show: false,
          },
          {
            id: 11,
            title: "Site Settings",
            icon: "user-secret",
            path: "/site-settings",
            show: false,
          },
          {
            id: 12,
            title: "Users",
            icon: "user-secret",
            path: "/users",
            show: false,
          },
          // {
          //   id: 11,
          //   title: "Payments",
          //   icon: "user-secret",
          //   path: "/payments",
          //   show: false,
          // }
        ],
        isLoading: false,
        fullPage: true,
        isActiveMenu: true,
        onCancel: () => void(0),
      };
    },
    mounted() {
      // Set isLoading to true when the component is mounted
      // this.showLoadingOverlay();
    },
    methods: {
      isActive(menu: Menu | any) {
        let active = false;
        if (menu.path === this.$route.path) {
          active = true;
        } else if (menu.subItems) {
          for (const subItem of menu.subItems) {
            if (subItem.path === this.$route.path) {
              active = true;
              break;
            }
          }
        }
        else if (menu === this.$route.path) {
              active = true;
        }
        return active;
      },
      toggleClass() {
      this.isActiveMenu = !this.isActiveMenu;
      const html = document.querySelector("html");
      if (html) {
        html.classList.toggle("layout-menu-expanded", this.isActiveMenu);
      }
    },
      toggle(menu: Menu) {
        menu.show = !menu.show;
      },
      async logout () {
        try {
              if (!this.token) {
                throw new Error('Token not found');
              }
          // Call the logout API    
            console.log('_token', this.token);
            const response = await axios.post(process.env.VUE_APP_API_URL + 'logout',
            {},  
            {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              }            
            );

          if (response.status === 200) {
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
      },
    },
  });
  </script>
  <style scoped>
  .menu-item .menu-sub {
    display: block;
  }
  .menu-link {
    position: relative;
  }
  .menu-link .arrow {
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    border-bottom: 1px solid #697a8d;
    border-right: 1px solid #697a8d;
    right: 25px;
    top: 15px;
    transform: rotate(45deg);
  }
  @media (max-width: 1199.98px) {
    .menu-inner {
      overflow-y: scroll;
    }
  }
  .layout-wrapper:not(.layout-horizontal)
    .bg-menu-theme
    .menu-inner
    > .menu-item.active:before {
    content: "";
    position: absolute;
    right: 0;
    width: 0.25rem;
    height: 2.6845rem;
    border-radius: 0.375rem 0 0 0.375rem;
    display: none;
  }
  .menu-item.active > .menu-link.router-link-active::before {
    content: "";
    position: absolute;
    right: 0;
    width: 0.25rem;
    height: 2.6845rem;
    border-radius: 0.575rem 0.575rem 0.575rem 0.575rem;
    background-color: #696cff;
  }
  .vl-overlay .vl-background {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background: #435971;
    opacity: 0.15;
  }
  </style>
  