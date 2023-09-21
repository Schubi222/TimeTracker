<template>
  <v-card class="Category-Setting-Element-Wrapper">
    <v-card-item>
      <h3 class="v-card-title custom-title">Current Categories</h3>
      <div v-for="category of categories" :key="category">
        <div>
          {{category}}
          <font-awesome-icon icon="fa-solid fa-trash" class="Trashcan" @click="handleDelete(category)"/>
        </div>
      </div>
    </v-card-item>
    <v-card-item >
      <div class="Add-Category-Wrapper">
        <h3 class="v-card-title custom-title">Add Categories</h3>
        <font-awesome-icon icon="fa-solid fa-circle-plus" class="Add-Category"/>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">

  import {useEntryStore} from "@/stores/entry";
  import {storeToRefs} from "pinia";

  const store = useEntryStore()
  const {categories} = storeToRefs(store)

  const handleDelete = (category:string) => {
    console.log(category)
  }

</script>

<style scoped>
@import "@/assets/styles/Reusables.css";
@import "@/assets/styles/CategorySettingElement.css";
</style>