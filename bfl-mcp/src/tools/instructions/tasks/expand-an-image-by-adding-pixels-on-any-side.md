# Expand an image by adding pixels on any side.

> Submits an image expansion task that adds the specified number of pixels to any combination of sides (top, bottom, left, right) while maintaining context.

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/flux-pro-1.0-expand
paths:
  path: /v1/flux-pro-1.0-expand
  method: post
  servers:
    - url: https://api.bfl.ai
      description: BFL API
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
              image:
                allOf:
                  - type: string
                    title: Image
                    description: >-
                      A Base64-encoded string representing the image you wish to
                      expand.
              top:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 2048
                        minimum: 0
                      - type: 'null'
                    title: Top
                    description: Number of pixels to expand at the top of the image
                    default: 0
              bottom:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 2048
                        minimum: 0
                      - type: 'null'
                    title: Bottom
                    description: Number of pixels to expand at the bottom of the image
                    default: 0
              left:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 2048
                        minimum: 0
                      - type: 'null'
                    title: Left
                    description: Number of pixels to expand on the left side of the image
                    default: 0
              right:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 2048
                        minimum: 0
                      - type: 'null'
                    title: Right
                    description: Number of pixels to expand on the right side of the image
                    default: 0
              prompt:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Prompt
                    description: >-
                      The description of the changes you want to make. This text
                      guides the expansion process, allowing you to specify
                      features, styles, or modifications for the expanded areas.
                    default: ''
                    example: ein fantastisches bild
              steps:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 50
                        minimum: 15
                      - type: 'null'
                    title: Steps
                    description: Number of steps for the image generation process
                    default: 50
                    example: 50
              prompt_upsampling:
                allOf:
                  - anyOf:
                      - type: boolean
                      - type: 'null'
                    title: Prompt Upsampling
                    description: >-
                      Whether to perform upsampling on the prompt. If active,
                      automatically modifies the prompt for more creative
                      generation
                    default: false
              seed:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Seed
                    description: Optional seed for reproducibility
              guidance:
                allOf:
                  - anyOf:
                      - type: number
                        maximum: 100
                        minimum: 1.5
                      - type: 'null'
                    title: Guidance
                    description: Guidance strength for the image generation process
                    default: 60
              output_format:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/OutputFormat'
                      - type: 'null'
                    description: >-
                      Output format for the generated image. Can be 'jpeg' or
                      'png'.
                    default: jpeg
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
            title: FluxProExpandInputs
            refIdentifier: '#/components/schemas/FluxProExpandInputs'
            requiredProperties:
              - image
        examples:
          example:
            value:
              image: <string>
              top: 1024
              bottom: 1024
              left: 1024
              right: 1024
              prompt: ein fantastisches bild
              steps: 50
              prompt_upsampling: true
              seed: 123
              guidance: 50.75
              output_format: jpeg
              safety_tolerance: 2
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