<template>
  <div class="Home-View-Wrapper">
    <v-card class="Home-View-Card">
      <EntryInput class="Entry-Input"/>
      <EntryStatistics/>
      <GoalStatistics/>
      <EntryDisplay/>
    </v-card>
  </div>
  <div class="Display-Stats">Display-Stats</div>
</template>

<script setup lang="ts">

import EntryDisplay from "@/components/EntryDisplay.vue";
import EntryInput from "@/components/EntryInput.vue";
import {useEntryStore} from "@/stores/entry";
import {storeToRefs} from "pinia";
import EntryStatistics from "@/components/EntryStatistics.vue";
import GoalStatistics from "@/components/GoalStatistics.vue";





</script>

<style scoped>
  @import "@/assets/styles/homeView.css";

</style>