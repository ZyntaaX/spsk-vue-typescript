<template>
    <div>
        <ContentWrapper class="wrapper" v-if="!loading">
            <h1>{{ $t('headers.signin') }}</h1>
            <!-- Spacer -->
            <div style="height: 0.5rem;" />
            <InputElement type="text" placeholder="Email" v-model="emailRef" :center-text="true" />
            <InputElement type="password" placeholder="Password" v-model="passwordRef" :center-text="true" />

            <p class="error-message" style="height: 2rem;">{{ errorMessage ?? "" }}</p>

            <ButtonElement @click="signIn" :size="'MEDIUM'">Login</ButtonElement>

        </ContentWrapper>
        <ContentWrapper v-else class="wrapper">
            <SpinnerElement style="margin: auto 0" />
        </ContentWrapper>
    </div>
</template>

<script setup lang="ts">

import ContentWrapper from '@/components/content-wrapper.vue'
import { useAuthenticationStore } from '@/shared/stores/authentication-store'
import { ref } from 'vue';
import { ButtonElement, InputElement, SpinnerElement } from '@/components/elements'
import router from '@/router';

const authStore = useAuthenticationStore();

const errorMessage = ref("");
const loading = ref(false);

const emailRef = ref("")
const passwordRef = ref("")

async function signIn() {
    errorMessage.value = ""
    loading.value = true;
    await authStore.signIn(emailRef.value, passwordRef.value)
        .then((results) => {
            router.push({ name: "Home" })
        })
        .catch((error) => {
            errorMessage.value = error;
            console.log("LOGIN VIEW ERROR: ", error);
        })
        .finally(() => {
            loading.value = false;
        })
}

</script>

<style lang="scss" scoped>

.wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    place-items: center;

    margin: auto 0;
    height: 250px;

    .error-message {
        color: var(--error-color);
    }
}

</style>