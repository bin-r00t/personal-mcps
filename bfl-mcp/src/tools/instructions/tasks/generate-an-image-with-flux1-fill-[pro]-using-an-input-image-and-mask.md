# Generate an image with FLUX.1 Fill [pro] using an input image and mask.

> Submits an image generation task with the FLUX.1 Fill [pro] model using an input image and mask. Mask can be applied to alpha channel or submitted as a separate image.

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/flux-pro-1.0-fill
paths:
  path: /v1/flux-pro-1.0-fill
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
                      modify. Can contain alpha mask if desired.
              mask:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Mask
                    description: >-
                      A Base64-encoded string representing a mask for the areas
                      you want to modify in the image. The mask should be the
                      same dimensions as the image and in black and white. Black
                      areas (0%) indicate no modification, while white areas
                      (100%) specify areas for inpainting. Optional if you
                      provide an alpha mask in the original image. Validation:
                      The endpoint verifies that the dimensions of the mask
                      match the original image.
              prompt:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Prompt
                    description: >-
                      The description of the changes you want to make. This text
                      guides the inpainting process, allowing you to specify
                      features, styles, or modifications for the masked area.
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
            title: FluxProFillInputs
            refIdentifier: '#/components/schemas/FluxProFillInputs'
            requiredProperties:
              - image
        examples:
          example:
            value:
              image: <string>
              mask: <string>
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