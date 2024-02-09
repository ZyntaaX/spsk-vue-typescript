<template>
    <input
        class="input-element"
        :placeholder="props.placeholder"
        :type="props.type"
        :class="[props.size, {'center': centerText}]"
        v-model="model"
    />
</template>

<script setup lang="ts">

import { type InputTypeHTMLAttribute } from 'vue';

type InputSize = 'SMALL' | 'MEDIUM' | 'LARGE';
interface Props {
    size?: InputSize;
    placeholder?: string;
    type?: InputTypeHTMLAttribute
    value?: string;
    centerText?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    size: 'MEDIUM',
    centerText: false,
});

const model = defineModel();

</script>

<style lang="scss" scoped>

.input-element {
    // background-color: var(--);
    border: 2px solid var(--secondary-color);
    border-radius: 4px;
    padding: 5px;
    font-size: 1rem;
    font-weight: 600;
    height: 2rem;
    background-color: var(--vt-c-text-dark-2);
    color: var(--button-text-color);

    &:focus {
        border: 2px solid var(--primary-color);
        outline: none;
    }

    &.center {
        text-align: center;
    }

    &.SMALL {

    }
    &.MEDIUM {
        width: 25rem;
    }
    &.LARGE {
        
    }
}

</style>
