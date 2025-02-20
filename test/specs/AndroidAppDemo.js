const AndroidAppHome = require('../pageobjects/android.app.home');
const AndroidAppForm = require('../pageobjects/android.app.form');
const testData = require('../resources/testData.json');
let { expect } = require('chai');


describe('Verify the WDIO Demo App', () => {

    it('Validate the default selection of the tab', async () => {
        await AndroidAppHome.verifyHomeButtonIsEnabled();
        expect(await AndroidAppHome.verifyDefaultSelectedBtn()).to.be.equals(testData.defaultSelectedTab); //verifying the default tab as Home
    })
    it('Validate that form tab is available for selection and is clickable', async () => {
        expect(await AndroidAppHome.verifyFormBtn()).to.be.true;
    })
    it('Validate the color change on the selection of the form tab', async () => {

        await AndroidAppHome.compareFormButtonColorAfterClick(testData.compareScreenshotName);// Creates a baseline image, if not available
        await AndroidAppHome.verifyClickFormButton();
        expect(await AndroidAppHome.compareFormButtonColorAfterClick(testData.compareScreenshotName)).to.be.false;// Compares with baseline image after click
    })
    it('Validate the Input behaviour is working as intended', async () => {
        await AndroidAppForm.enterTextInput(testData.InputKeyword);
        expect(await AndroidAppForm.getInputResultValue()).equals(testData.InputKeyword);
        await AndroidAppForm.clearTextInput();
        await AndroidAppForm.hideKeyboard();   // Keyboard is checked and closed for further interactions
    })
    it('Validate that picker element is working and it has 3 options to choose from.', async () => {
        expect(await AndroidAppForm.getValidPickerOptions()).to.be.equals(testData.ValidPickerOptions);
    })
    it('Validate that all options from picker elements are visible within the screen', async () => {
        expect(await AndroidAppForm.verifyPickerElementsWithinScreen()); // Verified using screen resolution and bounds values of every element
        await AndroidAppForm.verifyPickerFunctionality(); // Verified drop down functionality
    })
    it('Validate that Inactive button is not interactable', async () => {
        await AndroidAppForm.clickInactiveButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.false;
    })
    it('Validate the toggle control of the switch', async () => {
        expect(await AndroidAppForm.getSwitchToggleText).contains(await AndroidAppForm.getSwitchToggleStatus);
        await AndroidAppForm.clickSwitchToggle();
        expect(await AndroidAppForm.getSwitchToggleText).contains(await AndroidAppForm.getSwitchToggleStatus);
    })
    it('Validate that android native alerts are functional', async () => {
        //Ok button
        await AndroidAppForm.clickActiveButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.true;
        await AndroidAppForm.clickOkButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.false;
        //Cancel button
        await AndroidAppForm.clickActiveButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.true;
        await AndroidAppForm.clickCancelButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.false;
        //Ask me later button
        await AndroidAppForm.clickActiveButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.true;
        await AndroidAppForm.clickAskMeLaterButton();
        expect(await AndroidAppForm.verifyIsPopup()).to.be.false;
    })
    it('Validate that keyboard is available to provide input in the text field', async () => {
        expect(await AndroidAppForm.openKeyboard()).not.equals(await AndroidAppForm.hideKeyboard());
    })
})