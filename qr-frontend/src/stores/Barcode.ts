import { ref } from 'vue'
import { defineStore } from 'pinia'
import type Barcode from '@/types/Barcode'

const apiUrl = import.meta.env.VITE_API_URL

export const useBarcodeStore = defineStore('barcode', () => {
  const initState: Barcode[] = []
  const barcodes = ref(initState)

  const addBarcode = (barcode: Barcode) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...barcode })
    }

    fetch(`${apiUrl}/barcode`, requestOptions).then(() => getAllBarcodes())
  }

  const removeBarcode = (barcode: Barcode) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`${apiUrl}/barcode/${barcode.id}`, requestOptions).then(() => getAllBarcodes())
  }

  const getAllBarcodes = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`${apiUrl}/barcode`, requestOptions)
      .then((response) => response.json())
      .then((res: Barcode[]) => {
        barcodes.value = res
      })
  }

  const getBarcodes = () => barcodes.value
  const getTotal = () => barcodes.value.length

  return { getBarcodes, addBarcode, removeBarcode, getAllBarcodes, getTotal }
})
