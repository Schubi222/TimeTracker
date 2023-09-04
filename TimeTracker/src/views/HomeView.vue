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

  <v-card>
    <v-card-item>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Category
              </th>
              <th class="text-left">
                Time
              </th>
              <th class="text-left">
                Cause
              </th>
              <th class="text-left">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
          <tr
              v-for="entry in entries?.docs"
              :key="entry.data().id"
          >
            <td>{{ entry.data().id }}</td>
            <td>{{ entry.data().category }}</td>
            <td>{{ entry.data().time }}</td>
            <td>{{ entry.data().cause }}</td>
            <td>{{ entry.data().date }}</td>
          </tr>
          </tbody>
        </v-table>
    </v-card-item>
  </v-card>



  <div class="Display-Stats">Display-Stats</div>
  <div class="All-Entries">All-Entries</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
  import type Entry from "@/types/Entry";

  import type {VForm} from "vuetify/components";

  import {collection,doc,getDocs} from "firebase/firestore"
  import type {QueryDocumentSnapshot, DocumentData, QuerySnapshot} from "firebase/firestore"


  import db from "@/firestore/firestoreInit"


  const categories = ref(['Dev', 'Total'])
  const time = ref('00:00')
  const cause = ref('')
  const category = ref(categories.value[0])

  const entries = ref<QuerySnapshot | undefined>()

  const form = ref<undefined|VForm>()

  const timeValidation = [
    (time:string) => time !== '00:00' || "Enter a correct time",
    (time:string) => time !== '' || "Enter a correct time",
  ]

  const validateForm = async () =>{

    const valid = await form.value?.validate()
    if(valid?.valid){
      const newEntry:Entry = {time:time.value,category:category.value,cause:cause.value, date:Date.now()}

      // console.log(data)
    }
  }

  onMounted(async () =>{
    entries.value = (await getDocs(collection(db, "Entries")))
  })
</script>

<style scoped>


</style>