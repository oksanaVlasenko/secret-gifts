<template>
  <div class="about">
    <div class="wrapper">
      <img 
        class="image"
        src="@/assets/login-img.png"
      />

      <div class="login-form">
        <h3>Welcome Back</h3>

        <n-space vertical>
          <n-form 
            ref="formRef" 
            :model="formValue" 
          >
            <n-form-item
              label="Login"
              path="login"
            >
              <n-input 
                v-model:value="formValue.login" 
                placeholder="Input login" 
              />
            </n-form-item>

            <n-form-item 
              label="Password" 
              path="password"
            >
              <n-input 
                v-model:value="formValue.password" 
                placeholder="Input password" 
                type="password"
                show-password-on="click"
              />
            </n-form-item>
          </n-form>
        </n-space>

        <n-button 
          size="medium"
          ghost 
          color="#091540"
        >
          Login
        </n-button>

        <div class="separator">
          or
        </div>

        <n-space vertical class="custom-space">
          <n-button 
            size="medium"
            ghost 
            color="#091540"
          >
            Create new account
          </n-button>

          <n-button 
            size="medium"
            ghost 
            color="#091540"
          >
            <template #icon>
              <n-icon>
                <GoogleIcon />
              </n-icon>
            </template>
            Continue with Google
          </n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import GoogleIcon from '@/components/icons/IconGoogle.vue'

  import { defineComponent,ref } from 'vue'
  import { NButton, NIcon, NForm, NFormItem, NInput, NSpace } from 'naive-ui'

  export default defineComponent({
    setup() {
      const formRef = ref(null)

      return {
        formRef,
        formValue: ref({
          login: '',
          password: ''
        }),

        switchStyle: {
          marginBottom: '2px'
        }
      }
    },

    components: {
      NButton,
      GoogleIcon,
      NIcon,
      NForm, 
      NFormItem, 
      NInput, 
      NSpace
    }
  })
</script>

<style>
  .about {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wrapper {
    border-radius: 8px;
    background: #FFFFFF;
    box-shadow: 0 6px 30px #3e41471f;
    min-height: 60vh;
    width: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }

  h3 {
    padding-bottom: 8px;
    color: "#091540";
  }

  .n-button,
  .n-space {
    width: 230px;
  }

  .custom-space {
    gap: 24px 12px !important;
  }

/* Make the wrapper height auto on smaller screens to avoid overflow */
@media (max-width: 768px) {
  .wrapper {
    height: auto;
    display: flex;
    flex-direction: column-reverse;
    margin: 0 10vw;
  }

  .login-form {
    flex: 2;
    
  }
}

@media (max-width: 1024px) {
  .wrapper {
    height: auto;
    margin: 0 10vw;
  }
}

.image {
  width: 50vh;
  height: 100%;
  border-radius: 8px 0 0 8px;
  border-right: 1px solid #0081afff;
}

/* Ensure the image height adjusts on smaller screens */
@media (max-width: 768px) {
  .image {
    border-radius: 0 0 8px 8px;
    border-right: none;
    border-top: 1px solid #0081afff;
    flex: 1x;
    display: none;
  }
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px;
  height: auto;
}

.separator {
  font-weight: 200;
  font-size: 16px;
  line-height: 14px;
  color: #8f8f9d;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0 24px 0;
  position: relative;
  width: 230px;
}

.separator:not(:empty)::before {
    margin-right: 8px;
}

.separator:not(:empty)::after {
    margin-left: 8px;
}
.separator::after,
.separator::before {
  content: "";
  flex: 1;
  border-bottom: 1px solid #919191;
}
  /* .wrapper {
    border-radius: 8px;
    background: #FFFFFF;
    box-shadow: 0 6px 30px #3e41471f;
    height: 50vh;
    width: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .image {
    width: 50vh;
    height: 50vh;
    border-radius: 8px 0 0 8px;
    border-right: 1px solid #0081afff;
  } */

  /* @media (min-width: 1024px) {
    .image {
      width: 400px;
      height: 400px;
    }
  } */
</style>
