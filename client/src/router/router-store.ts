import { defineStore } from 'pinia';
import { type RouteLocationNormalized } from 'vue-router';

const ROUTER_STORE_ID = 'STORE:ROUTER';

export const useRouterStore = defineStore(ROUTER_STORE_ID, {
    state: (): RouterState => ({
        intendedRoute: undefined
    }),

    // getters: {
    //     int
    // },

    actions: {
        setIntendedRoute(route: RouteLocationNormalized) : void {
            this.intendedRoute = route
        },
        clearIntendedRoute() : void {
            this.intendedRoute = undefined
        },
    }
});


// Types
type RouterState = {
    intendedRoute: RouteLocationNormalized | undefined
}
