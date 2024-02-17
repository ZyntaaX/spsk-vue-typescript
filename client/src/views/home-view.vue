<template>
    <div>
        <ContentWrapper v-if="authStore.hasUserGotClaim('news_w')" >
            <ButtonElement type="primary" @click="$router.push({ name: 'WritePost' })" >{{ $t('actions.write_post') }}</ButtonElement>
        </ContentWrapper>
        <TitleWrapper>

            <h2>
                Nyheter
            </h2>
        </TitleWrapper>
        <ContentWrapper v-if="!isLoading">
            <PostComponent v-for="post in newsPosts" :key="post.id" :post="post" />
        </ContentWrapper>
        <ContentWrapper v-else style="display: flex; justify-content: center;">
            <SpinnerElement style="margin: 5rem;" />
        </ContentWrapper>
    </div>
</template>

<script setup lang="ts">

import { useAuthenticationStore } from '@/shared/stores/authentication-store';
import ContentWrapper from '@/components/content-wrapper.vue';
import TitleWrapper from '@/components/title-wrapper.vue';
import { ButtonElement, SpinnerElement } from '@/components/elements';
import PostComponent from '@/components/post-component.vue';

import { ref } from 'vue';
import { onMounted } from 'vue';
import { getAllNewsPosts } from '@/services/post/get-news-posts';
// import { PostModel } from '@/services/post/dto/post.dto';

const authStore = useAuthenticationStore();

const newsPosts = ref()

const isLoading = ref(true);

onMounted(async () => {
    const posts = await getAllNewsPosts();
    newsPosts.value = posts;
    console.log("POSTS: ", posts);
    isLoading.value = false;
})

</script>

<style lang="scss" scoped></style>