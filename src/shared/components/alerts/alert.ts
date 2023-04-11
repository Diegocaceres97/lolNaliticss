import Swal, { SweetAlertIcon } from 'sweetalert2'

interface alert {
    title?: string,
    text?: string,
    icon?: SweetAlertIcon,
    confirmButtonText?: string,
    footer?: string,
    html?: string
}

export function fireMessage({title, text, icon, confirmButtonText = 'cool',footer,html}:alert) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        footer,
        html
      });
}