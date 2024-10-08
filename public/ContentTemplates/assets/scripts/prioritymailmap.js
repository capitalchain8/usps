var USPS = {};

USPS.PMmap = (function() {
    
    var 
        elements = {};
    
    var init = function init() {

        elements.form = dojo.byId('mapform');
                
        dojo.connect(
            elements.form,
            'onsubmit',
            validateForm
        );
    };

    var validateForm = function validateForm(e) {
        if (typeof(event) === 'undefined') {
            e.preventDefault();
        } else{
            (event.preventDefault) ? e.preventDefault() : event.returnValue = false;
        }
        
        elements.origin = dojo.byId('originationzip');

        var numbersOnly      = /^[\d]*$/,
            originValue      = elements.origin.value,
            errors           = dojo.query('#errors ul')[0],
            inputSectionWrap = dojo.query('.delivery-map')[0],
            errorList        = [];
        
        dojo.removeClass(inputSectionWrap, 'error');
        dojo.empty(errors);

        /*validate origin*/
        if( originValue === '' || !numbersOnly.test(originValue) || (originValue.length < 3) ) {
            var originError = '<li>Please enter a valid origin ZIP Code&trade;</li>';
            errorList.push(originError);
        }

        /*add all errors*/
        if( errorList.length > 0 ) {            
            dojo.addClass( inputSectionWrap, 'error' );
            dojo.query('#errors h2')[0].focus();
            
            for( var i = 0, l = errorList.length; i < l; i++ ) {
                dojo.place(errorList[i], errors, 'last');
            }
        } else {
            /*ESRI MAP CALL*/
            displaymap(dojo.byId('originationzip').value);
            /*blur to hide the iPad keyboard on submit*/
            dojo.byId('originationzip').blur();

            dojo.byId("originationzip").scrollIntoView();
        }
        
    };
    
    return {
        start : init
    }
})();

dojo.addOnLoad(function() {
    USPS.PMmap.start();
});