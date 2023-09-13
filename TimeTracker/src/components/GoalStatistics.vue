<template>
  <v-card-item>
    <v-card v-if="goalTimes">
      <v-card-item
          v-for="category in goalTimes"
          :key="category[0]"
          :title="`Goal ${category[0]}`"
      >
        {{category[1]}}
      </v-card-item>
    </v-card>
  </v-card-item>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useEntryStore } from '@/stores/entry'
import { storeToRefs } from 'pinia'
import {collection, getDocs, QueryDocumentSnapshot, doc, getDoc} from "firebase/firestore";
import db from "@/firestore/firestoreInit";

const store = useEntryStore()
const { categories } = storeToRefs(store)

const goalTimes = ref()

onMounted(async () => {
  const temp = (await getDoc(doc(db, "Categories", "Predefined")))?.data()?.CategoryTimeGoalMap
  goalTimes.value = Object.entries(temp[0])
  console.log(goalTimes.value)
})
</script>

<style scoped></style>