import { toast } from "react-toastify";

export const notofication = (
    text: string,
    time?: number,
    type?: "error" | "success" | "info" | "warning"
) => {
    console.log(text);

    if (type === "success") {
        toast.success(text, {
            position: "top-right",
            autoClose: time || 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    if (type === "error") {
        toast.error(text, {
            position: "top-right",
            autoClose: time || 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    if (type === "info") {
        toast.info(text, {
            position: "top-right",
            autoClose: time || 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    if (type === "warning") {
        toast.warning(text, {
            position: "top-right",
            autoClose: time || 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
};
