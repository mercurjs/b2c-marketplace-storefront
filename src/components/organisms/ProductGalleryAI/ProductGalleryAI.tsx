"use client";

import { HttpTypes } from '@medusajs/types';
import { useState } from "react";

export const ProductGalleryAI = ({
  images,
}: {
  images: HttpTypes.StoreProduct['images'];
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [promptInput, setPromptInput] = useState<string>("Add the furniture from object image to the good position in room image");

  const endpointUrl = "https://modelslab.com/api/v6/interior/interior_mixer";

  function getFile(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement & { files: FileList };

    if (!target.files || target.files.length === 0) return;

    const selectedFile = target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      console.log("file result", result);
      setPreview(result);
    };
    reader.readAsDataURL(selectedFile);
  }

  async function convertBase64ToUrl(base64String: string): Promise<string> {
    const response = await fetch("https://modelslab.com/api/v6/base64_to_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.NEXT_PUBLIC_MODELSLAB_KEY,
        base64_string: base64String,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.status === "error") {
      throw new Error(result.message || "Failed to convert base64 to URL");
    }

    return result.output[0];
  }

  async function pollForResult(fetchUrl: string, maxAttempts = 60): Promise<string> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      setProgress(`Checking status... (attempt ${attempt + 1})`);

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: process.env.NEXT_PUBLIC_MODELSLAB_KEY,
        }),
      });

      const result = await response.json();
      console.log(`Poll attempt ${attempt + 1}:`, result);

      // Check if generation is complete
      if (result.status === "success" && result.output && result.output.length > 0) {
        return result.output[0];
      }

      // Check if there was an error
      if (result.status === "error") {
        throw new Error(result.message || "Image generation failed");
      }

      // If still processing, wait before next attempt
      if (result.status === "processing") {
        const waitTime = Math.min(result.eta || 3, 5) * 1000; // Wait based on ETA, max 5 seconds
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      // Default wait time
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    throw new Error("Image generation timed out");
  }

  async function makeApiRequest() {
    if (!preview) {
      console.error("No image selected");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setProgress("Starting...");

    try {
      setProgress("Converting image to URL...");
      const initImageUrl = await convertBase64ToUrl(preview);
      const objectImageUrl = images?.length
        ? encodeURI(decodeURIComponent(images[0].url || ''))
        : ''; // Fallback to empty string if no images

      if (!objectImageUrl) {
        throw new Error("No product image available for processing");
      }

      const requestBody = {
        init_image: initImageUrl,
        object_image: objectImageUrl,
        prompt: promptInput,
        //width: not wanted,
        //height: not wanted,
        model_id: "Interior-Mixer",
        key: process.env.NEXT_PUBLIC_MODELSLAB_KEY,
      };

      setProgress("Submitting generation request...");
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const text = await response.text();
      let result: any;
      try {
        result = JSON.parse(text);
      } catch {
        result = { raw: text };
      }

      if (!response.ok || result.status === "error") {
        console.error("API error:", result);
        throw new Error(
          result.error?.message || result.message || `HTTP ${response.status}`
        );
      }

      console.log("Initial API Response:", result);

      // Check if we got a fetch_result URL to poll
      if (result.fetch_result) {
        setProgress(`Generation in progress (ETA: ~${result.eta || 30}s)...`);
        const imageUrl = await pollForResult(result.fetch_result);
        setGeneratedImage(imageUrl);
        console.log("Generated image URL:", imageUrl);
        setProgress("Complete!");
      } else if (result.output && result.output.length > 0) {
        // In case it returns immediately (unlikely but possible)
        setGeneratedImage(result.output[0]);
        console.log("Generated image URL:", result.output[0]);
        setProgress("Complete!");
      } else {
        throw new Error("No fetch URL or output returned from API");
      }

      return result;
    } catch (error) {
      console.error("Error making API request:", error);
      setProgress(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-5">
      <div id="roomImages" className="flex flex-col md:flex-row">
        <div id="initRoomImage" className="w-1/2 md:w-full">
          <div>
            {preview && (
              <div className="mt-5">
                <h3>Selected Image:</h3>
                <img
                  src={preview}
                  alt="Selected"
                  className="max-w-[400px] border-2 border-gray-300"
                />
              </div>
            )}

            <div className="mt-5">
              <input 
                id="browseFile" 
                type="file" 
                name="file" 
                onChange={getFile} 
                accept="image/*" 
                className="hidden"
              />
              <label 
                htmlFor="browseFile"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                📁 Choose Initial Room Image
              </label>
              {file && (
                <span className="ml-3 text-sm text-gray-600">
                  {file.name}
                </span>
              )}
            </div>

            <div id="prompt" className="mt-5 flex items-start gap-2.5">
              <label className="pt-2">Prompt:</label>
              <textarea
                className="w-full md:w-1/2"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe the interior design you want..."
                rows={2}
              />
            </div>

            <button id="buttonGenerate"
              onClick={makeApiRequest}
              disabled={isLoading || !preview}
              className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isLoading ? "Processing..." : "Generate New Interior Image"}
            </button>

            {progress && (
              <p className="mt-2.5 text-gray-600 italic">
                {progress}
              </p>
            )}
          </div>
        </div>

        <div id="newRoomImage" className="w-1/2 md:w-full">
          {generatedImage && (
            <div className="mt-5">
              <h3>Generated Result:</h3>
              <img
                src={generatedImage}
                alt="Generated interior"
                className="max-w-[600px] border-2 border-green-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
