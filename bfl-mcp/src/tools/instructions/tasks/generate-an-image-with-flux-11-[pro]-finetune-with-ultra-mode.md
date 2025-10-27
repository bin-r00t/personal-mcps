# Generate an image with FLUX 1.1 [pro] finetune with ultra mode.

> Submits an image generation task with FLUX 1.1 [pro] finetune with ultra mode.

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/flux-pro-1.1-ultra-finetuned
paths:
  path: /v1/flux-pro-1.1-ultra-finetuned
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
                    description: ID of the fine-tuned model you want to use.
                    example: my-finetune
              finetune_strength:
                allOf:
                  - type: number
                    maximum: 2
                    minimum: 0
                    title: Finetune Strength
                    description: >-
                      Strength of the fine-tuned model. 0.0 means no influence,
                      1.0 means full influence. Allowed values up to 2.0
                    default: 1.2
              prompt:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Prompt
                    description: The prompt to use for image generation.
                    default: ''
                    example: A beautiful landscape with mountains and a lake
              seed:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Seed
                    description: >-
                      Optional seed for reproducibility. If not provided, a
                      random seed will be used.
                    example: 42
              aspect_ratio:
                allOf:
                  - type: string
                    title: Aspect Ratio
                    description: Aspect ratio of the image between 21:9 and 9:21
                    default: '16:9'
              safety_tolerance:
                allOf:
                  - type: integer
                    maximum: 6
                    minimum: 0
                    title: Safety Tolerance
                    description: >-
                      Tolerance level for input and output moderation. Between 0
                      and 6, 0 being most strict, 6 being least strict.
                    default: 2
                    example: 2
              output_format:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/OutputFormat'
                      - type: 'null'
                    description: >-
                      Output format for the generated image. Can be 'jpeg' or
                      'png'.
                    default: jpeg
              image_prompt:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Image Prompt
                    description: Optional image to remix in base64 format
              image_prompt_strength:
                allOf:
                  - type: number
                    maximum: 1
                    minimum: 0
                    title: Image Prompt Strength
                    description: Blend between the prompt and the image prompt
                    default: 0.1
              prompt_upsampling:
                allOf:
                  - type: boolean
                    title: Prompt Upsampling
                    description: >-
                      Whether to perform upsampling on the prompt. If active,
                      automatically modifies the prompt for more creative
                      generation
                    default: false
              webhook_url:
                allOf:
                  - anyOf:
                      - type: string
                        maxLength: 2083
                        minLength: 1
                        format: uri
                      - type: 'null'
                    title: Webhook Url
                    description: URL to receive webhook notifications
              webhook_secret:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Webhook Secret
                    description: Optional secret for webhook signature verification
            required: true
            title: FinetuneFluxUltraInput
            refIdentifier: '#/components/schemas/FinetuneFluxUltraInput'
            requiredProperties:
              - finetune_id
        examples:
          example:
            value:
              finetune_id: my-finetune
              finetune_strength: 1.2
              prompt: A beautiful landscape with mountains and a lake
              seed: 42
              aspect_ratio: '16:9'
              safety_tolerance: 2
              output_format: jpeg
              image_prompt: <string>
              image_prompt_strength: 0.1
              prompt_upsampling: false
              webhook_url: <string>
              webhook_secret: <string>
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    title: Id
              polling_url:
                allOf:
                  - type: string
                    title: Polling Url
            title: AsyncResponse
            refIdentifier: '#/components/schemas/AsyncResponse'
            requiredProperties:
              - id
              - polling_url
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    title: Id
              status:
                allOf:
                  - type: string
                    title: Status
              webhook_url:
                allOf:
                  - type: string
                    title: Webhook Url
            title: AsyncWebhookResponse
            refIdentifier: '#/components/schemas/AsyncWebhookResponse'
            requiredProperties:
              - id
              - status
              - webhook_url
        examples:
          example:
            value:
              id: <string>
              polling_url: <string>
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
    OutputFormat:
      type: string
      enum:
        - jpeg
        - png
      title: OutputFormat
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