# 1.Prompting Guide - Text to Image - Quick Reference

> Essential techniques for effective FLUX text-to-image prompting

## FLUX Prompt Framework

Use this structure for consistent results: **Subject + Action + Style + Context**

**Example**: "Red fox sitting in tall grass, wildlife documentary photography, misty dawn"

* **Subject**: The main focus (person, object, character)
* **Action**: What the subject is doing or their pose
* **Style**: Artistic approach, medium, or aesthetic
* **Context**: Setting, lighting, time, mood, or atmospheric conditions

<Frame caption="Example of a structured prompt">
  <img src="https://cdn.sanity.io/images/gsvmb6gz/production/7a355970ee9bd06d12b71473ce1e9911820b46c7-3570x965.jpg" alt="Prompt Example" />
</Frame>

## Use Structured Descriptions

Use natural language for relationships and descriptions, but direct specifications for technical and atmospheric elements.

1. "Human explorer in futuristic gear walking through cyberpunk forest, dramatic atmospheric lighting, sci-fi fantasy art style, cinematic composition"

2. "An astronaut with a silver spacesuit floating outside the International Space Station, cinematic photography with dramatic lighting, peaceful and awe-inspiring"

3. "Retro game style detective in old school suit, upper body shot, colorful, futuristic design with vibrant glow"

<Columns cols={3}>
  <Frame>
    <img src="https://cdn.sanity.io/images/gsvmb6gz/production/2ece687d9dbad9b713ea052637a25ef00fe6c5e1-2752x1536.jpg" alt="Human explorer in forest" />
  </Frame>

  <Frame>
    <img src="https://cdn.sanity.io/images/gsvmb6gz/production/ca9a8a1e71054617017e5bc04fed55502f3e52b8-2752x1536.jpg" alt="Astronaut in space" />
  </Frame>

  <Frame>
    <img src="https://cdn.sanity.io/images/gsvmb6gz/production/d3d47bdf93b26e2bb92908038ace98369b5be620-2752x1536.jpg" alt="Futuristic detective" />
  </Frame>
</Columns>

## Word Order Matters

Front-load your most important elements. FLUX pays more attention to what comes first.

**Priority order**: Main subject → Key action → Critical style → Essential context → Secondary details

## Enhancement Layers

Build beyond the basic framework with these optional layers:

**Foundation**: Subject + Action + Style + Context

**+ Visual Layer**: Specific lighting, color palette, composition details

**+ Technical Layer**: Camera settings, lens specs, quality markers

**+ Atmospheric Layer**: Mood, emotional tone, narrative elements

**Example progression**:

* Foundation: "An astronaut floating outside the space station, cinematic photography"
* Enhanced: "An astronaut with silver spacesuit floating gracefully outside the International Space Station, cinematic photography with dramatic lighting, bathed in golden sunlight, deep blue Earth tones, shallow depth of field, 85mm lens, conveying wonder and achievement"

## Optimal Prompt Length

**Short (10-30 words)**: Quick concepts and style exploration

**Medium (30-80 words)**: Usually ideal for most projects

**Long (80+ words)**: Complex scenes requiring detailed specifications

## Avoiding Negative Prompts in FLUX: Positive Alternatives

Instead of "no crowds," write "peaceful solitude"
Instead of "without glasses," write "clear, unobstructed eyes"

Ask: "If this thing wasn't there, what would I see instead?"

## Quick Templates

**Portrait**: `[Subject description], [pose/expression], [style], [lighting], [background]`

**Product**: `[Product details], [placement], [lighting setup], [style], [mood]`

**Landscape**: `[Location/setting], [time/weather], [camera angle], [style], [atmosphere]`

**Architecture**: `[Building/space], [perspective], [lighting], [style], [mood]`

## Text Integration

FLUX can generate readable text in images when you describe it clearly. Here's how to get good text results:

* **Use quotation marks**: "The text 'OPEN' appears in red neon letters above the door"

* **Specify placement**: Where the text appears in relation to other elements

* **Describe style**: "elegant serif typography" or "bold industrial lettering"

## Common Use Case Patterns

Different types of images work better with different prompt structures. Put the most important elements first based on what you want to emphasize:

### Character-focused

For portraits, character art: Start with detailed character description and then add the rest of the prompt.

