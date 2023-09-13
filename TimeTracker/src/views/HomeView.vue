<template>
  <v-card>
    <v-tabs
        v-model="tab"
        bg-color="green"
        centered
        stacked
    >
      <v-tab value="tab-1">
       <v-icon>
         <font-awesome-icon :icon="['fas', 'house']" />
       </v-icon>
        Start
      </v-tab>

      <v-tab value="tab-2">
        <v-icon><font-awesome-icon :icon="['fas', 'chart-pie']" /></v-icon>
        Statistics
      </v-tab>

      <v-tab value="tab-3">
        <v-icon><font-awesome-icon :icon="['fas', 'table']" /></v-icon>
        Data
      </v-tab>

      <v-tab value="tab-4">
        <v-icon><font-awesome-icon :icon="['fas', 'gear']" /></v-icon>
        Config
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">

      <v-window-item value="tab-1">
        <v-card>
          <EntryInput class="Entry-Input"/>
          <div class="Statistics-Wrapper">
            <GoalStatistics/>
            <EntryStatistics/>
            <MissingTimeStatistics/>
          </div>

        </v-card>
      </v-window-item>

      <v-window-item value="tab-2" title="Test">
        <v-card>
          <EntryStatistics/>
        </v-card>
      </v-window-item>

      <v-window-item value="tab-3">
        <v-card>
          <EntryDisplay/>
        </v-card>
      </v-window-item>

      <v-window-item value="tab-4">
        <v-card>
          CONFIG
        </v-card>
      </v-window-item>

    </v-window>
  </v-card>

  <div class="Home-View-Wrapper">
    <v-card class="Home-View-Card">




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
import {ref} from "vue";
import MissingTimeStatistics from "@/components/MissingTimeStatistics.vue";



const tab = ref('tab-1')

</script>

<style scoped>
  @import "@/assets/styles/homeView.css";

</style>