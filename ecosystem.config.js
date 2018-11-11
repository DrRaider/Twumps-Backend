module.exports = {
  apps: [{
    name: 'twumps',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-35-180-192-229.eu-west-3.compute.amazonaws.com',
      key: '~/.ssh/twumps.pem',
      ref: 'origin/getapi',
      repo: 'git@github.com:DrRaider/Twumps-BackEnd.git',
      path: '/',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}