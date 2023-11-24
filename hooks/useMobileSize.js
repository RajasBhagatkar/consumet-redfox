import { useState, useEffect } from "react";
// Hook
function useMobileSize(props) {
    const [mobileSize, setMobileSize] = useState();
    useEffect(() => {
        function handleResize() {
            if (typeof window !== "undefined") {
                (props === "AdvancedSearch" ? 991 : 1200) > window.innerWidth ? setMobileSize(true) : setMobileSize(false);
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return mobileSize;
}
export default useMobileSize;