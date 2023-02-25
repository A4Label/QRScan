import BarcodeList from '../BarcodeList.vue'

describe('<BarcodeList />', () => {
  const emptyMessageValue = 'No barcodes yet'
  const confirmRemoveButtonSelector = '#confirm-remove-btn'

  it('renders message when there is no barcodes', () => {
    const props = {
      total: 0,
      barcodes: []
    }

    cy.mount(BarcodeList, { props })
    cy.contains(emptyMessageValue).should('exist')
  })

  it('renders barcodes', () => {
    const obj = {
      removeBarcode() {}
    }

    cy.spy(obj, 'removeBarcode').as('removeBarcode')

    const props = {
      total: 1,
      barcodes: [{ id: 1, content: 'test' }],
      removeBarcode: obj.removeBarcode
    }

    cy.mount(BarcodeList, { props })
    cy.contains(emptyMessageValue).should('not.exist')
    cy.contains(props.barcodes[0].content).should('exist')
    cy.get('button').contains('Delete').click()
    cy.get(confirmRemoveButtonSelector).click()
    cy.get('@removeBarcode').should('have.been.calledOnce')
  })
})
