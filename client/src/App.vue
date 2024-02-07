<script setup lang="ts">

import { RouterView } from 'vue-router'

import NavigationItem from './components/navigation-item.vue';

import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import { useAuthenticationStore } from './shared/stores/authentication-store';
import { ButtonElement } from './components/elements';
import router from './router';

const showExtendedMenu = ref(false);
const extendedMenu = ref(null)

const authStore = useAuthenticationStore();

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
  <div
    tabindex="0"
    @keyup.esc="closeExtendedMenu"
    ref="extendedMenu"
    class="extended-menu"
    :class="{'open': showExtendedMenu}"
    v-on-click-outside="closeExtendedMenu"
  >
    <div v-if="showExtendedMenu">
      <font-awesome-icon class="close-extended-menu--button" @click="toggleExtendedMenu(false)" icon="fa-solid fa-xmark"></font-awesome-icon>
      <nav>
        <NavigationItem route="/user/not_defined" :title="$t('headers.my_account')" />
        <ButtonElement v-if="authStore.isSignedIn" @click="signOut">{{ $t('headers.logout') }}</ButtonElement>
      </nav>
    </div>
  </div>

  <header>
    <div class="topbar">
      <div class="logo-wrapper" @click="$router.push({ path: '/' })">
        <img class="logo_link" alt="SPSK Logo" src="@/assets/spsk_logo.png" />
        <h1>
          Skillingaryds Pistolskytteklubb
        </h1>
      </div>
      <button class="bug-report" @click="$router.push({ name: 'BugReport' })">Report a problem</button>
    </div>
    <div class="nav--wrapper">
      <nav>
        
        <NavigationItem route="/" :title="$t('headers.home')" />
        <NavigationItem route="/sponsors" :title="$t('headers.sponsors')" />
        <NavigationItem route="/about" :title="$t('headers.about_us')" />
        <NavigationItem route="/links" :title="$t('headers.links')" />
        <NavigationItem route="/association-certificates" :title="$t('headers.association_certificates')" />
        <div class="place-right">
          <!-- <NavigationItem route="/user/not_defined" :title="$t('headers.my_account')" /> -->
          <NavigationItem v-if="!authStore.isSignedIn" route="/login" :title="$t('headers.signin')" />
        </div>
      </nav>
      <div class="burger-menu-button" @click="toggleExtendedMenu(true)">
        <font-awesome-icon icon="fa-solid fa-bars" />
        <h4>{{ $t('headers.menu') }}</h4>
      </div>
    </div>
  </header>
  
  <div class="main-view--wrapper">
    <RouterView />
  </div>

  <footer>
    <div class="footer">hej</div>
  </footer>

</template>

<style lang="scss" scoped>

#app {
  overflow: hidden;
}

.main-view--wrapper {
  background-color: var(--vt-c-black-mute);
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
    background-color: var(--vt-c-black-mute);
  }
  // margin-top: auto;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  
  .topbar {
    background-color: var(--vt-c-black-mute);
    display: flex;
    height: 100px;
    justify-content: center;

    .bug-report {
      background-color: rgb(199, 45, 45);
      color: white;
      height: 2rem;
      position: absolute;
      right: 0;
      border: 3px solid rgb(177, 62, 62);
      margin: 1rem;

      &:hover:not(:disabled) {
        cursor: pointer;
        opacity: 80%;
      }

      &:disabled {
        background-color: gray;
      }
    }

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
    position: relative;
    width: 100%;
    background-color: var(--vt-c-black-soft);
    border-bottom: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    display: flex;

    nav {
      width: 60%;
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

        :last-of-type {
          // margin-right: 2rem;
        }
      }
    }

    .burger-menu-button {
      top: 0;
      right: 0;
      bottom: 0;
      height: 1.4rem;
      margin: auto 1rem;
      position: absolute;
      display: flex;

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

.extended-menu {
  position: absolute;
  width: 0px;
  height: 100vh;
  background-color: var(--vt-c-black-soft);
  z-index: 999;
  box-shadow: -5px -5px -5px red;
  border-left: 1px solid var(--color-border);
  right: 0;
  transition: width 0.1s ease;

  &.open {
    width: 400px;
  }

  .close-extended-menu--button {
    height: 1.5rem;
    margin: 0.5rem;

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
