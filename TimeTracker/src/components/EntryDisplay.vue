<template>
  <v-card-item>
    <div class="Select-Wrapper">
      <v-select
        :items="tableHeadlines"
        v-model="metricToSortBy"
        label="Sort by:"
        class="Sort-Select"
      >
      </v-select>
      <v-select
        :items="['Ascending', 'Descending']"
        v-model="directionToSortBy"
        label="Order:"
        class="Sort-Select"
      >
      </v-select>
      <v-btn type="submit" class="Sort-Submit-Btn" @click="reOrderByMetric">Submit</v-btn>
    </div>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">Category</th>
          <th class="text-left">Time</th>
          <th class="text-left">Cause</th>
          <th class="text-left">Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="entries && entries.length !== 0">
        <tr v-for="entry in entries" :key="entry.data().date">
          <td>{{ entry.data().category }}</td>
          <td>{{ FormatDate(entry.data().time) }}</td>
          <td>{{ entry.data().cause }}</td>
          <td>{{ dateConvert(entry.data()) }}</td>
          <td><font-awesome-icon icon="fa-solid fa-trash" class="Delete-Entry" @click="handleDelete(entry)"/></td>
        </tr>
      </tbody>
      <div v-else class="pa-5">There is no data yet</div>
    </v-table>
  </v-card-item>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEntryStore } from '@/stores/entry'
import dayjs from 'dayjs'
import type { QueryDocumentSnapshot } from '@firebase/firestore'
import { deleteDoc, doc } from '@firebase/firestore'
import { sortEntriesByMetric } from '@/helper/SortFirestoreEntries'
import { ref } from 'vue'
import type { sortable } from '@/types/Entry'
import {FormatDate} from "@/helper/FormatTime";
import db from "@/firestore/firestoreInit";

const store = useEntryStore()
const { entries } = storeToRefs(store)

const tableHeadlines = ref(['category', 'time', 'cause', 'date'])
const metricToSortBy = ref<sortable>('date' as sortable.date)
const directionToSortBy = ref('Ascending')

const dateConvert = (s: any) => {
  return dayjs(s.date.toDate()).format('DD/MM/YY')
}

const reOrderByMetric = () => {
  entries.value = entries.value?.sort((a, b) => {
    return sortEntriesByMetric(a, b, metricToSortBy.value, directionToSortBy.value === 'Ascending')
  })
}

const handleDelete = async (entry:QueryDocumentSnapshot) =>{

  await deleteDoc(doc(db, "Entries", entry.id));
  await store.reloadEntries()

}
</script>

<style scoped>
@import '@/assets/styles/EntryDisplay.css';
</style>