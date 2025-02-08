<template>
  <div class="container-xxl">
    <div class="row " style="min-height: 100vh">
      <div class="col-md-9 col-sm-12 mx-auto">
        <div class="row h-100">
          <div class="col-md-6 mx-auto">
            <div class="d-flex align-items-center justify-content-center h-100">
              <div class="w-100">
                <div class="authentication-wrapper authentication-basic container-p-y">
                  <div class="authentication-inner" style="max-width: 550px; margin: 0 auto;">
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
                        <h4 class="mb-2 text-center">Set Password 👋</h4>
                        <div v-if="actionReport" class="alert alert-success alert-dismissible" role="alert">
                          Password Changed Sccessfully ! Please Login With New Password
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>  
                        <div v-if="badactionReport" class="alert alert-warning alert-dismissible" role="alert">
                          Password & Comfirm Password Not Match !
                          <button type="button" class="btn-close" data-bs-dismiss="alert"  aria-label="Close"></button>
                        </div>  
                        <form id="formAuthentication" class="mb-3" @submit.prevent="setPassword">
                          <div class="mb-3 form-password-toggle">
                            <label for="email" class="form-label">New Password</label>
                            <div class="input-group input-group-merge">
                              <input :type="showPassword.new ? 'text' : 'password'" class="form-control" v-model="setPasswordForm.new_password" placeholder="Enter New password" aria-describedby="password" />
                              <span class="input-group-text cursor-pointer" @click="togglePassword('new')">
                                <i :class="showPassword.new ? 'bx bx-show' : 'bx bx-hide'"></i>
                              </span>
                            </div>
                          </div>
                          <div class="mb-3 form-password-toggle">
                            <label for="email" class="form-label">Confirm Password</label>
                            <div class="input-group input-group-merge">
                              <input :type="showPassword.confirm ? 'text' : 'password'" id="password" class="form-control" v-model="setPasswordForm.confirm_password" placeholder="Confirm New password" />
                              <span class="input-group-text cursor-pointer" @click="togglePassword('confirm')">
                                <i :class="showPassword.confirm ? 'bx bx-show' : 'bx bx-hide'"></i>
                              </span>
                            </div>
                          </div>
                          <div class="mb-3">
                            <button type="submit" class="btn btn-primary d-grid w-100 justify-content-center" :disabled="submitBtn">
                              <span v-if="!submitBtn">Set</span> 
                              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                              <span class="visually-show" v-if="submitBtn"> Setting....</span>
                            </button>
                          </div>
                        </form>
                        <p class="text-center">
                          <span>You already have an account?</span>
                          <button type="button" class="btn btn-sm" style="color: #696cff">
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
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import axios from '../../../../node_modules/axios/index';
import { DOAMIN_PATH } from "@/api";
export default defineComponent({
name: 'ForgetPasswordSet',
// components: {Topbar, Footer},
data() {
  const store = useStore();
  return {
    store,
    actionReport: false,
    badactionReport: false,
    message: '',
    setPasswordForm: {
      email: '',
      new_password: '',
      confirm_password: '',
    },
    showPassword: {
        new: false,
        confirm: false,
    },
    submitBtn: false,
  };
},
methods: {
    async setPassword () {
      this.setPasswordForm.email = this.store.state.auth.forgetEmail || localStorage.getItem('forgetEmail');
      console.log(this.setPasswordForm);
      try {
        this.submitBtn = true;
        // show the loading ove
        const response = await axios.post(DOAMIN_PATH + 'change-password', this.setPasswordForm);
        if (response.status == 200) {
          this.actionReport = true;
          this.message = response.data.message;
          localStorage.removeItem('forgetEmail');
          localStorage.removeItem('forgetCode');
          localStorage.removeItem('forgetCode');
          localStorage.removeItem('defaultComponentData');
          setTimeout(() => { 
            this.actionReport = false; 
            window.location.reload();
          }, 2500);    
          this.submitBtn = false;
          console.log('_setPassword', response.data);
        }
      }
      catch (error) {
        this.badactionReport = true;
        this.submitBtn = false;
        setTimeout(() => {
          this.badactionReport = false;
        }, 3000);
        console.error(error);
      }

    },
    async togglePassword(field: string | number) {
      // Use type assertion to tell TypeScript that field is a valid key
      const validField = field as keyof typeof this.showPassword;
      // Update the property directly
      this.showPassword[validField] = !this.showPassword[validField];
    },
  },
});
</script>
