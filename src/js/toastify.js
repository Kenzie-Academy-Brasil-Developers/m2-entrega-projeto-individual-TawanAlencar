export class Create{
    static toastErro(texto){
        Toastify({
            text: texto,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "red",
            },
        }).showToast();

    }

    static toastSucesso(texto){
        Toastify({
            text: texto,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "green",
            },
        }).showToast();

    }
}