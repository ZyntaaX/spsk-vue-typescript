
<template>
    <div>
        <TitleWrapper>
            <h2>Inställningar</h2>
        </TitleWrapper>
        <ContentWrapper>
            <ThemeSwitcher />
        </ContentWrapper>
    </div>
</template>

<script setup lang="ts">

import TitleWrapper from '@/components/title-wrapper.vue';
import ContentWrapper from '@/components/content-wrapper.vue';

import ThemeSwitcher from '@/components/theme-switcher/theme-switcher.vue';

</script>

<style lang="scss" scoped>

</style>