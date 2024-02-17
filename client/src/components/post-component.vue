<template>
    <div class="post-wrapper">
        <img src="/src/assets/spsk_logo_dark.png" alt="img">
        <div class="info-box">
            <h2 class="title-container"> {{ props.post.title }} </h2>
            <p style="font-style: italic;">{{ getDateTimeString(props.post.published_at) }} </p>
            <h4 class="subheader-container"> {{ props.post.subheader }} </h4>
        </div>
        <!-- <div class="preview">
            <MdPreview v-model="text" :theme="themeStore.getThemeFlat === 'DARK' ? 'dark' : 'light'" code-theme="qtcreator" />
        </div> -->
    </div>
</template>

<script setup lang="ts">

import { DateTime } from 'luxon';
import { defineProps } from 'vue';
import { type PostModel } from '@/services/post/dto/post.dto';
// import { MdPreview } from 'md-editor-v3';
// import 'md-editor-v3/lib/style.css';

import i18n from '@/i18n/i18n';

import { useThemeStore } from './theme-switcher/theme-store';

const themeStore = useThemeStore();

interface PostComponentProps {
    post: PostModel;
}

const props = defineProps<PostComponentProps>();

function getDateTimeString(date: DateTime): string {
    const today = DateTime.now().startOf('day');
    const yesterday = DateTime.now().minus({ days: 1 }).startOf('day');

    if (DateTime.fromISO(date.toString()) > today) {
        return `${i18n.global.t('misc_texts.today')}, ` + DateTime.fromISO(date.toString()).toLocaleString(DateTime.TIME_24_SIMPLE)
    } else if (DateTime.fromISO(date.toString()) > yesterday) {
        return `${i18n.global.t('misc_texts.yesterday')}, ` + DateTime.fromISO(date.toString()).toLocaleString(DateTime.TIME_24_SIMPLE)
    }
    return DateTime.fromISO(date.toString()).toLocaleString(DateTime.DATETIME_MED)
}

</script>

<style lang="scss" scoped>

.post-wrapper {
    height: 8rem;
    display: flex;
    flex-direction: row;

    &:hover {
        cursor: pointer;
    }

    img {
        height: 6rem;
        width: 6rem;
        border-radius: 5px;
        margin: auto 0.5rem;
        object-fit: cover;
        padding: 5px;
        background-color: var(--color-border);
    }

    &:not(:last-of-type) {
        border-bottom: 2px solid var(--color-border);
    }

    .info-box {
        margin: auto 1rem;

        .title-container {
            overflow: hidden;
            font-weight: bold;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* number of lines to show */
            line-clamp: 1; 
            -webkit-box-orient: vertical;
        }

        .subheader-container {
            overflow: hidden; 
            // font-weight: bold;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2; 
            -webkit-box-orient: vertical;
        }
    }
}

</style>
