<template>
  <AppLayOut>
    <div class="tax-history">
      <h2 class="header-title">Pending Tax Requests</h2>
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="filteredTaxes"
        :items-per-page="itemsPerPage"
        class="elevation-1 data-table"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip v-model="show" location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" class="icon-button">
                <v-icon @click="editTaxItem(item)">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Tax Request</span>
          </v-tooltip>
          <v-tooltip v-model="show" location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" class="icon-button">
                <v-icon @click="approveTaxItem(item)">mdi-check</v-icon>
              </v-btn>
            </template>
            <span>Approve Tax Request</span>
          </v-tooltip>
        </template>

        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </div>

    <v-dialog v-model="showUpdateTaxModal" max-width="500px">
      <v-card>
        <v-card-title>Edit Tax</v-card-title>
        <v-card-text>
          <v-text-field v-model="editTax.income" label="Income"></v-text-field>
          <v-select
            :items="levels"
            label="Level"
            v-model="editTax.level"
            outlined
            dense
            class="level"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="updateTaxItem" color="primary">Save</v-btn>
          <v-btn @click="closeUpdateModal" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </AppLayOut>
</template>

<style scoped>
.tax-history {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 1.5rem;
  padding-left: 1rem;

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
  .icon-button {
    cursor: pointer;
    margin: 0 0.5rem;
  }

  .data-table {
    font-size: 1.2rem;
  }
}
</style>

<script setup>
import { ref, computed } from 'vue'
import LocalStorageManager from '../../storage/LocalStorageManager'
import TaxManager from '../../storage/TaxManager'
import formatDate from '../../utils/DateFormatter'
import AppLayOut from '../../components/AppLayOut.vue'

const show = ref(false)
const page = ref(1)
const itemsPerPage = ref(5)

const headers = [
  { key: 'userName', width: '200px', title: 'User' },
  { key: 'income', width: '200px', title: 'Income' },
  { key: 'payedAmount', width: '200px', title: 'Payed Amount' },
  { key: 'level', width: '200px', title: 'level' },
  { key: 'status', width: '200px', title: 'Status' },
  { key: 'requestedDate', width: '200px', title: 'Requested Date' },
  { key: 'actions', width: '200px', align: 'start', title: 'Actions', sortable: false }
]

const taxes = ref(LocalStorageManager.getValueFromLocalStorage('taxList') || [])

const filteredTaxes = computed(() => {
  return taxes.value.filter((tax) => {
    return tax.isPaid === false
  })
})

const pageCount = computed(() => Math.ceil(filteredTaxes.value.length / itemsPerPage.value))

const showUpdateTaxModal = ref(false)
const levels = ['Level 1', 'Level 2', 'Level 3']

const editTax = ref({
  id: null,
  income: null,
  level: null
})

const openEditModal = () => {
  showUpdateTaxModal.value = true
}

const closeUpdateModal = () => {
  showUpdateTaxModal.value = false
}

// Method to edit a tax item
const editTaxItem = (updateTax) => {
  // find the tax using it's id
  const taxToEdit = taxes.value.find((tax) => tax.id === updateTax.key)

  // Populate the editTax object with the tax data
  editTax.value.income = taxToEdit.income
  editTax.value.level = taxToEdit.level
  editTax.value.id = taxToEdit.id

  // Open the edit tax modal
  openEditModal()
}

const updateTaxItem = () => {
  const taxToUpdate = taxes.value.find((tax) => tax.id === editTax.value.id)

  taxToUpdate.income = editTax.value.income
  taxToUpdate.level = editTax.value.level

  // Update local storage
  LocalStorageManager.setValueInLocalStorage('taxList', taxes.value)

  // Close the edit tax modal
  closeUpdateModal()
}

const taxManager = new TaxManager()
// Method to approve a tax item
const approveTaxItem = (item) => {
  const taxToApprove = taxes.value.find((tax) => tax.id === item.key)

  taxToApprove.status = 'Paid'
  taxToApprove.approvedDate = formatDate(new Date())
  taxToApprove.isPaid = true
  taxToApprove.payedAmount = taxManager.calculateTax(taxToApprove.level, taxToApprove.income)

  // Update local storage
  LocalStorageManager.setValueInLocalStorage('taxList', taxes.value)
}
</script>
