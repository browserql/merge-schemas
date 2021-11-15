const { exec } = require("child_process")
const { readFile } = require("fs/promises")
const { promisify } = require("util")
const semverInc = require('semver/functions/inc')

async function run(commitMessage) {
  const { version } = JSON.parse((await readFile('package.json')).toString())

  const nextVersion = semverInc(version, 'patch')

  const nextBranch = `v${nextVersion}`

  await promisify(exec)(`git checkout -b ${nextBranch}`)

  await promisify(exec)('git add .')

  await promisify(exec)(`git commit -am "${nextBranch}"`)

  await promisify(exec)('git push')
}

const [,, commit] = process.argv

run(commit)