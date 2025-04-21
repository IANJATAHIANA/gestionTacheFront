<template>
    <Header/>
    <v-col cols="auto" class="d-flex justify-center">
        <v-btn size="x-large" @click="showForm = !showForm">
            Ajouter votre tache
        </v-btn>
    </v-col>

    <!-- formulaire -->
    <v-row v-if="showForm" justify="center">
      <v-col
        cols="12"
        lg="6"
        md="8"
        sm="10"
      >
        <v-card ref="form" style="margin-top: 80px; border-width: 2px; border-radius: 15px; width: 600px;">
        <v-card-text style="font-weight: bold; text-align: center; font-size: 30px;">
            Ajouter votre tache ici
        </v-card-text>
          <v-card-text>
            <v-text-field
              ref="Titre"
              v-model="title"
              :error-messages="errorMessages"
              :rules="[() => !!title || 'This field is required']"
              label="Votre tache"
              placeholder="titre de votre tache"
              required
            ></v-text-field>
            <v-text-field
              ref="Description"
              v-model="description"
              :error-messages="errorMessages"
              :rules="[
                () => !!description || 'This field is required',
              ]"
              label="Description de votre tache"
              placeholder="description"
              required
            ></v-text-field>
            <v-autocomplete
            style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
            v-model="priorite"
            :items="priorites"
            :rules="[
                () => !!priorite || 'This field is required',
              ]"
            label="priorite"
            placeholder="Select..."
            required
          ></v-autocomplete>
            <v-date-picker
              v-model="date_echeance"
              @update:model-value="menu = false"
              :min="new Date().toISOString().split('T')[0]"
              title="Choisir une date"
            />
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn variant="text">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip
                v-if="formHasErrors"
                location="left"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon
                    v-bind="props"
                    @click="resetForm"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn
              color="primary"
              variant="text"
              @click="CreateTask"
            >
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- tableau -->
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-bold">
            TITLE
          </th>
          <th class="text-left font-weight-bold">
            DESCRIPTION
          </th>
          <th class="text-left font-weight-bold">
            PRIORITE
          </th>
          <th class="text-left font-weight-bold">
            DATE D'ECHEANCE
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in tasks"
          :key="item.idTask"
        >
          <td >{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.priorite }}</td>
          <td>{{ item.date_echeance }}</td>
          <td>
            <v-btn @click="editTask(item)" color="primary" small>
                Modifier
            </v-btn>
            <v-btn @click="deleteTask(item.idTask)" color="red" small>
                Supprimer
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </template>

<script lang="ts" setup>
import { EPriorite } from '../../constant/enum';
import { computed, ref } from 'vue';
import { ITask } from '../../model/task';
import { taskService } from '../../service/task.service';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Header from '../../widgets/header.vue'
const tasks = ref<ITask[]>([]);
const showForm = ref(false);

const fetchTask = async () => {
    try {
        const task = await taskService.getTask();
        tasks.value = task.data;
        console.log("tableau afficher", task);
        
    } catch (error) {
        console.error("Erreur lors de l'affichage de tache");
        
    }
}

const router = useRouter();
const title = ref('');
const date_echeance = ref<Date | null>(new Date());
const description = ref('');
const errorMessages = ref('');
const menu = ref(false);
const priorite = ref<EPriorite>(EPriorite.Haut || EPriorite.Moyenne || EPriorite.Bas)
const priorites = Object.values(EPriorite);


const form = ref<ITask>({
    title: '',
    description: '',
    priorite: EPriorite.Haut || EPriorite.Moyenne || EPriorite.Bas,
    date_echeance: date_echeance.value?.toISOString() || ""
});

const CreateTask = async () => {
    try {
        form.value = {
            title: title.value,
            description: description.value,
            priorite: priorite.value,
            date_echeance: date_echeance.value as Date,
            }
            console.log(priorite.value);
            console.log("Data envoyée :", form.value)

            

            await taskService.createTask(form.value)
            console.log("votre tache est creer")
            resetForm();
            alert("tache creer");   
            const task = await taskService.getTask();
            tasks.value = task.data;

    } catch (error) {
        console.error("Erreur lors de l'ajout de tache");
        
    }
}

const editTask = async (task: ITask) => {
    title.value = task.title;
    description.value = task.description;
    priorite.value = task.priorite;
    date_echeance.value = new Date(task.date_echeance);
    showForm.value = true; // Afficher le formulaire pour modifier
}

const deleteTask = async (idTask?: number) => {
  if (idTask === undefined) {
    console.warn("idTask est indéfini, suppression annulée.");
    return;
  }
  try {
    await taskService.deleteTask(idTask);
    tasks.value = tasks.value.filter((task) => task.idTask !== idTask);
    console.log("Tâche supprimée avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche");
  }
};


const resetForm = () => {
    title.value = "",
    description.value = "",
    priorite.value = EPriorite.Moyenne,
    date_echeance.value = new Date()
}

const formHasErrors = computed(() => {
  return !title.value || !description.value || !priorite.value || !date_echeance.value
})

onMounted(() =>{
    fetchTask();
})
</script>