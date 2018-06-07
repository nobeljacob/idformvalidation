var value;
function adddata() {
    console.log('submit button clicked');
    // Check if user has entered all required data
    // If not show error message
    // Else post it
    if (validateFirstName()) {
        if (validateFullName()) {
            if (validateDOB()) {
                if (validatebutton()) {
                    postData();
                }
                else {
                    displayErrorMessageForButton();
                }
            }
            else {
                // Display error message for DOB
                displayErrorMessageForDOB();
            }
        }
        else {
            // Display error message for full Name
            displayErrorMessageForFullName();
        }
    } else {
        // Display error message for first Name
        displayErrorMessageForFirstName();
    }

}

function displayErrorMessageForFirstName() {
    $('#errForFirstName').show();
}

function displayErrorMessageForFullName() {
    $('#errForFullName').show();
}
function displayErrorMessageForDOB() {
    $('#errForDOB').show();
}
function displayErrorMessageForButton() {
    $('#errForButton').show();
}
function validateFirstName() {
    const firstName = $('#firstname').val();
    console.log(firstname);
    if (firstName === '') {
        return false;
    }
    return true;
}

function validateFullName() {
    const fullName = $('#fullname').val();
    if (fullName === '') {
        return false;
    }
    return true;
}

function validateDOB() {
    const DOB = $('#DOB').val();
    var datetext = document.getElementById('DOB').value;
    var selectedDate = new Date(datetext);
    var now = new Date();
    if (selectedDate > now) {
        return false;
    }
    return true;
}
function validatebutton() {
    if ($('input[name=choice]:checked').length > 0) {

        var radios = document.getElementsByName("choice");
        
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type === 'radio' && radios[i].checked) {
                // get value, set checked flag or do whatever you need to
                value = radios[i].value;
            }
        }

        return true;
    } 
    else 
    {
        return false;
    }
}

    function postData() {
        const data = {
            firstName: $('#firstname').val(),
            fullName: $('#fullname').val(),
            DOB: $('#DOB').val(),
            vals:value

        };
        $.ajax({
            type: "POST",
            url: 'https://idformvalidation.firebaseio.com/.json',
            data: JSON.stringify(data),
            success: onPostSuccess,
            // dataType: dataType
        });
    }

    const onPostSuccess = (data) => {
        console.log('Posting to firebase success');
        console.log(data);
    }

    $('document').ready(() => {
        // Initialize
        $('.span-for-errors').hide();
    });