<script setup lang="ts">
import { ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { QrCodeIcon } from '@heroicons/vue/24/outline'
import type Barcode from '@/types/Barcode'

const props = defineProps<{
  isOpen: boolean
  saveBarcode: (barcode: Barcode) => void
  toggleAddModal: () => void
}>()

const initBarcode: Barcode = { content: '' }
const barcode = ref(initBarcode)
const onDecode = (result: string) => {
  barcode.value.content = result
  props.saveBarcode(barcode.value)
  barcode.value = initBarcode
}
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="toggleAddModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          id="add-barcode-modal-content"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-between">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <QrCodeIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
                      >Add Barcode</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Scan your barcode with the scanner</p>
                      <StreamBarcodeReader v-if="isOpen" @decode="onDecode" @loaded="onLoaded" />
                    </div>
                  </div>
                </div>
                <span class="close cursor-pointer" @click="toggleAddModal()">&times;</span>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
