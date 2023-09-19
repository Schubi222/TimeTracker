<template>
  <v-card-item>
    <v-card v-if="props.stat">
      <v-card-item
          v-for="category of props.stat"
          :key="category[0]"
          :title="`${props.text} ${category[0]}`"
          class=""
      >
        <p :class="{'text-red':colorRed(category[1])}">{{FormatDate(category[1])}}</p>
      </v-card-item>
    </v-card>
  </v-card-item>
</template>

<script setup lang="ts">
import {FormatDate} from "../helper/FormatTime";
import {computed} from "vue";

const props = defineProps(['stat', 'text'])

const colorRed = (minutes:number) =>{
  if (props.text !== 'Missing') return false
  if (minutes <= 0){return false}
  return true
}

</script>

<style scoped></style>