<template>
    <div class="radio-button-element-wrapper">
        <input class="radio-button-element" type="radio" :name="props.name" @click="$emit('click')" :checked="props.checked" />
        <p>{{ props.label }}</p>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['click'])

interface RadioButtonProps {
    name?: string;
    label?: string
    checked?: boolean
}

const props = withDefaults(defineProps<RadioButtonProps>(), {
    // name: ""
    checked: false,
});

</script>

<style lang="scss" scoped>

.radio-button-element-wrapper {
    height: 2rem;
    display: flex;
    p {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text);
        margin: auto 5px;
    }

    input[type="radio"] {

        /* Add if not using autoprefixer */
        // -webkit-appearance: none;
        // appearance: none;
        /* For iOS < 15 to remove gradient background */
        background-color: #fff;
        /* Not removed via appearance */
        margin: 0;

        background-color: var(--primary-color);
        // border: 2px solid var(--primary-color);

    }
    .radio-button-element {
        // height:rem;
    }
}

</style>
