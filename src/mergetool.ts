import { window,workspace } from 'vscode';
const { exec } = require('child_process');
import {
	NOT_FOUND_CONFLICT_ERROR,
	FOUND_CONFLICT_ERROR,
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
		const projectRootPath:any=workspace.rootPath;
		const masterBranchName:string=getMasterSlaveBranch("master",projectRootPath);
		const slaveBranchName:string=getMasterSlaveBranch("slave",projectRootPath);
		const fileName=getFileNameFromFilePath(filePath);
		const masterFileRelativePath=await makeFileWithCommand(masterBranchName,filePath,projectRootPath,fileName,"master");
		const slaveFileRelativePath=await makeFileWithCommand(slaveBranchName,filePath,projectRootPath,fileName,"slave");
        const EXEC_COMMAND:string=COMMAND+` ${masterFileRelativePath} ${slaveFileRelativePath} ${filePath}`;
		exec(EXEC_COMMAND, [], function(err: null | boolean | any, stdout: string, stderr: string) {
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
