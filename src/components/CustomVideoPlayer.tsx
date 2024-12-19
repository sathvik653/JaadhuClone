// import React from 'react';
// import { getVideoSources } from '../lib/video';
// import { Loader2 } from 'lucide-react';

// interface CustomVideoPlayerProps {
//   tmdbId: string;
//   type: 'movie' | 'tv';
//   onBack: () => void;
// }

// export function CustomVideoPlayer({ tmdbId, type, onBack }: CustomVideoPlayerProps) {
//   const [sources, setSources] = React.useState<{ url: string; quality: string }[]>([]);
//   const [selectedQuality, setSelectedQuality] = React.useState<string>('');
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [error, setError] = React.useState<string>('');

//   React.useEffect(() => {
//     async function fetchSources() {
//       try {
//         const videoSources = await getVideoSources(tmdbId, type);
//         setSources(videoSources);
        
//         if (videoSources.length > 0) {
//           // Select the highest quality by default
//           const defaultQuality = videoSources[0].quality;
//           setSelectedQuality(defaultQuality);
//         }
//       } catch (err) {
//         setError('Failed to load video sources. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchSources();
//   }, [tmdbId, type]);

//   const currentSource = sources.find(source => source.quality === selectedQuality);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={onBack}
//           className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {currentSource && (
//         <video
//           controls
//           autoPlay
//           className="w-full aspect-video bg-black rounded-lg"
//           key={currentSource.url}
//         >
//           <source src={currentSource.url} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}

//       <div className="flex items-center space-x-4">
//         <select
//           value={selectedQuality}
//           onChange={(e) => setSelectedQuality(e.target.value)}
//           className="bg-gray-800 text-white px-3 py-2 rounded-lg"
//         >
//           {sources.map((source) => (
//             <option key={source.quality} value={source.quality}>
//               {source.quality}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }