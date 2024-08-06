<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<script lang="ts">
  import type { GlobalThemeOverrides } from 'naive-ui'
  import { NConfigProvider } from 'naive-ui'
  import { defineComponent } from 'vue'

  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: "#3e41471f",
      primaryColorHover: "#0081afff"
    },
    // Button: {
    //   textColor: '#FF0000'
    // },
    Input: {
      inputFocus: '#3e41471f',
      // inputColor: '#091540',
      // primaryColor: "#18a058",
      // primaryColorHover: "#36ad6a"
    }
  }

  export default defineComponent({
    components: {
      NConfigProvider
    }
  })
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
