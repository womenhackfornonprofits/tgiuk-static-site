# Together In The UK Static site

## Dev Setup Instructions

1. First you will need to install NPM to manage packages https://nodejs.org/
2. Install [Grunt](http://gruntjs.com/getting-started)
3. Clone the repo: `git clone git@github.com:womenhackfornonprofits/tgiuk-static-site.git`
4. Install all required packages:
	`npm install`
	in the directory root, this will read the package.json file and install all required packages.
5. You will need to have [Ruby](https://www.ruby-lang.org/en/documentation/installation/) on your machine
6. You will need to create a file `s3settings.json` and `s3settingsprod.json` with the following content:

*Development bucket*

```
{
	"key": "your key here",
	"secret": "your secret here",
	"bucket": "tbd",
	"region": "tbd"
}
```
*Production bucket*

```
{
	"key": "your production key here",
	"secret": "your production secret here",
	"bucket": "tbd",
	"region": "tbd"
}
```
## Development Instructions

1. HTML, CSS/SASS changes 
In order to compile and watch the SASS and the templates run `grunt watch`, this will watch for changes to html and sass and compile it all.


## Deploying changes

1. Make sure the gruntfile is pointing to the right credential file `s3settings.json` this should be by default using dev credentials
2. All you need is to run `grunt deploy`
This will minify, copy and do everything else needed to push the site to the dev bucket.



Note: All this information can be filled out once you have access to the bucket to deploy to DEV & PROD.

# Team

* **Front End Dev**: [Liliana Kastilio](https://www.lilianakastilio.co.uk)

# Tools & Technologies
- CSS
- HTML
- [Grunt](gruntjs.com/)
- [AWS S3](www.aws.amazon.com/s3)
- [Jira](www.atlassian.com/JIRA)
- [Browserstack](https://www.browserstack.com)
- [Slack](https://slack.com/)


# Making Changes
  In the Gruntfile.js you can find various tasks to compile, deploy and help you work locally, take a peek in there.
