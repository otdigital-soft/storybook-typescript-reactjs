.PHONY : generateschema

generateschema:
	npx --yes openapi-typescript-codegen --input http://api.example.com:8000/api/docs/schema/ --output src/api/schema/ --client axios --exportCore false
	echo 'export type BlankEnum = ""' > src/api/schema/models/BlankEnum.ts