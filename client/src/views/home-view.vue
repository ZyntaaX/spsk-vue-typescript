<template>
    <div>
        <h5>Home HEJSAN</h5>
        <h5>{{ authStore.user }}</h5>
    </div>
</template>

<script setup lang="ts">

import { useAuthenticationStore } from '@/shared/stores/authentication-store';

const authStore = useAuthenticationStore();

</script>

<style lang="scss" scoped></style>