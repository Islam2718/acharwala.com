<template >
    <LoginForm v-if="defaultComponentData=='LoginForm' || !defaultComponentData"/>
    <RegistrationForm v-if="defaultComponentData=='RegistrationForm'"/>
    <ForgetPassword v-if="defaultComponentData=='ForgetPasswordForm'"/>
    <ForgetPasswordVerify v-if="defaultComponentData=='ForgetPasswordVerifyForm'"/>
    <ForgetPasswordSet v-if="defaultComponentData=='ForgetPasswordSetForm'"/>
</template>
  
  <script lang="ts">
    import { defineComponent, ref } from "vue";
    import LoginForm from "./Components/LoginForm.vue";
    import ForgetPassword from "./Components/ForgetPassword.vue";
    import ForgetPasswordVerify from "./Components/ForgetPasswordVerify.vue";
    import ForgetPasswordSet from "./Components/ForgetPasswordSet.vue";
    import { useStore } from "vuex";

    export default defineComponent({
        name : "AuthPageView",
        components: { 
            // List, Form,Footer, TopBarView
            LoginForm,
            ForgetPassword,
            ForgetPasswordVerify,
            ForgetPasswordSet
        },
        data() {
            const store = useStore();
            const token = store.state.auth.token || localStorage.getItem('token');
            const user = store.state.auth.userData || localStorage.getItem('userData');
            const defaultComponentData = store.state.auth.defaultComponentData || localStorage.getItem('defaultComponentData');
            const forgetEmail = store.state.auth.forgetEmail || localStorage.getItem('forgetEmail');  
            const forgetCode = store.state.auth.forgetCode || localStorage.getItem('forgetCode'); 
            return {
                token,
                user,
                defaultComponentData,
                forgetEmail,
                forgetCode,               
            };
        },

        methods: {
            // Method to toggle between login and registration forms
        },
    
        mounted() {
            // Set isLoading to true when the component is mounted
            // console.log('_component', this.defaultComponentData);
            // console.log('_e', this.forgetEmail);
            // console.log('_Code', this.forgetCode);
        }
    });
  </script>