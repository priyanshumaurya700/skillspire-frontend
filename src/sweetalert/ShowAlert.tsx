import Swal from "sweetalert2";

interface AlertOptions {
    title: string;
    text: string;
    icon: 'success' | 'error' | 'warning' | 'info' | 'question';
    confirmButtonText?: string;
}

export const showAlert = ({title, text, icon, confirmButtonText = 'OK'}: AlertOptions)=>{
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
    });
};