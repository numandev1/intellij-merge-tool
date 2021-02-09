import { window } from 'vscode';
import { NOT_FOUND_CONFLICT_ERROR, FOUND_CONFLICT_ERROR, isThisFileHaveConflict } from './util/util';

export const openIntelliJMergeTool = (filePath: string) => {
	if (isThisFileHaveConflict(filePath)) {
		window.showInformationMessage(FOUND_CONFLICT_ERROR);
	} else {
		window.showErrorMessage(NOT_FOUND_CONFLICT_ERROR);
	}
};
