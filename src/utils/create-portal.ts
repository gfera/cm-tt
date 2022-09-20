import { createPortal } from 'react-dom';
import { useState, useLayoutEffect, ReactNode, ReactPortal } from 'react';

function getWrapper(wrapperId: string) {
  const wrapperElement = document.getElementById(wrapperId) || document.body.appendChild(document.createElement('div'));
  wrapperElement.setAttribute("id", wrapperId);
  return wrapperElement;
}


interface ReactPortalParams {
  children: ReactNode;
  wrapperId: string
}
const ReactPortal = ({ children, wrapperId = "portal-wrapper" }: ReactPortalParams) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setWrapperElement(getWrapper(wrapperId));
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;