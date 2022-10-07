# jacobsalway.com

Repository for my personal website at [jacobsalway.com](https://jacobsalway.com).

* **Language**: Typescript
* **Frameworks**: React
* **Styling**: Tailwind CSS
* **Hosting:** S3 and Cloudfront using SSG
* **Database:** DynamoDB
* **API:** Lambda and API Gateway
* **Deployment:** Github Actions
* **Infrastructure:** AWS provisioned with Terraform

## Structure

* `/content/*` - homepage content and blog posts written in Markdown.
* `/infra/*` - cloud infrastructure written in Terraform. Also contains Lambda code related to post view calculation and associated API.
* `/mock/*` - a simple Flask server run locally to mock post view API responses.
* `/scripts/*` - script run in CI to sync post titles and dates to the DynamoDB table. I may migrate this to something Terraform-based using `aws_dynamodb_table_item`.

## Deployment

When a commit is pushed to `main`, a CI/CD job running on Github Actions runs `next export` and syncs the build output to an S3 bucket, which a Cloudfront distribution points to.

Another CI/CD job also extracts post IDs, titles and dates from the markdown files inside `/content/posts/*` and syncs the DynamoDB table to represent the current posts.

## Running locally

```
git clone https://github.com/jacobsalway/jacobsalway.com
cd jacobsalway.com
docker compose up
yarn install && yarn dev
```

When run in dev mode, Next.js will proxy `/api/*` requests to the locally run Flask server.