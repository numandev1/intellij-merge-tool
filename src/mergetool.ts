import {window} from 'vscode';
import {NOT_FOUND_CONFLICT_ERROR, FOUND_CONFLICT_ERROR} from './util/util';
const fs=require('fs');
export const isThisFileHaveConflict=(filePath:string)=>{
    const fileContent=fs.readFileSync(filePath, 'utf8');
    const regexDetectMergeConflicts=/<<<<<<< HEAD(\n+.+)\n\=\=\=\=\=\=/g;
    const isHaveConflictThisFile=regexDetectMergeConflicts.test(fileContent);
    return isHaveConflictThisFile;
}

export const openIntelliJMergeTool=(filePath:string)=>{
    if(isThisFileHaveConflict(filePath))
    {
        window.showInformationMessage(FOUND_CONFLICT_ERROR);
    }
    else
    {
        window.showErrorMessage(NOT_FOUND_CONFLICT_ERROR);
    }
}