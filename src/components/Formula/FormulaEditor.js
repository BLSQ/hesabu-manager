import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";
import "./editor.css";
import languageTools, {
  setCompleters,
  addCompleter,
} from "ace-builds/src-noconflict/ext-language_tools";

const FormulaEditor = ({ value, availableVariables, updateExpression }) => {
  const sendExpressionToParent = newValue => {
    updateExpression(newValue);
  };

  useEffect(() => {
    setCompleters([languageTools.snippetCompleter]);
    addCompleter({
      getCompletions(editor, session, pos, prefix, callback) {
        const results = availableVariables.map(availableVariable => {
          return {
            caption: availableVariable,
            value: availableVariable,
            meta: "available variable",
          };
        });
        callback(null, results);
      },
    });
  }, [value, availableVariables]);
  return (
    <AceEditor
      mode="ruby"
      theme="monokai"
      fontSize={16}
      onChange={event => sendExpressionToParent(event)}
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
