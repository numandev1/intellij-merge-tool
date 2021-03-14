import { window, commands, ExtensionContext } from 'vscode';
import { openIntelliJMergeTool } from './mergetool';
import { NOT_FOUND_CONFLICT_ERROR } from './util/util';
export function activate(context: ExtensionContext) {
	const disposableArray = [];
	disposableArray.push(
		commands.registerCommand('intellij-merge-tool.merge', (uri: any) => {
			if (uri && uri.path) {
				openIntelliJMergeTool(uri.path, context);
			} else {
				window.showErrorMessage(NOT_FOUND_CONFLICT_ERROR);
			}
		})
	);

	context.subscriptions.concat(disposableArray);
}

// this method is called when your extension is deactivated
export function deactivate() { }
