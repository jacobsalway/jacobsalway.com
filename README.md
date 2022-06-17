# jacobsalway.com

Repository for my personal website at [jacobsalway.com](https://jacobsalway.com).

* **Language**: Typescript
* **Frameworks**: React, Typescript
* **Styling**: Tailwind CSS
* **Hosting:** S3 and Cloudfront using SSR
* **Deployment:** Github Actions

For deployment, the entire project is built using static site generation then uploaded to an S3 bucket,
which a Cloudfront distribution then points to.

## Running locally

```
git clone https://github.com/jacobsalway/jacobsalway.com
cd jacobsalway.com
yarn install && yarn dev
```
