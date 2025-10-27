# My Finetunes

> List all finetune_ids created by the user

## OpenAPI

````yaml https://api.bfl.ai/openapi.json get /v1/my_finetunes
paths:
  path: /v1/my_finetunes
  method: get
  servers:
    - url: https://api.us1.bfl.ai
      description: BFL Finetune API
  request:
    security:
      - title: APIKeyHeader
        parameters:
          query: {}
          header:
            x-key:
              type: apiKey
          cookie: {}
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              finetunes:
                allOf:
                  - items: {}
                    type: array
                    title: Finetunes
                    description: List of finetunes created by the user
            title: MyFinetunesResponse
            refIdentifier: '#/components/schemas/MyFinetunesResponse'
            requiredProperties:
              - finetunes
        examples:
          example:
            value:
              finetunes:
                - <any>
        description: Successful Response
  deprecated: false
  type: path
components:
  schemas: {}

````