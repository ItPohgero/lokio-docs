import { Octokit } from '@octokit/rest'
import { NextResponse } from 'next/server'

export async function GET() {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })

    try {
        const contributors = await octokit.repos.listContributors({
            owner: 'any-source',
            repo: 'lokio'
        })
        const contributors_examples = await octokit.repos.listContributors({
            owner: 'any-source',
            repo: 'examples'
        })

        const formattedContributors = [...contributors.data, ...contributors_examples.data]
            .reduce((unique: typeof contributors.data, contributor) => {
                const exists = unique.find(item => item.login === contributor.login);
                if (!exists) {
                    unique.push(contributor);
                }
                return unique;
            }, [])
            .map(contributor => ({
                name: contributor.login,
                avatar: contributor.avatar_url,
                contribution: contributor.contributions,
                link: contributor.html_url
            }));

        return NextResponse.json(formattedContributors)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch contributors' }, { status: 500 })
    }
}