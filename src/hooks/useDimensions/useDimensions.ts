import { useState, useCallback, useLayoutEffect } from 'react';

export interface DimensionObject {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

function getDimensionObject<T extends HTMLElement>(node: T): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: 'x' in rect ? rect.x : rect.top,
    left: 'y' in rect ? rect.y : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function useDimensions<Element extends HTMLElement>(): [
  (node: Element) => void,
  DimensionObject | null,
  Element | null,
] {
  const [dimensions, setDimensions] = useState<DimensionObject | null>(null);
  const [node, setNode] = useState<Element | null>(null);

  const ref = useCallback((newNode) => {
    setNode(newNode);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node)),
        );
      measure();
    }
  }, [node]);

  return [ref, dimensions, node];
}

export default useDimensions;
