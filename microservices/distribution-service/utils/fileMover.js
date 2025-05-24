const fs = require('fs-extra');
const path = require('path');

const moveFileToArea = async (fileName, area) => {
  const sourcePath = path.join(__dirname, '../../../backend/uploads/', fileName);
  const targetDir = path.join(__dirname, '../../../backend/uploads/', area);

  await fs.ensureDir(targetDir);
  const targetPath = path.join(targetDir, fileName);
  await fs.move(sourcePath, targetPath, { overwrite: true });

  return targetPath;
};

module.exports = { moveFileToArea };
