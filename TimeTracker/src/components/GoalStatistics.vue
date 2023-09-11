<template>
  <v-card-item>
    <v-card v-if="categories">
      <v-card-item
          v-for="category in categories"
          :key="category"
          :title="`Goal Time for ${category}`"
      >
      </v-card-item>
    </v-card>
  </v-card-item>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useEntryStore } from '@/stores/entry'
import { storeToRefs } from 'pinia'
const store = useEntryStore()
const { categories } = storeToRefs(store)



onMounted(async () => {
const prom = new Promise((resolve, reject) => {
    if (categories.value !== undefined) {
      resolve("UUUUUUUUUUUUUUU")
      console.log("bb")
    }
  })

  prom.finally(() =>{
    console.log("AAAAAAAAAAAAAAAAAAAAA")
  })

  console.log("a")
  // result
})
</script>

<style scoped></style>