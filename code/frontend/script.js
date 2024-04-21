var contact_form_after_sent_message =
    `<div id="contact-form_after_sent_message-container">
<h2>Danke für ihre Nachricht! Sie können in Kürze eine Rückmeldung per Email erwarten.</h2>
<h3>Sie wollen eine weitere Nachrichten senden? Dann klicken Sie</h3>
<button type="button" id="new_message_access-button"><h4>HIER</h4></button>
</div>
`
$(document).ready(function () {
    var contact_form_html = $("#contact-form_form").html()
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        $(".container_picture1 img").css({
            width: (100 + scroll / 5) + "%"
        });

        var windowWidth = $(window).width()
        var horizontalLength = document.querySelector("#portfolio_slider").scrollWidth
        var distfromTop = document.querySelector("#portfolio").offsetTop
        var scrollDistance = distfromTop + horizontalLength - windowWidth

        $("#portfolio").css('height', (horizontalLength - $('#portfolio_slider').width()) + "px")

        if (scroll >= distfromTop && scroll <= scrollDistance - parseInt($('#portfolio_slider').width() * 0.4)) {
            document.querySelector("#portfolio_slider").style.transform = "translateX(-" + (scroll + parseInt($('#portfolio_slider').width() * 0.4) - distfromTop) + "px)"
        }

    });

    $(window).on('load', function () {
        document.querySelector("#portfolio_slider").style.transform = "translateX(-" + parseInt($("#portfolio_slider").width() * 0.4) + "px)"
        document.querySelector("#check").addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                $("#logo_lizra_png_2").show();
            } else {
                $("#logo_lizra_png_2").hide();
            }
        })
        $("#button_back-to-top").on("click", function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })
        if (window.localStorage.getItem("sentMessage") === "true") {
            $("#contact-form_form").html(contact_form_after_sent_message)
            $("#new_message_access-button").on("click", function () {
                window.localStorage.removeItem("sentMessage")
                window.localStorage.setItem("sentMessage", "false")
                $("#contact-form_form").html(contact_form_html)
            })
        }
    })
    /*
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalsButton = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })
    
    function openModal(modal){
        if(modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }
    
    function closeModal(modal){
        if(modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
    */
    $("#contact-form_form").on("submit", e => {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "https://website-lizra-mail-service.herokuapp.com/send?apitoken=x5mgq8hh92r63e8h33mtcpx7ba3b9u8kbr62qkw8au67uqkq2mmhusxsfvr8jwvd2p62w",
            success: function (data) {

            },
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                name: $("#contact-form_input_name").val().trim(),
                email: $("#contact-form_input_email").val().trim(),
                product: $("#contact-form_input_product").val().trim(),
                message: $("#contact-form_input_message").val().trim(),
            }),
        })

        window.localStorage.setItem("sentMessage", "true")
        $("#contact-form_form").html(contact_form_after_sent_message)
        $("#new_message_access-button").on("click", function () {
            window.localStorage.removeItem("sentMessage")
            window.localStorage.setItem("sentMessage", "false")
            $("#contact-form_form").html(contact_form_html)
        })
    })
})

function toggleCorporateDesign() {
    document.getElementById("popup_corporate_design").classList.toggle("active");
}

function toggleLogos() {
    document.getElementById("popup_logos").classList.toggle("active");
}

function toggleIllustrations() {
    document.getElementById("popup_illustrations").classList.toggle("active");
}
