<template>
  <div class="Setting-Heading-Wrapper">
    <h3 class="v-card-title">{{ category[0] }}</h3>
    <font-awesome-icon
      icon="fa-solid fa-pencil"
      class="Edit-Btn"
      @click="edit"
      v-if="!displayEdit && props.category[0] !== 'Total'"
    />
    <font-awesome-icon
      icon="fa-solid fa-x"
      class="Edit-Btn text-red-darken-2"
      @click="edit"
      v-if="displayEdit && props.category[0] !== 'Total'"
    />
    <font-awesome-icon
      icon="fa-solid fa-floppy-disk"
      class="Edit-Btn"
      @click="changeGoal"
      v-if="displayEdit && props.category[0] !== 'Total'"
    />
  </div>
  <p v-if="!displayEdit">{{ FormatDate(category[1]) }}</p>
  <v-text-field
    v-else
    type="time"
    id="time"
    name="time"
    v-model="time"
    :rules="timeValidation"
    label="Spent time"
    @keydown.enter="changeGoal"
  >
  </v-text-field>
</template>

<script setup lang="ts">
import { FormatDate, FormatDateToHHmm } from '@/helper/FormatTime'
import { ref } from 'vue'

import { timeValidation } from '@/assets/rules/timeValidationRules'

import {calculateMinutesFromString} from "@/helper/CalculateTime";
import {updateGoalTimes} from "@/helper/FirestoreInteraction";
import {useEntryStore} from "@/stores/entry";

const store = useEntryStore()

const props = defineProps(['category'])
const displayEdit = ref(false)
const time = ref(FormatDateToHHmm(props.category[1]))

const edit = () => {
  displayEdit.value = !displayEdit.value
}
const changeGoal = async () => {
  if(props.category[0] === 'Total') return

  displayEdit.value = false
  const timeToPost = calculateMinutesFromString(time.value)
  await updateGoalTimes(timeToPost, props.category[0])
  await store.reloadCategories()
}
</script>

<style scoped>
@import '@/assets/styles/ConfigTab.css';
</style>