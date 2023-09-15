<template>
  <v-card-item class="Entry-Statistics">
    <div class="Statistics-Wrapper">
      <TimeStatistic :stat="goalTimeMapping" :text="'Goal'"/>
      <TimeStatistic :stat="totalTimePerCategory" :text="'Done'"/>
      <TimeStatistic :stat="missingTimePerCategory" :text="'Missing'"/>
    </div>
  </v-card-item>
</template>

<script setup lang="ts">
import {useEntryStore} from "@/stores/entry";
import {storeToRefs} from "pinia";
import TimeStatistic from "@/components/TimeStatistic.vue";
const store = useEntryStore()
const {goalTimeMapping,totalTimePerCategory, missingTimePerCategory,totalTimeSpentList} = storeToRefs(store)




</script>

<style scoped>
.Statistics-Wrapper{
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
}

</style>