// react-datasheet keeps a document "copy" listener once a cell was clicked
// (never removed with disablePageClick) and copies the selected cells,
// preventing a normal copy of the text selected with the mouse.
// This handler copies the text selection when there's one, the selected cells otherwise
// (same output as react-datasheet's default copy).
export const handleDataSheetCopy = ({
  event,
  dataRenderer,
  valueRenderer,
  data,
  start,
  end,
  range,
}) => {
  const selectedText = window.getSelection
    ? window.getSelection().toString()
    : "";
  let text = selectedText;
  if (!text) {
    text = range(start.i, end.i)
      .map(i =>
        range(start.j, end.j)
          .map(j => {
            const cell = data[i][j];
            const value = dataRenderer ? dataRenderer(cell, i, j) : null;
            if (value === "" || value === null || value === undefined) {
              return valueRenderer(cell, i, j);
            }
            return value;
          })
          .join("\t"),
      )
      .join("\n");
  }
  event.clipboardData.setData("text/plain", text);
};
