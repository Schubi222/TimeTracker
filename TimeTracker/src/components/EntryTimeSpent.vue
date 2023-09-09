<template>
  <v-card-item v-if="total_time" :title="props.category">
    {{total_time}}
  </v-card-item>
</template>

<script setup lang="ts">

import {useEntryStore} from "@/stores/entry";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {calculateTotalTime} from "@/helper/CalculateTime";

const store = useEntryStore()
const {entries} = storeToRefs(store)

const props = defineProps(["category"])

const total_time = computed(() =>{
  if (!entries.value){return}
  const entries_belonging_to_category = entries.value.filter((e) => e.data().category === props.category)
  let time_total = calculateTotalTime(entries_belonging_to_category)

  return `Hours: ${Math.floor(time_total/60)} Minutes: ${time_total%60}`
})

</script>

<style scoped>

</style>