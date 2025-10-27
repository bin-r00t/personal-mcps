# Finetune

## OpenAPI

````yaml https://api.bfl.ai/openapi.json post /v1/finetune
paths:
  path: /v1/finetune
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
              file_data:
                allOf:
                  - type: string
                    title: File Data
                    description: >-
                      Base64-encoded ZIP file containing training images and,
                      optionally, corresponding captions.
              finetune_comment:
                allOf:
                  - type: string
                    title: Finetune Comment
                    description: >-
                      Comment or name of the fine-tuned model. This will be
                      added as a field to the finetune_details.
                    example: my-first-finetune
              trigger_word:
                allOf:
                  - type: string
                    title: Trigger Word
                    description: Trigger word for the fine-tuned model.
                    default: TOK
                    example: TOK
              mode:
                allOf:
                  - type: string
                    enum:
                      - general
                      - character
                      - style
                      - product
                    title: Mode
                    description: >-
                      Mode for the fine-tuned model. Allowed values are
                      'general', 'character', 'style', 'product'. This will
                      affect the caption behaviour. General will describe the
                      image in full detail.
              iterations:
                allOf:
                  - type: integer
                    maximum: 1000
                    minimum: 100
                    title: Iterations
                    description: Number of iterations for fine-tuning.
                    default: 300
              learning_rate:
                allOf:
                  - anyOf:
                      - type: number
                        maximum: 0.005
                        minimum: 0.000001
                      - type: 'null'
                    title: Learning Rate
                    description: >-
                      Learning rate for fine-tuning. If not provided, defaults
                      to 1e-5 for full fine-tuning and 1e-4 for lora
                      fine-tuning.
              captioning:
                allOf:
                  - type: boolean
                    title: Captioning
                    description: Whether to enable captioning during fine-tuning.
                    default: true
              priority:
                allOf:
                  - type: string
                    enum:
                      - speed
                      - quality
                      - high_res_only
                    title: Priority
                    description: >-
                      Priority of the fine-tuning process. 'speed' will
                      prioritize iteration speed over quality, 'quality' will
                      prioritize quality over speed.
                    default: quality
              finetune_type:
                allOf:
                  - type: string
                    enum:
                      - lora
                      - full
                    title: Finetune Type
                    description: >-
                      Type of fine-tuning. 'lora' is a standard LoRA Adapter,
                      'full' is a full fine-tuning mode, with a post hoc lora
                      extraction.
                    default: full
              lora_rank:
                allOf:
                  - type: integer
                    enum:
                      - 16
                      - 32
                    title: Lora Rank
                    description: >-
                      Rank of the fine-tuned model. 16 or 32. If finetune_type
                      is 'full', this will be the rank of the extracted lora
                      model.
                    default: 32
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
            title: FinetuneInputs
            refIdentifier: '#/components/schemas/FinetuneInputs'
            requiredProperties:
              - file_data
              - finetune_comment
              - mode
        examples:
          example:
            value:
              file_data: <string>
              finetune_comment: my-first-finetune
              trigger_word: TOK
              mode: general
              iterations: 300
              learning_rate: 0.0025005
              captioning: true
              priority: quality
              finetune_type: full
              lora_rank: 32
              webhook_url: <string>
              webhook_secret: <string>
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
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