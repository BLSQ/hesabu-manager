import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";
import "./editor.css";
import languageTools, {
  setCompleters,
  addCompleter,
} from "ace-builds/src-noconflict/ext-language_tools";
import functions from "./functions.json";

const FormulaEditor = ({
  value,
  availableVariables,
  handleAttributeChange,
}) => {
  const sendExpressionToParent = (newValue, attribute) => {
    handleAttributeChange(newValue, attribute);
  };

  useEffect(() => {
    setCompleters([languageTools.snippetCompleter]);
    addCompleter({
      getCompletions(editor, session, pos, prefix, callback) {
        const results = availableVariables.map(availableVariable => {
          return {
            caption: availableVariable,
            value: availableVariable,
            snippet: availableVariable,
            meta: "available variable",
          };
        });
        for (const func of Object.keys(functions)) {
          const funcInfo = functions[func];
          results.push({
            caption: funcInfo[0],
            value: func,
            snippet: `${func}(`,
            meta: "function",
            docHTML: `${funcInfo[0]} <br> ${funcInfo[1]}`,
          });
        }
        callback(null, results);
      },
    });
  }, [value, availableVariables]);
  return (
    <AceEditor
      mode="ruby"
      theme="monokai"
      fontSize={16}
      onChange={event => sendExpressionToParent(event, "expression")}
      value={value}
      wrapEnabled
      minLines={10}
      width="100%"
      height="200px"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
      }}
    />
  );
};

export default FormulaEditor;
