/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname:"cms.skycode.me",
                pathname: '/skycode/assets/**'
            }
        ]
    }
   
}

module.exports = nextConfig
