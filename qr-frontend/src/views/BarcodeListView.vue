<script setup lang="ts">
import { ref } from 'vue'
import { useBarcodeStore } from '@/stores/Barcode'
import type Barcode from '@/types/Barcode'
import BarcodeList from '@/components/BarcodeList.vue'
import BarcodeScanModal from '@/components/BarcodeScanModal.vue'

const open = ref(false)
const barcodeStore = useBarcodeStore()

const addBarcode = (barcode: Barcode) => {
  barcodeStore.addBarcode(barcode as Barcode)
  open.value = false
}

const toggleAddModal = () => {
  open.value = !open.value
}

const removeBarcode = (barcode: Barcode) => {
  barcodeStore.removeBarcode(barcode)
}

barcodeStore.getAllBarcodes()
</script>

<template>
  <main>
    <div class="w-full">
      <div class="w-full flex justify-between items-center px-20 py-10">
        <div>Scanned barcodes</div>
        <div>
          <button
            @click="toggleAddModal"
            id="add-barcode-btn"
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
          >
            Add barcode
          </button>
        </div>
      </div>
      <BarcodeList
        :barcodes="barcodeStore.getBarcodes()"
        :total="barcodeStore.getTotal()"
        :remove-barcode="removeBarcode"
      />
    </div>
  </main>
  <BarcodeScanModal :is-open="open" :save-barcode="addBarcode" :toggle-add-modal="toggleAddModal" />
</template>
