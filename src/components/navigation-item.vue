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

        a {
            // margin: auto 1rem;
        }
    }
    
    
    
    // nav {
        // width: 100%;
        
        .wrapper {
            // width: 10%;
            text-align: center;
            .routerlink {
                // width: fit-content;
          .selector {
            // width: ;
            margin: 0 auto;
            height: 3px;
            background-color: red;
          }
        }
      }

      a {
        margin: auto 1rem;
      } 
        
      :link, :visited {
        color: var(--link-color);
        text-decoration: none;
      }

      .place-right {
        float: right;
      }

      // Active link
      .router-link-exact-active {
        color: red;

        :hover {
          text-decoration-line: 1px solid hsla(160, 100%, 37%, 0.2)
        }
      }
//     }
//   }

</style>