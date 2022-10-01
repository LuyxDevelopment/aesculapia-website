import { useEffect } from "react";
import Image from "next/image";

interface ToastOptions {
  title: string;
  description: string;
  type: ToastType;
}

type ToastType = "error" | "success";

const Toast = ({ title, description, type }: ToastOptions) => {
  useEffect(() => {
    const toast = document.querySelector("#toast") as HTMLDivElement;
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2805);
  }, []);

  return (
    <div id="toast" className={"toast show toast-" + type}>
      <h6 className="inline-block align-middle">
        <div className="inline-block align-middle mr-2">
          <Image
            src={
              type === "success" ? "/assets/success.png" : "/assets/error.png"
            }
            alt="icon"
            width="25"
            height="25"
          />
        </div>
        {title}
      </h6>
      <p>{description}</p>
    </div>
  );
};

export default Toast;
