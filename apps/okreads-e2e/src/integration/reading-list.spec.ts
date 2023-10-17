describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add an item to the list and then undo', () => {
    cy.searchBooks('javascript');

    // required to cover the edge case scenario when reading list is empty
    cy.addToReadingList();
    // initial count of reading list item
    cy.readingListItem().then(initialItemCount => {
      cy.addToReadingList();

      cy.undoAction();

      // final count of reading list
      cy.readingListItem().then(finalItemCount => {
        expect(initialItemCount).to.equal(finalItemCount);
      });
    });
  });


  it('Then:  I should be able to remove an item from the list and then undo', () => {
    cy.searchBooks('javascript');

    cy.addToReadingList();

    // open reading list
    cy.get('[data-testing="toggle-reading-list"]').click();

    // initial count of reading list item
    cy.readingListItem().then(initialItemCount => {

      cy.removeFromReadingList();

      cy.undoAction();

      // final count of reading list item
      cy.readingListItem().then(finalItemCount => {
        expect(initialItemCount).to.equal(finalItemCount);
      });
    });
  });
});