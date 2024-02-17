<template>
    <div class="title-wrapper">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

@import '@/assets/main.scss';

.title-wrapper {
    // background-color: var(--color-main-content-bg);
    // padding: $content-standard-margin;
    // border-radius: 5px;
    color: var(--color-text);   
    border-bottom: 2px solid var(--color-border);
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    
    // &:not(:last-of-type) {
    //     margin-bottom: 0.5rem;
    // }
}

</style>
