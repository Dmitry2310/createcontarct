import { useEffect } from "react";

const useLink = url => {
  useEffect(() => {
    const link = document.createElement("link");

    link.href = url;
    link.async = true;
    link.rel = "stylesheet";
    document.body.appendChild(link);

    return () => {
      document.body.removeChild(link);
    };
  }, [url]);
};

export default useLink;