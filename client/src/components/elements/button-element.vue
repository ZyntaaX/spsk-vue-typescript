<template>
    <button class="button-element" :class="[props.size, props.variant]" @click="emit('click')">
        <slot />
    </button>
</template>

<script setup lang="ts">

type ButtonVariant = 'PRIMARY' | 'ERROR' | 'WARNING' | 'LINKSTYLE';
type ButtonSize = 'SMALL' | 'MEDIUM' | 'LARGE';
interface Props {
    size?: ButtonSize
    variant?: ButtonVariant
}
const props = withDefaults(defineProps<Props>(), {
    size: 'MEDIUM',
    variant: 'PRIMARY'
});

const emit = defineEmits(['click'])

</script>

<style lang="scss" scoped>

.button-element {
    border-radius: 4px;
    transition: opacity 0.1s ease;

    
    
    
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    &.SMALL {

    }
    
    &.MEDIUM {
        width: fit-content;
        height: 2rem;
        padding: 5px 10px;
        font-size: 1rem;
        font-weight: 600;
        color: var(--button-text-color);
    }
    
    &.LARGE {
        
    }
    &.PRIMARY {
        background-color: var(--primary-color);
        border: 2px solid var(--secondary-color);
    }
    &.ERROR {
        background-color: var(--error-color);
        border: 2px solid var(--error-color-secondary);
    }
    &.WARNING {}
    
    &.LINKSTYLE {
        background-color: transparent;
        color: var(--color-text);
        border: none;
    }
}

</style>