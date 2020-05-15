describe("This is my first test!", () => {
    it("Should return true", () => {
        expect(true).to.equal(true);
    })
})

describe("Testing form inputs", () => {
    beforeEach(function () {
        // beforeEach runs each time before block of code
        cy.visit("http://localhost:3000/")
        // cy.pause();
        // arrange
    })

    it("Name Input", () => {
        cy.get('input[name="name"]').type("Kim Boyd").should("have.value", "Kim Boyd")
        // arrange getting the name element
    })

    it("Email Input", () => {
        cy.get('input[name="email"]').type("kimberlyboyd2@gmail.com").should("have.value", "kimberlyboyd2@gmail.com")
        // .type mimics typing into the input
    })

    it("Password Input", () => {
        cy.get('input[name="password"]').type("password123").should("have.value", "password123");
    })

    it("Dropdown", () => {
        cy.get('select[name="role"]').select('frontend').should("have.value", "frontend");
        // selects from drop down menu
    })

    it("Checkbox", () => {
        cy.get('input[type="checkbox"]').check().should("be.checked");
        // checking if the check box can be checked
    })

    // checks submit
    it("Submit Form", () => {
        cy.get('form').submit();
    })
    
})


// empty input test
describe("If input is blank", () => {
    it("display form validation", () => {
        cy.visit("http://localhost:3000/")
        cy.get('input[name="name"]').type("Kim")
        cy.get('input[name="name"]').clear()
        cy.get('.error')
    })
})