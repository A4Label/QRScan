// https://docs.cypress.io/api/introduction/api.html

describe('E2E Barcode test', () => {
  const barcodeValue = '123456789012'
  const barcodeModalSelector = '#add-barcode-modal-content'
  const barcodeModalBtnOpenSelector = '#add-barcode-btn'
  const barcodeModalBtnCloseSelector = '.close'
  const barcodeListItemeSelector = 'li.barcode'
  const confirmRemoveButtonSelector = '#confirm-remove-btn'
  const NavText = 'Barcode Scanner App'
  const ModalInfoText = 'Scan your barcode with the scanner'

  it('Open and closes barcode add Modal', () => {
    cy.visit('/')
    cy.contains('h1', NavText)
    cy.get(barcodeModalBtnOpenSelector).click()
    cy.get(barcodeModalSelector).should('exist')
    cy.get(barcodeModalSelector).should('contain', ModalInfoText)
    cy.get(barcodeModalBtnCloseSelector).click()
    cy.get(barcodeModalSelector).should('not.exist')
  })

  it('Scans barcode and show it in the list', () => {
    cy.visit('/')
    cy.contains('h1', NavText)
    cy.get(barcodeModalBtnOpenSelector).click()
    cy.get(barcodeModalSelector).should('exist')
    cy.get(barcodeModalSelector).should('contain', ModalInfoText)
    cy.get(barcodeModalSelector).should('not.exist')
    cy.get(barcodeListItemeSelector)
      .contains(barcodeValue)
      .parent()
      .find('button')
      .click({ force: true })

    cy.get(confirmRemoveButtonSelector).click({ force: true })
    cy.contains(barcodeValue).should('not.exist')
  })
})
