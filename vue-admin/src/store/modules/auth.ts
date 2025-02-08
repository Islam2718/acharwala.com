// src/store/modules/auth.ts
import { Commit } from 'vuex';

interface AuthState {
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  isAuthenticated: false,
};
const state = {
  token: null,
  userId: null,
  // storeId: null,
  // typeId: null,
  // defaultStoreData: null,
  userData: null,
  defaultComponentData: null
}; 

const mutations = {
  SET_TOKEN(state: { token: any; }, token: any) {
    state.token = token;
    localStorage.setItem('token', token); // Store the token in localStorage
  },
  SET_AUTHENTICATION(state: { authenticated: any; }, isAuthenticated: any) {
    state.authenticated = isAuthenticated;
  },
  SET_USER_ID(state: { userId: any }, userId: any) {
    state.userId = userId;
  },
  // SET_STORE_ID(state: { storeId: any }, storeId: any) {
  //   state.storeId = storeId;
  // },
  SET_FORGET_EMAIL(state: { forgetEmail: any }, forgetEmail: any) {
    state.forgetEmail = forgetEmail;
  }, 
  SET_FORGET_CODE(state: { forgetCode: any }, forgetCode: any) {
    state.forgetCode = forgetCode;
  },
  SET_USER_DATA(state: { userData: any }, userData: any) {
    state.userData = userData;
  },

  SET_DEFAULT_STORE(state: { defaultComponentData: any }, defaultComponentData: any) {
    state.defaultComponentData = defaultComponentData;
  },

  CLEAR_USER_DATA(state: { token: any; userId: any; userData: any; defaultComponentData: any }) {
    state.token = null;
    state.userId = null;
    // state.storeId = null;
    state.userData = null;
    state.defaultComponentData = null;
  },
};
const actions = {
  setToken({ commit }: { commit: Commit }, token: string | null) {
    commit('SET_TOKEN', token);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};