import { useEffect, useState } from 'react';
import { supabase, hasSupabaseCredentials } from '../lib/supabase';

interface Model {
  id: string;
  name: string;
  main_image: string;
  stories?: string[];
}

export default function Stories() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<{
    modelId: string;
    storyIndex: number;
    video: string;
    modelName: string;
    modelImage: string;
    stories: string[];
  } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchModels() {
      try {
        if (!hasSupabaseCredentials()) {
          setError('credentials_missing');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('models')
          .select('id, name, main_image, stories')
          .not('stories', 'is', null)
          .not('stories', 'eq', '{}')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setModels(data || []);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('fetch_error');
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let videoElement: HTMLVideoElement | null = null;

    if (activeStory) {
      videoElement = document.getElementById('story-video') as HTMLVideoElement;
      
      if (videoElement) {
        videoElement.onloadedmetadata = () => {
          const duration = videoElement?.duration || 10;
          const updateInterval = 10; // Update every 10ms
          
          progressInterval = setInterval(() => {
            if (videoElement) {
              const currentProgress = (videoElement.currentTime / duration) * 100;
              setProgress(currentProgress);
              
              if (currentProgress >= 100) {
                handleNextStory();
              }
            }
          }, updateInterval);
        };

        videoElement.onended = () => {
          handleNextStory();
        };
      }
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [activeStory]);

  const handleStoryClick = (modelId: string, storyIndex: number, stories: string[], name: string, image: string) => {
    setActiveStory({
      modelId,
      storyIndex,
      video: stories[storyIndex],
      stories,
      modelName: name,
      modelImage: image
    });
    setProgress(0);
  };

  const handleCloseStory = () => {
    setActiveStory(null);
    setProgress(0);
  };

  const handleNextStory = () => {
    if (!activeStory) return;

    const nextIndex = activeStory.storyIndex + 1;
    if (nextIndex < activeStory.stories.length) {
      setActiveStory({
        ...activeStory,
        storyIndex: nextIndex,
        video: activeStory.stories[nextIndex]
      });
      setProgress(0);
    } else {
      // Find next model with stories
      const currentModelIndex = models.findIndex(m => m.id === activeStory.modelId);
      const nextModel = models[currentModelIndex + 1];

      if (nextModel && nextModel.stories && nextModel.stories.length > 0) {
        handleStoryClick(nextModel.id, 0, nextModel.stories, nextModel.name, nextModel.main_image);
      } else {
        handleCloseStory();
      }
    }
  };

  const handlePrevStory = () => {
    if (!activeStory) return;

    const prevIndex = activeStory.storyIndex - 1;
    if (prevIndex >= 0) {
      setActiveStory({
        ...activeStory,
        storyIndex: prevIndex,
        video: activeStory.stories[prevIndex]
      });
      setProgress(0);
    } else {
      // Find previous model with stories
      const currentModelIndex = models.findIndex(m => m.id === activeStory.modelId);
      const prevModel = models[currentModelIndex - 1];

      if (prevModel && prevModel.stories && prevModel.stories.length > 0) {
        handleStoryClick(
          prevModel.id,
          prevModel.stories.length - 1,
          prevModel.stories,
          prevModel.name,
          prevModel.main_image
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error === 'credentials_missing') {
    return null;
  }

  if (error === 'fetch_error' || !models.length) {
    return null;
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {models.map((model) => (
          model.stories?.map((story, index) => (
            <div 
              key={`${model.id}-${index}`} 
              className="flex-none w-20 snap-start"
              onClick={() => handleStoryClick(model.id, index, model.stories || [], model.name, model.main_image)}
            >
              <div className="relative group cursor-pointer">
                {/* Circular thumbnail with gradient border */}
                <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#9F8E6A] to-[#D4C5A9]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <img
                      src={model.main_image}
                      alt={model.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Model name */}
                <p className="text-white text-xs text-center mt-2 truncate">
                  {model.name}
                </p>
              </div>
            </div>
          ))
        ))}
      </div>

      {/* Story Viewer */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={activeStory.modelImage}
                  alt={activeStory.modelName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white ml-2">{activeStory.modelName}</span>
            </div>
            <button 
              onClick={handleCloseStory}
              className="ml-auto text-white p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevStory();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextStory();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Video */}
          <video
            id="story-video"
            src={activeStory.video}
            className="max-h-screen max-w-full"
            autoPlay
            playsInline
            onClick={(e) => {
              e.stopPropagation();
              handleNextStory();
            }}
          />
        </div>
      )}
    </>
  );
}