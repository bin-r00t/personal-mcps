# Generate an image with FLUX [pro] finetune.

> Submits an image generation task with FLUX [pro] finetune.

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/flux-pro-finetuned
paths:
  path: /v1/flux-pro-finetuned
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
                    default: 1.1
              steps:
                allOf:
                  - type: integer
                    maximum: 50
                    minimum: 1
                    title: Steps
                    description: Number of steps for the fine-tuning process.
                    default: 40
                    example: 40
              guidance:
                allOf:
                  - type: number
                    maximum: 5
                    minimum: 1.5
                    title: Guidance
                    description: >-
                      Guidance scale for image generation. High guidance scales
                      improve prompt adherence at the cost of reduced realism.
                    default: 2.5
                    example: 2.5
              prompt:
                allOf:
                  - type: string
                    title: Prompt
                    description: Text prompt for image generation.
                    default: ''
                    example: ein fantastisches bild
              image_prompt:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Image Prompt
                    description: Optional base64 encoded image to use with Flux Redux.
              width:
                allOf:
                  - type: integer
                    multipleOf: 32
                    maximum: 1440
                    minimum: 256
                    title: Width
                    description: >-
                      Width of the generated image in pixels. Must be a multiple
                      of 32.
                    default: 1024
              height:
                allOf:
                  - type: integer
                    multipleOf: 32
                    maximum: 1440
                    minimum: 256
                    title: Height
                    description: >-
                      Height of the generated image in pixels. Must be a
                      multiple of 32.
                    default: 768
              prompt_upsampling:
                allOf:
                  - type: boolean
                    title: Prompt Upsampling
                    description: >-
                      Whether to perform upsampling on the prompt. If active,
                      automatically modifies the prompt for more creative
                      generation.
                    default: false
              seed:
                allOf:
                  - type: integer
                    title: Seed
                    description: Optional seed for reproducibility.
                    example: 42
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
                  - $ref: '#/components/schemas/OutputFormat'
                    description: >-
                      Output format for the generated image. Can be 'jpeg' or
                      'png'.
                    default: jpeg
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
            title: FluxProFinetuneInputs
            refIdentifier: '#/components/schemas/FluxProFinetuneInputs'
            requiredProperties:
              - finetune_id
        examples:
          example:
            value:
              finetune_id: my-finetune
              finetune_strength: 1.1
              steps: 40
              guidance: 2.5
              prompt: ein fantastisches bild
              image_prompt: <string>
              width: 1024
              height: 768
              prompt_upsampling: false
              seed: 42
              safety_tolerance: 2
              output_format: jpeg
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