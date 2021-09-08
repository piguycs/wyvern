import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref:any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event:any) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementById("profile")!.style.display = "none";
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props: { enable: any; children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  if (props.enable) {
    return <div ref={wrapperRef}>{props.children}</div>;
  }
  return null
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
