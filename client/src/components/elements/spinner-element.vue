<template>
    <div class="spinner-element" :class="props.size" />
</template>

<script setup lang="ts">

type SpinnerSize = 'SMALL' | 'MEDIUM' | 'LARGE';
interface Props {
    size?: SpinnerSize;
}
const props = withDefaults(defineProps<Props>(), {
    size: 'MEDIUM',
});

</script>

<style lang="scss" scoped>

.spinner-element {
    width: 48px;
    height: 48px;
    border: 3px solid #FFF;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &.SMALL { }
    &.MEDIUM { }
    &.LARGE { }
}
.spinner-element::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid;
    border-color: var(--primary-color) transparent;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 

</style>
