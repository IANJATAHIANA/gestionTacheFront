<template>
    <div class="header">
      <headerShopComponent/>
    </div>
  
    <div>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
        style="margin-top: 80px;"
      >
  
        <RouterLink
          class="text-blue text-decoration-none"
          to="/"
          style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
        >
          <v-icon icon="mdi-chevron-left"></v-icon>
          Retour
        </RouterLink>
        <v-card-text >
          <v-card-title
            style="font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            CONNECTER A VOTRE COMPTE
          </v-card-title>
        </v-card-text>
  
        <div class="text-subtitle-1 text-medium-emphasis"
          style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
          Email
        </div>
  
        <v-text-field
          style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
          v-model="email"
          density="compact"
          :rules="[ emailValidationRule]"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Mot de Passe
  
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
          >
            Mot de passe Oublié?</a>
        </div>
  
        <v-text-field
          style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          :rules="[ passwordValidate]"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption"
            style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            Attention : après 3 tentatives de connexion consécutives infructueuses, votre compte sera temporairement verrouillé pendant trois heures. Si vous devez vous connecter maintenant, vous pouvez également cliquer sur « Mot de passe de connexion oublié ? » ci-dessous pour réinitialiser le mot de passe de connexion.
          </v-card-text>
        </v-card>
  
        <div v-if="errorMessage" class="text-red text-caption mt-2">
          {{ errorMessage }}
        </div>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="login()"
          style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
        >
          CONNECTER-VOUS
        </v-btn>
  
        <v-card-text class="text-center">
          <RouterLink
            class="text-blue text-decoration-none"
            to="/register"
            style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
          >
            Inscrivez-vous maintenant <v-icon icon="mdi-chevron-right"></v-icon>
          </RouterLink>
        </v-card-text>
      </v-card>
    </div>
    <div style="margin-top: 20px;">
      <FooterComponent/>
    </div>
  </template>

<script lang="ts" setup>
import { RegisterService } from '../../service/user.service';
import { IUser } from '../../model/user';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLocalstorage } from '../../composable/localstorage.composable';
import { useUserStore } from '../../store/store';
import { AxiosResponse } from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const visible = ref(false);

const { getItem, setItem } = useLocalstorage();
const userStore = useUserStore();

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const emailValidationRule = (value: string) =>
  /\S+@\S+\.\S+/.test(value) || "L'email est invalide.";

const passwordValidate = (value: string) =>
  8 <= value.length || "Le mot de passe doit comporter au 8 caractères"

  const login = async () => {
    errorMessage.value = '';
    getItem('user');

    if (!validateEmail(email.value)) {
    errorMessage.value = 'Email invalide!';
    return;
    }

    RegisterService.login(email.value, password.value)
      .then((response: AxiosResponse) => {


        // Stocker dans le local storage
      setItem('id', response.data.idUser);
      setItem('authtoken', response.data.token);

      // stocker les informations de l'utilisateur connecté dans le store
      userStore.user = response.data.user;
      console.log('mety');

      if (response.data) {
      userStore.setNotification('Connexion réussie !');
      alert('connecté!')
      // router.push('/');

    } else {
      errorMessage.value = 'Email ou mot de passe incorrect.';
    }
    })

    .catch((error: any) => {
      console.log("🚀 ~ error:", error.response.data.message)

      if (error.response.data.message === 'USER_NOT_FOUND') {
        errorMessage.value = 'Utilisateur introuvable !';
      }
    })

  }

</script>