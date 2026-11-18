import { useEffect, useState } from "react";

// width of the activity (topic) names column of the simulation tables, shared
// by all the tables of the page and remembered in the browser.
// null: full names, wrapped on several lines.

export const DEFAULT_WIDTH = 200;
export const MIN_WIDTH = 80;
export const MAX_WIDTH = 1200;
const STORAGE_KEY = "hesabu-simulation-topic-column-width";
const FULL = "full";

export const clampWidth = width =>
  Math.round(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width)));

export const readWidth = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === FULL) return null;
    const width = parseInt(stored, 10);
    return Number.isFinite(width) ? clampWidth(width) : DEFAULT_WIDTH;
  } catch (e) {
    return DEFAULT_WIDTH;
  }
};

const writeWidth = width => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      width === null ? FULL : String(width),
    );
  } catch (e) {
    // storage unavailable (private mode,...): only this page keeps it
  }
};

let current;
const listeners = new Set();

export const setTopicColumnWidth = width => {
  current = width === null ? null : clampWidth(width);
  writeWidth(current);
  listeners.forEach(listener => listener(current));
};

// for the tests: forget the width read from the storage
export const resetTopicColumnWidth = () => {
  current = undefined;
};

const currentWidth = () => {
  if (current === undefined) {
    current = readWidth();
  }
  return current;
};

export const useTopicColumnWidth = () => {
  const [width, setWidth] = useState(currentWidth);
  useEffect(() => {
    listeners.add(setWidth);
    return () => listeners.delete(setWidth);
  }, []);
  return [width, setTopicColumnWidth];
};

// inline style of the names cells: fixed width (ellipsis) or full names
export const topicCellStyle = width =>
  width === null
    ? { maxWidth: "none", whiteSpace: "normal", minWidth: DEFAULT_WIDTH }
    : { maxWidth: width, minWidth: width, width };
