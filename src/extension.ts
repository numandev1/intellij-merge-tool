import {window, commands,ExtensionContext} from 'vscode';

export function activate(context: ExtensionContext) {
    const disposableArray = [];

    disposableArray.push(commands.registerCommand('intellij-merge-tool.merge', (uri: any) => {
        if(uri && uri.path) {
		
		// console.log(uri.path,"nominomi22")
            // relativeImport.targetFile = uri.path;
        } else {
            window.showErrorMessage('This file has no merge conflict');
        }
	}));
	
	context.subscriptions.concat(disposableArray);
}

// this method is called when your extension is deactivated
export function deactivate() {}
