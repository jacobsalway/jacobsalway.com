import {
    ConditionalCheckFailedException,
    DynamoDBClient,
    PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { createHash } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY)
    throw new Error(
        'No `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` environment variables set!'
    )

const client = new DynamoDBClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        if (!req.socket.remoteAddress || typeof req.query.id !== 'string')
            return res.status(500).end()

        const ipHash = createHash('md5')
            .update(req.socket.remoteAddress)
            .digest('hex')

        try {
            await client.send(
                new PutItemCommand({
                    TableName: process.env.TABLE_NAME,
                    Item: {
                        pk: { S: `view#${ipHash}` },
                        id: { S: `post#${req.query.id}` },
                    },
                    ConditionExpression: 'attribute_not_exists(pk)',
                })
            )
        } catch (err) {
            if (!(err instanceof ConditionalCheckFailedException)) throw err
        }

        return res.status(200).end()
    } else if (req.method === 'GET') {
        return res.status(200).json({ id: req.query.id })
    }
}
