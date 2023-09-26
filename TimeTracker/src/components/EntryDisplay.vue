<template>
  <v-card-item v-if="categories">
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
    <div class="Select-Wrapper">
      <v-select
        :items="filterableMetrics"
        v-model="metricToFilter"
        label="Filter by:"
        class="Sort-Select"
      >
      </v-select>
      <v-date-picker v-if="metricToFilter === 'date'" label="Filter:" max="22.09.2023" v-model="userEnteredDate">
      </v-date-picker>
      <v-select
        v-else
        :items="filterSelectionOptions"
        v-model="filterOption"
        label="Filter:"
        class="Sort-Select"
      >
      </v-select>
      <v-btn type="submit" class="Sort-Submit-Btn" @click="filterByMetric">Submit</v-btn>
      <v-btn class="Sort-Submit-Btn" @click="clearFilter" v-if="filterSelected">Clear Filter</v-btn>
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
      <tbody v-if="entriesToDisplay && entriesToDisplay.length !== 0">
        <tr v-for="entry in entriesToDisplay" :key="entry.data().date">
          <td>{{ entry.data().category }}</td>
          <td>{{ FormatDateToHHmm(entry.data().time) }}</td>
          <td>{{ entry.data().cause }}</td>
          <td>{{ dateConvert(entry.data()) }}</td>
          <td>
            <font-awesome-icon
              icon="fa-solid fa-trash"
              class="Delete-Entry"
              @click="handleDelete(entry)"
            />
          </td>
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
import { sortEntriesByMetric } from '@/helper/SortFirestoreEntries'
import { computed, onMounted, ref, watch } from 'vue'
import type { sortable } from '@/types/Entry'
import { FormatDateToHHmm } from '@/helper/FormatTime'
import { deleteDocFromFirestore } from '@/helper/FirestoreInteraction'
import { filterable } from '@/types/Entry'
import { VDatePicker } from 'vuetify/labs/VDatePicker'

const store = useEntryStore()
const { entries, categories } = storeToRefs(store)

const tableHeadlines = ref(['category', 'time', 'cause', 'date'])
const metricToSortBy = ref<sortable>('date' as sortable.date)
const directionToSortBy = ref('Descending')

const filterableMetrics = ref(['category', 'date'])
const metricToFilter = ref<filterable>('category' as filterable.category)
const filterOption = ref()
const filterSelected = ref(false)

const userEnteredDate = ref()

const entriesToDisplay = ref<QueryDocumentSnapshot[] | undefined>()

watch(entries, () => {
  if (!filterSelected.value) {
    if (entries.value) {
      entriesToDisplay.value = [...entries.value]
    }else{
      entriesToDisplay.value = undefined
    }
  } else {
    filterByMetric()
  }
})

function waitForValue() {
  return new Promise((resolve) => {
    if (entries.value) {
      return resolve(entries.value)
    }
  })
}
const clearFilter = () => {
  filterSelected.value = false
  if (entries.value) {
    entriesToDisplay.value = [...entries.value]
  }else{
    entriesToDisplay.value = undefined
  }
}

const filterByMetric = () => {
  filterSelected.value = true
  const formattedUserDate = new Date(userEnteredDate.value)

  entriesToDisplay.value = entries.value?.filter((e) => {
    const elem = e.data()[metricToFilter.value]
    if (metricToFilter.value === 'category' && elem === filterOption.value) {
      return elem
    }else if(metricToFilter.value === 'date'){

      let entryDate = new Date(1970, 0, 1);
      entryDate.setSeconds(elem.seconds);

      if (entryDate.getFullYear() === formattedUserDate.getFullYear() &&
          entryDate.getMonth() === formattedUserDate.getMonth() &&
          entryDate.getDay() === formattedUserDate.getDay()){
        return elem
      }
    }
  })
}

const setFilterOption = () => {
  if (metricToFilter.value === 'category') filterOption.value = categories.value[0]
  if (metricToFilter.value === 'date') filterOption.value = undefined
}

const filterSelectionOptions = computed(() => {
  if (metricToFilter.value === 'category') {
    setFilterOption()
    return categories.value
  } else if (metricToFilter.value === 'date') {
    setFilterOption()
    return []
  }
  return 'TBA'
})
const dateConvert = (s: any) => {
  return dayjs(s.date.toDate()).format('DD/MM/YY')
}

const reOrderByMetric = () => {
  entries.value = entries.value?.sort((a, b) => {
    return sortEntriesByMetric(a, b, metricToSortBy.value, directionToSortBy.value === 'Ascending')
  })
}

const handleDelete = async (entry: QueryDocumentSnapshot) => {
  await deleteDocFromFirestore('Entries', entry.id)
  await store.reloadEntries()
}

onMounted(async () => {
  entriesToDisplay.value = (await waitForValue()) as QueryDocumentSnapshot[]
})
</script>

<style scoped>
@import '@/assets/styles/EntryDisplay.css';
</style>