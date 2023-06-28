import Swal from 'sweetalert2';

export const notifications = (info) => {
  const { 
    title =  "Error!"
  } = info

  Swal.fire({
      title,
      text,
      icon,
      confirmButtonText
    }
  )
}