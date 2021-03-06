'use strict';

adsApp.factory(
    'notification',
    function () {
        return {
            showInfo: function (msg) {
                noty({
                        text: msg,
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 3000
                    }
                );
            },
            showError: function (msg, serverError) {
                // Collect errors to display from the server response
                var errors = [];
                if (serverError && serverError.data.error_description) {
                    errors.push(serverError.data.error_description);
                }

                if (serverError && serverError.data.modelState) {
                    var modelStateErrors = serverError.data.modelState;
                    for (var propertyName in modelStateErrors) {
                        var errorMessages = modelStateErrors[propertyName];
                        var trimmedName =
                            propertyName.substr(propertyName.indexOf('.') + 1);
                        for (var i = 0; i < errorMessages.length; i++) {
                            var currentError = errorMessages[i];
                            errors.push(trimmedName + ' - ' + currentError);
                        }
                    }
                }

                if (errors.length > 0) {
                    msg = msg + ":<br>" + errors.join("<br>");
                }

                noty({
                        text: msg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000
                    }
                );
            }
        }
    }
);
