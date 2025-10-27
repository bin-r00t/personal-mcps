# Delete Finetune

> Delete a finetune_id that was created by the user

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/delete_finetune
paths:
  path: /v1/delete_finetune
  method: post
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
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              finetune_id:
                allOf:
                  - type: string
                    title: Finetune Id
                    description: ID of the fine-tuned model you want to delete.
                    example: my-finetune
            required: true
            title: DeleteFinetuneInputs
            refIdentifier: '#/components/schemas/DeleteFinetuneInputs'
            requiredProperties:
              - finetune_id
        examples:
          example:
            value:
              finetune_id: my-finetune
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    title: Status
                    description: Status of the deletion
              message:
                allOf:
                  - type: string
                    title: Message
                    description: Message about the deletion
              deleted_finetune_id:
                allOf:
                  - type: string
                    title: Deleted Finetune Id
                    description: ID of the deleted finetune
              timestamp:
                allOf:
                  - type: string
                    title: Timestamp
                    description: Timestamp of the deletion
            title: DeleteFinetuneResponse
            refIdentifier: '#/components/schemas/DeleteFinetuneResponse'
            requiredProperties:
              - status
              - message
              - deleted_finetune_id
              - timestamp
        examples:
          example:
            value:
              status: <string>
              message: <string>
              deleted_finetune_id: <string>
              timestamp: <string>
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