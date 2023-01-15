import type { Project } from '@types'

export const projects: Project[] = [
    {
        name: 'jacobsalway.com',
        links: [
            {
                name: 'code',
                link: 'https://github.com/jacobsalway/jacobsalway.com',
            },
        ],
        description:
            'This website! A personal/portfolio website built with with Next.js, React and Typescript and hosted on S3.',
    },
    {
        name: 'Interest rate pipeline/dashboard',
        links: [
            {
                name: 'code',
                link: 'https://github.com/jacobsalway/rba-implied-interest-rate-lambda',
            },
            {
                name: 'dashboard',
                link: 'https://public.tableau.com/app/profile/jacob.salway/viz/ASXImpliedYieldCurve/ASXImpliedYieldCurve',
            },
        ],
        description:
            'Data pipeline on AWS that extracts and stores interest rate data using Lambda and S3. Data visualised with a Tableau dashboard.',
    },
]
