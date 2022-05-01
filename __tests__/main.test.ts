import {tweet} from '../src/tweet'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('tweet', async () => {
  const text = Date.now().toString()
  const response = await tweet(text)
  await tweet(`in reply to ${text}`, [], JSON.parse(response).id_str)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_STATUS'] = new Date().toLocaleString('ja-JP')
  process.env['INPUT_MEDIA_PATHS'] = `
__tests__/Twitter_Logo_Blue.png
__tests__/Twitter_Logo_WhiteOnBlue.png
__tests__/Twitter_Logo_WhiteOnImage.png
`
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
