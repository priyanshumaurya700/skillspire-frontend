import Swal from "sweetalert2";

export const showAlert = ({title, text, icon, confirmButtonText = 'OK'})=>{
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
    });
};