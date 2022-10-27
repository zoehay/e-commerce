// @ts-check
import path from 'path'
import fs from 'fs'
import { nanoid } from 'nanoid'
import { TestEnvironment } from 'jest-environment-node'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'

// fix for 'How to fix "__dirname is not defined in ES module scope"'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prismaBinary = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'prisma'
)

class PrismaTestEnvironment extends TestEnvironment {
  /** @type {import('@jest/types').Config.ProjectConfig} */

  constructor(config, _context) {
    super(config, _context)

    // Generate a unique sqlite identifier for this test context
    //this.dbName = `test_${nanoid()}`
    const DB_URL = `postgresql://postgres:postgres@localhost:5432/test_db`
    process.env.DB_URL = DB_URL
    console.log(DB_URL)
    this.global.process.env.DB_URL = DB_URL
    //this.dbPath = path.join(__dirname, this.dbName)
  }

  async setup() {
    // Run the migrations to ensure our schema has the required structure
    await exec(
      `${prismaBinary} db push --schema=./prisma/test.schema.prisma --force-reset --accept-data-loss`
    )
    return super.setup()
  }
  // TODO: Delete the test database
  // async teardown() {
  //   try {
  //     await fs.promises.unlink(this.dbPath)
  //   } catch (error) {
  //     // doesn't matter as the environment is torn down
  //   }
  // }
}

export default PrismaTestEnvironment
