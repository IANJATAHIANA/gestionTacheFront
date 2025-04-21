<template>

    <v-row justify="center">
      <v-col
        cols="12"
        lg="5"
        md="8"
        sm="10"
      >
  
        <v-card ref="form" style="margin-top: 80px; border-width: 2px; border-radius: 7px;">
  
          <RouterLink
            class="text-blue text-decoration-none"
            to="/"
            style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
          >
            <v-icon icon="mdi-chevron-left"></v-icon>
            Retour
          </RouterLink>
  
          <v-card-text>
            <v-card-title
              style="font-weight: bold; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
              CREER VOTRE COMPTE
            </v-card-title>
          </v-card-text>
          <v-card-text>
  
              <v-text-field
                style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
                v-model="profil"
               :rules="[requiredRule]"
                label="Votre profil"
                placeholder="profil"
                required
              ></v-text-field>

            <v-text-field
              style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              v-model="firstName"
              :error-messages="errorMessages"
              :rules="[requiredRule]"
              label="Votre nom"
              placeholder="firstName"
              required
            ></v-text-field>
  
            <v-text-field
              style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              v-model="lastName"
              :error-messages="errorMessages"
              :rules="[requiredRule]"
              label="Votre prenom"
              placeholder="lastName"
              required
            ></v-text-field>
  
            <v-text-field
              style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              v-model="email"
              :rules="[requiredRule, emailValidationRule]"
              label="Votre email"
              placeholder="email"
              type="email"
              required
            ></v-text-field>
  
            <v-text-field
              style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              v-model="password"
              :rules="[requiredRule, passwordValidate]"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="votre mot de passe"
              counter="8"
              placeholder="password"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="visible = !visible"
              required
            ></v-text-field>
  
          </v-card-text>
  
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
  
            <v-btn
              variant="text"
              @click="resetForm"
              style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              >
              Réinitialiser
            </v-btn>
  
            <v-spacer></v-spacer>
  
            <v-btn
              color="primary"
              variant="text"
              @click="createUser()"
              style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              >
              Enregistrer
            </v-btn>
  
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>

<script setup lang="ts">
import { IUser } from '../../model/user';
import { RegisterService } from '../../service/user.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const profil = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const visible = ref(false);
const errorMessages = ref('');
const route = useRouter();

const requiredRule = (value: string) => !!value || "Ce champ est requis.";
const emailValidationRule = (value: string) =>
  /\S+@\S+\.\S+/.test(value) || "L'email est invalide.";
const passwordValidate = (value: string) =>
  8 <= value.length || "Le mot de passe doit comporter au 8 caractères"

const form = ref<IUser>({
    idUser: 0,
    profil: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
});
const createUser = async () => {

    try {

        form.value = {
        idUser: 0,
        profil: profil.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    };

        await RegisterService.createUser(form.value);
        console.log("Votre compte est creer", form.value);
        resetForm();
        alert("Ajout faite avec succes!");
        router.push('/register');
        
    } catch (error) {
        console.error('Erreur lors de l\'ajout');
        
    }

}

const resetForm = () => {
    profil.value = "";
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
};

</script>