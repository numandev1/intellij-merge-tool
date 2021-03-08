import { window } from 'vscode';
const { exec } = require('child_process');
import {
	NOT_FOUND_CONFLICT_ERROR,
	FOUND_CONFLICT_ERROR,
	NOT_FOUND_INTELLIJ_ERROR,
	isThisFileHaveConflict
} from './util/util';
const COMMAND="/Applications/WebStorm.app/Contents/MacOS/webstorm merge";

export const openIntelliJMergeTool = (filePath: string) => {
	if (isThisFileHaveConflict(filePath)) {
        window.showInformationMessage(FOUND_CONFLICT_ERROR);
        const EXEC_COMMAND=COMMAND+` ${filePath} ${filePath} ${filePath} ${filePath}`;
		exec(EXEC_COMMAND, [], function(err: null | boolean, stdout: string, stderr: string) {
			if (err) {
                console.log(err,"err")
				window.showErrorMessage(NOT_FOUND_INTELLIJ_ERROR);
				return;
			}
		});
	} else {
		window.showErrorMessage(NOT_FOUND_CONFLICT_ERROR);
	}
};
