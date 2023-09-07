<template>
  <v-card>
    <v-card-item>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Category
            </th>
            <th class="text-left">
              Time
            </th>
            <th class="text-left">
              Cause
            </th>
            <th class="text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody v-if="entries">
          <tr
              v-for="entry in entries"
              :key="entry.data().date"
          >
            <td>{{ entry.data().category }}</td>
            <td>{{ entry.data().time }}</td>
            <td>{{ entry.data().cause }}</td>
            <td>{{dateConvert(entry.data()) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">

import {defineStore, storeToRefs} from "pinia";
import {useEntryStore} from "@/stores/entry";
import localizedDate from 'dayjs/plugin/localizedFormat'
import dayjs from "dayjs";
import type {QueryDocumentSnapshot} from "@firebase/firestore";

const store = useEntryStore()
const {entries} = storeToRefs(store)

const dateConvert = (s:any) => {
  return dayjs(s.date.toDate()).format('DD/MM/YY')
}

</script>

<style scoped>

</style>