<template>

    <v-card width="300" class="mx-auto">
      <v-card-item>
        <v-form @submit.prevent="validateForm" ref="form">
          <v-text-field
              type="time"
              id="time"
              name="time"
              v-model="time"
              :rules="timeValidation"
              label="Spent time">
          </v-text-field>

          <v-text-field
              type="text"
              id="cause"
              name="cause"
              v-model="cause"
              label="Additional Information"
          ></v-text-field>

          <v-select
              id="select"
              name="select"
              label="Select category:"
              v-model="category"
              :items="categories"
              chips
              required
          >
          </v-select>

          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
      </v-card-item>
    </v-card>



  <div class="Display-Stats">Display-Stats</div>
  <div class="All-Entries">All-Entries</div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import Entry from "@/types/Entry";

  import data from '@/assets/dataBase/data.json';
  import type {VForm} from "vuetify/components";

  const categories = ref(['Dev', 'Total'])
  const time = ref('00:00')
  const cause = ref('')
  const category = ref(categories.value[0])

  const form = ref<undefined|VForm>()


  const timeValidation = [
    (time:string) => time !== '00:00' || "Enter a correct time",
    (time:string) => time !== '' || "Enter a correct time",
  ]

  const validateForm = async () =>{
    const valid = await form.value?.validate()
    if(valid?.valid){
      console.log("a")
    }
  }
</script>

<style scoped>


</style>