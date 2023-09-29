<template>
  <AppLayOut>
    <div class="title-header">
      <h2 class="title">Tax History</h2>
      <v-btn class="button" @click="openModal">
        <v-icon> mdi-plus </v-icon>
        <span class="btn-text">Tax Request</span>
      </v-btn>
    </div>
    <v-dialog v-model="showAddTaxModal" max-width="500px">
      <v-card>
        <v-card-title>Add Tax</v-card-title>
        <v-card-text>
          <v-text-field v-model="newTax.income" label="Income"></v-text-field>
          <v-select
            :items="levels"
            label="Level"
            v-model="newTax.level"
            outlined
            dense
            class="level"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="addTaxItem" color="primary">Save</v-btn>
          <v-btn @click="closeModal" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

    <div class="tax-history">
      <v-select :items="filters" v-model="filter" outlined dense class="filter"></v-select>
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
                <v-icon class="icon-button" @click="editTaxItem(item)">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Tax Request</span>
          </v-tooltip>
          <v-tooltip v-model="show" location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" class="icon-button">
                <v-icon class="icon-button" @click="deleteTaxItem(item)">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Tax Request</span>
          </v-tooltip>
        </template>

        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </div>
  </AppLayOut>
</template>

<style scoped>
.title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 1.5rem;

  @media (min-width: 768px) {
    margin: 2.5rem;
  }
  @media (min-width: 1024px) {
    margin: 4rem;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      font-weight: 600;
    }
  }
  .button {
    .btn-text {
      font-size: 1rem;
    }
  }
}

.tax-history {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 1.5rem;
  padding-left: 1rem;

  @media (min-width: 768px) {
    margin: 3rem;
  }

  .filter {
    width: 10rem;
    margin-bottom: 1rem;
    align-self: flex-end;
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
import AppLayOut from '../../components/AppLayOut.vue'
import LocalStorageManager from '../../storage/LocalStorageManager'
import AuthenticationManager from '../../storage/AuthenticationManager'
import formatDate from '../../utils/DateFormatter'

const filters = ['All', 'Paid', 'Unpaid']
const filter = ref('All')
const user = AuthenticationManager.getLoggedInUser()

const show = ref(false)
const page = ref(1)
const itemsPerPage = ref(5)

const headers = [
  { key: 'income', width: '200px', title: 'Income' },
  { key: 'payedAmount', width: '200px', title: 'Payed Amount' },
  { key: 'level', width: '200px', title: 'level' },
  { key: 'status', width: '200px', title: 'Status' },
  { key: 'requestedDate', width: '200px', title: 'Requested Date' },
  { key: 'approvedDate', width: '200px', title: 'Approved Date' },
  { key: 'actions', title: 'Actions', width: '200px', align: 'start', sortable: false }
]

const taxes = ref(LocalStorageManager.getValueFromLocalStorage('taxList') || [])

const filteredTaxes = computed(() => {
  if (filter.value === 'All') {
    return taxes.value.filter((tax) => {
      return tax.userName === user.userName
    })
  }

  return taxes.value.filter((tax) => {
    return tax.userName === user.userName && tax.status === filter.value
  })
})

const pageCount = computed(() => Math.ceil(filteredTaxes.value.length / itemsPerPage.value))

// create a new tax and store it to local storage
const newTax = ref({
  income: null,
  level: null
})

// State to control the add tax modal
const showAddTaxModal = ref(false)
const error = ref('')
const levels = ['Level 1', 'Level 2', 'Level 3']

const openModal = () => {
  showAddTaxModal.value = true
}
const closeModal = () => {
  showAddTaxModal.value = false
}

// Method to clear the new tax item form
const clearNewTaxForm = () => {
  newTax.value.income = null
  newTax.value.level = null
}

// Method to add a new tax item to the list
const addTaxItem = () => {
  error.value = ''
  if (!newTax.value.income || !newTax.value.level) {
    error.value = 'Fill the form properly'
    return
  }

  const today = new Date()
  const newTaxItem = {
    id: Date.now(),
    userName: user.userName,
    income: newTax.value.income,
    level: newTax.value.level,
    payedAmount: 0,
    status: 'Unpaid',
    requestedDate: formatDate(today),
    approvedDate: null,
    isPaid: false
  }

  // Add the new tax item to the list
  taxes.value.push(newTaxItem)

  LocalStorageManager.setValueInLocalStorage('taxList', taxes.value)

  // Clear the new tax item form
  clearNewTaxForm()

  // Close the add tax modal
  showAddTaxModal.value = false
}

const showUpdateTaxModal = ref(false)
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

// Method to delete a tax item
const deleteTaxItem = (deleteTax) => {
  // find the tax using it's id
  const taxesAfterDelete = taxes.value.filter((tax) => tax.id !== deleteTax.key)
  // update taxes
  taxes.value = taxesAfterDelete
  // Update local storage as well
  LocalStorageManager.setValueInLocalStorage('taxList', taxesAfterDelete)
}
</script>
