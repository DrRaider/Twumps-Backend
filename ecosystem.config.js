module.exports = {
  apps: [{
    name: 'twumps',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-35-180-103-82.eu-west-3.compute.amazonaws.com',
      key: '~/.ssh/twumps.pem',
      ref: 'origin/firstRelease',
      repo: 'git@github.com:DrRaider/Twumps-BackEnd.git',
      path: '/home/ec2-user/twumps',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
