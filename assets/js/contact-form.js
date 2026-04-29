/**
 * Amazing Webtech — Contact Form & Download Logic
 */
$(document).ready(function() {
    // Checkbox text update
    $(document).on('change', '#downloadBrochure', function() {
        if ($(this).is(':checked')) {
            $('#submitBtn').html('<i class="fa-solid fa-download me-2"></i> Send & Download Brochure');
        } else {
            $('#submitBtn').text('Send Message');
        }
    });

    // Form submission
    $('#enhancedContactForm').on('submit', function(e) {
        e.preventDefault();
        
        const isDownload = $('#downloadBrochure').is(':checked');
        const submitBtn = $('#submitBtn');
        
        // Show loading state
        submitBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Processing...');
        
        setTimeout(() => {
            $('#enhancedContactForm').fadeOut(400, function() {
                const responseArea = $('#formResponse');
                responseArea.removeClass('d-none').hide().fadeIn();
                
                if (isDownload) {
                    $('#responseTitle').html('<i class="fa-solid fa-circle-check text-success me-2"></i> Details Received & Download Ready!');
                    $('#responseMsg').html('Thank you <strong>' + $('#contactName').val() + '</strong>! We\'ve received your information. Your company profile and service brochures are now ready.');
                    $('#brochureLink').addClass('d-inline-flex').show().attr('href', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
                } else {
                    $('#responseTitle').html('<i class="fa-solid fa-circle-check text-success me-2"></i> Message Sent Successfully!');
                    $('#responseMsg').text('We have received your message, ' + $('#contactName').val() + '. One of our experts will contact you at ' + $('#contactPhone').val() + ' shortly.');
                }
            });
        }, 1500);
    });
});
