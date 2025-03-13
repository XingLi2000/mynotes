module.exports = async (tp) => {
    const today = tp.date.now("YYYY-MM-DD");
    const newName = `${today}-progress-report.md`;
    const currentFile = app.workspace.getActiveFile();

    if (currentFile && currentFile.name !== newName) {
        await app.fileManager.renameFile(currentFile, currentFile.parent.path + "/" + newName);
    }
};
