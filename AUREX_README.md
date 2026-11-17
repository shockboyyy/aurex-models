# AUREX – AI-Powered Music Genre and Mood Classification

AUREX is a browser-based music analysis application developed as an academic project. It analyses an uploaded audio track and presents genre-style predictions and five independent mood scores through an interactive dashboard.

## Project overview

AUREX combines pretrained ONNX models with browser-based audio processing. Audio is processed locally in the browser after the model assets have been downloaded. The application does not send the uploaded audio to a remote inference API.

### Main features

- Music-style classification using Discogs-EffNet.
- Five mood outputs: Happy, Sad, Aggressive, Relaxed and Party.
- Mood radar chart and segment-based mood timeline.
- Rule-based DJ Track Character interpretation based on the model outputs.
- Audio playback, volume control, live frequency visualisation and animated standby visualiser.
- Single-track analysis; the current application limits audio duration to 10 minutes.

## How it works

1. The user selects an audio file in the browser.
2. The Web Audio API decodes the audio.
3. The application converts the audio to mono and resamples it to 16 kHz.
4. Essentia.js computes MusiCNN-compatible Mel features. The implementation uses 512-sample frames, a 256-sample hop, and 96 Mel bands.
5. The features are arranged into patches of 128 frames with a patch hop of 62 frames.
6. ONNX Runtime Web runs the Discogs-EffNet model in the browser.
7. The genre model produces 400 style scores and a 1,280-value embedding for each patch.
8. Five mood ONNX models receive the 1,280-value embedding and return their respective mood scores.
9. AUREX aggregates the patch-level outputs and displays the results.

Mood outputs are independent scores. They should not be interpreted as a probability distribution that must sum to 100%.

The DJ Track Character text is a rule-based interpretation of the classification outputs; it is not a separately trained model.

## Technologies

- HTML, CSS and JavaScript
- Web Audio API and OfflineAudioContext
- Essentia.js 0.1.3 (including its WebAssembly build)
- ONNX Runtime Web (loaded from the jsDelivr CDN; the source currently references the unpinned `dist/ort.min.js` URL)
- ONNX model assets hosted in the `shockboyyy/aurex-models` GitHub repository

## Running the application

The application was built for the Ancient Brain platform.

1. Sign in to Ancient Brain.
2. Open the AUREX project.
3. Upload or paste the latest application source file into the project editor, following the platform's project format.
4. Save and run the project.
5. Allow the browser to download the model assets on first use.
6. Use the audio upload control to select a track and start analysis.

The application requires an internet connection to load the JavaScript libraries and model files. Once loaded, audio inference is performed in the browser.

## Model assets

The application source references these files in the `main` branch of the model repository:

### Genre model
- `discogs-effnet-bsdynamic-1.onnx`
- `discogs-effnet-bsdynamic-1.json`

### Mood models
- `mood_happy-discogs-effnet-1.onnx` and matching `.json`
- `mood_sad-discogs-effnet-1.onnx` and matching `.json`
- `mood_aggressive-discogs-effnet-1.onnx` and matching `.json`
- `mood_relaxed-discogs-effnet-1.onnx` and matching `.json`
- `mood_party-discogs-effnet-1.onnx` and matching `.json`

The model files are loaded from:
`https://raw.githubusercontent.com/shockboyyy/aurex-models/main/`

This README describes the filenames referenced by the application source. Confirm that each asset exists in the repository before publishing or submitting the repository.

## Repository structure (suggested)

```text
aurex-models/
├── README.md
├── MODEL_CARD.md
├── discogs-effnet-bsdynamic-1.onnx
├── discogs-effnet-bsdynamic-1.json
├── mood_happy-discogs-effnet-1.onnx
├── mood_happy-discogs-effnet-1.json
├── mood_sad-discogs-effnet-1.onnx
├── mood_sad-discogs-effnet-1.json
├── mood_aggressive-discogs-effnet-1.onnx
├── mood_aggressive-discogs-effnet-1.json
├── mood_relaxed-discogs-effnet-1.onnx
├── mood_relaxed-discogs-effnet-1.json
├── mood_party-discogs-effnet-1.onnx
└── mood_party-discogs-effnet-1.json
```

Only include files that are actually present and that you have permission to redistribute. The application source itself may be kept in the Ancient Brain project or added separately if appropriate.

## Limitations

- Predictions are model outputs and may not always match human perception.
- The project has not been formally evaluated against a labelled benchmark dataset unless a separate evaluation has been carried out.
- The 400 style labels represent the model's supported label set; they do not guarantee reliable recognition of every subgenre.
- Mood scores are independent model outputs and should not be treated as calibrated probabilities without evidence.
- The DJ Track Character feature is rule-based.
- Model download and inference performance depend on the browser, device and network.

## Credits and references

AUREX uses and builds upon the work of the original model and software authors. The project team should retain the original model metadata and licence files and cite the sources below in project documentation.

- Essentia – audio analysis and music information retrieval library: https://essentia.upf.edu/
- Essentia.js documentation: https://mtg.github.io/essentia.js/
- Essentia.js source repository: https://github.com/MTG/essentia.js
- ONNX Runtime Web documentation: https://onnxruntime.ai/docs/get-started/with-javascript/web.html
- ONNX Runtime Web JavaScript API: https://onnxruntime.ai/docs/api/js/
- AUREX model asset repository: https://github.com/shockboyyy/aurex-models
- Ancient Brain: https://ancientbrain.com/

### Attribution and licensing

Do not claim authorship of the pretrained models or third-party libraries. Check the licence included with each model and software dependency before redistributing the files. Preserve copyright notices, model cards, metadata and attribution requirements. The licence for the application code is separate from the licences for the model weights and dependencies.

## Project team

- Aakash Kumar Thangavel
- Om Hospattana Krishna

This README describes the AUREX application and the model assets it references. Update it if the implementation, model versions, repository contents or deployment method changes.
