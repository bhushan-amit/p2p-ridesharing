import sanityClient, { createClient } from '@sanity/client'

export const client = createClient({
    projectId:'xqr61a4x',
    dataset: 'production',
    apiVersion: 'v1',
    token: 'skH2j4LOoKBpdLrWgBiUVF8CCW6hm8WT0YwwFB9yf5IfOnxDd3VV5KeelvQFvHaGgJQOyMVg5rBLexki2jh5b6HE3IdPPKdITYW2QnptTgnSkWzWhmkMwg1gdcb0XzoaaetS9LpkYIIHEa3vW4qZbaum8Ohpl7XJdUiyV85ZdnI4XiCUKHcb',
    useCdn: false,
    })