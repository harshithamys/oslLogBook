const {users}=require('../userSchema')
exports.scanLog = async function scanLog(usn, ip, useragent, userDateTime) {
    console.log(usn, ip, useragent, userDateTime)
    return new Promise((resolve, reject) => {
        users.findOneAndUpdate(
            { usn: usn.toLowerCase() },
            {
                lastLogin: userDateTime,
                $push: {
                    logsData: [{
                        usersagent: useragent, ip: ip, time:userDateTime
                    }]
                }
            }
        )
            .then((msg) => {
                // console.log('0', msg)
                resolve({ code: 200, msg: 'Logged Successfully' })
            })
            .catch((err) => {
                console.log('----ERROR----\n', err)
                reject({ code: 500, msg: 'Unable to Log' })
            })
    })
}