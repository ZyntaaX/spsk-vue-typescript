<template>
    <div>
        <ContentWrapper>
            <h3 style="margin-bottom: 0.5rem; font-style: italic;">Theme</h3>
            <RadioButtonElement
            name="theme-switcher"
            type="radio"
            @click="setTheme('DARK')"
            :checked="themeStore.getCurrentTheme === 'DARK'" label="Dark"
            />
            <RadioButtonElement
            name="theme-switcher"
            type="radio"
            @click="setTheme('LIGHT')"
            :checked="themeStore.getCurrentTheme === 'LIGHT'" label="Light"
            />
            <RadioButtonElement
            name="theme-switcher"
            type="radio"
            @click="setTheme('SYSTEM_DEFAULT')"
            :checked="themeStore.getCurrentTheme === 'SYSTEM_DEFAULT'" label="System default"
            />
        </ContentWrapper>
    </div>
</template>

<script setup lang="ts">

import { RadioButtonElement } from '../elements';
import { useThemeStore, type Theme } from './theme-store';
import ContentWrapper from '../content-wrapper.vue';

const themeStore = useThemeStore();

function setTheme(theme: Theme) {
    themeStore.setCurrentTheme(theme)
}

</script>

<style lang="scss" scoped>

</style>
