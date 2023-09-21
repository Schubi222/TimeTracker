<template>
  <v-card-item title="Goal Settings">
    <v-card v-if="goalTimeMapping">
      <v-card-item v-for="category of goalTimeMapping" :key="category[0]" class="">
        <GoalSettingElement :category="category" />
      </v-card-item>

    </v-card>
  </v-card-item>
  <v-card-item title="Category Settings">
    <CategorySettingElement/>
  </v-card-item>
</template>

<script setup lang="ts">
import { useEntryStore } from '@/stores/entry'
import { storeToRefs } from 'pinia'
import GoalSettingElement from "@/components/GoalSettingElement.vue";
import CategorySettingElement from "@/components/CategorySettingElement.vue";
const store = useEntryStore()
const { goalTimeMapping } = storeToRefs(store)


</script>

<style scoped>
@import "@/assets/styles/ConfigTab.css";
</style>