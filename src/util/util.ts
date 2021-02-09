const fs = require('fs');

export const NOT_FOUND_CONFLICT_ERROR = 'This file has no merge conflict';
export const FOUND_CONFLICT_ERROR = 'This file has conflict';
export const isThisFileHaveConflict = (filePath: string) => {
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const regexDetectMergeConflicts = /<<<<<<< HEAD(\n+.+)\n\=\=\=\=\=\=/g;
	const isHaveConflictThisFile = regexDetectMergeConflicts.test(fileContent);
	return isHaveConflictThisFile;
};
