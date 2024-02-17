<template>
    <div class="user_page--wrapper" >
        <ContentWrapper v-if="userData" :key="authStore.user?.id" :class="{'own-page': isOwnPage}" >
            <div class="top-profile--wrapper">
                <img v-if="userData.profile_picture_url" alt="profile_image" :src="userData.profile_picture_url" />
                <!-- <img v-else src="/src/assets/default_pp.jpg" alt="profile_image" /> -->
                <div class="text-box">

                    <h2 style="font-weight: bold; margin: 0; padding: 0;">
                        {{ userData?.firstname + " " + userData?.lastname }}
                    </h2>
                    <p>
                        {{ $t(`roles.${userData?.role?.title}`) }}
                    </p>
                    <div class="spacer" />
                    <p v-if="userData" style="font-style: italic;">
                        {{ $t('misc_texts.registered_at') }}: {{ DateTime.fromISO(userData.created_at).toLocaleString(DateTime.DATETIME_SHORT) }}
                    </p>
                    <p v-if="userData" style="font-style: italic;">
                        {{ $t('misc_texts.last_active') }}: 
                        {{ getLastActiveString() }}
                    </p>
                </div>
            </div>
            <div v-if="isOwnPage">
                <form id="upload-profile-image-form" enctype="multipart/form-data">
                    <input type="file" name="image" accept="image/*">
                </form>
                <ButtonElement @click="uploadImage" :disabled="false" >Upload</ButtonElement>
            </div>

            <div class="spacer" />
            <h3 style="font-weight: bold;" >{{ `Stats för ${userData.firstname}`}}</h3>
            <p>Posts: {{ userData?.posts?.length ?? 0 }}</p>
            <p>Comments: {{ userData?.comments?.length ?? 0 }}</p>

            <div class="spacer" />
            <h3 style="font-weight: bold;" >{{ $t('misc_texts.contact_information') }}</h3>
            <p style="font-weight: ;">{{ $t('misc_texts.email') }}: {{ userData?.email }}</p>
            <p>{{ $t('misc_texts.phone_number') }}: {{ userData?.phone_number }}</p>
        </ContentWrapper>
        <ContentWrapper v-else style="display: flex; justify-content: center;">
            <SpinnerElement style="margin: 5rem;" />
        </ContentWrapper>
    </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { getProfileImage, getUserByID } from '@/services/user';
import { onMounted, ref, isProxy, toRaw } from 'vue';
import { DateTime } from 'luxon';
import ContentWrapper from '@/components/content-wrapper.vue'
import { ButtonElement, SpinnerElement } from '@/components/elements';
// import { type UserModel } from "@/services/user/dto/user.dto";
import { uploadUserProfileImage } from '@/services/user';
import type { UserModel } from '@/services/user/dto/user.dto';
import * as CookieService from '@/services/cookies/cookies.service';
import { useAuthenticationStore } from '@/shared/stores/authentication-store';
import { watch } from 'vue';
import { reactive } from 'vue';
import i18n from '@/i18n/i18n';
import { storeToRefs } from 'pinia';

const route = useRoute();

const authStore = useAuthenticationStore();

const userData = ref()
// const userProfilePicURL = ref()


const { userid } = route.params;

const isOwnPage = ref(userid === authStore.getCachedUserID())

onMounted(async () => {
    if (userid !== authStore.userID) {
        userData.value = await getUserByID(userid.toString());
    } else {
        userData.value = authStore.user
    }

    console.log("USUSS: ", userData.value.posts);
    
        // if (userData.value.profile_picture_id) {
    //     userProfilePicURL.value = await getProfileImage(userData.value.profile_picture_id);
    // }
    // Re-check 
    // isOwnPage.value = userid === authStore.user?.id;
})

async function uploadImage(): Promise<void> {
    const uploadForm = document.getElementById('upload-profile-image-form') as HTMLFormElement | undefined;

    // Access the file input element inside the form
    const fileInput = uploadForm?.querySelector('input[type="file"]') as HTMLInputElement | null;

    if (!fileInput) {
        console.error('File input element not found.');
        return;
    }

    // Check if a file is selected
    if (!fileInput.files || fileInput.files.length === 0) {
        console.error('No file selected.');
        return;
    }

    // Get the selected file
    const file = fileInput.files[0];

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append('file', file);
    const response = await uploadUserProfileImage(userid.toString(), formData);

    userData.value.profile_picture_url = response;
    if (userid === authStore.userID) {
        authStore.setUser(userData.value)
    }
}


function getLastActiveString(): string {
    if (!userData.value) return "";
    const today = DateTime.now().startOf('day');
    const yesterday = DateTime.now().minus({ days: 1 }).startOf('day');

    if (DateTime.fromISO(userData.value?.last_login) > today) {
        return `${i18n.global.t('misc_texts.today')}, ` + DateTime.fromISO(userData.value?.last_login).toLocaleString(DateTime.TIME_24_SIMPLE)
    } else if (DateTime.fromISO(userData.value?.last_login) > yesterday) {
        return `${i18n.global.t('misc_texts.yesterday')}, ` + DateTime.fromISO(userData.value?.last_login).toLocaleString(DateTime.TIME_24_SIMPLE)
    }
    return DateTime.fromISO(userData.value?.last_login).toLocaleString(DateTime.DATETIME_MED)
}

</script>

<style lang="scss" scoped>

.user_page--wrapper {
    // color: var(--color-text);

    .own-page {
        border-left: 6px solid var(--primary-color);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding-left: 1rem;
    }

    .top-profile--wrapper {
        display: flex;
        
        .text-box {
            margin: auto 0 auto 1rem;
        }
        
        img {
            border: 2px solid var(--color-border);
            border-radius: 5px;
            width: 8rem;
            height: 8rem;
            object-fit: cover;
            background-color: var(--color-border);
            color: white;
        }
    }

    .spacer {
        height: 1rem;
    }
}

</style>