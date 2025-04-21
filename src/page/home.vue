<template>
    <div class="head">
        <Header/>
    </div>
    <v-card>
        <div class="text font-weight-bold text-center">
            Confiez-nous votre emplois du temps de votre tache
        </div>
        <v-img :src="imghome"></v-img>

    </v-card>
            
    <Footer/>
</template>

<script setup>
import Header from '@/widgets/header.vue';
import Footer from '@/widgets/footer.vue';
import imghome from '@/assets/gestion de tache.jpg';
</script>

<style scoped>
.head{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}
</style>