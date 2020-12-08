document.addEventListener('DOMContentLoaded', function(e) {
    const form = document.getElementById('demoForm');
        
    const step1 = form.querySelector('.js-step[data-step="1"]');
    const step2 = form.querySelector('.js-step[data-step="2"]');
    
    const prevButton = form.querySelector('[id="prevButton"]');
    const nextButton = form.querySelector('[id="nextButton"]');

    let currentStep = 1;

    const fv1 = FormValidation
        .formValidation(
            step1,
            {
                fields: {
                    quantity: {
                        validators: {
                            notEmpty: {
                                message: 'The quantity is required'
                            },
                            greaterThan: {
                                min: 1,
                                message: 'The quantity must be greater than 0'
                            },
                            integer: {
                                message: 'The quantity must be a number'
                            }
                        }
                    },
                    'size[]': {
                        validators: {
                            notEmpty: {
                                message: 'The size is required'
                            }
                        }
                    },
                    'color[]': {
                        validators: {
                            notEmpty: {
                                message: 'The color is required'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    tachyons: new FormValidation.plugins.Tachyons(),
                    icon: new FormValidation.plugins.Icon({
                        valid: 'fa fa-check',
                        invalid: 'fa fa-times',
                        validating: 'fa fa-refresh',
                    }),
                },
            }
        )
        .on('core.form.valid', function() {
            // Jump to the next step when all fields in the current step are valid
            currentStep++;

            nextButton.innerHTML = 'Purchase';

            // Hide the first step
            FormValidation.utils.classSet(step1, {
                'js-step-active': false,
            });
            // Show the next step
            FormValidation.utils.classSet(step2, {
                'js-step-active': true,
            });
        });

    const fv2 = FormValidation
        .formValidation(
            step2,
            {
                fields: {
                    firstName: {
                        validators: {
                            notEmpty: {
                                message: 'The first name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-Zs]+$/,
                                message: 'The first name can only consist of alphabetical and space'
                            }
                        }
                    },
                    lastName: {
                        validators: {
                            notEmpty: {
                                message: 'The last name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-Zs]+$/,
                                message: 'The last name can only consist of alphabetical and space'
                            }
                        }
                    },
                    cellPhone: {
                        validators: {
                            notEmpty: {
                                message: 'The phone number is required'
                            },
                            phone: {
                                country: 'US',
                                message: 'The value is not valid US phone number'
                            }
                        }
                    },
                    street: {
                        validators: {
                            notEmpty: {
                                message: 'The street is required'
                            }
                        }
                    },
                    city: {
                        validators: {
                            notEmpty: {
                                message: 'The city is required'
                            }
                        }
                    },
                    zipCode: {
                        validators: {
                            notEmpty: {
                                message: 'The zip code is required'
                            },
                            zipCode: {
                                country: 'US',
                                message: 'The value is not valid US zip code'
                            },
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    tachyons: new FormValidation.plugins.Tachyons(),
                    icon: new FormValidation.plugins.Icon({
                        valid: 'fa fa-check',
                        invalid: 'fa fa-times',
                        validating: 'fa fa-refresh',
                    }),
                },
            }
        )
        .on('core.form.valid', function() {
            // You can submit the form
            // form.submit()
            // or send the form data to server via an Ajax request

            // To make the demo simple, I just update the label of button
            nextButton.innerHTML = 'Done';
        });

    nextButton.addEventListener('click', function() {
        // When click the Next button, we will validate the current step
        switch (currentStep) {
            case 1:
                fv1.validate();
                break;
            
            case 2:
                fv2.validate();
                break;
            
            default:
                break;
        }
    });

    prevButton.addEventListener('click', function() {
        switch (currentStep) {
            case 2:
                currentStep--;
                nextButton.innerHTML = 'Next';
                // Hide the second step
                FormValidation.utils.classSet(step2, {
                    'js-step-active': false,
                });
                // Show the first step
                FormValidation.utils.classSet(step1, {
                    'js-step-active': true,
                });
                break;

            case 1:
            default:
                break;
        }
    });
});