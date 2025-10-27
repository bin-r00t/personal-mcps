# API Examples


## Bash Examples

submit_request.sh:  

```bash
# Install curl and jq, then run:
# Make sure to set your API key: export BFL_API_KEY="your_key_here"

request=$(curl -X 'POST' \
  'https://api.bfl.ai/v1/flux-kontext-pro' \
  -H 'accept: application/json' \
  -H "x-key: ${BFL_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
  "prompt": "A cat on its back legs running like a human is holding a big silver fish with its arms. The cat is running away from the shop owner and has a panicked look on his face. The scene is situated in a crowded market.",
  "aspect_ratio": "1:1",
}')

echo $request
request_id=$(jq -r .id <<< $request)
polling_url=$(jq -r .polling_url <<< $request)
echo "Request ID: ${request_id}"
echo "Polling URL: ${polling_url}"

```

<Tip>
A successful response will be a json object containing the request’s id and a polling_url that should be used to retrieve the result.
</Tip>




poll_results.sh:  

```bash

# This assumes that the request_id and polling_url variables are set from the previous step

while true
do
  sleep 0.5
  result=$(curl -s -X 'GET' \
    "${polling_url}" \
    -H 'accept: application/json' \
    -H "x-key: ${BFL_API_KEY}")
  
  status=$(jq -r .status <<< $result)
  echo "Status: $status"
  
  if [ "$status" == "Ready" ]
  then
    echo "Result: $(jq -r .result.sample <<< $result)"
    break
  elif [ "$status" == "Error" ] || [ "$status" == "Failed" ]
  then
    echo "Generation failed: $result"
    break
  fi
done

```


<Tip>
A successful response will be a JSON object containing the result, where result['sample'] is a signed URL for retrieval.
</Tip>


<Tip>
Image Delivery: The result.sample URLs are served from delivery endpoints (delivery-eu1.bfl.ai, delivery-us1.bfl.ai) and are not meant to be served directly to users. We recommend downloading the image and re-serving it from your own infrastructure. We do not enable CORS on delivery URLs.
</Tip>

## limits

1. Rate Limits: Sending requests to our API is limited to 24 active tasks. If you exceed your limit, you’ll receive a status code 429 and must wait until one of your previous tasks has finished.
2. Rate Limits: Additionally, due to capacity issues, for flux-kontext-max, the requests to our API is limited to 6 active tasks.



