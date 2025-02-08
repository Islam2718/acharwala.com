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
                                <img src="img/logo.png" alt="n/a" class="img-fluid" style="height: 80px;">
                              </span>
                            </a>
                          </div>
                          <!-- /Logo -->
                          <h4 class="mb-4 text-center">Login Form 👋</h4>
                          <div v-if="errorMessages.message" class="alert alert-danger alert-dismissible" role="alert">
                            {{ errorMessages.message }}
                            <button type="button" class="btn-close" @click="clearError('message')" aria-label="Close"></button>
                          </div>
                          <form id="formAuthentication" class="mb-3" @submit.prevent="onLogin">
                            <div class="mb-3">
                              <label for="email" class="form-label">Email<sup class="text-danger">*</sup></label>
                              <input type="text" class="form-control" id="email" name="Email / Phone "  v-model="loginForm.identifier" placeholder="Enter your email" >
                            </div>
                            <div class="mb-3 form-password-toggle">
                              <div class="d-flex justify-content-between">
                                <label class="form-label pt-2" for="password">Password<sup class="text-danger">*</sup></label>
                                <button class="btn btn-outline-default" type="button" @click="switchToForget()">
                                <small>Forgot Password?</small> 
                                </button>
                              </div>
                              <div class="input-group input-group-merge">
                                <input :type="showPassword ? 'text' : 'password'" id="password" class="form-control" name="password" v-model="loginForm.password" placeholder=" Enter your Password" />
                                <span class="input-group-text cursor-pointer" @click="togglePassword">
                                  <i :class="showPassword ? 'bx bx-show' : 'bx bx-hide'"></i>
                                </span>
                              </div>
                            </div>
                            <div class="mb-3">
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="remember-me">
                                <label class="form-check-label" for="remember-me">
                                  Remember Me
                                </label>
                              </div>
                            </div>
                            <div class="mb-3">
                              <button type="submit" class="btn btn-primary w-100 justify-content-center" :disabled="submitBtn">
                                <span v-if="!submitBtn">Sign in</span> 
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitBtn"></span>
                                <span class="visually-show" v-if="submitBtn"> Sign in ....</span>
                              </button>
                            </div>
                          </form>
                          <p class="text-center">
                            <span>You are a general user - </span>
                            <a type="button" class="btn btn-sm" style="color: #696cff">
                              <span>Browse Website</span>
                            </a>
                          </p>
                        </div>
                      </div>
                      <!-- /Register -->
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-center h-100 d-none">
                    <a href="https://pos-file.phicsart.com/phicspos.apk" target="_blank" class="btn btn-dark btn-lg"><font-awesome-icon :icon="['fab', 'android']" class="me-2" /> Download App</a>
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
import { ref,  defineComponent } from 'vue';
import axios from '../../../../node_modules/axios/index';
import { useStore } from 'vuex';
import { DOAMIN_PATH, VUE_APP_API_URL } from "@/api";
const setuserData = ref([]);
let storeID = ref<string | null>(null);
  export default defineComponent({
  name: 'LoginView',
  components: {},
  data() {
    const store = useStore();
    
    return {
      store,
      // showPassword: {
      //   new: false,
      //   confirm: false,
      // },
      userData: localStorage.getItem('userData'),
    };
  },
  methods: { 
    async switchToRegistration() {
      localStorage.setItem('defaultComponentData', 'RegistrationForm');
      this.store.commit('auth/SET_DEFAULT_COMPONENT', 'RegistrationForm');
      // router.push('/');
      window.location.reload();
    },
    async switchToForget() { 
      localStorage.setItem('defaultComponentData', 'ForgetPasswordForm');
      this.store.commit('auth/SET_DEFAULT_COMPONENT', 'ForgetPasswordForm');
      // router.push('/');
      window.location.reload();
    },
  },
  mounted() {
    // Set isLoading to true when the component is mounted
    // console.log('_component_page', this.defaultComponentData);
    console.log('userData', this.userData);
  },  
  setup() {
    const store = useStore();
    const submitBtn = ref(false);
    const loginForm = ref({
      identifier: '',
      password: ''
    });

    interface ErrorMessages {
      [key: string]: string;
    }
    const errorMessages = ref<ErrorMessages>({
      identifier: '',
      password: '',
    });

    // Method to clear specific error
    const clearError = (field: string | number) => {
      if (typeof field === 'string') {
        errorMessages.value[field] = '';
      }
    };

    // Example usage
    clearError('email');
    const onLogin = async () => {
      try {
        // console.log('_login', loginForm.value);
        submitBtn.value = true;
        const response = await axios.post(VUE_APP_API_URL + 'login', loginForm.value);
        if (response.status === 200) {
          const gettoken = response.data.token;
           try {
              const token = gettoken;
              if (!token) {
                throw new Error('Token not found');
              }
              store.commit('auth/SET_TOKEN', token);
              localStorage.setItem('token', token); // Set token in localStorage
              // const response = await axios.get(VUE_APP_API_URL + 'user-info', {
              //   headers: {
              //     Authorization: `Bearer ${token}`,
              //   },
              // }
              // );
              // const userId = response.data.data.id;
              // store.commit('auth/SET_USER_ID', userId);
              // localStorage.setItem('userId', userId); // Set userId in localStorage

              // if (response.data.data !== null) {
                setuserData.value = response.data.loggedinUser;
                store.commit('auth/SET_USER_DATA', setuserData.value);
                localStorage.setItem('userData', JSON.stringify(setuserData.value)); // Set userId in localStorage
                const storedUserData = localStorage.getItem('userData') || store.state.auth.userData;
                    window.location.reload();
                    submitBtn.value = false;                    
              // }else{
              //       submitBtn.value = false;
              //       store.commit('auth/SET_TOKEN', gettoken);
              //       localStorage.setItem('token', gettoken);
              //       window.location.reload();             
              //     }
              }catch (error) {
              submitBtn.value = false;
              console.error('Error fetching site info', error);
            }
          }
      } catch (error) {
        submitBtn.value = false;
        handleError(error);
      }
    };
    const handleError = (error: any) => {
      if (error.response) {
          if (error.response.status === 401) {
            const errorData = error.response.data;
            // Check if 'message' exists before updating errorMessages
            // errorMessages.value.message = 'Invalid! Username or Password' || errorData.message;
            submitBtn.value = false;
          } else if (error.response.status === 400) {
            const errorData = error.response.data.errors;
            submitBtn.value = false;
            // Update errorMessages based on the received error data
            errorMessages.value.email = errorData.email ? errorData.email[0] : '';
            errorMessages.value.password = errorData.password ? errorData.password[0] : '';            
          }
        } else {
          console.error('Unexpected error:', error);
          submitBtn.value = false;
        }
    };
    const showPassword = ref(false);

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    return {
      onLogin,
      loginForm,
      errorMessages,
      clearError,
      togglePassword,
      showPassword,
      submitBtn,
    };
  },
});
</script>
