import React from "react";
import { useModal } from "../hooks/modal";
import { Backdrop } from "./Backdrop";

export const Modal = () => {
    const { visible } = useModal(false);
    return  (visible === true ? <Backdrop><div><p>Test</p></div></Backdrop> : null );
};