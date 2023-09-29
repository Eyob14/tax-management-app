<template>
  <AppLayOut>
    <div class="tax-history">
      <h2 class="header-title">Tax History</h2>
      <v-select :items="filters" v-model="filter" outlined dense class="filter"></v-select>
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="filteredTaxes"
        :items-per-page="itemsPerPage"
        class="elevation-1 data-table"
      >
        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </div>
  </AppLayOut>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppLayOut from '../../components/AppLayOut.vue'
import LocalStorageManager from '../../storage/LocalStorageManager'

const filters = ['All', 'Level 1', 'Level 2', 'Level 3']
const filter = ref('All')

const page = ref(1)
const itemsPerPage = ref(5)

const headers = [
  { key: 'userName', title: 'User' },
  { key: 'income', title: 'Income' },
  { key: 'payedAmount', title: 'Payed Amount' },
  { key: 'level', title: 'Level' },
  { key: 'status', title: 'Status' },
  { key: 'requestedDate', title: 'Requested Date' },
  { key: 'approvedDate', title: 'Approved Date' }
]

const taxes = ref(LocalStorageManager.getValueFromLocalStorage('taxList') || [])

const filteredTaxes = computed(() => {
  if (filter.value === 'All') {
    return taxes.value.filter((tax) => {
      return tax.isPaid === true
    })
  }

  return taxes.value.filter((tax) => {
    return tax.isPaid === true && tax.level === filter.value
  })
})

const pageCount = computed(() => Math.ceil(filteredTaxes.value.length / itemsPerPage.value))
</script>

<style scoped>
.tax-history {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;

  @media (min-width: 768px) {
    margin: 2rem;
  }
  @media (min-width: 1024px) {
    margin: 4rem;
  }

  .header-title {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      font-weight: 600;
    }
  }
  .filter {
    width: 10rem;
    margin-bottom: 1rem;
    align-self: flex-end;
    @media (min-width: 768px) {
      width: 15rem;
      margin: 2rem;
    }
  }
  .icon-button {
    cursor: pointer;
    margin: 0 0.5rem;
  }
  .data-table {
    font-size: 1.2rem;
  }
}
</style>
