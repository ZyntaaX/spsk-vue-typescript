<template>
    <button class="button-element" :class="props.size" @click="emit('click')">
        <slot />
    </button>
</template>

<script setup lang="ts">

type ButtonSize = 'SMALL' | 'MEDIUM' | 'LARGE';
interface Props {
    size?: ButtonSize
}
const props = withDefaults(defineProps<Props>(), {
    size: 'MEDIUM'
});

const emit = defineEmits(['click'])

</script>

<style lang="scss" scoped>

.button-element {
    background-color: var(--primary-color);
    border: 1px solid var(--secondary-color);
    border-radius: 4px;
    transition: opacity 0.1s ease;;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    &.SMALL {

    }

    &.MEDIUM {
        width: fit-content;
        padding: 5px 10px;
        font-size: 1rem;
        font-weight: 600;
        color: var(--button-text-color);
    }

    &.LARGE {

    }
}

</style>