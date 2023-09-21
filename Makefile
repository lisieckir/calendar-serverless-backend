start:
	 nest build --watch& sls dynamodb start --migrate && npx serverless offline --host=0.0.0.0 --reloadHandler
