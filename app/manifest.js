
export default function manifest() {
  return {
    name: 'Sounding board',
    short_name: 'Sounding board',
    description: 'Connect to experts and discuss an important life situation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1E1E1E',
    theme_color: '#9C59EE',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}