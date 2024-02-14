<template>
    <div>
        <h5>User Page</h5>
        <!-- <Suspense>
            <p>{{ userData }}</p>
        </Suspense> -->
        <p>{{ userData }}</p>
    </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { getUserByID } from '@/services/user';
import { onMounted, ref } from 'vue';
import { type UserModel } from "@/services/user/dto/user.dto";
// import { onMounted } from 'vue';

const route = useRoute();

const userData = ref()

const { userid } = route.params;

onMounted(async () => {
    userData.value = await getUserByID(userid.toString());
})


getUserByID(userid.toString());

</script>

<style lang="scss" scoped></style>