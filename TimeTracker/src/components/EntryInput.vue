<template>
    <v-card-item class="mx-auto Entry-Input-Card elevation-4" variant="tonal">
      <v-form @submit.prevent="validateForm" ref="form">
        <v-text-field
            type="time"
            id="time"
            name="time"
            v-model="time"
            :rules="timeValidation"
            label="Spent time">
        </v-text-field>

        <v-text-field
            type="text"
            id="cause"
            name="cause"
            v-model="cause"
            label="Additional Information"
        ></v-text-field>

        <v-select
            id="select"
            name="select"
            label="Select category:"
            v-model="category"
            :items="categories"
            :chips=true
            required
        >
        </v-select>

        <v-btn type="submit" :block="true" class="mt-2 Entry-Input-Submit">Submit</v-btn>
      </v-form>
    </v-card-item>

</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

  import {serverTimestamp} from "firebase/firestore"

  import type {VForm} from "vuetify/components";
  import {useEntryStore} from "@/stores/entry";
  import {storeToRefs} from "pinia";
  import {calculateMinutesFromString} from "@/helper/CalculateTime";
  import {timeValidation} from "@/assets/rules/timeValidationRules";
  import {addDocToFirestore} from "@/helper/FirestoreInteraction";

  const store = useEntryStore()
  const {categories} = storeToRefs(store)

  const time = ref('00:00')
  const cause = ref('')
  const category = ref()

  const form = ref<undefined|VForm>()

  watch(categories, () =>{
    category.value = categories.value[0]
  })

  const validateForm = async () =>{

    const valid = await form.value?.validate()
    if (categories.value.length === 0){return}

    if(valid?.valid){
      const newEntry = {
        time:calculateMinutesFromString(time.value),
        category:category.value,
        cause:cause.value,
        date:serverTimestamp(),
        userid:1,
      }
      await addDocToFirestore(newEntry)
      time.value = '00:00'
      cause.value = ''
      category.value = categories.value[0]
      await store.reloadEntries()

    }
  }
  onMounted(async () => {
    await store.loadCategories()
    category.value = categories.value[0]

  })

</script>

<style scoped>
.Entry-Input-Card{
  margin:10px 0;
  max-width: 300px;
  width: 100%;
}
.Entry-Input-Submit{
  border: 1px solid #dedede !important;
  padding: 5px;
}
</style>