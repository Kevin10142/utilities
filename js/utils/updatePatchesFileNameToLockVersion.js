const fs = require('fs')
const events = require('events')
const readline = require('readline')
const patchesFolder = './patches/'

async function renamePatchNameToMatchLockVersion(lockPath, { fileName, fileNamePackagePrefix, packageName, version }) {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream(lockPath),
			crlfDelay: Infinity
		})
		let foundTarget = false

		rl.on('line', line => {
			if (line.includes(packageName) && !line.includes('resolved')) {
				foundTarget = true
			} else {
				if (foundTarget) {
					foundTarget = false

					if (line.includes('version')) {
						const lockVersion = line.split('"')[1]

						if (lockVersion !== version) {
							const newFileName = fileNamePackagePrefix + '+' + lockVersion + '.patch'

							fs.rename(patchesFolder + fileName, patchesFolder + newFileName, err => {
								if (err) {
									console.error('rename ERROR: ', err)
								} else {
									console.log(`renamed from ${fileName} to ${newFileName}`)
								}
							})
						}
					}
				}
			}
		})

		await events.once(rl, 'close')
	} catch (err) {
		console.error('readline ERROR: ', err)
	}
}

fs.readdir(patchesFolder, (err, files) => {
	if (err) {
		console.error('read dir files ERROR: ', err)
		return
	}

	files.forEach(fileName => {
		let packageName, version, fileNamePackagePrefix
		const name = fileName.split('+')

		if (name.length > 2) {
			packageName = name[0] + '/' + name[1]
			fileNamePackagePrefix = name[0] + '+' + name[1]
			version = name[2].replace('.patch', '')
		} else {
			packageName = name[0]
			fileNamePackagePrefix = packageName
			version = name[1].replace('.patch', '')
		}

		console.log('patched package: ', packageName)
		console.log('patched version: ', version)

		renamePatchNameToMatchLockVersion('package-lock.json', {
			fileName,
			fileNamePackagePrefix,
			packageName,
			version
		})
	})
})
