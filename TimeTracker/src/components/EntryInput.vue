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
</template>

<script setup lang="ts">
  import {ref} from "vue";

  import {collection, addDoc, serverTimestamp} from "firebase/firestore"
  import db from "@/firestore/firestoreInit";

  import type Entry from "@/types/Entry";
  import type {VForm} from "vuetify/components";
  import {useEntryStore} from "@/stores/entry";

  const store = useEntryStore()

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
      const newEntry = {
        time:time.value,
        category:category.value,
        cause:cause.value,
        date:serverTimestamp(),
        userid:1,
      }
      const ret = await addDoc(collection(db, "Entries"), newEntry)
      await store.reloadEntries()

    }
  }

</script>

<style scoped>

</style>