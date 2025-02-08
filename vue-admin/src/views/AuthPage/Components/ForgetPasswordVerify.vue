<template>
  <div class="container-xxl">
    <div class="row " style="min-height: 100vh">
      <div class="col-md-9 col-sm-12 mx-auto">
        <div class="row h-100">
          <div class="col-md-6 mx-auto">
            <div class="d-flex align-items-center justify-content-center h-100">
              <div class="w-100">
                <div class="authentication-wrapper authentication-basic container-p-y">
                  <div class="authentication-inner">
                    <!-- login -->
                    <div class="card">
                      <div class="card-body">
                        <!-- Logo -->
                        <div class="app-brand justify-content-center">
                          <a href="/" class="app-brand-link gap-2">
                            <span class="app-brand-text demo text-body fw-bold text-uppercase mb-3"> 
                              <img src="https://pos-file.phicsart.com/profile_user.png" alt="n/a" class="img-fluid" style="width:80px; height:80px;">
                            </span>
                          </a>
                        </div>
                        <!-- /Logo -->
                        <h4 class="mb-2 text-center">Verify Now 👋</h4>
                        <div v-if="actionReport" class="alert alert-warning alert-dismissible" role="alert">
                          Invalid verification code .!
                          <button type="button" class="btn-close"  aria-label="Close"></button>
                        </div>              
                        <form id="formAuthentication" class="mb-3" @submit.prevent="onForgetPasswordVerify()">
                          <div class="mb-3">
                            <label for="email" class="form-label">Code</label>
                            <input type="text" class="form-control" v-model="forgetPasswordVerifyForm.verification_code" placeholder="Enter verification code" >
                          </div>
                          <div class="mb-3">
                            <button type="submit" class="btn btn-primary w-100 justify-content-center" :disabled="submitBtn">
                              <span v-if="!submitBtn">Verify</span> 
                              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                              <span class="visually-show" v-if="submitBtn"> Loading ....</span>
                            </button>
                          </div>
                        </form>
                        <p class="text-center">
                          <span>Already have an account?</span>
                          <button type="button" class="btn btn-sm" style="color: #696cff" @click="switchToLogin()">
                            <span>Login</span>
                          </button>
                        </p>
                      </div>
                    </div>
                    <!-- /Register -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>  
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
// import Topbar from '../TopBarView.vue';
// import Footer from '../FooterView.vue';
import { useStore } from 'vuex';
import axios from '../../../../node_modules/axios/index';
import { DOAMIN_PATH } from "@/api";
export default defineComponent({
name: 'ForgetPasswordVerify',
// components: {Topbar, Footer},
data() {
  const store = useStore();
  // const token = store.state.auth.token || localStorage.getItem('token');
  // const user = store.state.auth.userData || localStorage.getItem('userData');
  // const defaultComponentData = store.state.auth.defaultComponentData || localStorage.getItem('defaultComponentData');    
  return {
    store,
    actionReport: false,
    forgetPasswordVerifyForm: {
      verification_code: '',
      email: '',
    },
    submitBtn: false,
  };
},
  methods: {
    async switchToLogin() {
      localStorage.setItem('defaultComponentData', 'LoginForm');
      this.store.commit('auth/SET_DEFAULT_COMPONENT', 'LoginForm');    
      // router.push('/');
      window.location.reload();
    },

    async onForgetPasswordVerify() {      
      this.forgetPasswordVerifyForm.email = this.store.state.auth.forgetEmail || localStorage.getItem('forgetEmail');
      console.log('_onForgetPasswordVerify', this.forgetPasswordVerifyForm);
      try{
        this.submitBtn = true;
        const response = await axios.post(DOAMIN_PATH + 'verify-code', this.forgetPasswordVerifyForm);
        // console.log('_onForgetPasswordVerify', response);
        if (response.status == 200) {
          localStorage.setItem('defaultComponentData', 'ForgetPasswordSetForm');
          this.store.commit('auth/SET_DEFAULT_COMPONENT', 'ForgetPasswordSetForm');
          window.location.reload();   
          this.submitBtn = false;       
        }
      } catch (error) {
        console.log('_catch', error);
        this.actionReport = true;
        this.forgetPasswordVerifyForm.verification_code = '';
        this.submitBtn = false;
        setTimeout(() => { this.actionReport = false; }, 3000);        
      }
    },
  }
});
</script>
