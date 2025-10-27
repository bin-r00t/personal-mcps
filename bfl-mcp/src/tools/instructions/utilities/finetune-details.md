# Finetune Details

> Get details about the training parameters and other metadata connected to a specific finetune_id that was created by the user.

## OpenAPI

````yaml https://api.bfl.ai/openapi.json get /v1/finetune_details
paths:
  path: /v1/finetune_details
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
      query:
        finetune_id:
          schema:
            - type: string
              required: true
              title: Finetune Id
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              finetune_details:
                allOf:
                  - additionalProperties: true
                    type: object
                    title: Finetune Details
                    description: Details about the parameters used for finetuning
            title: FinetuneDetailResponse
            refIdentifier: '#/components/schemas/FinetuneDetailResponse'
            requiredProperties:
              - finetune_details
        examples:
          example:
            value:
              finetune_details: {}
        description: Successful Response
    '422':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - items:
                      $ref: '#/components/schemas/ValidationError'
                    type: array
                    title: Detail
            title: HTTPValidationError
            refIdentifier: '#/components/schemas/HTTPValidationError'
        examples:
          example:
            value:
              detail:
                - loc:
                    - <string>
                  msg: <string>
                  type: <string>
        description: Validation Error
  deprecated: false
  type: path
components:
  schemas:
    ValidationError:
      properties:
        loc:
          items:
            anyOf:
              - type: string
              - type: integer
          type: array
          title: Location
        msg:
          type: string
          title: Message
        type:
          type: string
          title: Error Type
      type: object
      required:
        - loc
        - msg
        - type
      title: ValidationError

````