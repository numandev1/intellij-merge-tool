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
        console.log("have conflict");
    }
    else
    {
        console.log("have not conflict");
    }
}