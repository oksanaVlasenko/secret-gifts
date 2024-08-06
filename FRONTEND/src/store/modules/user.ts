
import type { Module } from 'vuex'

import type { RootState, UserState } from '../types'

const user: Module<UserState, RootState> = {
  namespaced: true,

  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  mutations: {
    setUser(state, user: object | null) {
      state.user = user
    },
    
    setAuthenticationStatus(state, status: boolean) {
      state.isAuthenticated = status
    }
  },

  getters: {
    user(state): object | null {
      return state.user;
    },

    getIsAuthenticated(state): boolean {
      return state.isAuthenticated;
    }
  }
}

export default user
