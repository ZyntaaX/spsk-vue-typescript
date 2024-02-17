<template>
    <div class="content-wrapper">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

@import '@/assets/main.scss';

.content-wrapper {
    background-color: var(--color-main-content-bg);
    padding: $content-standard-margin;
    border-radius: 5px;
    color: var(--color-text);
    
    &:not(:last-of-type) {
        margin-bottom: 0.5rem;
    }
}

</style>
