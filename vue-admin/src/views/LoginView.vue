<template>
    <div class="container-xxl" v-if="showLoginForm">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner" style="max-width: 550px; margin: 0 auto;">
          <!-- login -->
          <div class="card">
            <div class="card-body">
              <!-- Logo -->
              <div class="app-brand justify-content-center">
                <a href="/" class="app-brand-link gap-2">
                  <span class="app-brand-text demo text-body fw-bold text-uppercase mb-3">POS</span>
                </a>
              </div>
              <!-- /Logo -->
              <h4 class="mb-2 text-center">Login Form 👋</h4>
              <div v-if="errorMessages.message" class="alert alert-danger alert-dismissible" role="alert">
                {{ errorMessages.message }}
                <button type="button" class="btn-close" @click="clearError('message')" aria-label="Close"></button>
              </div>
              <form id="formAuthentication" class="mb-3" @submit.prevent="onLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email or Username</label>
                  <input type="email" class="form-control" id="email" name="email-username"  v-model="loginForm.email" placeholder="Enter your email or username" >
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">Password</label>
                    <a href="/">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div class="input-group input-group-merge">
                    <input type="password" id="password" class="form-control" name="password"  v-model="loginForm.password" placeholder="·····" aria-describedby="password">
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
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
                  <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              </form>
              <p class="text-center">
                <span>You don't have an account?</span>
                <button type="button" class="btn btn-sm" style="color: #696cff" @click="toggleForm">
                  <span>Create an account</span>
                </button>
              </p>
            </div>
          </div>
          <!-- /Register -->
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { ref, defineEmits, defineComponent } from 'vue';
import axios from '../../node_modules/axios/index';
import { useStore } from 'vuex';
  export default defineComponent({
  name: 'LoginView',
  components: {}, 
  data() {
    return {};
  },
  methods: { },
  setup() {
    const store = useStore();
    const showLoginForm = ref(true);
    const registrationForm = ref({
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      firstname: '',
      lastname: '',
      type: 'USER'
    });

    const loginForm = ref({
      email: '',
      password: ''
    });

    interface ErrorMessages {
      [key: string]: string;
    }

    const errorMessages = ref<ErrorMessages>({
      email: '',
      password: '',
      message: '',
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
        console.log('_login', loginForm.value);
        const response = await axios.post('https://pos-api.phicsart.com/api/login', loginForm.value);
        if (response.status === 200) {
          // set token into local storage and cookies
          localStorage.setItem('token', response.data.token);
          store.commit('auth/SET_TOKEN', response.data.token);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const onRegistration = async () => {
      try {
        console.log('_registrationForm', registrationForm.value);
        const response = await axios.post('https://pos-api.phicsart.com/api/register', registrationForm.value);
        if (response.status === 201) {
          // set token into local storage and cookies
          localStorage.setItem('token', response.data.token);
          store.commit('auth/SET_TOKEN', response.data.token);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const toggleForm = () => {
      showLoginForm.value = !showLoginForm.value;
    };

    const handleError = (error: any) => {
      if (error.response) {
          if (error.response.status === 401) {
            const errorData = error.response.data;
            // Check if 'message' exists before updating errorMessages
            errorMessages.value.message = 'Invalid! Username or Password' || errorData.message;
          } else if (error.response.status === 400) {
            const errorData = error.response.data.errors;
            // Update errorMessages based on the received error data
            errorMessages.value.email = errorData.email ? errorData.email[0] : '';
            errorMessages.value.password = errorData.password ? errorData.password[0] : '';
          }
        } else {
          console.error('Unexpected error:', error);
        }
    };

    return {
      onRegistration,
      toggleForm,
      onLogin,
      showLoginForm,
      registrationForm,
      loginForm,
      errorMessages,
      clearError,
    };
  },
});
</script>