<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import UploadMedia from "../Media/UploadMedia.vue";

let username = ref("");
let password = ref("");
let profilePicture = ref("");
const updateFormEnabled = ref(false);

const { updateUser, updateSession } = useUserStore();

async function updateUsername() {
  await updateUser({ username: username.value });
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}

async function updatePicture() {
  await updateUser({ profilePhoto: profilePicture.value });
  await updateSession();
  profilePicture.value = "";
}

async function assignURL(url: string) {
  profilePicture.value = url;
}

function assignPassword(userPassword: string) {
  password.value = userPassword;
}

async function toggleUpdateForm() {
  updateFormEnabled.value = !updateFormEnabled.value;
}
</script>

<template>
  <button @click="toggleUpdateForm" class="button-secondary pure-button">Update your details</button>
  <div class="options-wrapper" v-if="updateFormEnabled">
    <form @submit.prevent="updateUsername" class="pure-form">
      <fieldset>
        <legend>Change your username</legend>
        <input type="text" placeholder="New username" v-model="username" required />
        <button type="submit" class="pure-button pure-button-primary">Update username</button>
      </fieldset>
    </form>

    <form @submit.prevent="updatePicture" class="pure-form">
      <fieldset>
        <UploadMedia @update:imageURL="assignURL" required></UploadMedia>
        <legend>Change your profile picture</legend>
        <button type="submit" class="pure-button pure-button-primary">Update profile picture</button>
      </fieldset>
    </form>

    <form @submit.prevent="updatePassword" class="pure-form">
      <fieldset>
        <legend>Change your password</legend>
        <PasswordValidation @userPassword="assignPassword" id="aligned-password" placeholder="Update password" required></PasswordValidation>
        <button type="submit" class="pure-button pure-button-primary">Update password</button>
      </fieldset>
    </form>
  </div>
</template>
