import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '@/views/Dashboard/DashboardView.vue';

// import ForgetPasswordView from '@/views/ForgetPasswordView.vue';
import Category from '@/views/Category/CategoryView.vue';
import CategoryForm from '@/views/Category/Components/Form.vue';

import Product from '@/views/Product/ProductView.vue';
import ProductForm from '@/views/Product/Components/Form.vue';
import StatusForm from '@/views/Product/Components/StatusForm.vue';

import SponsorAds from '@/views/SponsorAds/SponsorAdsView.vue';
import SponsorAdsForm from '@/views/SponsorAds/Components/Form.vue';

import Page from '@/views/Page/PageView.vue';
import PageForm from '@/views/Page/Components/Form.vue';
import BlogPage from '@/views/BlogPage/BlogPageView.vue';
import BlogPageForm from '@/views/BlogPage/Components/Form.vue';
import BlogCategory from '@/views/BlogCategory/BlogCategoryView.vue';
import BlogCategoryForm from '@/views/BlogCategory/Components/Form.vue';
import Slider from '@/views/SliderSettings/SliderSetting.vue';
import SliderForm from '@/views/SliderSettings/Components/Form.vue';
import Store from '@/views/Stores/StoreView.vue';
import StoreForm from '@/views/Stores/Components/Form.vue';
import Social from '@/views/SocialSettings/SocialSettingsView.vue';
import SocialForm from '@/views/SocialSettings/Components/Form.vue';

import SliderSettings from '@/views/SliderSettings/SliderSettingsView.vue';
import SliderSettingsForm from '@/views/SliderSettings/Components/Form.vue';

import GcAppLinks from '@/views/GcAppLinks/GcAppLinksView.vue';
import GcAppLinksForm from '@/views/GcAppLinks/Components/Form.vue';



import SiteSettings from '@/views/SiteSettings/SettingView.vue';
import ProfielSetting from '@/views/ProfileSettings/SettingView.vue';
import SiteSettingsForm from '@/views/SiteSettings/Components/Form.vue';

import User from '@/views/Users/UserView.vue';
import UserForm from '@/views/Users/Components/Form.vue';

import SecuritySetting from '@/views/SecuritySetting/SettingView.vue';
// import ProductSetting from '@/views/ProductSetting/ProductView.vue';
// import ProductSettingForm from '@/views/ProductSetting/Components/Form.vue';

// import Invoice from '@/views/InvoiceView.vue';
import NotFound from '@/views/NotFound.vue';
import { useStore } from 'vuex';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },

  {
    path: '/category',
    name: 'category-view',
    component: Category,
    meta: { showSpinner: true },
  },
  {
    path: '/category/form/:id?',
    name: 'category-form',
    component: CategoryForm,
    meta: { showSpinner: true },
  },
  {
    path: '/product',
    name: 'product-view',
    component: Product,
    meta: { showSpinner: true },
    
  },
  {
    path: '/product/form/:id?',
    name: 'product-form',
    component: ProductForm,
    meta: { showSpinner: true },
    
  },
  {
    path: '/product/status-form/:id?',
    name: 'status-form',
    component: StatusForm,
    meta: { showSpinner: true },
    
  },
  {
    path: '/page',
    name: 'page-view',
    component: Page,
    meta: { showSpinner: true }
  },
  {
    path: '/page/form/:id?',
    name: 'page-form',
    component: PageForm,
    meta: { showSpinner: true }
  },
  {
    path: '/blog-page',
    name: 'blog-page-view',
    component: BlogPage,
    meta: { showSpinner: true }
  },
  {
    path: '/blog-page/form/:id?',
    name: 'blog-page-form',
    component: BlogPageForm,
    meta: { showSpinner: true }
  },
  {
    path: '/blog-category',
    name: 'blogcategory-view',
    component: BlogCategory,
    meta: { showSpinner: true }
  },
  {
    path: '/blog-category/form/:id?',
    name: 'blog-category-form',
    component: BlogCategoryForm,
    meta: { showSpinner: true }
  },
  {
    path: '/slider',
    name: 'SliderList',
    component: Slider,
    meta: { showSpinner: true }
  },
  {
    path: '/slider/form/:id?',
    name: 'slider-category-form',
    component: SliderForm,
    meta: { showSpinner: true }
  },
  {
    path: '/stores',
    name: 'store-view',
    component: Store,
    meta: { showSpinner: true }
  },
  {
    path: '/stores/form/:id?',
    name: 'store-form',
    component: StoreForm,
    meta: { showSpinner: true }
  },
  {
    path: '/social',
    name: 'social-setting',
    component: Social,
    meta: { showSpinner: true }
  },
  {
    path: '/social/form/:id?',
    name: 'SocialForm',
    component: SocialForm,
    meta: { showSpinner: true }
  },
  {
    path: '/securitysettings',
    name: 'security-setting-view',
    component: SecuritySetting,
    meta: { showSpinner: true }
  },
  {
    path: '/site-settings',
    name: 'setting-view',
    component: SiteSettings,
    meta: { showSpinner: true }
  },
  {
    path: '/setting',
    name: 'Profilesetting-view',
    component: ProfielSetting,
    meta: { showSpinner: true }
  },
  {
    path: '/users',
    name: 'user-view',
    component: User,
    meta: { showSpinner: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;