<template>
    <v-card height="130">
      <v-toolbar class="text-white" image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-btn icon="mdi-menu"></v-btn>
  
        <v-toolbar-title class="font-weight-bold"> Site de gestion de votre tache </v-toolbar-title>

        <v-btn
            v-for="link in links"
            :key="link.label"
            :to="link.route"
            component="RouterLink"
            variant="text"
            rounded
            class="text-white"
        >
            {{ link.label }}
        </v-btn>
  
        <v-btn icon="mdi-export"></v-btn>
      </v-toolbar>
      <div class="text-h3 text-center font-weight-bold"> GESTION DE TACHE </div>
    </v-card>
  </template>

<script setup>
const links = [
    { label: 'Accueil', route: '/' },
    { label: 'Liste des tâches', route: '/taskview' },
    { label: 'Se connecter', route: '/login' }
]

</script>