import { ReactNode, useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import IconClose from "../icons/IconClose";
import styles from "./Modal.module.css";


interface ModalParams {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void
}
const Modal = ({ title, children, isOpen, handleClose }: ModalParams) => {
  const [showModal, setShowModal] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  // Nested transitions can be tricky sometimes. 
  useEffect(() => setShowModal(isOpen), [isOpen])

  return (
    <CSSTransition in={isOpen}
      mountOnEnter
      unmountOnExit
      timeout={500} classNames={{
        enterActive: styles.modalInActive,
        enter: styles.modalIn,
        exitActive: styles.modalOutActive,
      }}>
      <div className={styles.modal}>
        <CSSTransition in={showModal}
          mountOnEnter
          unmountOnExit
          onEntered={() => closeRef.current?.focus()}
          timeout={500} classNames={{
            enterActive: styles.contentInActive,
            enter: styles.contentIn,
            exitActive: styles.contentOutActive,
          }}>
          <div className={styles.content}>
            <div className={styles.title}>
              <span>{title}</span>
              <button className={styles.close} onClick={handleClose} ref={closeRef} ><IconClose /></button>
            </div>
            <div>{children}</div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
export default Modal;