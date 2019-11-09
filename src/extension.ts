import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const LineNumType = ["off", "on", "relative", "interval"];
  let statusBar = vscode.window.setStatusBarMessage("Line Numbers:");
  let disposable = vscode.commands.registerCommand(
    "extension.linenumtoggle",
    () => {
      let editor = vscode.workspace.getConfiguration("editor", null);
      const state: string = editor.get("lineNumbers")
        ? (editor.get("lineNumbers") as string)
        : "off";
      let stateIndex: number = LineNumType.indexOf(state)
        ? LineNumType.indexOf(state)
        : 4;
      stateIndex++;
      stateIndex %= 4;
      editor.update("lineNumbers", LineNumType[stateIndex]);
      statusBar.dispose();
      statusBar = vscode.window.setStatusBarMessage(
        "Line Numbers: " + LineNumType[stateIndex]
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
