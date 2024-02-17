<template>
    <div v-if="!isLoading">
        <ContentWrapper style="height: 3rem;">Actions</ContentWrapper>
        <ContentWrapper style="height: 3rem;">
            <InputElement v-model="postTitle" type="text" placeholder="Title" size="LARGE" />
        </ContentWrapper>
        <ContentWrapper style="height: 3rem;">
            <InputElement v-model="postSubheader" type="text" placeholder="Subheader" size="LARGE" />
        </ContentWrapper>
        <ContentWrapper class="write-post-wrapper">
            <MdEditor :toolbars-exclude="[isSaving ? 'save' : 0]" :preview="false" :on-save="savePost" class="md-editor" v-model="postContent" :theme="themeStore.getThemeFlat === 'DARK' ? 'dark' : 'light'" language="en-US" code-theme="qtcreator" />
            <!-- <div class="preview">
                <MdPreview v-model="text" :theme="themeStore.getThemeFlat === 'DARK' ? 'dark' : 'light'" code-theme="qtcreator" />
            </div> -->
        </ContentWrapper>


            <!-- <MarkdownParser :source="text" /> -->
    </div>

    <ContentWrapper v-else style="display: flex; justify-content: center;">
        <SpinnerElement style="margin: 5rem;" />
    </ContentWrapper>
</template>

<script setup lang="ts">

import ContentWrapper from '@/components/content-wrapper.vue';

// import { useThemeStore } from '@/'


// TODO: DOCS!!!!
// https://github.com/imzbf/md-editor-v3

import { MdEditor, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { SpinnerElement } from '@/components/elements';

import { ref } from 'vue';
import { useThemeStore } from '@/components/theme-switcher/theme-store';
import { InputElement } from '@/components/elements';
import { postNews } from '@/services/post/post-news';
import { type PostModel } from '../../services/post/dto/post.dto';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const themeStore = useThemeStore();
const route = useRoute();

const isLoading = ref(true)

const postContent = ref('# Hello Editor');
const postTitle = ref("")
const postSubheader = ref("")
const isSaving = ref(false)
const postID = ref(route?.params?.postid?.toString() ?? "")

console.log("POSTID: ", postID.value);


onMounted(async () => {
    // if (postID.value.length > 0) {
    //     const currentPost: PostModel | null = await getPost(postID.value)
    //     postTitle.value = currentPost?.title ?? ""
    //     postContent.value = currentPost?.content ?? ""
    // }
    isLoading.value = false;
})

async function savePost() {
    isSaving.value = true;
    const post: PostModel | null = await postNews(postTitle.value, postSubheader.value, postContent.value, true, postID.value.length > 0 ? postID.value : undefined);
    isSaving.value = false;
    postID.value = post?.id ?? "";
}


</script>

<style lang="scss" scoped>

@import '@/assets/main.scss';

$write-window-height: calc(
    $main-page-max-height
    - ($content-standard-margin * 2)
    - 3rem /* Height of actions bar */
    - 3rem /* Height of title bar */
    - 3rem /* Height of subheader bar */
    );

.write-post-wrapper {
    // height: calc(40rem - $top-bar-height);
    height: $write-window-height;
    // flex-grow: 1;
    .md-editor {
        height: calc($write-window-height - ($content-standard-margin * 2));
        background-color: transparent;
    }

}

// .preview {
//     #md-editor-v3 {
//         background-color: transparent !important;
//     }
// }
// }


</style>
