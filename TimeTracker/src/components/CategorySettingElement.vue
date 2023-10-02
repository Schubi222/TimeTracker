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
        <font-awesome-icon
            icon="fa-solid fa-circle-plus"
            v-if="!showCategoryInput"
            class="Add-Category"
            @click="showCategoryInput = true"
        />
        <div v-else class="Category-Input-Wrapper">
          <v-text-field
              type="text"
              id="category"
              name="category"
              v-model="categoryName"
              label="Category Name"
              @keydown.enter="addCategory"
          ></v-text-field>
          <font-awesome-icon
              icon="fa-solid fa-floppy-disk"
              class="Save-Btn"
              @click="addCategory"
          />
        </div>

      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">

  import {useEntryStore} from "@/stores/entry";
  import {storeToRefs} from "pinia";
  import {ref} from "vue";
  import {addCategoryToFirestore, deleteCategoryFromFirestore} from "@/helper/FirestoreInteraction";

  const store = useEntryStore()
  const {categories} = storeToRefs(store)

  const showCategoryInput = ref(false)
  const categoryName = ref('')


  const addCategory = async () =>{
    await addCategoryToFirestore(categoryName.value)
    showCategoryInput.value = false
    categoryName.value = ''
    await store.reloadCategories()
  }
  const handleDelete = async (category:string) => {
    await deleteCategoryFromFirestore(category)
    await store.reloadCategories()
  }

</script>

<style scoped>
@import "@/assets/styles/Reusables.css";
@import "@/assets/styles/CategorySettingElement.css";
</style>