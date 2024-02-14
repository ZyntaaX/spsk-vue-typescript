<template>
    <div class="wrapper">
        <font-awesome-icon style="height: 2rem; margin: auto 1rem;" icon="fa-solid fa-terminal" />
        <h2>404</h2>
        <div class="spacer" />
        <p>{{ $t('error_messages.404_page_not_found') }}</p>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>

.main-content {
    justify-content: center;
}

.wrapper {
    display: flex;
    margin: 2rem;
    justify-content: center;
    color: var(--color-text);

    h2 {
        font-weight: bold;
    }

    * {
        margin: auto 0;
    }

    .spacer {
        margin: auto 1rem;
        width: 2px;
        height: 40px;
        background-color: var(--color-text);
    }
}

</style>