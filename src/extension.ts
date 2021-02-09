import {window, commands,ExtensionContext} from 'vscode';
import {openIntelliJMergeTool} from './mergetool';
export function activate(context: ExtensionContext) {
    const disposableArray = [];

    disposableArray.push(commands.registerCommand('intellij-merge-tool.merge', (uri: any) => {
        if(uri && uri.path) {
		openIntelliJMergeTool(uri.path)
        } else {
            window.showErrorMessage('This file has no merge conflict');
        }
	}));
	
	context.subscriptions.concat(disposableArray);
}

// this method is called when your extension is deactivated
export function deactivate() {}
