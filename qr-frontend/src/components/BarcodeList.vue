<script setup lang="ts">
import { ref } from 'vue'
import ConfirmRemoveModal from '@/components/ConfirmRemoveModal.vue'
import type Barcode from '@/types/Barcode'

const props = defineProps<{
  total: number
  barcodes: Barcode[]
  removeBarcode: (barcode: Barcode) => void
}>()

const barcode = ref()
const open = ref(false)
const openBarcodeRemoveModal = (b: Barcode) => {
  barcode.value = b
  open.value = true
}

const closeRemoveModal = () => {
  barcode.value = undefined
  open.value = false
}

const confirm = (barcode: Barcode) => {
  props.removeBarcode(barcode)
  closeRemoveModal()
}
</script>

<template>
  <div class="px-20 py-10">
    <div class="w-full text-center" v-if="total === 0">
      <p>No barcodes yet</p>
    </div>
    <div class="w-full text-center" v-if="total !== 0">
      <p class="mb-5">There are {{ total }} barcodes</p>
      <div class="rounded-xl border-2 overflow-hidden">
        <ul class="list-style-none" id="barcodes">
          <li v-for="(barcode, index) in barcodes" class="w-full border barcode" v-bind:key="index">
            <div class="w-full flex justify-between px-5 py-2">
              <div class="flex items-center">
                {{ barcode.content }}
              </div>
              <div class="action">
                <button
                  @click="openBarcodeRemoveModal(barcode)"
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
            <hr v-if="index < total - 1" class="w-full h-1 border-2 border-b-gray-500" />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <ConfirmRemoveModal
    v-if="barcode"
    :remove-barcode="confirm"
    :is-open="open"
    :close-remove-modal="closeRemoveModal"
    :barcode="barcode"
  />
</template>

<style scoped></style>
