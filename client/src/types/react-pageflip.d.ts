declare module 'react-pageflip' {
  import React from 'react';

  interface HTMLFlipBookProps {
    width?: number;
    height?: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    usePortrait?: boolean;
    className?: string;
    style?: React.CSSProperties;
    startPage?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    children?: React.ReactNode;
  }

  class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {
    pageFlip(): {
      flipNext: (corner?: string) => void;
      flipPrev: (corner?: string) => void;
      flip: (page: number, corner?: string) => void;
      getCurrentPageIndex: () => number;
    };
  }

  export default HTMLFlipBook;
}
