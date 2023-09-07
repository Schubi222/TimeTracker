<template>
  <v-card>
    <v-card-item v-if="total_time">
      {{total_time}}
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">

import {useEntryStore} from "@/stores/entry";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import dayjs from "dayjs";

const store = useEntryStore()
const {entries} = storeToRefs(store)

const total_time = computed(() =>{
  if (!entries.value){return}
  let time_total = 0
  entries.value.forEach((e) =>{
    const time_object = e.data().time.split(':')
    time_total += (+time_object[0])*60 + (+time_object[1])
  })

  return `Hours: ${Math.floor(time_total/60)} Minutes: ${time_total%60}`
})

</script>

<style scoped>

</style>