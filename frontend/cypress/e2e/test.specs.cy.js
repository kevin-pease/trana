const test_string1 = 'test12345';
const test_string2 = 'test67890';

// Helper function for adding a new exercise
function addNewExercise() {
    // Find a specific user profile and click it
    cy.contains('div.card.profile', 'Henk')
        .click();
    // Check if correct profile is selected
    cy.contains('Henk');
    cy.wait(1);
    // Browse to an empty month
    cy.get('[data-cy=arrow-left]')
        .click()
        .click();
    // Check if indeed empty
    cy.contains('No exercises');
    // Find and click the `add new exercise` button
    cy.get('[data-cy=add-ex]')
        .click();
    // Input test string
    cy.get('input')
        .filter('[type="text"]')
        .type(test_string1);
    // Save new exercise
    cy.get('button')
        .contains('Add')
        .click();
    // Find and click the newly created date (containing exercise)
    cy.get('div.main-container')
        .contains('exercise')
        .click();

    // Checks if exercise has succesfully been added
    cy.contains(test_string1);
}

describe('träna', () => {
    it('creates a new exercise', () => {
        addNewExercise();
    });

    it('edits an existing exercise', () => {
        addNewExercise();
        // Find and click `edit` button
        cy.get('[data-cy=ex-edit]')
            .click();
        // Type new name
        cy.get('input')
            .filter('[type="text"]')
            .should('have.value', test_string1)
            .type('{selectall}')
            .type(test_string2);
        // Save new name
        cy.get('button')
            .contains('Save')
            .click();
        // Check if exercise has been changed
        cy.contains(test_string1)
            .should('not.exist');
        cy.contains(test_string2);
    });

    it('deletes an existing exercise', () => {
        addNewExercise();
        // Find and click `delete` button
        cy.get('[data-cy=ex-del]')
            .click();
        // Check if exercise doesn't exist anymore
        cy.contains(test_string1)
            .should('not.exist');
    });

    it('adds a new user', () => {
        cy.contains('Add new user')
            .click()
        // Fill in test name
        cy.get('input')
            .filter('[type="text"]')
            .type(test_string1);
        // Click `add`
        cy.get('button')
            .contains('Add')
            .click();
        // Check if new user has been added
        cy.contains(test_string1);
    });
});