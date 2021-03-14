const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

export const NOT_FOUND_CONFLICT_ERROR = 'This file has no merge conflict';
export const FOUND_CONFLICT_ERROR = 'This file has conflict';
export const NOT_FOUND_INTELLIJ_ERROR = 'You computer have no intelli j';
export const isThisFileHaveConflict = (filePath: string) => {
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const regexDetectMergeConflicts = /(<<<<<<< HEAD)(.*)(\=\=\=\=\=\=\=)/s;
	const isHaveConflictThisFile = regexDetectMergeConflicts.test(fileContent);
	return isHaveConflictThisFile;
};
export const getMasterSlaveBranch = (branchType: string, rootPath: string): string => {
	const masterBranchNameRegex = /(?<=remote-tracking branch '.+' into ).+/;
	const slaveBranchNameRegex = /(?<=remote-tracking branch ').+(?=')/;
	const filePath = path.resolve(rootPath, '.git/MERGE_MSG');
	const fileContent = fs.readFileSync(filePath, 'utf8');
	if (branchType === 'master') {
		return masterBranchNameRegex.exec(fileContent) + '';
	} else {
		return slaveBranchNameRegex.exec(fileContent) + '';
	}
};
export const getFileNameFromFilePath = (filePath: string) => {
	const fileNameRegex = /[^/]+$/;
	return fileNameRegex.exec(filePath) + '';
};

export const makeFileWithCommand = async (branchName: string, filePath: string, rootPath: string, fileName: string, branchType: string) => {
	return new Promise((resolve, rejects) => {
		const relativeFilePath = path.relative(rootPath, filePath);
		const newFileName = `.temp.${branchType}.${fileName}`;
		const EXEC_COMMAND: string = `cd ${rootPath} && git show ${branchName}:${relativeFilePath} > ${newFileName}`;
		exec(EXEC_COMMAND, [], function (err: null | boolean, stdout: string, stderr: string) {
			if (err) {
				console.log(err, "err");
				rejects("");
				return;
			}
			resolve(path.resolve(rootPath, newFileName));
		});
	});
};

export const removeFileByPath = (filePath: any) => {
	fs.unlinkSync(filePath);
};

export const checkIfExist = (filePath: any) => {
	return fs.existsSync(filePath);
};

export const INTELLIJ_STORAGE_KEY = "INTELLIJ_STORAGE_KEY";
export const WRONG_PATH_INPUT = "You enter wrong address of intellij path, please enter correct address of any intellij tool";
