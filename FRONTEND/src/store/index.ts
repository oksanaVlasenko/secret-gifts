import { createStore } from 'vuex'
import type { RootState } from './types'
import user from './modules/user'


const store = createStore<RootState>({
  modules: {
    user
  }
});

export default store;

