<template>
  <v-card-item class="Entry-Statistics">
    <EntryTimeSpent v-for="category in categories" :category="category" :key="category"/>
    <v-card-item class="Total-Time-Spent">
    <v-card-item title="Total"  class="pa-0">
      <div v-if="totalTimeSpentList && totalTimeSpentList[0] !== 0">
        {{FormatDate(totalTimeSpentList.at(-1) as number)}}
      </div>
      <div v-else>{{FormatDate(0)}}</div>
    </v-card-item>
    </v-card-item>
  </v-card-item>
</template>

<script setup lang="ts">
import EntryTimeSpent from "@/components/EntryTimeSpent.vue";
import {useEntryStore} from "@/stores/entry";
import {storeToRefs} from "pinia";
import {FormatDate} from "../helper/FormatTime";
const store = useEntryStore()
const {categories, totalTimeSpentList} = storeToRefs(store)




</script>

<style scoped>

</style>