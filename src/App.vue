<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'

import NavigationItem from './components/navigation-item.vue';

</script>

<template>
  <header>
    <div class="topbar" @click="$router.push({ path: '/' })">
      <div class="logo-wrapper">
        <img class="logo_link" alt="SPSK Logo" src="@/assets/spsk_logo.png" />
        <h1>
          Skillingaryds Pistolskytteklubb
        </h1>
      </div>
    </div>
    <div class="nav--wrapper">
      
      <nav>
        <NavigationItem route="/" :title="$t('headers.home')" />
        <NavigationItem route="/sponsors" :title="$t('headers.sponsors')" />
        <NavigationItem route="/about" :title="$t('headers.about_us')" />
        <NavigationItem route="/links" :title="$t('headers.links')" />
        <NavigationItem route="/certificates" :title="$t('headers.association_certificates')" />
        <div class="place-right">
          <NavigationItem route="/user/not_defined" :title="$t('headers.my_account')" />
          <NavigationItem route="/login" :title="$t('headers.signin')" />
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">


header {
  line-height: 1.5;
  max-height: 100vh;
  
  .topbar {
    background-color: var(--vt-c-black-mute);
    display: flex;
    height: 100px;
    justify-content: center;

    .logo-wrapper {
      display: flex;
      height: 100px;

      :hover {
        cursor: pointer;
      }

      img {
        height: 80px;
        margin: auto 0;
      }

      h1 {
        margin: auto 2rem;
        color: white;
      }
    }
  }

  .nav--wrapper {
    nav {

      width: 100%;
      width: 100%;
      height: 50px;
      display: flex;
      background-color: var(--vt-c-black-soft);
      align-items: center;

      .place-right {
        display: flex;
        margin-left: auto;
      }
    }
  }
}
// }

// .logo {
//   display: block;
//   // margin: 0 auto 2rem;
// }

// nav {
//   width: 100%;
//   font-size: 12px;
//   text-align: center;
//   margin-top: 2rem;
// }

// nav a.router-link-exact-active {
//   color: var(--color-text);
// }

// nav a.router-link-exact-active:hover {
//   background-color: transparent;
// }

// nav a {
//   display: inline-block;
//   padding: 0 1rem;
//   border-left: 1px solid var(--color-border);
// }

// nav a:first-of-type {
//   border: 0;
// }

// @media (min-width: 1024px) {
//   header {
//     // display: flex;
//     // place-items: center;
//     // padding-right: calc(var(--section-gap) / 2);
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }

//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;

//     padding: 1rem 0;
//     margin-top: 1rem;
//   }
// }
</style>
