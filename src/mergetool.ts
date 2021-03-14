import { window, workspace, ExtensionContext } from 'vscode';
const { exec } = require('child_process');
import {
	NOT_FOUND_CONFLICT_ERROR,
	FOUND_CONFLICT_ERROR,
	isThisFileHaveConflict,
	getMasterSlaveBranch,
	getFileNameFromFilePath,
	makeFileWithCommand,
	removeFileByPath,
	checkIfExist,
	INTELLIJ_STORAGE_KEY,
	WRONG_PATH_INPUT
} from './util/util';
import { setItem, getItem } from './util/storage';
const INTELLIJ_TOOL_PATH = "/Applications/WebStorm.app/Contents/MacOS/webstorm";

export const openIntelliJMergeTool = async (filePath: string, context: ExtensionContext) => {
	if (isThisFileHaveConflict(filePath)) {
		let userInputPath: string | undefined;
		const intellijToolPath: string = getItem(context, INTELLIJ_STORAGE_KEY);
		if (intellijToolPath) {
			userInputPath = intellijToolPath;
		}
		else {
			userInputPath = await window.showInputBox({ value: INTELLIJ_TOOL_PATH, placeHolder: INTELLIJ_TOOL_PATH, prompt: "Please enter the path of intellij path" });
			if (checkIfExist(userInputPath)) {
				setItem(context, INTELLIJ_STORAGE_KEY, userInputPath);
			}
			else {
				window.showErrorMessage(WRONG_PATH_INPUT);
				return;
			}

		}
		window.showInformationMessage(FOUND_CONFLICT_ERROR);
		const projectRootPath: any = workspace.rootPath;
		const masterBranchName: string = getMasterSlaveBranch("master", projectRootPath);
		const slaveBranchName: string = getMasterSlaveBranch("slave", projectRootPath);
		const fileName = getFileNameFromFilePath(filePath);
		const masterFileRelativePath = await makeFileWithCommand(masterBranchName, filePath, projectRootPath, fileName, "master");
		const slaveFileRelativePath = await makeFileWithCommand(slaveBranchName, filePath, projectRootPath, fileName, "slave");
		const EXEC_COMMAND: string = `${userInputPath} merge ${masterFileRelativePath} ${slaveFileRelativePath} ${filePath} ${filePath}`;
		console.log(EXEC_COMMAND, "EXEC_COMMANDEXEC_COMMAND");
		exec(EXEC_COMMAND, [], function (err: null | boolean | any, stdout: string, stderr: string) {
			removeFileByPath(masterFileRelativePath);
			removeFileByPath(slaveFileRelativePath);
			if (err) {
				window.showErrorMessage(err);
				return;
			}
		});
	} else {
		window.showErrorMessage(NOT_FOUND_CONFLICT_ERROR);
	}
};