> Detailed character → Action → Style → Context

**Building progression**:

1. **Foundation**: *"Elderly wizard with long white beard and piercing blue eyes"*
2. **+ Action**: *"Elderly wizard with long white beard and piercing blue eyes, casting a spell"*
3. **+ Style**: *"Elderly wizard with long white beard and piercing blue eyes, casting a spell, fantasy art style"*
4. **+ Context**: *"Elderly wizard with long white beard and piercing blue eyes, casting a spell, fantasy art style, in a magical forest clearing"*

### Context-focused

For landscapes, architectural shots: Lead with the setting and then add the rest of the prompt.

> Setting → Atmospheric conditions → Style → Technical specs

**Building progression**:

1. **Foundation**: *"Ancient Greek temple ruins"*
2. **+ Atmosphere**: *"Ancient Greek temple ruins at sunset, golden hour lighting"*
3. **+ Style**: *"Ancient Greek temple ruins at sunset, golden hour lighting, cinematic photography style"*
4. **+ Details**: *"Ancient Greek temple ruins at sunset, golden hour lighting, cinematic photography style, with scattered marble columns"*

### Style-focused

For artistic interpretations: Begin with the art style or reference and then add the rest of the prompt.

> Artistic reference → Subject → Context → Technical execution

**Building progression**:

1. **Foundation**: *"Van Gogh painting style with swirling brushstrokes"*
2. **+ Subject**: *"Van Gogh painting style with swirling brushstrokes, depicting a modern city street"*
3. **+ Context**: *"Van Gogh painting style with swirling brushstrokes, depicting a modern city street, vibrant blues and yellows"*
4. **+ Technical**: *"Van Gogh painting style with swirling brushstrokes, depicting a modern city street, vibrant blues and yellows, impressionist technique"*

### Technical-focused

For professional photography: Start with the subject and then add the rest of the prompt, finishing with camera settings.

> Subject → Background → Lighting → Lens/settings

**Building progression**:

1. **Foundation**: *"Professional headshot of a business executive"*
2. **+ Background**: *"Professional headshot of a business executive, clean white background"*
3. **+ Lighting**: *"Professional headshot of a business executive, clean white background, studio lighting"*
4. **+ Technical**: *"Professional headshot of a business executive, clean white background, studio lighting, 85mm lens, f/1.4, shallow depth of field"*

## Professional Photography Control (Advanced)

**Background blur vs. sharpness (f-numbers)**: Usually called "aperture", the f-number controls how blurry vs. sharp your background is. Small numbers (`f/1.4`) blur the background; big numbers (`f/8`) keep everything sharp.

**Scene width & zoom (mm numbers)**: Usually called "focal length", the `mm` number controls how much of the scene you see and how "zoomed in" it looks. Small numbers (`24mm`) show wide scenes; big numbers (`85mm`) zoom in closer.

**Lighting**: Allow you to control the lighting style in the image. For instance, `"Rembrandt lighting"` for dramatic portraits, `"golden hour"` for warm atmosphere

**Example**: "Professional headshot, 85mm lens, f/2.8, Rembrandt lighting, corporate setting"

## Quality Control Checklist

* Does your prompt include the core framework elements?
* Are your most important elements mentioned first?
* Have you replaced vague terms with specific descriptors?
* Are you describing what you want to see, not what you want to avoid?
* Do all elements work together toward a unified vision?

## Ready to Start Creating?

