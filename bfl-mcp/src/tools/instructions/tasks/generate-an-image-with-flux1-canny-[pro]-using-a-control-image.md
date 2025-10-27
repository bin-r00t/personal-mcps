# Generate an image with FLUX.1 Canny [pro] using a control image.

> Submits an image generation task with FLUX.1 Canny [pro].

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/flux-pro-1.0-canny
paths:
  path: /v1/flux-pro-1.0-canny
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
              prompt:
                allOf:
                  - type: string
                    title: Prompt
                    description: Text prompt for image generation
                    example: ein fantastisches bild
              control_image:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Control Image
                    description: >-
                      Base64 encoded image to use as control input if no
                      preprocessed image is provided
              preprocessed_image:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Preprocessed Image
                    description: >-
                      Optional pre-processed image that will bypass the control
                      preprocessing step
              canny_low_threshold:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 500
                        minimum: 0
                      - type: 'null'
                    title: Canny Low Threshold
                    description: Low threshold for Canny edge detection
                    default: 50
              canny_high_threshold:
                allOf:
                  - anyOf:
                      - type: integer
                        maximum: 500
                        minimum: 0
                      - type: 'null'
                    title: Canny High Threshold
                    description: High threshold for Canny edge detection
                    default: 200
              prompt_upsampling:
                allOf:
                  - anyOf:
                      - type: boolean
                      - type: 'null'
                    title: Prompt Upsampling
                    description: Whether to perform upsampling on the prompt
                    default: false
              seed:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Seed
                    description: Optional seed for reproducibility
                    example: 42
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
              output_format:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/OutputFormat'
                      - type: 'null'
                    description: >-
                      Output format for the generated image. Can be 'jpeg' or
                      'png'.
                    default: jpeg
              guidance:
                allOf:
                  - anyOf:
                      - type: number
                        maximum: 100
                        minimum: 1
                      - type: 'null'
                    title: Guidance
                    description: Guidance strength for the image generation process
                    default: 30
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
            title: CannyInputs
            refIdentifier: '#/components/schemas/CannyInputs'
            requiredProperties:
              - prompt
        examples:
          example:
            value:
              prompt: ein fantastisches bild
              control_image: <string>
              preprocessed_image: <string>
              canny_low_threshold: 250
              canny_high_threshold: 250
              prompt_upsampling: true
              seed: 42
              steps: 32
              output_format: jpeg
              guidance: 50.5
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