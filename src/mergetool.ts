import { window } from 'vscode';
const { exec } = require('child_process');
import {
	NOT_FOUND_CONFLICT_ERROR,
	FOUND_CONFLICT_ERROR,
	NOT_FOUND_INTELLIJ_ERROR,
	isThisFileHaveConflict,
	getMasterSlaveBranch,
	getFileNameFromFilePath,
	makeFileWithCommand,
	removeFileByPath
} from './util/util';
const COMMAND="/Applications/WebStorm.app/Contents/MacOS/webstorm merge";

export const openIntelliJMergeTool = async (filePath: string) => {
	if (isThisFileHaveConflict(filePath)) {
        window.showInformationMessage(FOUND_CONFLICT_ERROR);
		const projectRootPath:string="/Users/apple/Data/test/node/Horizon_Preview_Apps";
		const masterBranchName:string=getMasterSlaveBranch("master",projectRootPath);
		const slaveBranchName:string=getMasterSlaveBranch("slave",projectRootPath);
		const fileName=getFileNameFromFilePath(filePath);
		const masterFileRelativePath=await makeFileWithCommand(masterBranchName,filePath,projectRootPath,fileName,"master");
		const slaveFileRelativePath=await makeFileWithCommand(slaveBranchName,filePath,projectRootPath,fileName,"slave");
        const EXEC_COMMAND:string=COMMAND+` ${masterFileRelativePath} ${slaveFileRelativePath} ${filePath}`;
		exec(EXEC_COMMAND, [], function(err: null | boolean, stdout: string, stderr: string) {
			removeFileByPath(masterFileRelativePath);
			removeFileByPath(slaveFileRelativePath);
			if (err) {
				console.log(err,"err");
				window.showErrorMessage(NOT_FOUND_INTELLIJ_ERROR);
				return;
			}
		});
	} else {
		window.showErrorMessage(NOT_FOUND_CONFLICT_ERROR);
	}
};
