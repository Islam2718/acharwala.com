<template>
  <div class="container-xxl">
    <div class="row " style="min-height: 100vh">
      <div class="col-md-9 col-sm-12 mx-auto">
        <div class="row h-100">
          <div class="col-md-6 mx-auto">
            <div class="h-100">
              <div class="d-flex align-items-center justify-content-center h-100">
                <div class="w-100">
                  <div class="authentication-wrapper authentication-basic container-p-y">
                    <div class="authentication-inner w-100">
                      <!-- login -->
                      <div class="card">
                        <div class="card-body pt-5">
                          <!-- Logo -->
                          <div class="app-brand justify-content-center">
                            <a href="/" class="app-brand-link gap-2">
                              <span class="app-brand-text demo text-body fw-bold text-uppercase mb-3"> 
                                <img src="img/logo.png" alt="n/a" class="img-fluid" />
                              </span>
                            </a>
                          </div>
                          <!-- /Logo -->
                          <h4 class="mb-2 text-center">Recover Password 👋</h4>
                          <div v-if="actionReport" class="alert alert-warning alert-dismissible" role="alert">
                            Account Not Found .!
                            <button type="button" class="btn-close"  aria-label="Close"></button>
                          </div>
                          <form id="formAuthentication" class="mb-3" @submit.prevent="forgetFunc">
                            <div class="mb-3">
                              <label for="email" class="form-label">Email</label>
                              <input type="email" class="form-control" id="email" name="email-username"  v-model="ForgetPasswordForm.email" placeholder="Enter your email" >
                            </div>
                            <div class="mb-3">
                              <button type="submit" class="btn btn-primary w-100 justify-content-center" :disabled="submitBtn">
                                <span v-if="!submitBtn">Send Verification Code</span> 
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                                <span class="visually-show" v-if="submitBtn"> Sending ....</span>
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
                    </div>
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
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex';
import { DOAMIN_PATH } from "@/api";
export default defineComponent({
name: 'ForgetPassword',
// components: {Topbar, Footer},
data() {
  const store = useStore();
  // const token = store.state.auth.token || localStorage.getItem('token');
  // const user = store.state.auth.userData || localStorage.getItem('userData');
  // const defaultComponentData = store.state.auth.defaultComponentData || localStorage.getItem('defaultComponentData');
  // const forgetEmail = store.state.auth.forgetEmail || localStorage.getItem('forgetEmail');    
  // const forgetCode = store.state.auth.forgetCode || localStorage.getItem('forgetCode');    
  return {
    store,
    // defaultComponentData,
    actionReport: false,
    ForgetPasswordForm: {
      email: '',    
      request_url: '',  
    },
    submitBtn: false,
  };
},
methods: {
  async switchToLogin() {
    localStorage.setItem('defaultComponentData', 'LoginForm');
    this.store.commit('auth/SET_DEFAULT_COMPONENT', 'LoginForm');
    window.location.reload();   
  },

  async forgetFunc() {
    this.ForgetPasswordForm.request_url = 'Browser Name: ' + navigator.userAgent + 'Device Name: ' + navigator.platform;

    try {
      this.submitBtn = true;
      const response = await axios.post(DOAMIN_PATH + 'send-verification-code', this.ForgetPasswordForm);
      if (response.status === 200) {
        // set forget-email to local storage.
        localStorage.setItem('forgetEmail', response.data.data.email);
        this.store.commit('auth/SET_FORGET_EMAIL', response.data.data.email);

        localStorage.setItem('forgetCode', response.data.data.code);
        this.store.commit('auth/SET_FORGET_CODE', response.data.data.code);

        localStorage.setItem('defaultComponentData', 'ForgetPasswordVerifyForm');
        this.store.commit('auth/SET_DEFAULT_COMPONENT', 'ForgetPasswordVerifyForm');
        window.location.reload();
        this.submitBtn = false;
        // setTimeout(() => { this.successReport = false; window.location.reload();}, 3000);
      }
    }
    catch (error) {
      console.error('_catch', error);
      this.actionReport = true;
      this.submitBtn = false;
      setTimeout(() => { this.actionReport = false; window.location.reload();}, 3000);
    }
  }
}
});
</script>
