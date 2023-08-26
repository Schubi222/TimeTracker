<template>
  <div class="Inputs">
    <form @submit.prevent="validateForm">
      <div class="input-info-wrapper">
        <label for="time"></label>
        <div class="error" id="time_error" v-if="timeError">{{timeError}}</div>
      </div>
      <input type="time" class="time" id="time" name="time"
             v-model="time" min="00:01" required>

      <div class="input-info-wrapper">
        <label for="cause"></label>
      </div>
      <input type="text" class="cause" id="cause" name="cause" v-model="cause">


      <label for="select">Select category:</label>
      <select id="select" name="select" v-model="category" required>
        <option v-for="category in categories" :key="category">{{category}}</option>
      </select>
      <input type="submit" value="Enter">
    </form>

    Inputs
  </div>
  <div class="Display-Stats">Display-Stats</div>
  <div class="All-Entries">All-Entries</div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import Entry from "@/types/Entry";

  import data from '@/assets/dataBase/data.json';

  const categories = ref(['Dev', 'Total'])
  const time = ref('00:00')
  const cause = ref('')
  const category = ref(categories.value[0])


  const timeError = ref('')

  const validateForm = (e: Event) =>{
    if ( !categories.value.includes(category.value) || time.value === '00:00' || time.value === ''){
      return
    }
    const entry = new Entry(time.value, category.value, cause.value);
    console.log(data)
  }
</script>

<style scoped>


</style>