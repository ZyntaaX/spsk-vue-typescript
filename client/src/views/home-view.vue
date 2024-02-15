<template>
    <div>
        <ContentWrapper v-if="authStore.hasUserGotClaim('news_w')" >
            <ButtonElement type="primary" @click="$router.push({ name: 'WritePost' })" >{{ $t('actions.write_post') }}</ButtonElement>
        </ContentWrapper>
        <ContentWrapper>
            <h2>
                Nyheter
            </h2>
        </ContentWrapper>
    </div>
</template>

<script setup lang="ts">

import { useAuthenticationStore } from '@/shared/stores/authentication-store';
import ContentWrapper from '@/components/content-wrapper.vue';
import { ButtonElement } from '@/components/elements';

const authStore = useAuthenticationStore();



</script>

<style lang="scss" scoped></style>