<template>
  <v-card-item class="Entry-Statistics">
    <EntryTimeSpent v-for="category in categories" :category="category" :key="category"/>
    <v-card-item class="Total-Time-Spent">
    <v-card-item title="Total" v-if="totalTimeSpentList && totalTimeSpentList[0] !== 0" class="pa-0">
      {{FormatDate(totalTimeSpentList.at(-1) as number)}}
    </v-card-item>
    </v-card-item>
  </v-card-item>
</template>

<script setup lang="ts">
import EntryTimeSpent from "@/components/EntryTimeSpent.vue";
import {useEntryStore} from "@/stores/entry";
import {storeToRefs} from "pinia";
const store = useEntryStore()
const {categories, totalTimeSpentList} = storeToRefs(store)


const FormatDate = (Minutes:number):string =>{
  return `Hours: ${Math.floor(Minutes/60)} Minutes: ${Minutes%60}`
}
</script>

<style scoped>

</style>