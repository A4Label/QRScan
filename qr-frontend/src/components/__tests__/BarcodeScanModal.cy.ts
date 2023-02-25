import BarcodeScanModal from '@/components/BarcodeScanModal.vue'

describe('<Topbar />', () => {
  const barcodeModalBtnCloseSelector = '.close'
  const scannerSelector = '.laser'
  const ModalSelector = '#add-barcode-modal-content'

  it('should be visible when it receives isOpen true', () => {
    const props = {
      isOpen: true
    }

    cy.mount(BarcodeScanModal, { props })
    cy.get(ModalSelector).should('contain', 'Scan your barcode with the scanner')
    cy.get(scannerSelector).should('exist')
    cy.get(scannerSelector).should('be.visible')
  })

  it('should not be visible when it receives isOpen true', () => {
    const props = {
      isOpen: false
    }

    cy.mount(BarcodeScanModal, { props })
    cy.get('#add-barcode-modal-content').should('not.exist')
  })

  it('should call toggleModal if close button is clicked', () => {
    const obj = {
      toggleAddModal() {}
    }

    cy.spy(obj, 'toggleAddModal').as('toggleAddModal')

    const props = {
      isOpen: true,
      toggleAddModal: obj.toggleAddModal
    }

    cy.mount(BarcodeScanModal, { props })
    cy.get(ModalSelector).should('exist')
    cy.get(ModalSelector).should('be.visible')
    cy.get(barcodeModalBtnCloseSelector).click({ force: true })
    cy.get('@toggleAddModal').should('have.been.calledOnce')
  })
})
