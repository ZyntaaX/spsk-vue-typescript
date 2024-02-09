<script setup lang="ts">

import { RouterView } from 'vue-router'

import NavigationItem from './components/navigation-item.vue';

import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import { useAuthenticationStore } from './shared/stores/authentication-store';
import { ButtonElement } from './components/elements';
import router from './router';
import i18n from './i18n/i18n';
import { useThemeStore } from './components/theme-switcher/theme-store';
import { storeToRefs } from 'pinia';

const showExtendedMenu = ref(false);
const extendedMenu = ref(null)

const authStore = useAuthenticationStore();
const { getCurrentTheme } = storeToRefs(useThemeStore());

function toggleExtendedMenu(value: boolean) : void {
  showExtendedMenu.value = value;
}

function closeExtendedMenu() {
  showExtendedMenu.value = false;
}

async function signOut() {
  await authStore.signOut()
    .then(() => {
      showExtendedMenu.value = false;
      router.push({ name: "Home" })
    })
    .catch((error) => console.log(error))
}

</script>

<template>
  <div class="theme-decider" :class="getCurrentTheme.toLowerCase()">
    <div
      tabindex="0"
      @keyup.esc="closeExtendedMenu"
      ref="extendedMenu"
      class="extended-menu"
      :class="{'open': showExtendedMenu}"
      v-on-click-outside="closeExtendedMenu"
    >
      <div v-if="showExtendedMenu">
        <div class="close-extended-menu--button" @click="toggleExtendedMenu(false)">
          <font-awesome-icon  icon="fa-solid fa-xmark" />
        </div>
        <nav>
          <NavigationItem :route="`/user/${authStore.user?.id}`" :title="$t('headers.my_account')" />
          <ButtonElement variant="LINKSTYLE" v-if="authStore.isUserSignedIn" @click="signOut">{{ $t('headers.logout') }}</ButtonElement>
          <ButtonElement variant="LINKSTYLE" @click="router.push({ name: 'Settings' })">{{ $t('headers.settings') }}</ButtonElement>
        </nav>
      </div>
    </div>

    <header>
      <div class="topbar">
        <div class="logo-wrapper" @click="$router.push({ path: '/' })">
          <img v-if="getCurrentTheme === 'DARK'" src="@/assets/spsk_logo_dark.png" alt="spsk_logo">
          <img v-else-if="getCurrentTheme  === 'LIGHT'" src="@/assets/spsk_logo_light.png" alt="spsk_logo">
          <picture v-else class="logo-wrapper">
            <source media="(prefers-color-scheme: dark)" srcset="@/assets/spsk_logo_dark.png" />
            <img class="logo_link" alt="SPSK Logo" src="@/assets/spsk_logo_light.png" />
          </picture>
          <h1>
            Skillingaryds Pistolskytteklubb
          </h1>
        </div>
        <div style="flex-grow: 1;" />
        <div class="actions-wrapper">
          <ButtonElement v-if="authStore.isUserSignedIn" variant="ERROR" @click="$router.push({ name: 'BugReport' })">Report a problem</ButtonElement>
          <ButtonElement v-if="!authStore.isUserSignedIn" @click="router.push({ name: 'LoginPage' })" class="bottom">{{ $t('headers.signin') }}</ButtonElement>
          <div class="burger-menu-button" @click="toggleExtendedMenu(!showExtendedMenu)">
            <font-awesome-icon icon="fa-solid fa-bars" />
            <h4>{{ $t('headers.menu') }}</h4>
          </div>
        </div>
      </div>
      
      <div class="nav--wrapper">
        <nav>
          
          <NavigationItem route="/" :title="$t('headers.home')" />
          <NavigationItem route="/sponsors" :title="$t('headers.sponsors')" />
          <NavigationItem route="/about" :title="$t('headers.about_us')" />
          <NavigationItem route="/links" :title="$t('headers.links')" />
          <NavigationItem route="/association-certificates" :title="$t('headers.association_certificates')" />
          <div class="place-right">
            <!-- <NavigationItem v-if="!authStore.isUserSignedIn" route="/login" :title="$t('headers.signin')" /> -->
          </div>
        </nav>
        <!-- <div class="burger-menu-button" @click="toggleExtendedMenu(true)">
          <font-awesome-icon icon="fa-solid fa-bars" />
          <h4>{{ $t('headers.menu') }}</h4>
        </div> -->
      </div>
    </header>
    
    <div class="main-view--wrapper">
      <RouterView />
    </div>

    <footer>
      <div class="footer">hej</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>

#app {
  overflow: hidden;
}






.main-view--wrapper {
  background-color: var(--color-main-content-bg);
  width: 1000px;
  // height: 100%;
  margin: 0.5rem auto;
  border-radius: 0.2rem;
  overflow-y: auto;
  padding: 0.5rem;
}

footer {
  position: fixed;
  bottom: 0;
  // position: absolute;
  
  .footer {
    
    width: 100vw;
    height: 2rem;
    background-color: var(--color-main-content-bg);
  }
  // margin-top: auto;
}

header {
  line-height: 1.5;
  max-height: 100vh;

  $top-bar-height: 90px;
  
  .topbar {
    // background-color: red; // var(--vt-c-black-mute);
    margin: 0 auto;
    width: 1000px;
    display: flex;
    height: $top-bar-height;
    // background-color: var(--);

    // justify-content: center;
    
    .logo-wrapper {
      display: flex;
      // height: 100px;
      // justify-self: left;

      :hover {
        cursor: pointer;
      }

      img {
        height: 70px;
        margin: auto 0;
      }

      h1 {
        margin: auto 2rem;
        color: var(--color-text);
      }
    }

    .actions-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      // margin: auto 0;
      // justify-self: right;

      // flex-direction: column;
      // position: absolute;
      // right: 0;
      height: $top-bar-height;
      
      * {
        margin: auto 0.5rem;
      }
      // justify-content: space-between;
      
      // * {
      //   margin-left: auto;
      // }

    .burger-menu-button {
      top: 0;
      right: 0;
      bottom: 0;
      height: 1.4rem;
      // position: absolute;
      display: flex;
      color: var(--color-text);
      
      h4 {
        margin: auto 0;
        // font-size: 1rem;
      }
      
      svg {
        height: 1.4rem;
        margin-right: 0.5rem;
      }

      &:hover {
        cursor: pointer;
        color: var(--primary-color);
      }
    }
    }

  }

  .nav--wrapper {
    position: relative;
    width: 100%;
    background-color: var(--color-main-content-bg);
    border-bottom: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    display: flex;

    nav {
      width: 1000px;
      margin: 0 auto;

      @media only screen and (max-width: 1000px) {
        width: 80%;
      }

      @media only screen and (max-width: 750px) {
        width: 92%;
      }

      // width: 100%;
      height: 50px;
      display: flex;
      align-items: center;

      .place-right {
        display: flex;
        margin-left: auto;
      }
    }


  }
}

.extended-menu {
  position: absolute;
  width: 0px;
  height: 100vh;
  background-color: var(--color-main-content-bg);
  z-index: 999;
  box-shadow: -5px -5px -5px red;
  right: 0;
  transition: width 0.1s ease;
  
  &.open {
    border-left: 1px solid var(--color-border);
    width: 400px;
  }

  .close-extended-menu--button {
    margin: 0.5rem;
    color: var(--color-text);
    
    svg {
      height: 1.5rem;
    }

    :hover {
      cursor: pointer;
      color: var(--primary-color);
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
