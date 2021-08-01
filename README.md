# jacobsalway.com

Code for my personal/portfolio website at [jacobsalway.com](https://jacobsalway.com) built using JavaScript, TypeScript and React. Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment

When a commit/PR is made to master branch, a Github Action is triggered that creates a production build of the repo, pushes the contents to an S3 bucket then invalidates a Cloudfront distribution that is set up with static website hosting and points to this S3 bucket.

## Future work

Once I learn more about full-stack web development, I intend to put the content of the website behind an API of some sort (likely with DynamoDB, Lambda and API Gateway). I also want to add a projects section and start writing blog posts as well. The code could be cleaned up with a re-usable fade-in animation component wrapper and the entire website could do with some tests before deployment as well, rather than just linting/type checking.
