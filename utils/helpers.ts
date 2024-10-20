import { Image } from "react-native";

export function formatNumber(num: number) {
  if (!num) return "0";

  if (Math.abs(num) >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "t";
  } else if (Math.abs(num) >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "b";
  } else if (Math.abs(num) >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (Math.abs(num) >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return num.toString();
  }
}

const formatSize = (bytes: number): string => {
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(2)} KB`;
  }

  const megabytes = kilobytes / 1024;
  if (megabytes < 1024) {
    return `${megabytes.toFixed(2)} MB`;
  }

  const gigabytes = megabytes / 1024;
  if (gigabytes < 1024) {
    return `${gigabytes.toFixed(2)} GB`;
  }

  const terabytes = gigabytes / 1024;
  return `${terabytes.toFixed(8)} TB`;
};

export const getImageDetails = async (
  url: string
): Promise<{ size: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    try {
      // Get the image dimensions
      Image.getSize(
        url,
        async (width, height) => {
          try {
            // Fetch the image bytes
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onloadend = () => {
              const arrayBuffer = reader.result as ArrayBuffer;
              const bytes = new Uint8Array(arrayBuffer);

              // Calculate and format size
              const formattedSize = formatSize(bytes.length);

              // Resolve the details
              const details = {
                size: formattedSize,
                width,
                height,
              };

              resolve(details);
            };
          } catch (error: any) {
            reject("Error fetching image bytes: " + error.message);
          }
        },
        (error: any) => {
          reject("Failed to get image dimensions: " + error.message);
        }
      );
    } catch (error: any) {
      reject("Error fetching image details: " + error.message);
    }
  });
};
