document.addEventListener("DOMContentLoaded", function() {
    const signInButton = document.getElementById("sign-in-button");

    signInButton.addEventListener("click", function(e) {
        e.preventDefault(); // Prevenir el envío del formulario

        const phoneNumber = document.getElementById("phone-number").value;
        const password = document.getElementById("password").value;

        if (phoneNumber === "" || password === "") {
            showGamerAlert("Falta información", "Por favor, completa todos los campos.", "error");
        } else if (phoneNumber !== "3213457724") {
            showGamerAlert("Número incorrecto", "El número ingresado no existe.", "error");
        } else if (password !== "micontraseña") {
            showGamerAlert("Contraseña incorrecta", "La contraseña ingresada es incorrecta.", "error");
        } else {
            showGamerAlertWithRedirect("¡Bienvenido, Cristian Loaiza!", "Acceso concedido. ¡Prepárate para la aventura!", "success", "home.html");
        }
    });

    function showGamerAlert(title, message, type) {
        Swal.fire({
            title,
            text: message,
            icon: type,
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "gamer-button"
            }
        });
    }
    
    function showGamerAlertWithRedirect(title, message, type, redirectUrl) {
        Swal.fire({
            title,
            text: message,
            icon: type,
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "gamer-button"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "home.html";
            }
        });
    }
});
