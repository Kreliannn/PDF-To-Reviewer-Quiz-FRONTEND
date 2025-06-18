import Swal from "sweetalert2"

export const confirmAlert = (callback: () => void) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "black",
        confirmButtonText: "remove item"
      }).then((result) => {
        if (result.isConfirmed) {
          callback()
        }
      });
}

export const TakeQuizAlert = (callback1: () => void, callback2 : () => void) => {
  Swal.fire({
      title: "Take Quiz?",
      text: "do you want to visit this reviewer",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "black",
      confirmButtonText: "visit Reviewer"
    }).then((result) => {
      if (result.isConfirmed) {
        callback1()
      }else{
        callback2()
      }
    });
}

export const errorAlert = (message: string) => {
  Swal.fire({
    title: "error",
    text: message,
    icon: "error",
    confirmButtonColor: "black",
  });
}

export const Alert = (type: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 2300,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: (type == "success")? "success": "error",
      title: (type == "success")? "Correct Answer": "Wrong Answer",
    });
}
