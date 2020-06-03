require('shelljs/global')
env.NODE_ENV = 'production'

const fs = require('fs')
const exec = require('child_process').exec;

function curl(cmd) {
    console.log('curl cmd: ', cmd)
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error('curl error: ', err)
                return reject(err)
            }
            console.log('curl out: ', stdout)
            try {
                stdout = JSON.parse(stdout)
                if (stdout.businessCode !== '0000') {
                    console.error('请求失败')
                    process.exit(1)
                }
            } catch (e) {
                console.error('json parse error: ', e)
                process.exit(1)
            }
            resolve(stdout)
        })
    })
}

var upload = async function(fileName) {
    let options = {
        host: "static.xyqb.com", //远端服务器域名
        path: "/cdn/upload" //上传服务路径
    };
    let cmd = `curl -sb -H "Accept: application/json" -F "file=@dll/${fileName}" http://${options.host}${options.path}`
    return curl(cmd)
}

var update = async function(fileName) {
    let argument = process.argv[2]
    let options = {
        host: "static.xyqb.com", //远端服务器域名
        path: `/cdn/update\\?env\\=${argument}\\&filename=${fileName}` //上传服务路径
    };

    let cmd = `curl -X POST http://${options.host}${options.path} -d ''`
    return curl(cmd)
}

var start = async function() {
    let path = './dll'
    let files = fs.readdirSync(path)
    if (!files.length) {
        console.error('获取vendor文件失败！退出发布程序')
        process.exit(1)
    }

    // 只支持一个文件
    let fileName = files[0]
    await upload(fileName)
    await update(fileName)
    console.log('更新成功')

    files.forEach((file) => {
        fs.unlinkSync(path + "/" + file)
    })
    console.log('清空dll目录成功')
}

start()