<Columns cols={2}>
  <Card title="Test in the Playground" href="https://playground.bfl.ai">
    Try these prompting techniques instantly with our FLUX models without writing code
  </Card>

  <Card title="Generate Images with API" href="/quick_start/generating_images">
    Start generating images with [the Playground](https://playground.bfl.ai) or [make your first API call](/quick_start/generating_images).
  </Card>
</Columns>

## Learn More about Prompting

<Columns cols={2}>
  <Card title="Fundamentals Guide" href="/guides/prompting_guide_t2i_fundamentals">
    Understand the core framework with detailed explanations and examples
  </Card>

  <Card title="Enhancement Techniques" href="/guides/prompting_guide_t2i_essentials">
    For more complex techniques, explore [Advanced Techniques](/guides/prompting_guide_t2i_advanced) for layered compositions, style fusion, and cinematic approaches.
  </Card>

  <Card title="Advanced Methods" href="/guides/prompting_guide_t2i_advanced">
    Explore advanced techniques for layered compositions, style fusion, and cinematic techniques
  </Card>
 
</Columns>


# 2.Working Without Negative Prompts

> Learn how to achieve precise results in FLUX without negative prompts

FLUX models don't support negative prompts. Even if they could process negatives, AI models generally struggle with negation. When you write "a person without glasses," the model focuses on the word "glasses" and often generates exactly what you're trying to avoid.

## Turn Negatives Into Positives

When you want to exclude something from your image, resist the urge to write what you don't want. Instead, describe the **positive visual opposite** of what you're trying to avoid.

Ask yourself: **"If this thing wasn't there, what would I see instead?"**

## The Replacement Strategy

When you catch yourself writing negative phrases, use this mental process:

1. **Identify the unwanted element**: "no crowds"
2. **Ask what replaces it**: "What would be there instead?"
3. **Describe the positive**: "peaceful solitude" or "empty spaces"

**Common replacements**:

* "no people" → "empty", "deserted", "solitary"
* "without clothes" → "bare skin", "natural form"
* "no colors" → "monochrome", "black and white", "grayscale"
* "no text" → "clean surfaces", "unmarked", "blank"
* "no modern elements" → "traditional", "historical", "period-accurate"

## Advanced Positive Framing

**For atmosphere**: Instead of "not dark," use "brightly lit" or "sun-drenched"

**For emotions**: Instead of "not sad," use "joyful" or "content"

**For actions**: Instead of "not running," use "walking peacefully" or "standing still"

**For quantities**: Instead of "not many," use "few", "single", or "minimal"

### Practical Examples

<AccordionGroup>
  <Accordion title="Context & Setting">
    1. **Instead of**: "a street with no cars"\
       **Write**: "a quiet pedestrian walkway with cobblestones"

    2. **Instead of**: "a landscape without buildings"\
       **Write**: "pristine wilderness with untouched natural terrain"

    3. **Instead of**: "a room with no furniture"\
       **Write**: "a spacious empty room with polished wooden floors"
  </Accordion>

  <Accordion title="Character & Portrait">
    4. **Instead of**: "a person without a hat"\
       **Write**: "a person with natural hair flowing freely"

    5. **Instead of**: "a portrait with no glasses"\
       **Write**: "a portrait showing clear, unobstructed eyes"
  </Accordion>

  <Accordion title="Objects & Props">
    6. **Instead of**: "a table without food"\
       **Write**: "a clean marble table set with elegant empty plates"
  </Accordion>
</AccordionGroup>

<Tip>
  When building prompts with positive alternatives, maintain the [Subject + Action + Style + Context framework](/guides/prompting_guide_t2i_fundamentals#basic-prompt-structure) for best results.
</Tip>

## Advanced Positive Techniques

<AccordionGroup>
  <Accordion title="Compositional Control">
    Instead of describing what shouldn't be in frame, describe what fills the space:

    **Weak**: "portrait with no background distractions"
    **Strong**: "portrait with smooth gradient background transitioning from deep blue to black"
  </Accordion>

  <Accordion title="Style Specifications">
    Instead of avoiding certain artistic elements, specify the desired aesthetic:

    **Weak**: "not too realistic"
    **Strong**: "stylized illustration with simplified forms and bold color blocks"
  </Accordion>

  <Accordion title="Mood and Atmosphere">
    Frame emotional tone positively:

    **Weak**: "not scary or threatening"\
    **Strong**: "peaceful, welcoming, and warm atmosphere with soft golden lighting"
  </Accordion>
</AccordionGroup>

## When Positive Alternatives Don't Work

If you're still getting unwanted elements despite positive framing:

1. **Be more specific** about what you do want in that space
2. **Front-load the positive description** following [word order principles](/guides/prompting_guide_t2i_fundamentals#word-order-importance)
3. **Add more descriptive detail** to strengthen the positive alternative
4. **Use environmental context** to make the positive element more natural

**Example progression**:

* Basic: "A beach"
* Enhanced: "Empty beach with palm trees and gentle waves"
* Detailed: "Empty beach with palm trees and gentle waves, golden sunset, IMAX-quality look"
 

<Tip>
  Think visually about what you want to see, not what to avoid.
</Tip>


