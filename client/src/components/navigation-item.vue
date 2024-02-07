<template>
    <div class="nav-item" >
        <RouterLink :to="route">
            <h3> {{ title }} </h3>
            <slot />
            <div class="underline" />
        </RouterLink>
    </div>
</template>

<script setup lang="ts">

defineProps({
    route: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})

</script>


<style lang="scss" scoped>
    .nav-item {
      margin: 0 1rem;
      text-align: center;
      a {
        color: var(--primary-color);
        margin: auto 0;
        text-decoration: none;

        }
    }

    .underline {
        background-color: var(--primary-color);
        border-radius: 0.1rem;
        width: 100%;
        height: 3px;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        transition: all 0.3s ease;
        transform: scaleX(0);
    }

    a.router-link-exact-active {
        color: var(--primary-color);

        .underline {
            transform: scaleX(0.8);
        }
    }

    a:hover {
        color: var(--primary-color);

        .underline {
            transform: scaleX(1);
        }
    }
    
    
    
    // nav {
        // width: 100%;
        
      //   .wrapper {
      //       // width: 10%;
      //       text-align: center;
      //       .routerlink {
      //           // width: fit-content;
      //     .selector {
      //       // width: ;
      //       margin: 0 auto;
      //       height: 3px;
      //       background-color: red;
      //     }
      //   }
      // }

      // a {
      //   margin: auto 1rem;
      // } 
        
      // :link, :visited {
      //   color: var(--primary-color);
      //   text-decoration: none;
      // }

      // .place-right {
      //   float: right;
      // }

      // // Active link
      // .router-link-exact-active {
      //   color: red;

      //   :hover {
      //     text-decoration-line: 1px solid hsla(160, 100%, 37%, 0.2)
      //   }
      // }
//     }
//   }

</style>