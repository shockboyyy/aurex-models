
/*
 * AUREX - Essentia Mel Feature Extraction Worker
 * Uses Essentia.js official TensorFlow input extractor.
 */

importScripts(
    "https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.umd.js"
);

importScripts(
    "https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-model.umd.js"
);

const EssentiaWASM = Module;

let extractor = null;

try {
    extractor = new EssentiaModel.EssentiaTFInputExtractor(
        EssentiaWASM,
        "musicnn",
        false
    );

    self.postMessage({
        type: "ready",
        message: "Essentia extractor initialised"
    });
} catch (error) {
    self.postMessage({
        type: "error",
        message: error.message
    });
}

self.onmessage = function(event) {
    if (!extractor) {
        self.postMessage({
            type: "error",
            message: "Extractor is not initialised"
        });
        return;
    }

    try {
        const audioSignal = new Float32Array(event.data.audioSignal);

        const features = extractor.computeFrameWise(
            audioSignal,
            256
        );

        self.postMessage({
            type: "features",
            features: features
        });

    } catch (error) {
        self.postMessage({
            type: "error",
            message: error.message
        });
    }
};
